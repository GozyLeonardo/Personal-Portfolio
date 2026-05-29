import { NextRequest, NextResponse } from "next/server";

interface DiagnosticResult {
  url: string;
  timestamp: string;
  scores: {
    performance: number;
    seo: number;
    accessibility: number;
    bestPractices: number;
  };
  metrics: {
    fcp: string;
    lcp: string;
    cls: string;
    tbt: string;
    speedIndex: string;
    responseTime: number;
  };
  security: {
    https: boolean;
    hsts: boolean;
    xFrameOptions: boolean;
    contentTypeOptions: boolean;
    csp: boolean;
    referrerPolicy: boolean;
  };
  seoDetails: {
    hasTitle: boolean;
    title: string;
    hasDescription: boolean;
    description: string;
    hasViewport: boolean;
    hasOgImage: boolean;
    hasOgTitle: boolean;
    hasCanonical: boolean;
    hasStructuredData: boolean;
    hasFavicon: boolean;
  };
  issues: Array<{
    severity: "critical" | "warning" | "info";
    category: string;
    title: string;
    detail: string;
  }>;
  verdict: {
    tier: "signal" | "engine" | "system";
    summary: string;
  };
}

const PAGESPEED_API = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

function normalizeUrl(input: string): string {
  let url = input.trim();
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }
  return url;
}

async function fetchPageSpeedData(url: string) {
  const apiKey = process.env.PAGESPEED_API_KEY;
  const keyParam = apiKey ? `&key=${apiKey}` : "";
  const apiUrl = `${PAGESPEED_API}?url=${encodeURIComponent(url)}&strategy=mobile&category=performance&category=seo&category=accessibility&category=best-practices${keyParam}`;

  const res = await fetch(apiUrl, { signal: AbortSignal.timeout(60000) });
  if (!res.ok) return null;
  return res.json();
}

async function fetchDirectAnalysis(url: string) {
  const start = Date.now();
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(15000),
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; SignalLens/1.0; +https://lawrencenwuzor.com)",
      },
      redirect: "follow",
    });
    const responseTime = Date.now() - start;
    const html = await res.text();
    const headers = Object.fromEntries(res.headers.entries());

    return { html, headers, responseTime, status: res.status };
  } catch {
    return null;
  }
}

function extractMeta(html: string) {
  const get = (pattern: RegExp): string => {
    const match = html.match(pattern);
    return match?.[1] ?? "";
  };

  const title = get(/<title[^>]*>([^<]*)<\/title>/i);
  const description =
    get(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
    get(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const viewport =
    get(/<meta[^>]*name=["']viewport["'][^>]*content=["']([^"']*)["']/i) ||
    get(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']viewport["']/i);
  const ogImage = get(
    /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i
  );
  const ogTitle = get(
    /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i
  );
  const canonical = get(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  const hasStructuredData =
    /<script[^>]*type=["']application\/ld\+json["']/i.test(html);
  const hasFavicon =
    /<link[^>]*rel=["'](?:icon|shortcut icon)["']/i.test(html);

  return {
    hasTitle: title.length > 0,
    title: title.slice(0, 120),
    hasDescription: description.length > 0,
    description: description.slice(0, 200),
    hasViewport: viewport.length > 0,
    hasOgImage: ogImage.length > 0,
    hasOgTitle: ogTitle.length > 0,
    hasCanonical: canonical.length > 0,
    hasStructuredData,
    hasFavicon,
  };
}

function analyzeSecurityHeaders(headers: Record<string, string>, url: string) {
  return {
    https: url.startsWith("https://"),
    hsts: !!headers["strict-transport-security"],
    xFrameOptions: !!headers["x-frame-options"],
    contentTypeOptions: !!headers["x-content-type-options"],
    csp: !!headers["content-security-policy"],
    referrerPolicy: !!headers["referrer-policy"],
  };
}

function generateIssues(
  scores: DiagnosticResult["scores"],
  security: DiagnosticResult["security"],
  seoDetails: DiagnosticResult["seoDetails"],
  metrics: DiagnosticResult["metrics"]
): DiagnosticResult["issues"] {
  const issues: DiagnosticResult["issues"] = [];

  // Performance issues (skip if PageSpeed unavailable)
  if (scores.performance >= 0 && scores.performance < 50) {
    issues.push({
      severity: "critical",
      category: "Performance",
      title: "Critically slow load time",
      detail: `Your mobile performance score is ${scores.performance}/100. Visitors are leaving before your site finishes loading. Every second of delay costs you roughly 7% in conversions.`,
    });
  } else if (scores.performance >= 0 && scores.performance < 80) {
    issues.push({
      severity: "warning",
      category: "Performance",
      title: "Below-average performance",
      detail: `Performance score: ${scores.performance}/100. Your site loads, but not fast enough to compete. Users on Nigerian mobile networks will feel this.`,
    });
  }

  // LCP check
  const lcpMs = parseFloat(metrics.lcp);
  if (lcpMs > 4000) {
    issues.push({
      severity: "critical",
      category: "Performance",
      title: "Main content loads too slowly",
      detail: `Largest Contentful Paint: ${metrics.lcp}. Google flags anything above 2.5s as poor. Your main content takes ${(lcpMs / 1000).toFixed(1)}s to appear — visitors see a blank screen until then.`,
    });
  }

  // CLS check
  const clsVal = parseFloat(metrics.cls);
  if (clsVal > 0.25) {
    issues.push({
      severity: "warning",
      category: "Performance",
      title: "Layout shifts during load",
      detail: `Cumulative Layout Shift: ${metrics.cls}. Elements jump around as the page loads. This breaks trust — visitors think the site is broken.`,
    });
  }

  // SEO issues
  if (!seoDetails.hasTitle) {
    issues.push({
      severity: "critical",
      category: "SEO",
      title: "Missing page title",
      detail:
        "No <title> tag found. This is the first thing Google reads. Without it, your site shows up as 'Untitled' in search results.",
    });
  }
  if (!seoDetails.hasDescription) {
    issues.push({
      severity: "warning",
      category: "SEO",
      title: "Missing meta description",
      detail:
        "No meta description. Google will auto-generate a snippet from random page text. You lose control of how your site appears in search results.",
    });
  }
  if (!seoDetails.hasOgImage) {
    issues.push({
      severity: "warning",
      category: "SEO",
      title: "No social preview image",
      detail:
        "Missing og:image tag. When someone shares your link on WhatsApp, LinkedIn, or Twitter — they see nothing. A blank box. That's a wasted impression.",
    });
  }
  if (!seoDetails.hasViewport) {
    issues.push({
      severity: "critical",
      category: "Mobile",
      title: "Not mobile-optimized",
      detail:
        "No viewport meta tag. Your site doesn't scale to phone screens. In Nigeria, 80%+ of web traffic is mobile. This is losing you the majority of your audience.",
    });
  }
  if (!seoDetails.hasCanonical) {
    issues.push({
      severity: "info",
      category: "SEO",
      title: "No canonical URL set",
      detail:
        "Missing canonical link. If your content appears at multiple URLs, Google doesn't know which one to rank. Simple fix, real impact.",
    });
  }
  if (!seoDetails.hasStructuredData) {
    issues.push({
      severity: "info",
      category: "SEO",
      title: "No structured data",
      detail:
        "No JSON-LD structured data found. Adding schema markup helps Google understand your business type, location, and offerings — and can unlock rich search results.",
    });
  }

  // Security issues
  if (!security.https) {
    issues.push({
      severity: "critical",
      category: "Security",
      title: "No HTTPS",
      detail:
        "Your site runs on HTTP. Browsers show a 'Not Secure' warning. Google penalizes ranking. Visitors don't trust it. This is the #1 thing to fix.",
    });
  }
  if (!security.hsts) {
    issues.push({
      severity: "warning",
      category: "Security",
      title: "Missing HSTS header",
      detail:
        "No Strict-Transport-Security header. Even with HTTPS, browsers can be tricked into loading the HTTP version. HSTS prevents that.",
    });
  }
  if (!security.csp) {
    issues.push({
      severity: "info",
      category: "Security",
      title: "No Content Security Policy",
      detail:
        "No CSP header. Your site is more vulnerable to cross-site scripting (XSS) attacks. A proper CSP tells browsers exactly what code is allowed to run.",
    });
  }
  if (!security.contentTypeOptions) {
    issues.push({
      severity: "info",
      category: "Security",
      title: "Missing X-Content-Type-Options",
      detail:
        "Without this header, browsers might interpret files as a different type than intended — a vector for attacks.",
    });
  }

  // Accessibility
  if (scores.accessibility >= 0 && scores.accessibility < 70) {
    issues.push({
      severity: "warning",
      category: "Accessibility",
      title: "Accessibility needs attention",
      detail: `Accessibility score: ${scores.accessibility}/100. People using screen readers or keyboard navigation will struggle with your site. This also affects SEO.`,
    });
  }

  return issues;
}

function determineVerdict(
  scores: DiagnosticResult["scores"],
  issues: DiagnosticResult["issues"]
): DiagnosticResult["verdict"] {
  const criticalCount = issues.filter((i) => i.severity === "critical").length;
  const warningCount = issues.filter((i) => i.severity === "warning").length;

  if (criticalCount >= 3 || (scores.performance >= 0 && scores.performance < 40)) {
    return {
      tier: "system",
      summary:
        "Your site has fundamental issues that need a ground-up rebuild. The infrastructure underneath is working against you — patching won't fix this.",
    };
  }
  if (criticalCount >= 1 || warningCount >= 3 || (scores.performance >= 0 && scores.performance < 70)) {
    return {
      tier: "engine",
      summary:
        "The foundation exists, but there are real gaps in performance, SEO, or security that are costing you traffic and trust. A structured rebuild with proper architecture would transform this.",
    };
  }
  return {
    tier: "signal",
    summary:
      "Your site has a decent foundation. The issues are refinement-level — tightening performance, adding missing meta tags, hardening security. A focused sprint would close these gaps.",
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawUrl = body.url;

    if (!rawUrl || typeof rawUrl !== "string" || rawUrl.length > 2000) {
      return NextResponse.json(
        { error: "Please provide a valid URL." },
        { status: 400 }
      );
    }

    const url = normalizeUrl(rawUrl);

    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: "That doesn't look like a valid URL. Try something like example.com" },
        { status: 400 }
      );
    }

    // Run PageSpeed and direct fetch in parallel
    const [pageSpeedData, directData] = await Promise.allSettled([
      fetchPageSpeedData(url),
      fetchDirectAnalysis(url),
    ]);

    const psi =
      pageSpeedData.status === "fulfilled" ? pageSpeedData.value : null;
    const direct =
      directData.status === "fulfilled" ? directData.value : null;

    if (!psi && !direct) {
      return NextResponse.json(
        {
          error:
            "Could not reach that site. Check the URL and make sure the site is live.",
        },
        { status: 422 }
      );
    }

    // Extract scores from PageSpeed (-1 means unavailable)
    const categories = psi?.lighthouseResult?.categories;
    const scores = {
      performance: categories?.performance?.score != null
        ? Math.round(categories.performance.score * 100) : -1,
      seo: categories?.seo?.score != null
        ? Math.round(categories.seo.score * 100) : -1,
      accessibility: categories?.accessibility?.score != null
        ? Math.round(categories.accessibility.score * 100) : -1,
      bestPractices: categories?.["best-practices"]?.score != null
        ? Math.round(categories["best-practices"].score * 100) : -1,
    };

    // Extract metrics from PageSpeed
    const audits = psi?.lighthouseResult?.audits ?? {};
    const metrics = {
      fcp: audits["first-contentful-paint"]?.displayValue ?? "N/A",
      lcp: audits["largest-contentful-paint"]?.displayValue ?? "N/A",
      cls: audits["cumulative-layout-shift"]?.displayValue ?? "N/A",
      tbt: audits["total-blocking-time"]?.displayValue ?? "N/A",
      speedIndex: audits["speed-index"]?.displayValue ?? "N/A",
      responseTime: direct?.responseTime ?? 0,
    };

    // Security from direct fetch
    const security = direct
      ? analyzeSecurityHeaders(direct.headers, url)
      : {
          https: url.startsWith("https://"),
          hsts: false,
          xFrameOptions: false,
          contentTypeOptions: false,
          csp: false,
          referrerPolicy: false,
        };

    // SEO details from direct fetch
    const seoDetails = direct
      ? extractMeta(direct.html)
      : {
          hasTitle: false,
          title: "",
          hasDescription: false,
          description: "",
          hasViewport: false,
          hasOgImage: false,
          hasOgTitle: false,
          hasCanonical: false,
          hasStructuredData: false,
          hasFavicon: false,
        };

    const issues = generateIssues(scores, security, seoDetails, metrics);
    const verdict = determineVerdict(scores, issues);

    const result: DiagnosticResult = {
      url,
      timestamp: new Date().toISOString(),
      scores,
      metrics,
      security,
      seoDetails,
      issues,
      verdict,
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("Diagnose API error:", err);
    return NextResponse.json(
      { error: "Something went wrong analyzing that site. Try again." },
      { status: 500 }
    );
  }
}

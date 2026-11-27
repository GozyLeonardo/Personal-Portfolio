import type { Metadata } from "next";
import { TerminalLabel } from "@/components/ui/TerminalLabel";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How lawrencenwuzor.com and the self-hosted Postiz social scheduler collect, use, store, and delete your data — including Google, YouTube, Meta, TikTok, and LinkedIn integrations.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy",
    description:
      "How lawrencenwuzor.com and the self-hosted Postiz scheduler handle your data.",
    url: "https://lawrencenwuzor.com/privacy",
  },
};

const sections = [
  {
    title: "Who we are",
    body: (
      <>
        <p>
          This site and the social scheduling tool at{" "}
          <a
            href="https://scheduler.lawrencenwuzor.com"
            className="text-[color:var(--color-solar-gold)] hover:underline"
          >
            scheduler.lawrencenwuzor.com
          </a>{" "}
          are operated by Lawrence Chigozie Nwuzor, an individual based in Lagos,
          Nigeria. In this policy, &quot;we&quot;, &quot;us&quot;, and &quot;our&quot;
          refer to Lawrence Chigozie Nwuzor.
        </p>
        <p>
          The scheduler is a self-hosted instance of the open-source Postiz
          application. It runs on a private server we control and is used to
          compose and publish content to social accounts we own or manage.
        </p>
      </>
    ),
  },
  {
    title: "What we collect",
    body: (
      <>
        <p>
          We collect only what is needed to run the site and the scheduler:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-[color:var(--color-warm-off-white)]">
              Account information.
            </strong>{" "}
            Name, email address, and profile image supplied when you sign in
            with Google, or an email address and password if you register
            directly.
          </li>
          <li>
            <strong className="text-[color:var(--color-warm-off-white)]">
              Connected social accounts.
            </strong>{" "}
            The platform name, account or channel identifier, display name, and
            avatar of each account you choose to connect.
          </li>
          <li>
            <strong className="text-[color:var(--color-warm-off-white)]">
              OAuth tokens.
            </strong>{" "}
            Access and refresh tokens issued by each platform so the scheduler
            can post on your behalf.
          </li>
          <li>
            <strong className="text-[color:var(--color-warm-off-white)]">
              Content you create.
            </strong>{" "}
            Drafts, scheduled posts, media uploads, and publishing metadata.
          </li>
          <li>
            <strong className="text-[color:var(--color-warm-off-white)]">
              Technical data.
            </strong>{" "}
            Server logs containing IP address, timestamps, and error details,
            plus privacy-friendly analytics on the public website.
          </li>
          <li>
            <strong className="text-[color:var(--color-warm-off-white)]">
              Email address you submit.
            </strong>{" "}
            If you subscribe to the newsletter, we store the address you provide
            in order to send you updates.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "What we do not collect",
    body: (
      <p>
        We do not collect passwords for any social platform, payment card data,
        government identifiers, precise location data, or contact lists from
        your devices. We do not buy personal data from third parties.
      </p>
    ),
  },
  {
    title: "Google and YouTube data",
    body: (
      <>
        <p>
          When you sign in with Google, we receive your basic profile — name,
          email address, profile image, and a unique Google account identifier.
          When you connect a YouTube channel, we request the{" "}
          <span className="font-mono text-sm text-[color:var(--color-electric-teal)]">
            youtube.upload
          </span>
          ,{" "}
          <span className="font-mono text-sm text-[color:var(--color-electric-teal)]">
            youtube.readonly
          </span>
          , and{" "}
          <span className="font-mono text-sm text-[color:var(--color-electric-teal)]">
            youtubepartner
          </span>{" "}
          scopes so the scheduler can upload videos, read channel details, and
          show analytics.
        </p>
        <p>
          Google user data is used solely to authenticate you and to publish
          content you schedule to the channel you select. We do not sell it, use
          it for advertising, or transfer it to third parties except as required
          to deliver a post to YouTube. Our use of information received from
          Google APIs adheres to the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--color-solar-gold)] hover:underline"
          >
            Google API Services User Data Policy
          </a>
          , including its Limited Use requirements.
        </p>
        <p>
          You can revoke access at any time at{" "}
          <a
            href="https://myaccount.google.com/permissions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--color-solar-gold)] hover:underline"
          >
            myaccount.google.com/permissions
          </a>
          . Revoking access stops all further use immediately and our stored
          tokens become invalid.
        </p>
      </>
    ),
  },
  {
    title: "Other social platforms",
    body: (
      <>
        <p>
          Connecting Facebook, Instagram, TikTok, or LinkedIn authorizes us to
          read basic profile and page information and to publish content to the
          accounts you select. Each platform issues its own token with its own
          scopes, and each platform&apos;s privacy policy also governs the data
          it holds. We request only the permissions needed to publish and to
          display your connected accounts inside the scheduler.
        </p>
        <p>
          You can disconnect any account inside the scheduler, which deletes the
          stored token for that platform, or revoke access from the
          platform&apos;s own settings.
        </p>
      </>
    ),
  },
  {
    title: "How we store data",
    body: (
      <>
        <p>
          All scheduler data is stored on a private server we administer.
          Content and account records live in a PostgreSQL database, background
          job state in Redis and Temporal, and search indexes in Elasticsearch.
          Tokens and credentials are encrypted at rest and the server&apos;s
          configuration files are restricted to the operating-system user that
          runs the application.
        </p>
        <p>
          Data is transmitted over HTTPS. We do not store data on third-party
          clouds beyond the server hosting the scheduler and the platforms you
          explicitly connect.
        </p>
      </>
    ),
  },
  {
    title: "How long we keep it",
    body: (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          Account and connected-channel data: retained while your account is
          active, then deleted within 30 days of account deletion.
        </li>
        <li>
          Scheduled posts and media: retained until you delete them or delete
          your account.
        </li>
        <li>
          OAuth tokens: deleted when you disconnect an account, when the token
          expires, or when you revoke access at the platform.
        </li>
        <li>
          Server logs: retained for up to 30 days for security and debugging,
          then rotated out.
        </li>
        <li>Newsletter addresses: retained until you unsubscribe.</li>
      </ul>
    ),
  },
  {
    title: "How we use data",
    body: (
      <p>
        We use data to authenticate you, connect the accounts you choose,
        schedule and publish the content you create, show you publishing status
        and analytics, keep the service secure, and respond to your requests. We
        do not sell personal data, and we do not use it to train advertising
        profiles.
      </p>
    ),
  },
  {
    title: "Sharing",
    body: (
      <p>
        We share data only with the platform you are publishing to, at the
        moment you publish, and with infrastructure providers strictly necessary
        to run the service (hosting and email delivery). We may disclose data if
        legally required, but we will notify you where permitted.
      </p>
    ),
  },
  {
    title: "Your rights",
    body: (
      <>
        <p>
          You can request access to, correction of, export of, or deletion of
          your personal data. You can disconnect social accounts and revoke
          platform permissions at any time. To exercise any of these rights,
          email us at the address below and we will respond within 30 days.
        </p>
        <p>
          If you are in the European Economic Area or the United Kingdom, you
          also have the right to object to processing and to lodge a complaint
          with your local data protection authority. If you are in Nigeria, you
          may contact the Nigeria Data Protection Commission.
        </p>
      </>
    ),
  },
  {
    title: "Cookies and analytics",
    body: (
      <p>
        The public website uses privacy-friendly analytics that do not build
        advertising profiles, and the scheduler uses strictly necessary cookies
        to keep you signed in and to protect requests against cross-site
        forgery. We do not use advertising or cross-site tracking cookies.
      </p>
    ),
  },
  {
    title: "Children",
    body: (
      <p>
        The service is not directed at children under 13, and we do not
        knowingly collect their personal data. If you believe a child has
        provided us data, contact us and we will delete it.
      </p>
    ),
  },
  {
    title: "Changes",
    body: (
      <p>
        We may update this policy as the service changes. Material changes will
        be reflected in the date at the top of this page. Continued use after an
        update means you accept the revised policy.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <section className="min-h-[80vh] pt-32 pb-24 px-6 md:px-10">
      <div className="mx-auto max-w-3xl">
        <TerminalLabel>Privacy</TerminalLabel>
        <h1 className="mt-6 font-display text-4xl md:text-6xl text-[color:var(--color-warm-off-white)]">
          What we hold.
          <br />
          <span className="text-[color:var(--color-solar-gold)]">
            And what we don&apos;t.
          </span>
        </h1>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-mute)]">
          Last updated: 27 November 2026
        </p>

        <div className="mt-16 space-y-12 text-base text-[color:var(--color-warm-off-white)] leading-relaxed">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-solar-gold)] mb-4">
                {section.title}
              </h2>
              <div className="space-y-4">{section.body}</div>
            </div>
          ))}

          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-solar-gold)] mb-4">
              Contact
            </h2>
            <p>
              Questions or data requests:{" "}
              <a
                href="mailto:chigozienwuzor2018@gmail.com"
                className="text-[color:var(--color-solar-gold)] hover:underline"
              >
                chigozienwuzor2018@gmail.com
              </a>
              . You can also reach the site owner at{" "}
              <a
                href="mailto:lawrence@lawrencenwuzor.com"
                className="text-[color:var(--color-solar-gold)] hover:underline"
              >
                lawrence@lawrencenwuzor.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { forwardRef } from "react";

// Cloudflare always-pass TEST sitekey — used only when the real key isn't set (local dev).
const SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

export const TurnstileBox = forwardRef<
  TurnstileInstance,
  { onToken: (token: string) => void }
>(function TurnstileBox({ onToken }, ref) {
  return (
    <Turnstile
      ref={ref}
      siteKey={SITE_KEY}
      options={{ theme: "dark", size: "flexible" }}
      onSuccess={onToken}
      onExpire={() => onToken("")}
      onError={() => onToken("")}
      className="mb-4"
    />
  );
});

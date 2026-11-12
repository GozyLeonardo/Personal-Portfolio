import type { Metadata } from "next";
import { Gate } from "@/components/landing/Gate";

export const metadata: Metadata = {
  title: "Lawrence Nwuzor — A Threshold",
  description:
    "Not everyone should enter. What do you think about the future? Your answer determines whether what waits beyond is yours.",
  alternates: { canonical: "/" },
};

export default function GatePage() {
  return <Gate />;
}

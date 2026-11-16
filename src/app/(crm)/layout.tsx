import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private CRM | Ceará Prime Imóveis S.A.",
  description: "Painel interno de gestão de leads, SLA e Concierge IA.",
  robots: { index: false, follow: false },
};

export default function CrmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="dark min-h-dvh bg-ink-950">{children}</div>;
}

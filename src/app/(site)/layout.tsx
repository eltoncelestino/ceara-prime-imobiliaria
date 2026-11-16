import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ceará Prime Imóveis S.A. | Imóveis de Alto Padrão em Fortaleza-CE",
  description:
    "Apartamentos vista mar, coberturas e investimentos no Meireles, Beira-Mar, Aldeota, Cocó e Dionísio Torres com atendimento em menos de 1 minuto.",
  openGraph: {
    title: "Ceará Prime Imóveis S.A. | Fortaleza-CE",
    description:
      "Curadoria exclusiva de imóveis de alto padrão em Fortaleza com atendimento instantâneo.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-navy-950 focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-gold-200"
      >
        Pular para o conteúdo principal
      </a>
      {children}
    </>
  );
}

import { LandingClient } from "@/components/site/LandingClient";

export default function SiteHomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Ceará Prime Imóveis S.A.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Desembargador Moreira, 1300 - Sala 402, Aldeota",
      addressLocality: "Fortaleza",
      addressRegion: "CE",
      postalCode: "60170-002",
      addressCountry: "BR",
    },
    areaServed: ["Meireles", "Aldeota", "Cocó", "Dionísio Torres", "Beira-Mar"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingClient />
    </>
  );
}

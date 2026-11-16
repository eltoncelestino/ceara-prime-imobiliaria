import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BedDouble, Car, MapPin, Maximize2, MessageCircle } from "lucide-react";
import { MOCK_PROPERTIES } from "@/data/mockData";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatBRL } from "@/components/chat/PropertyCard";
import { LeadForm } from "@/components/site/LeadForm";

export async function generateStaticParams() {
  return MOCK_PROPERTIES.map((p) => ({ slug: p.slug }));
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = MOCK_PROPERTIES.find((p) => p.slug === slug);

  if (!property) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.title,
    description: property.description,
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: property.price,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="min-h-dvh bg-snow-50 text-navy-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <Link
          href="/imoveis"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 hover:text-emerald-600"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          Voltar para o catálogo
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-7">
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-navy-900 shadow-lg">
              <SafeImage
                src={property.imageUrl}
                alt={property.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>

            {property.gallery && property.gallery.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {property.gallery.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-video overflow-hidden rounded-xl bg-navy-900"
                  >
                    <SafeImage
                      src={img}
                      alt={`${property.title} - foto ${i + 1}`}
                      fill
                      sizes="240px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm lg:col-span-5">
            <div className="space-y-4">
              <span className="inline-block rounded-full bg-sand-100 px-3 py-1 text-xs font-semibold text-navy-900">
                {property.neighborhood} · {property.code}
              </span>

              <h1 className="font-serif text-3xl font-semibold text-navy-900">
                {property.title}
              </h1>

              <p className="tabular-nums font-serif text-3xl font-bold text-emerald-600">
                {formatBRL(property.price, property.objective === "ALUGAR")}
              </p>

              <p className="text-sm leading-relaxed text-slate-600">
                {property.description}
              </p>

              <div className="grid grid-cols-3 gap-3 border-y border-slate-100 py-4 text-xs font-medium text-navy-900">
                <span className="inline-flex items-center gap-1.5">
                  <BedDouble className="h-4 w-4 text-gold-400" strokeWidth={1.5} />
                  {property.bedrooms} Quartos
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Maximize2 className="h-4 w-4 text-gold-400" strokeWidth={1.5} />
                  {property.areaSqm} m²
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Car className="h-4 w-4 text-gold-400" strokeWidth={1.5} />
                  {property.parkingSpots ?? 2} Vagas
                </span>
              </div>

              <p className="flex items-start gap-2 text-xs text-slate-500">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" strokeWidth={1.5} />
                {property.address ?? `${property.neighborhood}, Fortaleza - CE`}
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <a
                href={`https://wa.me/5585999110001?text=${encodeURIComponent(
                  `Olá! Tenho interesse no imóvel ${property.title} (${property.code}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-600"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                Agendar visita pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <LeadForm propertyId={property.id} />
    </main>
  );
}

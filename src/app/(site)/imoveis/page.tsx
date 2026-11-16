import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { MOCK_PROPERTIES } from "@/data/mockData";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatBRL } from "@/components/chat/PropertyCard";

export const metadata = {
  title: "Catálogo de Imóveis em Fortaleza | Ceará Prime Imóveis",
};

export default async function PropertiesCatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ neighborhood?: string; goal?: string; maxPrice?: string }>;
}) {
  const params = await searchParams;
  const neighborhood = params.neighborhood ?? "TODOS";
  const goal = params.goal ?? "TODOS";
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;

  const filtered = MOCK_PROPERTIES.filter((p) => {
    if (neighborhood !== "TODOS" && p.neighborhood !== neighborhood) return false;
    if (goal !== "TODOS" && p.objective !== goal) return false;
    if (maxPrice && p.price > maxPrice && p.objective !== "ALUGAR") return false;
    return true;
  });

  return (
    <main className="min-h-dvh bg-snow-50 px-5 py-12 text-navy-900 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 hover:text-emerald-600"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          Voltar para a página inicial
        </Link>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-400">
              Portfólio Fortaleza-CE
            </span>
            <h1 className="mt-1 font-serif text-3xl font-semibold text-navy-900 sm:text-4xl">
              {neighborhood === "TODOS"
                ? "Todos os Imóveis Selecionados"
                : `Imóveis em ${neighborhood}`}
            </h1>
          </div>
          <p className="tabular-nums text-xs font-medium text-slate-500">
            {filtered.length} imóveis encontrados
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((prop) => (
            <Link
              key={prop.id}
              href={`/imoveis/${prop.slug}`}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-gold-400/50 hover:shadow-lg"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-navy-900">
                <SafeImage
                  src={prop.imageUrl}
                  alt={prop.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-navy-950/80 px-2.5 py-0.5 text-[11px] font-semibold text-gold-200 backdrop-blur-md">
                  {prop.neighborhood}
                </span>
              </div>

              <div className="space-y-2 p-5">
                <p className="tabular-nums font-serif text-xl font-bold text-navy-900">
                  {formatBRL(prop.price, prop.objective === "ALUGAR")}
                </p>
                <h2 className="line-clamp-1 text-sm font-semibold text-navy-900">
                  {prop.title}
                </h2>
                <p className="flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="h-3.5 w-3.5 text-gold-400" strokeWidth={1.5} />
                  {prop.bedrooms} quartos · {prop.areaSqm} m² ·{" "}
                  {prop.parkingSpots ?? 2} vagas
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import { ArrowUp, Building2, MapPin } from "lucide-react";

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-gold-400/20 bg-navy-950 py-14 text-slate-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:px-8 md:grid-cols-4">
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2.5">
            <Building2 className="h-6 w-6 text-gold-400" strokeWidth={1.5} />
            <span className="font-serif text-xl font-semibold text-white">
              Ceará Prime Imóveis S.A.
            </span>
          </div>
          <p className="flex items-start gap-2 text-xs leading-relaxed text-slate-400">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" strokeWidth={1.5} />
            Av. Desembargador Moreira, 1300 - Sala 402, Aldeota, Fortaleza - CE, CEP 60170-002
          </p>
          <p className="text-[11px] text-slate-500">
            CRECI Jurídico 00000-J (Fictício • Demonstração)
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-400">
            Navegação
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/imoveis" className="hover:text-gold-200">
                Catálogo de Imóveis
              </Link>
            </li>
            <li>
              <Link href="/#bairros" className="hover:text-gold-200">
                Bairros Nobres
              </Link>
            </li>
            <li>
              <Link href="/#contato" className="hover:text-gold-200">
                Fale Conosco
              </Link>
            </li>
            <li>
              <Link href="/crm" className="text-gold-400 hover:underline">
                Área do Corretor (CRM)
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-400">
              Privacidade &amp; LGPD
            </h4>
            <p className="text-xs text-slate-400">
              Seus dados são protegidos conforme a Lei Geral de Proteção de Dados.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-xl border border-white/15 px-3 py-2 text-xs font-medium text-white transition hover:border-gold-400/50"
          >
            <ArrowUp className="h-3.5 w-3.5 text-gold-400" strokeWidth={1.5} />
            Voltar ao topo
          </button>
        </div>
      </div>
    </footer>
  );
}

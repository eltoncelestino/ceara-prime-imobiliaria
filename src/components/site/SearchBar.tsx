"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function SearchBar() {
  const router = useRouter();
  const [goal, setGoal] = useState("COMPRAR");
  const [neighborhood, setNeighborhood] = useState("Meireles");
  const [budget, setBudget] = useState("1500000");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      goal,
      neighborhood,
      maxPrice: budget,
    });
    router.push(`/imoveis?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full max-w-4xl grid-cols-1 gap-3 rounded-2xl border border-white/20 bg-navy-950/75 p-3 shadow-2xl backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4"
    >
      <div className="flex flex-col px-2 text-left">
        <label
          htmlFor="search-goal"
          className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-400"
        >
          Objetivo
        </label>
        <select
          id="search-goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="mt-1 bg-transparent text-sm font-medium text-white focus:outline-none"
        >
          <option value="COMPRAR" className="bg-navy-950">
            Comprar
          </option>
          <option value="ALUGAR" className="bg-navy-950">
            Alugar
          </option>
          <option value="INVESTIR" className="bg-navy-950">
            Investir
          </option>
        </select>
      </div>

      <div className="flex flex-col border-white/10 px-2 text-left lg:border-l">
        <label
          htmlFor="search-neighborhood"
          className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-400"
        >
          Bairro em Fortaleza
        </label>
        <select
          id="search-neighborhood"
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
          className="mt-1 bg-transparent text-sm font-medium text-white focus:outline-none"
        >
          <option value="TODOS" className="bg-navy-950">
            Todos os bairros nobres
          </option>
          <option value="Meireles" className="bg-navy-950">
            Meireles
          </option>
          <option value="Beira-Mar" className="bg-navy-950">
            Beira-Mar
          </option>
          <option value="Aldeota" className="bg-navy-950">
            Aldeota
          </option>
          <option value="Cocó" className="bg-navy-950">
            Cocó
          </option>
          <option value="Dionísio Torres" className="bg-navy-950">
            Dionísio Torres
          </option>
        </select>
      </div>

      <div className="flex flex-col border-white/10 px-2 text-left lg:border-l">
        <label
          htmlFor="search-budget"
          className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-400"
        >
          Faixa de Valor
        </label>
        <select
          id="search-budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="mt-1 bg-transparent text-sm font-medium text-white focus:outline-none"
        >
          <option value="800000" className="bg-navy-950">
            Até R$ 800 mil
          </option>
          <option value="1500000" className="bg-navy-950">
            Até R$ 1,5 milhão
          </option>
          <option value="4000000" className="bg-navy-950">
            Acima de R$ 1,5 milhão
          </option>
        </select>
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
      >
        <Search className="h-4 w-4" strokeWidth={1.5} />
        Buscar Imóveis
      </button>
    </form>
  );
}

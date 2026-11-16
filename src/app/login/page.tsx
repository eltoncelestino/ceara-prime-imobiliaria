"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Building2, Lock, LogIn } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("roberto.viana@cearaprime.com.br");
  const [password, setPassword] = useState("prime2026");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Falha na autenticação");
        setLoading(false);
        return;
      }

      router.push("/crm");
      router.refresh();
    } catch {
      setError("Erro de conexão ao autenticar");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-dvh items-center justify-center bg-navy-950 px-4 text-text-primary">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl border border-gold-400/25 bg-ink-900 p-8 shadow-2xl"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold-400/40 bg-ink-800">
            <Building2 className="h-5 w-5 text-gold-400" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-semibold text-white">
              Ceará Prime CRM
            </h1>
            <p className="text-xs text-text-muted">
              Acesso restrito a corretores e gerência
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gold-400"
            >
              E-mail corporativo
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-ink-800 px-3.5 py-2.5 text-sm text-white focus:border-gold-400 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gold-400"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-ink-800 px-3.5 py-2.5 text-sm text-white focus:border-gold-400 focus:outline-none"
            />
          </div>

          {error && (
            <p className="rounded-xl bg-rose-500/15 px-3 py-2 text-xs font-medium text-rose-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-60"
          >
            <LogIn className="h-4 w-4" strokeWidth={1.5} />
            {loading ? "Autenticando..." : "Entrar no Private CRM"}
          </button>
        </form>

        <div className="mt-6 rounded-2xl border border-white/10 bg-ink-950/60 p-3.5 text-[11px] text-text-muted">
          <p className="mb-1 flex items-center gap-1.5 font-semibold text-gold-200">
            <Lock className="h-3.5 w-3.5 text-gold-400" strokeWidth={1.5} />
            Credenciais de Demonstração:
          </p>
          <p>Gerente (Roberto Viana): roberto.viana@cearaprime.com.br</p>
          <p>Corretor (Carlos Eduardo): carlos.eduardo@cearaprime.com.br</p>
          <p className="mt-1 text-emerald-400">Senha padrão: prime2026</p>
        </div>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-xs font-medium text-gold-400 hover:underline"
          >
            ← Voltar para o site público
          </Link>
        </div>
      </motion.div>
    </main>
  );
}

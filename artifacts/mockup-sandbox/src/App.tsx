import { useEffect, useRef, useState, type CSSProperties, type ComponentType, type ReactNode } from "react";

import { modules as discoveredModules } from "./.generated/mockup-components";

type ModuleMap = Record<string, () => Promise<Record<string, unknown>>>;

function _resolveComponent(
  mod: Record<string, unknown>,
  name: string,
): ComponentType | undefined {
  const fns = Object.values(mod).filter(
    (v) => typeof v === "function",
  ) as ComponentType[];
  return (
    (mod.default as ComponentType) ||
    (mod.Preview as ComponentType) ||
    (mod[name] as ComponentType) ||
    fns[fns.length - 1]
  );
}

function PreviewRenderer({
  componentPath,
  modules,
}: {
  componentPath: string;
  modules: ModuleMap;
}) {
  const [Component, setComponent] = useState<ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setComponent(null);
    setError(null);

    async function loadComponent(): Promise<void> {
      const key = `./components/mockups/${componentPath}.tsx`;
      const loader = modules[key];
      if (!loader) {
        setError(`No component found at ${componentPath}.tsx`);
        return;
      }
      try {
        const mod = await loader();
        if (cancelled) return;
        const name = componentPath.split("/").pop()!;
        const comp = _resolveComponent(mod, name);
        if (!comp) {
          setError(
            `No exported React component found in ${componentPath}.tsx\n\nMake sure the file has at least one exported function component.`,
          );
          return;
        }
        setComponent(() => comp);
      } catch (e) {
        if (cancelled) return;
        const message = e instanceof Error ? e.message : String(e);
        setError(`Failed to load preview.\n${message}`);
      }
    }

    void loadComponent();
    return () => { cancelled = true; };
  }, [componentPath, modules]);

  if (error) {
    return (
      <pre style={{ color: "red", padding: "2rem", fontFamily: "system-ui" }}>
        {error}
      </pre>
    );
  }

  if (!Component) return null;
  return <Component />;
}

function getBasePath(): string {
  return import.meta.env.BASE_URL.replace(/\/$/, "");
}

function getPreviewExamplePath(): string {
  return `${getBasePath()}/preview/ComponentName`;
}

/* ─────────────────────────── Scroll-reveal hook ──────────────────────────── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/* ─────────────────────────── Gallery sections ─────────────────────────────── */

const features = [
  {
    icon: "⚡",
    title: "Instant Preview",
    desc: "Render komponen React secara terisolasi di URL tersendiri — tidak ada rebuild seluruh app.",
  },
  {
    icon: "📐",
    title: "Infinite Canvas",
    desc: "Embed komponen sebagai iframe di canvas Replit untuk perbandingan side-by-side yang mulus.",
  },
  {
    icon: "🎨",
    title: "Design System",
    desc: "Shadcn/UI + Tailwind CSS siap pakai. Kustomisasi token warna sekali, berlaku ke semua komponen.",
  },
  {
    icon: "🔄",
    title: "Hot Reload",
    desc: "Simpan file, tampilan langsung berubah. Tidak perlu refresh manual — Vite HMR sangat cepat.",
  },
  {
    icon: "📱",
    title: "Mobile-Ready",
    desc: "Setiap komponen bisa diuji di viewport mobile, tablet, dan desktop tanpa emulator.",
  },
  {
    icon: "🤖",
    title: "AI-Powered",
    desc: "Agen Replit bisa generate komponen baru langsung ke sandbox — desain tanpa batas.",
  },
];

const steps = [
  { n: "01", title: "Buat komponen", body: "Tambahkan file .tsx di src/components/mockups/ dan export satu fungsi React." },
  { n: "02", title: "Akses preview", body: "Buka /preview/NamaKomponen — server langsung merender komponen tersebut." },
  { n: "03", title: "Embed di canvas", body: "Gunakan URL preview sebagai iframe di canvas Replit untuk eksplorasi visual." },
];

function RevealDiv({ children, className, delay = 0, style: outerStyle }: { children: ReactNode; className?: string; delay?: number; style?: CSSProperties }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...outerStyle,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Gallery() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans overflow-x-hidden">

      {/* ── Nav ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-3 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎨</span>
          <span className="font-semibold text-sm tracking-tight">Mockup Canvas</span>
        </div>
        <a
          href={getPreviewExamplePath()}
          className="text-xs px-4 py-1.5 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-all duration-200"
        >
          Buka Preview →
        </a>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-24 pb-16 text-center overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)" }} />
        <div className="absolute top-2/3 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(236,72,153,0.10) 0%, transparent 70%)" }} />

        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-6 border"
            style={{ background: "rgba(139,92,246,0.15)", borderColor: "rgba(139,92,246,0.3)", color: "rgba(196,167,255,1)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Workspace UI Sandbox · Powered by Vite + React
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            style={{ letterSpacing: "-0.03em" }}>
            Prototipe komponen
            <br />
            <span style={{
              background: "linear-gradient(135deg, #a78bfa, #60a5fa, #f472b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              lebih cepat dari sebelumnya
            </span>
          </h1>

          <p className="text-base sm:text-lg text-white/50 mb-10 max-w-xl mx-auto leading-relaxed">
            Render komponen React secara terisolasi, embed ke canvas Replit, dan eksplorasi desain tanpa menyentuh app utama.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={getPreviewExamplePath()}
              className="w-full sm:w-auto px-7 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 0 24px rgba(124,58,237,0.35)" }}
            >
              Mulai Preview →
            </a>
            <a
              href="#cara-pakai"
              className="w-full sm:w-auto px-7 py-3 rounded-xl font-semibold text-sm border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-all duration-200"
            >
              Cara Pakai
            </a>
          </div>
        </div>

        {/* Hero image / mock UI */}
        <div className="relative z-10 mt-16 w-full max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-white/10"
            style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)" }}>
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3" style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <div className="flex-1 ml-3 px-3 py-1 rounded-md text-xs text-white/30" style={{ background: "rgba(255,255,255,0.05)" }}>
                {getPreviewExamplePath()}
              </div>
            </div>
            {/* Screenshot-style UI */}
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80&auto=format&fit=crop"
              alt="UI preview"
              className="w-full object-cover"
              style={{ maxHeight: "340px", objectPosition: "top" }}
            />
          </div>
          {/* Glow under card */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)" }} />
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce">
          <div className="w-px h-8 bg-white/40" />
          <span className="text-xs text-white/50 tracking-widest uppercase">Scroll</span>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 px-5 sm:px-8 max-w-6xl mx-auto">
        <RevealDiv className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full text-xs mb-4 border border-white/10 text-white/40">
            Fitur Utama
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ letterSpacing: "-0.02em" }}>
            Semua yang kamu butuhkan
          </h2>
          <p className="text-white/40 max-w-md mx-auto text-sm">
            Dibangun di atas teknologi modern untuk workflow desain yang cepat dan nyaman.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <RevealDiv key={f.title} delay={i * 80} className="group p-6 rounded-2xl border border-white/8 hover:border-white/20 transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-sm mb-2">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </RevealDiv>
          ))}
        </div>
      </section>

      {/* ── Photo section ── */}
      <section className="py-16 px-5 sm:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <RevealDiv>
            <div className="inline-block px-3 py-1 rounded-full text-xs mb-4 border border-violet-500/30 text-violet-400">
              Workflow
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight" style={{ letterSpacing: "-0.02em" }}>
              Desain, iterate,<br />dan deploy — lebih cepat
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Sandbox ini memisahkan komponen dari app utama sehingga kamu bisa bereksperimen bebas tanpa risiko merusak production. Cocok untuk tim maupun solo developer.
            </p>
            <ul className="space-y-3">
              {["Tidak ada setup rumit", "Zero config mobile preview", "Auto-discovery komponen baru"].map(t => (
                <li key={t} className="flex items-center gap-3 text-sm text-white/60">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                    style={{ background: "rgba(139,92,246,0.2)", color: "#a78bfa" }}>✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </RevealDiv>

          <RevealDiv delay={200} className="relative">
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}>
              <img
                src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80&auto=format&fit=crop"
                alt="Developer workflow"
                className="w-full object-cover h-72 md:h-80"
              />
              <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(79,70,229,0.1))" }} />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 px-4 py-2.5 rounded-xl border border-white/10 text-xs font-medium"
              style={{ background: "rgba(10,10,15,0.9)", backdropFilter: "blur(12px)" }}>
              🚀 Vite HMR — &lt;50ms refresh
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ── Steps ── */}
      <section id="cara-pakai" className="py-24 px-5 sm:px-8 max-w-4xl mx-auto">
        <RevealDiv className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full text-xs mb-4 border border-white/10 text-white/40">
            Cara Pakai
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ letterSpacing: "-0.02em" }}>
            Mulai dalam 3 langkah
          </h2>
        </RevealDiv>

        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-7 top-8 bottom-8 w-px hidden sm:block"
            style={{ background: "linear-gradient(180deg, rgba(139,92,246,0.5), rgba(59,130,246,0.5))" }} />

          <div className="space-y-8">
            {steps.map((s, i) => (
              <RevealDiv key={s.n} delay={i * 120} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-sm z-10"
                  style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(79,70,229,0.2))", border: "1px solid rgba(139,92,246,0.3)", color: "#a78bfa" }}>
                  {s.n}
                </div>
                <div className="pt-1.5">
                  <h3 className="font-semibold mb-1">{s.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{s.body}</p>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ── Second photo + CTA ── */}
      <section className="py-16 px-5 sm:px-8">
        <RevealDiv className="max-w-5xl mx-auto rounded-3xl overflow-hidden relative"
          style={{ background: "linear-gradient(135deg, #1e1040, #0f172a)" }}>
          <div className="absolute inset-0"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=60&auto=format&fit=crop)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.08 }} />
          <div className="relative z-10 py-16 px-8 sm:px-16 text-center">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4" style={{ letterSpacing: "-0.03em" }}>
              Siap mulai prototipe?
            </h2>
            <p className="text-white/50 mb-8 max-w-md mx-auto">
              Buat komponen pertamamu sekarang dan lihat langsung hasilnya di browser.
            </p>
            <a
              href={getPreviewExamplePath()}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 0 32px rgba(124,58,237,0.4)" }}
            >
              Buka Preview Server →
            </a>
          </div>
        </RevealDiv>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 px-5 sm:px-8 text-center border-t border-white/5">
        <p className="text-white/25 text-xs">
          Mockup Canvas · Workspace UI Sandbox · Replit pnpm Monorepo
        </p>
      </footer>
    </div>
  );
}

/* ─────────────────────────── Router ─────────────────────────────────────── */

function getPreviewPath(): string | null {
  const basePath = getBasePath();
  const { pathname } = window.location;
  const local =
    basePath && pathname.startsWith(basePath)
      ? pathname.slice(basePath.length) || "/"
      : pathname;
  const match = local.match(/^\/preview\/(.+)$/);
  return match ? match[1] : null;
}

function App() {
  const previewPath = getPreviewPath();

  if (previewPath) {
    return (
      <PreviewRenderer
        componentPath={previewPath}
        modules={discoveredModules}
      />
    );
  }

  return <Gallery />;
}

export default App;

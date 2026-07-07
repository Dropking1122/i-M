import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import {
  FaCashRegister, FaWhatsapp, FaQrcode, FaGraduationCap,
  FaTelegram, FaWifi, FaGift, FaGithub, FaGlobe,
  FaBook, FaCheck, FaLayerGroup,
} from 'react-icons/fa';

interface ProjectLink { label: string; shortLabel?: string; url: string; icon: React.ElementType; primary?: boolean }
interface Project {
  title: string; subtitle: string; description: string; tag: string;
  Icon: React.ElementType; gradientFrom: string; gradientTo: string; glowColor: string;
  features: string[]; links: ProjectLink[];
}

const PROJECTS: Project[] = [
  {
    title: 'POS Supplier REVD', subtitle: 'Sistem Point of Sale untuk Supplier',
    description: 'Aplikasi POS lengkap dengan manajemen stok, transaksi, hutang pelanggan, dan laporan keuangan untuk supplier atau toko retail.',
    tag: 'Laravel · MySQL', Icon: FaCashRegister,
    gradientFrom: '#3b82f6', gradientTo: '#1d4ed8', glowColor: 'rgba(59,130,246,0.35)',
    features: ['Multi-role: Admin & Kasir', 'POS dengan keranjang multi-item', 'Manajemen hutang & cicilan', 'Laporan penjualan & profit (PDF/Excel)', 'Backup database otomatis'],
    links: [
      { label: 'Dokumentasi', shortLabel: 'Docs', url: 'https://github.com/Dropking1122/FEATURES/blob/main/01-POS-SUPPLIER-REVD/FEATURES.md', icon: FaBook, primary: true },
      { label: 'Overview', shortLabel: 'GitHub', url: 'https://github.com/Dropking1122/FEATURES/blob/main/01-POS-SUPPLIER-REVD/FEATURES.md', icon: FaGithub },
    ],
  },
  {
    title: 'REVDWABOT', subtitle: 'WhatsApp Bot Penjualan Otomatis',
    description: 'Bot WhatsApp siap pakai untuk jualan produk digital secara otomatis 24 jam non-stop dengan payment gateway QRIS terintegrasi.',
    tag: 'Node.js · React', Icon: FaWhatsapp,
    gradientFrom: '#25d366', gradientTo: '#128c7e', glowColor: 'rgba(37,211,102,0.35)',
    features: ['Katalog & pemesanan otomatis', 'QRIS, Transfer Bank, Saldo', 'Stok digital kirim otomatis', 'Voucher & bundling produk', 'Dashboard & notifikasi real-time'],
    links: [
      { label: 'Dokumentasi', shortLabel: 'Docs', url: 'https://github.com/Dropking1122/FEATURES/blob/main/02-REVDWABOT/FEATURES.md', icon: FaBook, primary: true },
      { label: 'Overview', shortLabel: 'GitHub', url: 'https://github.com/Dropking1122/FEATURES/blob/main/02-REVDWABOT/FEATURES.md', icon: FaGithub },
    ],
  },
  {
    title: 'AbsensiQR REVD', subtitle: 'Absensi Siswa Berbasis QR Code',
    description: 'Aplikasi absensi modern untuk sekolah - setiap siswa punya QR Code unik, scan saat masuk, dan kehadiran langsung tercatat real-time.',
    tag: 'Laravel · MySQL', Icon: FaQrcode,
    gradientFrom: '#f59e0b', gradientTo: '#d97706', glowColor: 'rgba(245,158,11,0.35)',
    features: ['QR Code unik per siswa', 'Scan via kamera perangkat', 'Dashboard guru & admin', 'Status: Hadir, Terlambat, Izin, Alpha', 'Laporan export Excel / PDF'],
    links: [
      { label: 'Dokumentasi', shortLabel: 'Docs', url: 'https://github.com/Dropking1122/FEATURES/blob/main/03-ABSENSIQR-REVD/FEATURES.md', icon: FaBook, primary: true },
      { label: 'Overview', shortLabel: 'GitHub', url: 'https://github.com/Dropking1122/FEATURES/blob/main/03-ABSENSIQR-REVD/FEATURES.md', icon: FaGithub },
    ],
  },
  {
    title: 'Website CLC', subtitle: 'Computer Learning Center',
    description: 'Website resmi lembaga kursus komputer CLC - informasi program, pendaftaran online, dan manajemen siswa. Live di clccourse.online.',
    tag: 'Web · PHP', Icon: FaGraduationCap,
    gradientFrom: '#8b5cf6', gradientTo: '#6d28d9', glowColor: 'rgba(139,92,246,0.35)',
    features: ['Landing page modern & responsif', 'Form pendaftaran online', 'Info program kursus lengkap', 'Galeri & testimoni alumni', 'Dashboard admin'],
    links: [
      { label: 'Dokumentasi', shortLabel: 'Docs', url: 'https://github.com/Dropking1122/FEATURES/blob/main/04-PROJECT-WEB-CLC/FEATURES.md', icon: FaBook, primary: true },
      { label: 'Live Site', shortLabel: 'Live', url: 'https://github.com/Dropking1122/FEATURES/blob/main/04-PROJECT-WEB-CLC/FEATURES.md', icon: FaGlobe },
    ],
  },
  {
    title: 'Telegram Bot Order', subtitle: 'Bot Pemesanan Otomatis via Telegram',
    description: 'Bot Telegram siap pakai untuk jualan produk digital otomatis - pelanggan pesan, bayar, dan produk langsung dikirim ke chat tanpa admin standby.',
    tag: 'Node.js · Telegram API', Icon: FaTelegram,
    gradientFrom: '#0088cc', gradientTo: '#005f8e', glowColor: 'rgba(0,136,204,0.35)',
    features: ['Katalog & pemesanan via inline keyboard', 'QRIS otomatis & transfer manual', 'Kirim produk digital otomatis', 'Panel admin via command Telegram', 'Broadcast & laporan penjualan'],
    links: [
      { label: 'Dokumentasi', shortLabel: 'Docs', url: 'https://github.com/Dropking1122/FEATURES/blob/main/05-TELEBOT-ORDER/FEATURES.md', icon: FaBook, primary: true },
      { label: 'Overview', shortLabel: 'GitHub', url: 'https://github.com/Dropking1122/FEATURES/blob/main/05-TELEBOT-ORDER/FEATURES.md', icon: FaGithub },
    ],
  },
  {
    title: 'Telebotaku', subtitle: 'Bot Telegram Manajemen Router OpenWRT',
    description: 'Bot Telegram modular yang berjalan langsung di router OpenWRT - monitoring CPU/RAM/suhu, kontrol WiFi, block device, speed test, dan backup konfigurasi via chat.',
    tag: 'Python · OpenWRT · Shell', Icon: FaWifi,
    gradientFrom: '#f59e0b', gradientTo: '#b45309', glowColor: 'rgba(245,158,11,0.35)',
    features: ['Monitoring CPU, RAM, suhu & uptime', 'Kontrol WiFi on/off & ganti password', 'Block/unblock perangkat via MAC', 'Alert otomatis device baru masuk', 'Plugin modular - mudah dikembangkan'],
    links: [
      { label: 'Dokumentasi', shortLabel: 'Docs', url: 'https://github.com/Dropking1122/FEATURES/blob/main/06-TELEBOTAKU/FEATURES.md', icon: FaBook, primary: true },
      { label: 'GitHub', shortLabel: 'GitHub', url: 'https://github.com/Dropking1122/telebotaku', icon: FaGithub },
    ],
  },
  {
    title: 'Free Product Digital', subtitle: 'Produk Digital Gratis dari REVD Store',
    description: 'Kumpulan produk digital gratis yang bisa langsung digunakan - tools, template, dan resources berkualitas dari REVD Store.',
    tag: 'Gratis · Digital', Icon: FaGift,
    gradientFrom: '#10b981', gradientTo: '#059669', glowColor: 'rgba(16,185,129,0.35)',
    features: ['Produk digital gratis pilihan', 'Tools & template siap pakai', 'Resources berkualitas', 'Update produk secara berkala', 'Tanpa biaya, langsung download'],
    links: [
      { label: 'Kunjungi Sekarang', shortLabel: 'Kunjungi', url: 'https://revdstore.web.id', icon: FaGlobe, primary: true },
    ],
  },
];

const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const animated   = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const headerItems = headerRef.current?.querySelectorAll<HTMLElement>('[data-header]');
    const cards       = gridRef.current?.querySelectorAll<HTMLElement>('.proj-card');
    headerItems?.forEach((el) => { el.style.opacity = '0'; el.style.transform = 'translateY(22px)'; });
    cards?.forEach((el) => { el.style.opacity = '0'; el.style.transform = 'translateY(48px) scale(0.95)'; });

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;

        if (headerItems?.length) {
          animate(Array.from(headerItems), {
            opacity: [0, 1], translateY: [22, 0],
            duration: 650, delay: stagger(80), ease: 'outCubic',
          });
        }

        if (cards?.length) {
          animate(Array.from(cards), {
            opacity: [0, 1], translateY: [48, 0], scale: [0.95, 1],
            duration: 680, delay: stagger(65, { start: 200 }), ease: 'outBack(1.2)',
          });
        }
      }
    }, { threshold: 0.06 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  /* Desktop: 3D tilt. Mobile: skip (tilt is weird on touch) */
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>, project: Project) => {
    if (isTouchDevice) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    el.style.transition  = 'transform 0.1s ease, box-shadow 0.15s ease';
    el.style.transform   = `perspective(700px) rotateX(${-y * 9}deg) rotateY(${x * 11}deg) translateZ(8px)`;
    el.style.boxShadow   = `${x * 22}px ${y * 22 + 8}px 55px ${project.glowColor}`;
  };

  const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const el = e.currentTarget;
    el.style.transition  = 'transform 0.65s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease';
    el.style.transform   = '';
    el.style.boxShadow   = '';
  };

  /* Mobile: scale + glow on touch */
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, project: Project) => {
    const el = e.currentTarget;
    animate(el, {
      scale: [1, 0.97],
      duration: 180,
      ease: 'outCubic',
    });
    el.style.boxShadow = `0 8px 36px ${project.glowColor}`;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    animate(el, {
      scale: [0.97, 1.03, 1],
      duration: 400,
      ease: 'outElastic(1, 0.6)',
    });
    el.style.boxShadow = '';
  };

  return (
    <section ref={sectionRef} id="projects" className="py-14 sm:py-24 px-3 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-16">
          <div
            data-header
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/8 text-blue-400 text-[11px] sm:text-sm font-bold tracking-widest mb-5 uppercase"
          >
            <FaLayerGroup size={10} /> Portfolio &amp; Produk
          </div>
          <h2 data-header className="text-3xl xs:text-4xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-3">
            Dokumentasi <span className="gradient-text">Project</span>
          </h2>
          <p data-header className="text-slate-400 text-xs xs:text-sm sm:text-base max-w-lg mx-auto">
            Lihat fitur lengkap setiap project - tersedia untuk dibeli dan dikustomisasi
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 gap-3 xs:gap-4 sm:gap-5"
        >
          {PROJECTS.map((project, idx) => (
            <div
              key={idx}
              className="proj-card card-shine group glass-card rounded-2xl overflow-hidden border border-white/6 flex flex-col cursor-default tap-active transition-shadow duration-300"
              onMouseMove={(e)  => handleTilt(e, project)}
              onMouseLeave={handleTiltLeave}
              onTouchStart={(e) => handleTouchStart(e, project)}
              onTouchEnd={handleTouchEnd}
            >
              {/* Gradient accent strip */}
              <div
                className="h-[2px] w-full flex-shrink-0"
                style={{ background: `linear-gradient(90deg, ${project.gradientFrom}, ${project.gradientTo}, transparent)` }}
              />

              {/* Glow line — shows on hover */}
              <div
                className="h-px w-full flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${project.gradientFrom}80, transparent)` }}
              />

              {/* Card header */}
              <div className="p-4 xs:p-5 sm:p-6 pb-0">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
                      boxShadow: `0 4px 16px ${project.glowColor}`,
                    }}
                  >
                    <project.Icon size={20} />
                  </div>
                  <span className="text-[9px] xs:text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full bg-white/5 text-slate-300 border border-white/8 max-w-[52%] text-right leading-snug">
                    {project.tag}
                  </span>
                </div>
                <h3 className="text-base xs:text-lg sm:text-xl font-bold text-white mb-0.5 group-hover:text-blue-300 transition-colors duration-300">{project.title}</h3>
                <p className="text-[10px] xs:text-xs sm:text-sm text-slate-500 mb-2.5">{project.subtitle}</p>
              </div>

              {/* Card body */}
              <div className="px-4 xs:px-5 sm:px-6 flex-1 flex flex-col">
                <p className="text-xs xs:text-sm text-slate-400 leading-relaxed mb-3">{project.description}</p>
                <ul className="space-y-1 xs:space-y-1.5 mb-4 flex-1">
                  {project.features.map((feat, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-[11px] xs:text-xs sm:text-sm text-slate-400">
                      <FaCheck size={8} className="text-blue-400 mt-0.5 xs:mt-1 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card footer — grid 2-col agar rapi di mobile */}
              <div
                className="p-3 xs:p-4 sm:p-5 pt-3 border-t border-white/6 grid gap-1.5 sm:gap-2"
                style={{ gridTemplateColumns: project.links.length === 1 ? '1fr' : '1fr 1fr' }}
              >
                {project.links.map((link, li) => (
                  <a
                    key={li}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className={[
                      'ripple-wrap flex items-center justify-center gap-1 sm:gap-1.5 py-2 xs:py-2.5 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95 min-w-0',
                      link.primary
                        ? 'text-white text-[10px] xs:text-[11px] sm:text-xs'
                        : 'bg-white/4 hover:bg-white/8 text-slate-300 border border-white/8 text-[10px] xs:text-[11px] sm:text-xs',
                    ].join(' ')}
                    style={link.primary ? {
                      background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
                      boxShadow:  `0 3px 10px ${project.glowColor}`,
                    } : {}}
                  >
                    <link.icon size={9} className="flex-shrink-0" />
                    {/* Label pendek di mobile, lengkap di sm+ */}
                    <span className="sm:hidden truncate">{link.shortLabel ?? link.label}</span>
                    <span className="hidden sm:inline truncate">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

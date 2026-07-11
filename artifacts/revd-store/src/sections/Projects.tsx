import React from 'react';
import { motion } from 'framer-motion';
import {
  FaCashRegister, FaWhatsapp, FaQrcode, FaGraduationCap,
  FaTelegram, FaWifi, FaGift, FaGithub, FaGlobe,
  FaBook, FaCheck, FaLayerGroup, FaEnvelope, FaArrowRight
} from 'react-icons/fa';
import SpotlightCard from '@/components/SpotlightCard';

const PROJECTS = [
  {
    title: 'POS Supplier REVD', subtitle: 'Point of Sale System',
    description: 'Aplikasi POS lengkap dengan manajemen stok, transaksi, hutang pelanggan, dan laporan keuangan.',
    tag: 'Laravel · MySQL', Icon: FaCashRegister,
    color: '#0047FF',
    features: ['Multi-role: Admin & Kasir', 'Manajemen hutang & cicilan', 'Laporan penjualan PDF/Excel'],
    links: [
      { label: 'Docs', url: 'https://github.com/Dropking1122/FEATURES/blob/main/01-POS-SUPPLIER-REVD/FEATURES.md', icon: FaBook },
      { label: 'GitHub', url: 'https://github.com/Dropking1122/FEATURES/blob/main/01-POS-SUPPLIER-REVD/FEATURES.md', icon: FaGithub },
    ],
  },
  {
    title: 'REVDWABOT', subtitle: 'WhatsApp Bot Auto-Seller',
    description: 'Bot WhatsApp siap pakai untuk jualan produk digital otomatis 24 jam non-stop dengan QRIS.',
    tag: 'Node.js · React', Icon: FaWhatsapp,
    color: '#00F0FF',
    features: ['Katalog & pesanan otomatis', 'QRIS & Saldo terintegrasi', 'Dashboard real-time'],
    links: [
      { label: 'Docs', url: 'https://github.com/Dropking1122/FEATURES/blob/main/02-REVDWABOT/FEATURES.md', icon: FaBook },
      { label: 'GitHub', url: 'https://github.com/Dropking1122/FEATURES/blob/main/02-REVDWABOT/FEATURES.md', icon: FaGithub },
    ],
  },
  {
    title: 'AbsensiQR REVD', subtitle: 'QR Code Attendance',
    description: 'Aplikasi absensi modern untuk sekolah - setiap siswa punya QR Code unik, pencatatan real-time.',
    tag: 'Laravel · MySQL', Icon: FaQrcode,
    color: '#8A2BE2',
    features: ['Scan via kamera perangkat', 'Dashboard guru & admin', 'Laporan export otomatis'],
    links: [
      { label: 'Docs', url: 'https://github.com/Dropking1122/FEATURES/blob/main/03-ABSENSIQR-REVD/FEATURES.md', icon: FaBook },
      { label: 'GitHub', url: 'https://github.com/Dropking1122/FEATURES/blob/main/03-ABSENSIQR-REVD/FEATURES.md', icon: FaGithub },
    ],
  },
  {
    title: 'Telebot Order', subtitle: 'Telegram Auto-Checkout',
    description: 'Bot Telegram siap pakai untuk jualan produk digital - pelanggan pesan, bayar, produk langsung dikirim.',
    tag: 'Node.js', Icon: FaTelegram,
    color: '#0047FF',
    features: ['Inline keyboard catalog', 'Auto kirim produk digital', 'Panel admin via chat'],
    links: [
      { label: 'Docs', url: 'https://github.com/Dropking1122/FEATURES/blob/main/05-TELEBOT-ORDER/FEATURES.md', icon: FaBook },
      { label: 'GitHub', url: 'https://github.com/Dropking1122/FEATURES/blob/main/05-TELEBOT-ORDER/FEATURES.md', icon: FaGithub },
    ],
  },
  {
    title: 'Telebotaku', subtitle: 'OpenWRT Router Manager',
    description: 'Bot Telegram modular di router OpenWRT - monitoring CPU/RAM, kontrol WiFi, block device.',
    tag: 'Python · Shell', Icon: FaWifi,
    color: '#FF0055',
    features: ['Monitoring performa', 'Block perangkat via MAC', 'Alert device baru'],
    links: [
      { label: 'Docs', url: 'https://github.com/Dropking1122/FEATURES/blob/main/06-TELEBOTAKU/FEATURES.md', icon: FaBook },
      { label: 'GitHub', url: 'https://github.com/Dropking1122/telebotaku', icon: FaGithub },
    ],
  },
  {
    title: 'Free Digital Assets', subtitle: 'Resources dari REVD',
    description: 'Kumpulan produk digital gratis yang bisa langsung digunakan - tools, template, dan resources.',
    tag: 'Gratis', Icon: FaGift,
    color: '#00F0FF',
    features: ['Template siap pakai', 'Update berkala', 'Langsung download'],
    links: [
      { label: 'Kunjungi', url: 'https://revdstore.web.id', icon: FaGlobe },
    ],
  },
  {
    title: 'REVDMAIL', subtitle: 'Temp Mail & Gmail Generator',
    description: 'Layanan email sementara (tempmail) dan generator Gmail instan untuk kebutuhan verifikasi cepat dan privasi online.',
    tag: 'Web App', Icon: FaEnvelope,
    color: '#8A2BE2',
    features: ['Tempmail sekali pakai', 'Gmail generator instan', 'Tanpa perlu daftar'],
    links: [
      { label: 'Kunjungi', url: 'https://mail.revdstore.app', icon: FaGlobe },
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest mb-6 uppercase shadow-[0_0_15px_rgba(0,71,255,0.15)]">
              <FaLayerGroup size={12} /> Featured Work
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-white mb-6">
              Project <span className="gradient-text-primary">Showcase</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Dokumentasi lengkap sistem, aplikasi, dan bot yang telah dibangun dengan standar produksi.
            </p>
          </div>
          
          <a href="https://github.com/Dropking1122" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-white transition-colors group py-2">
            View All on GitHub <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <SpotlightCard className="h-full flex flex-col p-6 sm:p-8 rounded-[2rem] border border-white/5 bg-[#0A0F1E]/80 backdrop-blur-xl hover:border-white/10 transition-colors group">
                
                <div className="flex items-start justify-between mb-8">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                    style={{ 
                      background: `linear-gradient(135deg, ${project.color}30, transparent)`,
                      border: `1px solid ${project.color}50`,
                      color: project.color,
                      boxShadow: `0 0 20px ${project.color}20`
                    }}
                  >
                    <project.Icon size={28} />
                  </div>
                  <span className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-white/5 text-slate-300 border border-white/10 uppercase tracking-wider">
                    {project.tag}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">{project.subtitle}</p>
                  
                  <p className="text-sm text-slate-400 leading-relaxed mb-8">
                    {project.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {project.features.map((feat, fi) => (
                      <li key={fi} className="flex items-start gap-3 text-sm text-slate-300">
                        <div className="mt-1 w-3 h-3 rounded-full flex items-center justify-center shrink-0" style={{ background: `${project.color}20` }}>
                          <FaCheck size={6} style={{ color: project.color }} />
                        </div>
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3 pt-6 border-t border-white/10">
                  {project.links.map((link, li) => (
                    <a
                      key={li}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-white text-xs font-bold transition-all hover:shadow-lg"
                    >
                      <link.icon size={14} className="text-slate-400 group-hover/link:text-white" />
                      {link.label}
                    </a>
                  ))}
                </div>

              </SpotlightCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

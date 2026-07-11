import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaWhatsapp, FaTelegram, FaPaperPlane, FaArrowRight } from 'react-icons/fa';
import SpotlightCard from '@/components/SpotlightCard';

const CONTACTS = [
  {
    name: 'Instagram', handle: '@revd.cloud',
    Icon: FaInstagram, url: 'https://instagram.com/revd.cloud',
    color: '#FF0055', desc: 'DM untuk kolaborasi',
  },
  {
    name: 'WhatsApp', handle: 'REVDSTORE',
    Icon: FaWhatsapp, url: 'https://wa.me/6288214672165',
    color: '#00F0FF', desc: 'Fast response',
  },
  {
    name: 'Telegram', handle: '@ValltzID',
    Icon: FaTelegram, url: 'https://t.me/ValltzID',
    color: '#0047FF', desc: 'Diskusi teknis',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 relative z-10 mb-20">
      <div className="max-w-5xl mx-auto text-center">

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-widest mb-6 uppercase shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <FaPaperPlane size={12} /> Connect
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-white mb-6">
            Let's build <span className="gradient-text-primary">something.</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Tertarik untuk kolaborasi atau order produk? Pilih platform favoritmu di bawah ini untuk terhubung langsung.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {CONTACTS.map((contact, idx) => (
            <motion.a
              key={idx}
              href={contact.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="block group"
            >
              <SpotlightCard className="p-6 rounded-[2rem] border border-white/5 bg-[#0A0F1E]/80 backdrop-blur-xl flex flex-col items-center text-center hover:bg-[#0A0F1E] hover:border-white/10 transition-all">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110 mb-6 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${contact.color}20, transparent)`,
                    border: `1px solid ${contact.color}40`,
                    color: contact.color,
                    boxShadow: `0 8px 32px ${contact.color}20`
                  }}
                >
                  <contact.Icon size={28} />
                </div>

                <div className="flex-1 min-w-0 mb-6">
                  <p className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase leading-none mb-2">{contact.name}</p>
                  <p className="font-bold text-white text-xl truncate mb-1 group-hover:text-cyan-400 transition-colors">{contact.handle}</p>
                  <p className="text-sm text-slate-400 truncate">{contact.desc}</p>
                </div>

                <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/50 shrink-0 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 shadow-lg">
                  <FaArrowRight size={14} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </SpotlightCard>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaWhatsapp, FaTelegram, FaPaperPlane, FaArrowRight } from 'react-icons/fa';
import SpotlightCard from '@/components/SpotlightCard';
import GradientText from '@/components/GradientText';

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
          <div className="mb-6">
            <GradientText colors={["#00F0FF", "#0047FF", "#00F0FF"]} animationSpeed={4} showBorder={true} className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(0,240,255,0.15)] bg-cyan-500/10">
              <span className="flex items-center gap-2"><FaPaperPlane size={12} /> Connect</span>
            </GradientText>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-white mb-6">
            Let's build <span className="gradient-text-primary">something.</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Tertarik untuk kolaborasi atau order produk? Pilih platform favoritmu di bawah ini untuk terhubung langsung.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 max-w-4xl mx-auto">
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
              <SpotlightCard className="p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] border border-white/5 bg-[#0A0F1E]/80 backdrop-blur-xl flex flex-row sm:flex-col items-center text-left sm:text-center gap-3 sm:gap-0 hover:bg-[#0A0F1E] hover:border-white/10 transition-all">
                <div
                  className="w-11 h-11 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110 sm:mb-6 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${contact.color}20, transparent)`,
                    border: `1px solid ${contact.color}40`,
                    color: contact.color,
                    boxShadow: `0 8px 32px ${contact.color}20`
                  }}
                >
                  <contact.Icon className="text-lg sm:text-2xl" />
                </div>

                <div className="flex-1 min-w-0 sm:mb-6">
                  <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase leading-none mb-1 sm:mb-2">{contact.name}</p>
                  <p className="font-bold text-white text-sm sm:text-xl truncate mb-0.5 sm:mb-1 group-hover:text-cyan-400 transition-colors">{contact.handle}</p>
                  <p className="text-xs sm:text-sm text-slate-400 truncate">{contact.desc}</p>
                </div>

                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/50 shrink-0 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 shadow-lg">
                  <FaArrowRight className="text-xs sm:text-sm -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </SpotlightCard>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}

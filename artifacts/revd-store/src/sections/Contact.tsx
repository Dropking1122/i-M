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
    Icon: FaWhatsapp, url: 'https://wa.me/6288214672165/',
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
    <section id="contact" className="py-20 px-4 sm:px-6 relative z-10 mb-20">
      <div className="max-w-4xl mx-auto text-center">

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-widest mb-6 uppercase">
            <FaPaperPlane size={12} /> Connect
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-4">
            Let's build <span className="gradient-text-primary">something.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
            Tertarik untuk kolaborasi atau order produk? Pilih platform favoritmu di bawah ini.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-md sm:max-w-2xl mx-auto">
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
              <SpotlightCard className="p-3.5 sm:p-4 rounded-xl border border-white/5 bg-[#0A0F1E]/80 backdrop-blur-xl flex sm:flex-col items-center gap-3 sm:gap-2 text-left sm:text-center">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${contact.color}20, transparent)`,
                    border: `1px solid ${contact.color}40`,
                    color: contact.color
                  }}
                >
                  <contact.Icon size={15} />
                </div>

                <div className="flex-1 sm:flex-none min-w-0">
                  <p className="text-[9px] font-bold text-slate-500 tracking-widest uppercase leading-none">{contact.name}</p>
                  <p className="font-bold text-white text-sm truncate">{contact.handle}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">{contact.desc}</p>
                </div>

                <div className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center text-white/50 shrink-0 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                  <FaArrowRight size={8} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </SpotlightCard>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}

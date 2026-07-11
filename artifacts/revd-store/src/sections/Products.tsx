import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaPaintBrush, FaTv, FaFilm, FaShieldAlt, FaPlay, FaWhatsapp, FaGem, FaArrowRight } from 'react-icons/fa';
import SpotlightCard from '@/components/SpotlightCard';
import MagneticButton from '@/components/MagneticButton';
import GradientText from '@/components/GradientText';

const PRODUCTS = [
  { name: 'CapCut Pro Private',  desc: 'Premium video editing',      Icon: FaVideo,     color: '#FF0055', badge: 'HOT',  img: '/products/capcut.png'       },
  { name: 'Canva Pro',           desc: 'Design professional',        Icon: FaPaintBrush,color: '#00F0FF', badge: 'BEST', img: '/products/canva.png'        },
  { name: 'VIU Private',         desc: 'Premium streaming',          Icon: FaTv,        color: '#0047FF',                img: '/products/viu.png'          },
  { name: 'Alight Motion',       desc: 'Motion graphics editor',     Icon: FaFilm,      color: '#8A2BE2', badge: 'NEW',  img: '/products/alightmotion.png' },
  { name: 'VPN Tunneling',       desc: 'Secure & fast connection',   Icon: FaShieldAlt, color: '#00F0FF',                img: '/products/vpn.jpg'          },
  { name: 'Vidio Private',       desc: 'Premium streaming access',   Icon: FaPlay,      color: '#FF0055', badge: 'HOT',  img: '/products/vidio.png'        },
];

function ProductIcon({ product }: { product: typeof PRODUCTS[number] }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (product.img && !imgFailed) {
    return (
      <div
        className="relative w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110 bg-white/10 overflow-hidden backdrop-blur-md border border-white/20"
        style={{ boxShadow: `0 8px 32px ${product.color}30` }}
      >
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-contain p-2"
          onError={() => setImgFailed(true)}
        />
        {product.badge && (
          <span
            className="absolute -top-1 -right-1 text-[9px] font-black px-2 py-0.5 rounded-bl-xl text-white shadow-lg z-10"
            style={{ background: product.color, boxShadow: `0 2px 10px ${product.color}` }}
          >
            {product.badge}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className="relative w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110"
      style={{
        background: `linear-gradient(135deg, ${product.color}20, transparent)`,
        border: `1px solid ${product.color}40`,
        color: product.color,
        boxShadow: `0 8px 32px ${product.color}20`
      }}
    >
      <product.Icon size={28} />
      {product.badge && (
        <span
          className="absolute -top-1 -right-1 text-[9px] font-black px-2 py-0.5 rounded-bl-xl text-white shadow-lg z-10"
          style={{ background: product.color, boxShadow: `0 2px 10px ${product.color}` }}
        >
          {product.badge}
        </span>
      )}
    </div>
  );
}

export default function Products() {
  return (
    <section id="products" className="py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="mb-6">
              <GradientText colors={["#8A2BE2", "#FF0055", "#8A2BE2"]} animationSpeed={4} showBorder={true} className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(138,43,226,0.15)] bg-purple-500/10">
                <span className="flex items-center gap-2"><FaGem size={12} /> Premium Subscriptions</span>
              </GradientText>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-white mb-6">
              Produk <span className="gradient-text-purple">Digital</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Akses premium ke aplikasi terbaik untuk kreator, profesional, dan hiburan tanpa batas dengan harga terjangkau.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <MagneticButton 
              as="a" 
              href="https://wa.me/6288214672165" 
              target="_blank"
              className="px-8 py-4 text-sm font-bold shadow-[0_0_20px_rgba(138,43,226,0.2)]"
              primary
            >
              Order Sekarang <FaArrowRight size={14} className="ml-2" />
            </MagneticButton>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {PRODUCTS.map((product, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <SpotlightCard
                as="button"
                className="group w-full p-5 sm:p-6 rounded-[1.5rem] border border-white/5 bg-[#0A0F1E]/60 backdrop-blur-xl flex items-center gap-5 cursor-pointer hover:border-white/10 hover:bg-[#0A0F1E]/80 transition-all text-left"
                onClick={() => window.open('https://wa.me/6288214672165', '_blank')}
                ariaLabel={`Order ${product.name} via WhatsApp`}
              >
                <ProductIcon product={product} />

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-lg truncate group-hover:text-purple-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1 truncate group-hover:text-slate-300 transition-colors">
                    {product.desc}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 group-hover:bg-purple-500/20 group-hover:text-purple-400 group-hover:border-purple-500/50 shadow-lg">
                  <FaWhatsapp size={18} />
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

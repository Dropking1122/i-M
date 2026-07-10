import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaPaintBrush, FaTv, FaFilm, FaShieldAlt, FaPlay, FaWhatsapp, FaGem, FaArrowRight } from 'react-icons/fa';
import SpotlightCard from '@/components/SpotlightCard';
import MagneticButton from '@/components/MagneticButton';

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
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 bg-white overflow-hidden"
        style={{ boxShadow: `0 4px 16px ${product.color}40` }}
      >
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-contain p-1.5"
          onError={() => setImgFailed(true)}
        />
        {product.badge && (
          <span
            className="absolute -top-2 -right-2 text-[8px] font-black px-2 py-0.5 rounded-full text-white"
            style={{ background: product.color, boxShadow: `0 2px 10px ${product.color}80` }}
          >
            {product.badge}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className="relative w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
      style={{
        background: `linear-gradient(135deg, ${product.color}20, transparent)`,
        border: `1px solid ${product.color}40`,
        color: product.color
      }}
    >
      <product.Icon size={24} />
      {product.badge && (
        <span
          className="absolute -top-2 -right-2 text-[8px] font-black px-2 py-0.5 rounded-full text-white"
          style={{ background: product.color, boxShadow: `0 2px 10px ${product.color}80` }}
        >
          {product.badge}
        </span>
      )}
    </div>
  );
}

export default function Products() {
  return (
    <section id="products" className="py-20 px-4 sm:px-6 relative z-10">
      <div className="max-w-5xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-lg"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400 text-xs font-bold tracking-widest mb-6 uppercase">
              <FaGem size={12} /> Premium Subscriptions
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-4">
              Produk <span className="gradient-text-purple">Digital</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Akses premium ke aplikasi terbaik untuk kreator dan profesional.
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
              href="https://wa.me/6288214672165/" 
              target="_blank"
              className="px-6 py-3 text-sm"
              primary
            >
              Order Sekarang <FaArrowRight size={12} />
            </MagneticButton>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                className="group p-5 rounded-[20px] border border-white/5 bg-[#0A0F1E]/60 backdrop-blur-md flex items-center gap-4 cursor-pointer"
                onClick={() => window.open('https://wa.me/6288214672165/', '_blank')}
                ariaLabel={`Order ${product.name} via WhatsApp`}
              >
                <ProductIcon product={product} />

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-base truncate group-hover:text-cyan-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 truncate">
                    {product.desc}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <FaWhatsapp size={14} />
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

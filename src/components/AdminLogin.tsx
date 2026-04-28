"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SacredUnityCross } from "@/components/CatholicOrnaments";

interface AdminLoginProps {
  onLogin: (password: string) => void;
  error?: string;
}

export default function AdminLogin({ onLogin, error }: AdminLoginProps) {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-cream">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <SacredUnityCross size={40} className="text-gold mb-6 mx-auto" />
          <h1 className="font-serif text- navy text-3xl uppercase tracking-widest mb-2 font-medium">Bảng Quản Trị</h1>
          <p className="font-serif italic text-charcoal opacity-70">Vui lòng nhập mật mã để truy cập danh sách RSVP</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-4 text-[10px] tracking-[0.18em] uppercase text-gold hover:text-[#8a1827] transition-colors font-bold"
          >
            <span aria-hidden="true">←</span>
            Quay lại trang chính
          </Link>
        </div>

        <div className="rsvp-card rounded-sm shadow-2xl p-8 md:p-10 bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="admin-password" 
                className="block text-[10px] text-gold-muted tracking-[0.2em] uppercase mb-3 font-bold"
              >
                Mật mã truy cập
              </label>
              <input 
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="w-full px-4 py-4 text-center text-xl tracking-[0.3em] border-b border-gold-pale focus:border-gold transition-all bg-transparent"
                placeholder="••••••"
              />
              {error && (
                <p className="text-navy text-xs mt-3 italic text-center">{error}</p>
              )}
            </div>

            <button 
              type="submit" 
              className="btn-primary w-full py-4 shadow-lg flex items-center justify-center gap-3"
            >
              <span>ĐĂNG NHẬP</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
              </svg>
            </button>
          </form>
        </div>

        <div className="mt-12 text-center">
            <p className="text-[10px] text-gold-muted tracking-[0.2em] font-bold uppercase opacity-50">Ad Majorem Dei Gloriam</p>
        </div>
      </motion.div>
    </div>
  );
}

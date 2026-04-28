"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { SacredUnityCross } from "@/components/CatholicOrnaments";

interface RSVP {
  id: number;
  name: string;
  guests: number;
  attending: boolean;
  message: string | null;
  created_at: string;
}

export default function AdminDashboard() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Custom delete modal state
  const [deleteCandidate, setDeleteCandidate] = useState<RSVP | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchRSVPs = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!isSupabaseConfigured) {
        throw new Error("Thiếu cấu hình Supabase trên môi trường deploy.");
      }

      const { data, error: fetchError } = await supabase
        .from("rsvp")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setRsvps(data || []);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Không thể tải dữ liệu RSVP.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRSVPs();
  }, []);

  const confirmDelete = async () => {
    if (!deleteCandidate) return;
    setIsDeleting(true);

    try {
      const { error: deleteError } = await supabase
        .from("rsvp")
        .delete()
        .eq("id", deleteCandidate.id);

      if (deleteError) throw deleteError;
      setRsvps(rsvps.filter((item) => item.id !== deleteCandidate.id));
      setDeleteCandidate(null);
    } catch (err: any) {
      alert("Lỗi khi xóa: " + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const exportToCSV = () => {
    const headers = ["Tên", "Trạng thái", "Sổ người", "Lời nhắn", "Ngày gửi"];
    const rows = rsvps.map(r => [
      r.name,
      r.attending ? "Tham dự" : "Vắng mặt",
      r.guests,
      r.message || "",
      new Date(r.created_at).toLocaleString("vi-VN")
    ]);

    const csvContent = [
      "\uFEFF" + headers.join(","), // UTF-8 BOM for Excel
      ...rows.map(e => e.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `danh-sach-rsvp-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRsvps = rsvps.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (r.message?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalAttending = rsvps.filter(r => r.attending).reduce((sum, r) => sum + r.guests, 0);
  const totalDeclined = rsvps.filter(r => !r.attending).length;

  return (
    <div className="min-h-screen bg-cream p-4 md:p-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <SacredUnityCross size={24} className="text-gold mb-4" />
            <h1 className="font-serif text-3xl md:text-4xl text-navy uppercase tracking-widest font-medium">Danh Sách RSVP</h1>
            <p className="font-serif italic text-charcoal opacity-70 mt-2">Quản lý khách mời tham dự lễ cưới</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-4 text-[10px] tracking-[0.18em] uppercase text-gold hover:text-[#8a1827] transition-colors font-bold"
            >
              <span aria-hidden="true">←</span>
              Quay lại trang chính
            </Link>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={exportToCSV}
              className="px-5 py-2.5 rounded-sm shadow-sm flex items-center gap-2 border border-gold text-gold hover:bg-gold hover:text-white transition-all text-xs font-bold tracking-widest uppercase bg-white/50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4M7 10l5 5 5-5M12 15V3" />
              </svg>
              XUẤT FILE CSV
            </button>
            <button 
              onClick={fetchRSVPs}
              className="px-5 py-2.5 rounded-sm shadow-md flex items-center gap-2 border border-navy bg-navy text-white hover:bg-navy-light transition-all text-xs font-bold tracking-widest uppercase"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={loading ? "animate-spin" : ""}>
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
              LÀM MỚI
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="rsvp-card p-6 bg-white border-l-4 border-l-gold">
            <p className="text-[10px] text-gold-muted tracking-widest uppercase font-bold mb-1">Tổng số người tham dự</p>
            <p className="font-serif text-3xl text-navy font-medium">{totalAttending}</p>
          </div>
          <div className="rsvp-card p-6 bg-white border-l-4 border-l-navy/40">
            <p className="text-[10px] text-charcoal-light tracking-widest uppercase font-bold mb-1">Số phản hồi vắng mặt</p>
            <p className="font-serif text-3xl text-charcoal font-medium">{totalDeclined}</p>
          </div>
          <div className="rsvp-card p-6 bg-white border-l-4 border-l-sage">
            <p className="text-[10px] text-sage tracking-widest uppercase font-bold mb-1">Tổng số phản hồi</p>
            <p className="font-serif text-3xl text-navy font-medium">{rsvps.length}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
            <div className="relative max-w-md">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
                <input 
                    type="text" 
                    placeholder="Tìm kiếm tên hoặc lời nhắn..."
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gold-pale/50 focus:border-gold shadow-sm font-serif italic text-sm outline-none transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        {/* Main Table Container */}
        <div className="rsvp-card bg-white p-0 md:p-0 overflow-hidden shadow-xl border border-beige">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left min-w-[800px]">
              <thead>
                <tr className="bg-[#fcf8f2] border-b border-border">
                  <th className="px-6 py-4 text-[11px] tracking-widest uppercase font-bold text-navy">Khách mời</th>
                  <th className="px-6 py-4 text-[11px] tracking-widest uppercase font-bold text-navy text-center">Trạng thái</th>
                  <th className="px-6 py-4 text-[11px] tracking-widest uppercase font-bold text-navy text-center">Số người</th>
                  <th className="px-6 py-4 text-[11px] tracking-widest uppercase font-bold text-navy">Lời nhắn</th>
                  <th className="px-6 py-4 text-[11px] tracking-widest uppercase font-bold text-navy">Ngày gửi</th>
                  <th className="px-6 py-4 text-[11px] tracking-widest uppercase font-bold text-navy text-right">Tác vụ</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredRsvps.length > 0 ? (
                    filteredRsvps.map((r, index) => (
                      <motion.tr 
                        key={r.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.3) }}
                        className="border-b border-beige-light hover:bg-[#fff9f5] transition-colors group"
                      >
                        <td className="px-6 py-5">
                          <p className="font-serif font-medium text-navy text-base">{r.name}</p>
                        </td>
                        <td className="px-6 py-5 text-center">
                          {r.attending ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-sm text-[10px] font-bold tracking-widest uppercase bg-sage/10 text-sage border border-sage/20">
                              Tham dự
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-sm text-[10px] font-bold tracking-widest uppercase bg-charcoal/5 text-charcoal border border-charcoal/10">
                              Vắng mặt
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-5 text-center font-serif text-lg font-medium text-navy">
                          {r.attending ? r.guests : "-"}
                        </td>
                        <td className="px-6 py-5 max-w-[250px]">
                          <p className="font-serif italic text-sm text-charcoal line-clamp-2" title={r.message || ""}>
                            {r.message || <span className="text-charcoal-light/50 not-italic uppercase text-[10px] tracking-widest">Không có</span>}
                          </p>
                        </td>
                        <td className="px-6 py-5 text-xs text-charcoal font-sans">
                          {new Date(r.created_at).toLocaleString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric"
                          })}
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button 
                            onClick={() => setDeleteCandidate(r)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase text-[#8a1827]/70 hover:text-white hover:bg-[#8a1827] border border-transparent hover:border-[#8a1827] transition-all rounded-sm opacity-50 group-hover:opacity-100"
                            title="Xóa khách này"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
                            </svg>
                            Xóa
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-24 text-center">
                        {loading ? (
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin"></div>
                            <p className="font-serif italic text-charcoal-light uppercase text-[10px] tracking-widest">Đang tải biểu mẫu...</p>
                          </div>
                        ) : error ? (
                          <div className="opacity-80 flex flex-col items-center text-[#8a1827]">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4">
                                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                            </svg>
                            <p className="font-serif text-xl italic mb-2">Lỗi kết nối dữ liệu</p>
                            <p className="font-sans text-xs uppercase tracking-widest opacity-70">Sự cố: {error}</p>
                            <p className="text-sm mt-4 text-charcoal max-w-xs">
                              Kiểm tra biến môi trường `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
                              trong Vercel và policy SELECT của bảng `rsvp` trên Supabase.
                            </p>
                          </div>
                        ) : (
                          <div className="opacity-60 flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-gold-pale flex items-center justify-center mb-4">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold-muted">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"></path>
                                </svg>
                            </div>
                            <p className="font-serif text-xl text-navy italic">Chưa có ai điền thiệp cưới.</p>
                            <p className="font-serif text-sm text-charcoal mt-2">Dữ liệu sẽ hiển thị ở đây khi khách xác nhận.</p>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gold-pale/30 text-center pb-8">
          <p className="text-[10px] text-gold-muted tracking-[0.2em] font-bold uppercase">
             Ad Majorem Dei Gloriam — Quản trị viên
          </p>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteCandidate && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 backdrop-blur-sm p-4"
                onClick={() => !isDeleting && setDeleteCandidate(null)}
            >
                <motion.div 
                    initial={{ scale: 0.95, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 10 }}
                    onClick={e => e.stopPropagation()}
                    className="bg-white p-8 max-w-md w-full rounded-sm shadow-2xl relative"
                >
                    <div className="w-12 h-12 rounded-full bg-[#8a1827]/10 flex items-center justify-center mb-6 text-[#8a1827]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
                        </svg>
                    </div>
                    
                    <h3 className="font-serif text-2xl text-navy mb-2">Xóa phản hồi này?</h3>
                    <p className="text-charcoal font-serif mb-8 leading-relaxed">
                        Bạn có chắc chắn muốn xóa phản hồi tham dự của khách <strong className="text-navy font-bold">"{deleteCandidate.name}"</strong> không? Hành động này sẽ xóa dữ liệu vĩnh viễn khỏi hệ thống.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button 
                            onClick={confirmDelete}
                            disabled={isDeleting}
                            className="flex-1 py-3 px-4 bg-[#8a1827] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#6e151e] transition-colors rounded-sm flex items-center justify-center gap-2"
                        >
                            {isDeleting ? (
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin block"></span>
                            ) : "Có, Xóa Phản Hồi"}
                        </button>
                        <button 
                            onClick={() => setDeleteCandidate(null)}
                            disabled={isDeleting}
                            className="flex-1 py-3 px-4 bg-transparent border border-border text-navy text-xs font-bold tracking-widest uppercase hover:bg-beige-light transition-colors rounded-sm"
                        >
                            Không, Giữ Lại
                        </button>
                    </div>
                    
                    {/* Decorative bracket */}
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/40 m-4"></div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

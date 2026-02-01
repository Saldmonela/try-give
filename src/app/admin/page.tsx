'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  Eye, 
  CheckCircle, 
  Trophy, 
  BarChart3, 
  Users, 
  Clock,
  Sparkles,
  ChevronDown,
  LogOut,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Database,
  Trash2,
  Loader2,
  Settings,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Submission } from '@/types';

// Define locally if not found in types
interface AdminStats {
  total: number;
  pending: number;
  reviewed: number;
  winners: number;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isScoringAI, setIsScoringAI] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [deadlineInput, setDeadlineInput] = useState('');

  // Authentication check
  useEffect(() => {
    const authStatus = localStorage.getItem('admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
    
    if (res.ok) {
      localStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
      fetchData();
      toast.success('Selamat datang kembali, Admin.');
    } else {
      toast.error('Kata sandi salah.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [subsRes, statsRes] = await Promise.all([
        fetch('/api/submissions'),
        fetch('/api/admin/stats')
      ]);
      
      const subsData = await subsRes.json();
      const statsData = await statsRes.json();
      
      setSubmissions(subsData.submissions || []);
      setStats(statsData);
    } catch (error) {
      toast.error('Gagal mengambil data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSeedData = async (action: 'seed' | 'clear') => {
      setIsSeeding(true);
      try {
          const res = await fetch('/api/admin/seed', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ action }),
          });
          const data = await res.json();
          
          if (res.ok) {
              toast.success(data.message);
              fetchData();
          } else {
              toast.error(data.error || 'Operasi gagal');
          }
      } catch (error) {
          toast.error('Terjadi kesalahan koneksi');
      } finally {
          setIsSeeding(false);
      }
  };


  // Fetch Settings on Load
  useEffect(() => {
    if (isAuthenticated) {
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                if (data.giveaway_end_date) {
                    // Format YYYY-MM-DD for input date
                    setDeadlineInput(data.giveaway_end_date.split('T')[0]);
                }
            })
            .catch(err => console.error(err));
    }
  }, [isAuthenticated]);

  const handleSaveSettings = async () => {
    try {
        if (!deadlineInput) return;
        // Logic baru: Kita anggap tanggal yang dipilih admin adalah tanggal WIB.
        // Kita mau save sebagai: "YYYY-MM-DDT23:59:59+07:00"
        // Database Supabase (postgres) akan simpan ini sebagai Absolute UTC Timestamp correct point in time.
        // Contoh: Admin pilih 28 Feb. String: "2026-02-28T23:59:59+07:00"
        // Ini akan dikirim ke API. API save ke DB.
        
        const wibIsoString = `${deadlineInput}T23:59:59+07:00`;
        
        const res = await fetch('/api/settings', {
            method: 'POST',
            body: JSON.stringify({ giveaway_end_date: wibIsoString })
        });
        
        if (res.ok) {
            toast.success("Deadline giveaway berhasil diupdate!");
            setShowSettings(false);
        } else {
            toast.error("Gagal menyimpan setting.");
        }
    } catch (error) {
        toast.error("Terjadi kesalahan.");
    }
  };

  const handleAiScore = async (id: string) => {
    setIsScoringAI(true);
    try {
      const res = await fetch(`/api/admin/score?id=${id}`);
      const data = await res.json();

      if (res.ok) {
        toast.success(`Analisis Selesai: Score ${data.data.score}`);
        
        // Update local state instantly + STATUS REVIEWED
        if (selectedSubmission && selectedSubmission.id === id) {
            setSelectedSubmission({
                ...selectedSubmission,
                ai_score: data.data.score,
                ai_reasoning: data.data.reasoning,
                status: 'reviewed'
            });
        }

        // Update list state
        setSubmissions(prev => prev.map(sub => 
            sub.id === id 
            ? { ...sub, ai_score: data.data.score, ai_reasoning: data.data.reasoning, status: 'reviewed' }
            : sub
        ));
      } else {
        toast.error(data.error || 'Gagal menjalankan AI Scoring.');
      }
    } catch (error) {
      toast.error('Gagal menjalankan AI Scoring.');
    } finally {
      setIsScoringAI(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/submissions/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        toast.success(`Status diperbarui ke ${status}`);
        fetchData();
        if (selectedSubmission?.id === id) {
           setIsDetailModalOpen(false);
        }
      }
    } catch (error) {
      toast.error('Gagal memperbarui status.');
    }
  };

  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = sub.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          sub.gmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full p-12 bg-white rounded-[2rem] border border-primary/5 shadow-2xl space-y-8"
        >
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/10">
              <span className="text-white font-serif text-3xl">G</span>
            </div>
            <h1 className="font-serif text-4xl text-primary">Terminal Admin.</h1>
            <p className="text-primary/40 font-medium tracking-wide uppercase text-xs">Otentikasi Diperlukan</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Kata Sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 bg-secondary/20 border-transparent focus:border-primary/20 focus:bg-white text-lg rounded-xl transition-all"
              />
            </div>
            <Button type="submit" className="w-full h-14 rounded-xl text-lg font-medium bg-primary text-primary-foreground hover:scale-[1.02] transition-all">
              Masuk ke Dashboard
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/10 dark:bg-slate-950 flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-primary/5 dark:border-white/10 px-4 md:px-8 py-4 md:py-0 md:h-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sticky top-0 z-40">
        <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3 md:gap-4">
             <div className="w-8 h-8 bg-primary rounded bg-primary flex items-center justify-center shrink-0">
               <span className="text-white dark:text-primary-foreground font-bold text-xs uppercase">G</span>
             </div>
             <div>
                <h1 className="font-bold tracking-tight text-primary text-sm md:text-base">Console Admin</h1>
             </div>
             <div className="hidden md:block h-4 w-[1px] bg-primary/10 ml-2" />
             <p className="hidden md:block text-xs font-bold text-primary/30 uppercase tracking-[0.2em] ml-2">Overview</p>
          </div>
          
          {/* Mobile Menu Toggle could go here, but for now we settle with compact icons */}
        </div>
        
        <div className="flex items-center justify-end gap-2 md:gap-6 w-full md:w-auto">
           <ThemeToggle />
           <Link href="/" target="_blank" className="p-2 md:p-0 text-primary/40 hover:text-primary transition-colors" title="Lihat Website">
              <ExternalLink className="w-5 h-5" />
           </Link>
           <button onClick={() => setShowSettings(true)} className="p-2 md:p-0 text-primary/40 hover:text-primary transition-colors" title="Settings">
              <Settings className="w-5 h-5" />
           </button>
           <button onClick={fetchData} className="p-2 md:p-0 text-primary/40 hover:text-primary transition-colors" title="Refresh Data">
              <TrendingUp className="w-5 h-5" />
           </button>
           <div className="h-4 w-[1px] bg-primary/10 hidden md:block" />
           <Button variant="ghost" size="sm" className="rounded-full text-primary/60 hover:text-primary pl-2 md:pl-4" onClick={handleLogout}>
             <span className="hidden md:inline">Keluar</span> <LogOut className="ml-0 md:ml-2 w-4 h-4" />
           </Button>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: 'Total Pendaftaran', value: stats?.total || 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
            { label: 'Belum Direview', value: stats?.pending || 0, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
            { label: 'Sudah Review', value: stats?.reviewed || 0, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
            { label: 'Pemenang', value: stats?.winners || 0, icon: Trophy, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
          ].map((item, i) => (
            <motion.div 
               key={i}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.05 }}
               className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-primary/5 dark:border-white/10 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                 <div className={`p-2 rounded-lg ${item.bg}`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                 </div>
                 <span className="text-xs font-bold text-primary/20">Live</span>
              </div>
              <div>
                <p className="text-sm font-medium text-primary/40 uppercase tracking-wider">{item.label}</p>
                <p className="text-4xl font-serif text-primary">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Table Area */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-primary/5 dark:border-white/10 shadow-xl shadow-primary/5 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-primary/5 dark:border-white/10 space-y-6 md:space-y-0 md:flex md:justify-between md:items-center">
             <div className="space-y-1">
                <h2 className="font-serif text-2xl text-primary font-medium tracking-tight">Database Entri</h2>
                <p className="text-sm text-primary/30">Daftar semua pendaftar giveaway aktif.</p>
             </div>
             
             <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30" />
                   <Input 
                      placeholder="Cari nama atau email..." 
                      className="pl-10 h-11 bg-secondary/10 dark:bg-slate-800 border-transparent rounded-full text-sm w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                   />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 md:flex-none h-11 px-4 rounded-full border-primary/5 text-primary/60">
                       <Filter className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" className="flex-1 md:flex-none h-11 px-4 rounded-full border-primary/5 text-primary/60">
                       <Download className="w-4 h-4" />
                    </Button>
                </div>
             </div>
          </div>
          
          {/* Dev Tools */}
          <div className="px-6 md:px-8 py-4 bg-slate-50/50 dark:bg-slate-900/50 flex gap-2 flex-wrap border-b border-primary/5 dark:border-white/10">
            <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleSeedData('seed')} 
                disabled={isSeeding}
                className="h-8 text-xs border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
            >
                {isSeeding ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Database className="w-3 h-3 mr-1" />}
                Seed Dummy
            </Button>
            <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleSeedData('clear')} 
                disabled={isSeeding}
                className="h-8 text-xs border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
            >
                {isSeeding ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Trash2 className="w-3 h-3 mr-1" />}
                Clear All
            </Button>
          </div>

          <div className="overflow-x-auto w-full">
            <Table className="min-w-[800px] w-full">
              <TableHeader className="bg-secondary/5 dark:bg-slate-800/50">
                <TableRow className="border-primary/5 dark:border-white/10 hover:bg-transparent">
                  <TableHead className="py-6 font-bold uppercase tracking-widest text-[10px] text-primary/40 pl-6 md:pl-8 w-[40%] md:w-[30%]">Pendaftar</TableHead>
                  <TableHead className="font-bold uppercase tracking-widest text-[10px] text-primary/40 w-[15%]">Status</TableHead>
                  <TableHead className="font-bold uppercase tracking-widest text-[10px] text-primary/40 w-[20%]">Skor AI</TableHead>
                  <TableHead className="font-bold uppercase tracking-widest text-[10px] text-primary/40 w-[15%]">Tanggal</TableHead>
                  <TableHead className="text-right pr-6 md:pr-8 font-bold uppercase tracking-widest text-[10px] text-primary/40 w-[10%] md:w-[20%]">Tindakan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                {filteredSubmissions.length > 0 ? (
                  filteredSubmissions.map((sub, i) => (
                    <TableRow key={sub.id} className="border-primary/5 dark:border-white/10 hover:bg-secondary/5 dark:hover:bg-slate-800/50 transition-colors group">
                      <TableCell className="py-4 md:py-6 pl-6 md:pl-8 min-w-[200px]">
                        <div className="flex items-center gap-3 md:gap-4">
                           <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-primary text-white dark:text-primary-foreground flex items-center justify-center font-serif text-lg md:text-xl shadow-lg shadow-primary/10 shrink-0">
                              {sub.full_name.charAt(0)}
                           </div>
                           <div className="min-w-0">
                              <p className="font-serif text-base md:text-lg text-primary font-medium leading-tight truncate md:max-w-none">{sub.full_name}</p>
                              <p className="text-[10px] md:text-sm text-primary/40 truncate md:max-w-none">{sub.gmail}</p>
                           </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`rounded-full px-3 md:px-4 py-1 border-transparent text-[10px] md:text-xs font-bold tracking-wider ${
                           sub.status === 'winner' ? 'bg-purple-100 text-purple-700' :
                           sub.status === 'reviewed' ? 'bg-green-100 text-green-700' :
                           'bg-orange-100 text-orange-700'
                        }`}>
                           {sub.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {sub.ai_score !== null ? (
                          <div className="flex items-center gap-2">
                             <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                                <span className="font-bold text-primary text-sm md:text-base">{sub.ai_score}</span>
                             </div>
                             <div className="h-1.5 w-16 bg-primary/5 rounded-full overflow-hidden hidden lg:block">
                                <div className="h-full bg-primary" style={{ width: `${sub.ai_score}%` }} />
                             </div>
                          </div>
                        ) : (
                          <span className="text-[10px] md:text-sm text-primary/20 italic font-medium">Belum dinilai</span>
                        )}
                      </TableCell>
                      <TableCell className="text-[10px] md:text-sm font-medium text-primary/40 whitespace-nowrap">
                        {new Date(sub.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </TableCell>
                      <TableCell className="text-right pr-6 md:pr-8">
                        <Button 
                           variant="ghost" 
                           size="sm" 
                           onClick={() => {
                               setSelectedSubmission(sub);
                               setIsDetailModalOpen(true);
                           }}
                           className="rounded-full text-primary/30 hover:text-primary hover:bg-primary/5 w-10 h-10 md:w-12 md:h-12 p-0"
                        >
                          <Eye className="w-5 h-5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                     <TableCell colSpan={5} className="py-20 text-center text-primary/30 uppercase font-bold tracking-[0.2em] text-xs">Data Tidak Ditemukan</TableCell>
                  </TableRow>
                )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-[95vw] md:!max-w-5xl w-full h-[90vh] md:!h-[85vh] p-0 flex flex-col rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-none bg-white dark:bg-slate-950 shadow-2xl">
          <DialogTitle className="sr-only">Detail Pendaftar</DialogTitle>
          {selectedSubmission && (
            <>
               {/* Fixed Header */}
               <div className="bg-[#FDFBF7] dark:bg-slate-900 px-6 py-6 md:px-10 md:py-8 border-b border-primary/5 dark:border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8 shrink-0">
                  <div className="flex items-center gap-4 md:gap-8 w-full md:w-auto">
                     <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-[#0F172A] flex items-center justify-center text-white text-2xl md:text-3xl font-serif shadow-xl shrink-0">
                        {selectedSubmission.full_name.charAt(0)}
                     </div>
                     <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 md:gap-4">
                           <h2 className="font-serif text-2xl md:text-4xl text-[#1e293b] dark:text-slate-100 leading-tight truncate">{selectedSubmission.full_name}</h2>
                           <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shrink-0">
                              {selectedSubmission.status}
                           </Badge>
                        </div>
                        <p className="text-sm md:text-xl text-[#1e293b]/50 dark:text-slate-400 font-medium truncate">{selectedSubmission.gmail}</p>
                     </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-4 w-full md:w-auto">
                     <div className="flex bg-white p-1 rounded-xl md:rounded-2xl border border-primary/5 shadow-sm">
                        <Button 
                           onClick={() => updateStatus(selectedSubmission.id, 'reviewed')}
                           variant="ghost"
                           className={`h-10 md:h-12 px-4 md:px-6 rounded-lg md:rounded-xl text-xs md:text-sm font-bold uppercase tracking-wide flex-1 ${selectedSubmission.status === 'reviewed' ? 'bg-[#0F172A] text-white hover:bg-[#0F172A]' : 'text-slate-400'}`}
                        >
                           Reviewed
                        </Button>
                        <Button 
                           onClick={() => updateStatus(selectedSubmission.id, 'pending')}
                           variant="ghost"
                           className={`h-10 md:h-12 px-4 md:px-6 rounded-lg md:rounded-xl text-xs md:text-sm font-bold uppercase tracking-wide flex-1 ${selectedSubmission.status === 'pending' ? 'bg-[#0F172A] text-white hover:bg-[#0F172A]' : 'text-slate-400'}`}
                        >
                           Pending
                        </Button>
                     </div>
                     <Button 
                        onClick={() => updateStatus(selectedSubmission.id, 'winner')} 
                        className={`h-12 px-6 rounded-xl text-white text-sm font-bold uppercase tracking-wider transition-all shadow-xl ${
                            selectedSubmission.status === 'winner' 
                            ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-200' 
                            : 'bg-[#0F172A] hover:bg-[#1e293b] shadow-slate-300'
                        }`}
                     >
                        <Trophy className="w-4 h-4 mr-2" />
                        {selectedSubmission.status === 'winner' ? 'Pemenang' : 'Pilih Pemenang'}
                     </Button>
                  </div>
               </div>

               {/* Scrollable Document Area */}
               <div className="flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-12 bg-white dark:bg-slate-950">
                  <div className="max-w-5xl mx-auto space-y-12 md:space-y-16 pb-20">
                    
                    {/* Insights Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        <div className="md:col-span-2 p-6 md:p-10 bg-[#F8FAFC] dark:bg-slate-900 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 dark:border-slate-800 space-y-4 md:space-y-6 relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                              <Sparkles className="w-32 h-32 text-emerald-600" />
                           </div>
                           <div className="space-y-2 relative">
                              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Gemini AI Analysis</p>
                              <p className="text-lg md:text-2xl text-slate-700 dark:text-slate-300 font-serif leading-relaxed italic">
                                 "{selectedSubmission.ai_reasoning || 'Belum ada analisis mendalam. Klik tombol di samping untuk memulai.'}"
                              </p>
                           </div>
                        </div>

                        <div className="p-6 md:p-10 bg-[#0F172A] rounded-[1.5rem] md:rounded-[2rem] text-white flex flex-col justify-center items-center text-center space-y-4 shadow-xl">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Kualitas Aplikasi</p>
                            <div className="space-y-1">
                                <span className="text-6xl md:text-7xl font-serif">{selectedSubmission.ai_score || '--'}</span>
                                <p className="text-sm font-bold text-white/30 uppercase tracking-widest">Score / 100</p>
                            </div>
                            <Button 
                              onClick={() => handleAiScore(selectedSubmission.id)} 
                              disabled={isScoringAI}
                              className="w-full mt-4 h-12 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-widest"
                            >
                               {isScoringAI ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                               {selectedSubmission.ai_score ? 'Analisis Ulang' : 'Jalankan Analisis'}
                            </Button>
                        </div>
                    </div>

                    {/* Answers Section */}
                    <div className="space-y-12 md:space-y-20">
                        {[
                          { l: 'Motivasi', q: 'Kenapa kamu layak mendapatkan Google AI Pro?', a: selectedSubmission.answer_1 },
                          { l: 'Rencana', q: 'Apa yang akan kamu lakukan jika mendapat akses ini?', a: selectedSubmission.answer_2 },
                          { l: 'Dampak Karir', q: 'Bagaimana ini membantu project atau karir kamu?', a: selectedSubmission.answer_3 },
                        ].map((item, i) => (
                          <div key={i} className="space-y-4 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                             <div className="flex items-center gap-4 md:gap-6">
                                <span className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-200 flex items-center justify-center text-xs md:text-sm font-bold text-slate-400">0{i+1}</span>
                                <div className="h-px flex-1 bg-slate-100" />
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-slate-300 shrink-0">{item.l}</span>
                             </div>
                             <div className="space-y-3 md:space-y-6 max-w-4xl">
                                <h3 className="font-serif text-xl md:text-3xl text-[#0F172A] dark:text-white leading-tight">{item.q}</h3>
                                <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed font-light">{item.a}</p>
                             </div>
                          </div>
                        ))}
                    </div>

                    {/* Footer Info */}
                    <div className="pt-12 md:pt-20 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-2 justify-between items-center text-[10px] font-bold uppercase tracking-[0.4em] text-slate-300 dark:text-slate-600 text-center md:text-left">
                        <span>Submitted on {new Date(selectedSubmission.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        <span>Ref ID: {selectedSubmission.id}</span>
                    </div>
                  </div>
               </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-md w-[95vw] rounded-2xl">
            <DialogTitle>Pengaturan Giveaway</DialogTitle>
            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Tanggal Berakhir (Deadline)</label>
                    <Input 
                        type="date" 
                        value={deadlineInput} 
                        onChange={(e) => setDeadlineInput(e.target.value)} 
                    />
                    <p className="text-xs text-gray-500">Timer di halaman depan akan hitung mundur ke tanggal ini (pukul 23:59 WIB).</p>
                </div>
                <Button onClick={handleSaveSettings} className="w-full bg-[#0F172A]">
                    Simpan Perubahan
                </Button>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

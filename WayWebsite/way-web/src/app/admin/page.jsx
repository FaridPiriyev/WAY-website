"use client";
import { useState } from "react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const ADMIN_CREDENTIALS = {
    user: "salam",
    pass: "salam",
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      username === ADMIN_CREDENTIALS.user &&
      password === ADMIN_CREDENTIALS.pass
    ) {
      sessionStorage.setItem("isAdmin", "true");
      window.location.href = "/admin/dashboard";
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16" />

        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-200 rotate-3 hover:rotate-0 transition-transform duration-300">
            <span className="text-white text-3xl font-black italic">W</span>
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">
            Admin Paneli
          </h2>
          <p className="text-slate-500 mt-2 font-medium italic text-sm">
            Zəhmət olmasa məlumatları daxil edin
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">
              İstifadəçi Adı
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 font-bold text-slate-800"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">
              Şifrə
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl outline-none transition-all duration-300 font-bold text-slate-800
                ${error ? "border-red-500 animate-shake" : "border-slate-100 focus:border-blue-500 focus:bg-white"}`}
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs font-black text-center animate-pulse">
              İSTİFADƏÇİ ADI VƏ YA ŞİFRƏ YANLIŞDIR!
            </p>
          )}

          <button
            type="submit"
            className="w-full py-4 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all active:scale-95 shadow-xl shadow-blue-100 uppercase tracking-widest"
          >
            Sistemi Aç
          </button>
        </form>

        <p className="text-center mt-10 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
          World Azerbaijanis Youth &copy; 2026
        </p>
      </div>

      <style jsx>{`
        .animate-shake {
          animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        @keyframes shake {
          10%,
          90% {
            transform: translate3d(-1px, 0, 0);
          }
          20%,
          80% {
            transform: translate3d(2px, 0, 0);
          }
          30%,
          50%,
          70% {
            transform: translate3d(-4px, 0, 0);
          }
          40%,
          60% {
            transform: translate3d(4px, 0, 0);
          }
        }
      `}</style>
    </div>
  );
}

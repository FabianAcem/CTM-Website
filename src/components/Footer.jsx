export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/10 bg-black/20">
      <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-black text-[#FFD700] w-8 h-8 grid place-items-center rounded-lg font-black tracking-wider border border-[#FFD700]/40">
            CTM
          </div>
          <span className="text-white/70 text-sm">
            © {new Date().getFullYear()} Container Transport Mainz
          </span>
        </div>
        <div className="text-white/60 text-xs">
          Industriell-minimalistisch · Mainz, Deutschland
        </div>
      </div>
    </footer>
  );
}

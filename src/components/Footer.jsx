export default function Footer() {
  return (
    <footer className="py-8 glass-weak">
      <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="icon-3d icon-glow w-8 h-8 grid place-items-center rounded-lg font-black tracking-wider hover-lift transform-3d">
            <span className="text-gradient text-sm">CTM</span>
          </div>
          <span className="text-white/70 text-sm">
            © {new Date().getFullYear()} Container Transport Mainz
          </span>
        </div>
        <div className="text-white/60 text-xs">
          <span className="text-gradient">Glasmorphism Design</span> · Mainz, Deutschland
        </div>
      </div>
      
      {/* Subtle gradient background elements */}
      <div className="pointer-events-none absolute bottom-0 left-20 w-32 h-8 bg-yellow-400/5 rounded-full blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 right-20 w-24 h-6 bg-blue-400/5 rounded-full blur-2xl" />
    </footer>
  );
}

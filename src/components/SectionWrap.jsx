export default function SectionWrap({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 ${className}`}>
      {children}
    </div>
  );
}

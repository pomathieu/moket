type LogoProps = {
  size?: number; // taille du logomark en px
  showWordmark?: boolean; // afficher "Astraal"
  className?: string; // ex: "text-primary-300"
};

export default function Logo({ size = 80, showWordmark = true, className = '' }: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {showWordmark && (
        <span className="text-xl font-extrabold font-heading text-primary-foreground">
          <span className="sr-only">astraal</span>
          <span aria-hidden="true">
            <span>Astr</span>
            <span className="inline-block tracking-tight text-primary-foreground">a</span>
            <span className="inline-block text-primary-foreground scale-x-[-1]">a</span>
            <span>l</span>
          </span>
        </span>
      )}
    </div>
  );
}

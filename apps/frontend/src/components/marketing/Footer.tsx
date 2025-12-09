import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contato" className="border-t border-border/60 bg-background/90">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary/80 to-blue-600 flex items-center justify-center text-white font-bold">
            OB
          </div>
          <div>
            <p className="font-semibold text-foreground">{siteConfig.name}</p>
            <p className="text-sm text-muted-foreground">{siteConfig.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <Link href="/auth/login" className="hover:text-foreground transition-colors">
            Login
          </Link>
          <Link href="/dashboard" className="hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <span className="text-muted-foreground/80">© {year} OfficeBrain. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}


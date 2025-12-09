'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

type HeaderProps = {
  onOpenLeadModal: () => void;
};

export function Header({ onOpenLeadModal }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const navigation = [
    { label: 'Início', href: '#inicio' },
    { label: 'Funcionalidades', href: '#funcionalidades' },
    { label: 'IA Jurídica', href: '#ia' },
    { label: 'Planos', href: '#planos' },
  ];

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary/80 to-blue-600 flex items-center justify-center text-white font-bold">
            OB
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm text-muted-foreground">Juris Enterprise</span>
            <span className="font-semibold text-foreground">{siteConfig.name}</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button onClick={onOpenLeadModal}>Testar grátis</Button>
        </div>

        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur">
          <div className="space-y-1 px-4 py-3">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Button variant="outline" asChild>
                <Link href="/auth/login" onClick={() => setOpen(false)}>
                  Login
                </Link>
              </Button>
              <Button onClick={() => { setOpen(false); onOpenLeadModal(); }}>
                Testar grátis
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


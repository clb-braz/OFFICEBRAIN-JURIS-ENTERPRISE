'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenPlanos = () => {
    const event = new CustomEvent('openPlanosModal');
    window.dispatchEvent(event);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">OB</span>
            </div>
            <span className="font-bold text-xl text-foreground">OfficeBrain</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#inicio" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Início
            </Link>
            <Link href="/#funcionalidades" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Funcionalidades
            </Link>
            <Link href="/#beneficios" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Benefícios
            </Link>
            <Link href="/#contato" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Contato
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button onClick={handleOpenPlanos}>
              Conhecer Planos
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:bg-muted"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <Link href="/#inicio" className="block px-4 text-sm font-medium text-muted-foreground hover:text-primary">
              Início
            </Link>
            <Link href="/#funcionalidades" className="block px-4 text-sm font-medium text-muted-foreground hover:text-primary">
              Funcionalidades
            </Link>
            <Link href="/#beneficios" className="block px-4 text-sm font-medium text-muted-foreground hover:text-primary">
              Benefícios
            </Link>
            <Link href="/#contato" className="block px-4 text-sm font-medium text-muted-foreground hover:text-primary">
              Contato
            </Link>
            <div className="px-4 pt-4 space-y-2">
              <div className="flex items-center justify-center pb-2">
                <ThemeToggle />
              </div>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button className="w-full" onClick={handleOpenPlanos}>
                Conhecer Planos
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}


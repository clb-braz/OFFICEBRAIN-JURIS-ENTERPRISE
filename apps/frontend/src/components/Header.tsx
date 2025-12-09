'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
              <span className="text-white font-bold text-lg">OB</span>
            </div>
            <span className="font-bold text-xl text-gray-900">OfficeBrain</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#inicio" className="text-sm font-medium text-gray-700 hover:text-accent transition-colors">
              Início
            </Link>
            <Link href="/#funcionalidades" className="text-sm font-medium text-gray-700 hover:text-accent transition-colors">
              Funcionalidades
            </Link>
            <Link href="/#beneficios" className="text-sm font-medium text-gray-700 hover:text-accent transition-colors">
              Benefícios
            </Link>
            <Link href="/#contato" className="text-sm font-medium text-gray-700 hover:text-accent transition-colors">
              Contato
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/#planos">Conhecer Planos</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-200 mt-2">
            <Link
              href="/#inicio"
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              href="/#funcionalidades"
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Funcionalidades
            </Link>
            <Link
              href="/#beneficios"
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Benefícios
            </Link>
            <Link
              href="/#contato"
              className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contato
            </Link>
            <div className="px-4 pt-2 space-y-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="/#planos" onClick={() => setMobileMenuOpen(false)}>
                  Conhecer Planos
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}


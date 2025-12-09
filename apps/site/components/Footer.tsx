import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">OB</span>
              </div>
              <span className="font-bold text-xl text-foreground">OfficeBrain</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Plataforma jurídica inteligente para escritórios de advocacia modernos.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#inicio" className="text-sm hover:text-foreground transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/#funcionalidades" className="text-sm hover:text-foreground transition-colors">
                  Funcionalidades
                </Link>
              </li>
              <li>
                <Link href="/#beneficios" className="text-sm hover:text-foreground transition-colors">
                  Benefícios
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm hover:text-foreground transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#quem-somos" className="text-sm hover:text-foreground transition-colors">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link href="/#contato" className="text-sm hover:text-foreground transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/#planos" className="text-sm hover:text-foreground transition-colors">
                  Planos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:contato@officebrain.com.br" className="text-sm hover:text-foreground transition-colors">
                  contato@officebrain.com.br
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+5511999999999" className="text-sm hover:text-foreground transition-colors">
                  (11) 99999-9999
                </a>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} OfficeBrain Juris Enterprise. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}


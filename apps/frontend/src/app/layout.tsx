import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'OfficeBrain Juris Enterprise',
  description: 'Sistema Jurídico Empresarial para Escritórios de Advocacia',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className={`${inter.variable} font-sans bg-dark-950 text-dark-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'OfficeBrain Juris Enterprise | Plataforma Jurídica Inteligente',
  description: 'Sistema completo de gestão jurídica com IA, automação processual, financeiro automatizado e CRM jurídico para escritórios de advocacia.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}


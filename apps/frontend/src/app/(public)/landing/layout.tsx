import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `${siteConfig.name} — Plataforma jurídica completa`,
  description: siteConfig.description,
};

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-foreground">
      {children}
    </div>
  );
}


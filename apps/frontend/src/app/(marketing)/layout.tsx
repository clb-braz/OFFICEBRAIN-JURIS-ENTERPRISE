import { Header } from '@/components/Header';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>{children}</main>
    </div>
  );
}


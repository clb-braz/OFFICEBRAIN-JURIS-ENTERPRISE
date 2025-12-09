import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-950">
      <Sidebar />
      <div className="pl-64">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}


'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Scale,
  Clock,
  Calendar,
  FileText,
  DollarSign,
  MessageSquare,
  Brain,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Prazos', href: '/deadlines', icon: Clock },
  { name: 'Agenda', href: '/agenda', icon: Calendar },
  { name: 'Clientes', href: '/clients', icon: Users },
  { name: 'Processos', href: '/processes', icon: Scale },
  { name: 'CRM', href: '/crm', icon: MessageSquare },
  { name: 'Documentos', href: '/documents', icon: FileText },
  { name: 'Financeiro', href: '/finance', icon: DollarSign },
  { name: 'IA', href: '/ai-chat', icon: Brain },
  { name: 'Configurações', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card transition-transform">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-border px-6">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">OB</span>
            </div>
            <span className="font-bold text-foreground">OfficeBrain</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="border-t border-border p-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-sm">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">João Silva</p>
              <p className="text-xs text-muted-foreground truncate">joao@escritorio.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}


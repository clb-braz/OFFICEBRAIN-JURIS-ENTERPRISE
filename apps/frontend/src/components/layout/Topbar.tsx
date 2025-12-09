'use client';

import { Search, Bell, Plus, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-card">
      <div className="flex h-full items-center justify-between px-6">
        {/* Search */}
        <div className="flex flex-1 items-center space-x-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar processos, clientes, documentos..."
              className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Plus className="mr-2 h-4 w-4" />
                Novo
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Novo Cliente</DropdownMenuItem>
              <DropdownMenuItem>Novo Processo</DropdownMenuItem>
              <DropdownMenuItem>Novo Prazo</DropdownMenuItem>
              <DropdownMenuItem>Novo Evento</DropdownMenuItem>
              <DropdownMenuItem>Novo Documento</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}


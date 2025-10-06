import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navbar */}
      <Navbar />
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 p-4 pb-20 md:pb-4 md:ml-64">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

// Erstellt von Hans Hahn - Alle Rechte vorbehalten

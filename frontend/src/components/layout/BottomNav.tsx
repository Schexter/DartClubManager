import { NavLink } from 'react-router-dom';
import { Home, Users, Target, Calendar, BarChart3 } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Mitglieder', href: '/members', icon: Users },
  { name: 'Matches', href: '/matches', icon: Target },
  { name: 'Termine', href: '/events', icon: Calendar },
  { name: 'Stats', href: '/statistics', icon: BarChart3 },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:hidden">
      <div className="flex justify-around">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex flex-col items-center py-3 px-4 text-xs font-medium transition-colors ${
                isActive
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`
            }
          >
            <item.icon className="h-6 w-6 mb-1" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

// Erstellt von Hans Hahn - Alle Rechte vorbehalten

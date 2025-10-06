import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Target, 
  Calendar, 
  CreditCard, 
  BarChart3, 
  Settings,
  UsersRound
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Mitglieder', href: '/members', icon: Users },
  { name: 'Teams', href: '/teams', icon: UsersRound },
  { name: 'Matches', href: '/matches', icon: Target },
  { name: 'Termine', href: '/events', icon: Calendar },
  { name: 'Beiträge', href: '/fees', icon: CreditCard },
  { name: 'Statistiken', href: '/statistics', icon: BarChart3 },
  { name: 'Einstellungen', href: '/settings', icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:w-64 md:top-16">
      <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}

// Erstellt von Hans Hahn - Alle Rechte vorbehalten

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
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/auth/authSlice';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, roles: [] },
  { name: 'Mitglieder', href: '/members', icon: Users, roles: [] },
  { name: 'Teams', href: '/teams', icon: UsersRound, roles: [] },
  { name: 'Matches', href: '/matches', icon: Target, roles: [] },
  { name: 'Termine', href: '/events', icon: Calendar, roles: [] },
  { name: 'Beiträge', href: '/fees', icon: CreditCard, roles: ['admin'] }, // Nur Admin
  { name: 'Statistiken', href: '/statistics', icon: BarChart3, roles: [] },
  { name: 'Einstellungen', href: '/settings', icon: Settings, roles: [] },
];

export function Sidebar() {
  const user = useAppSelector(selectUser);
  const userRole = user?.role || 'player';

  // Filter navigation based on user role
  const filteredNavigation = navigation.filter((item) => {
    // If no roles specified, show to everyone
    if (item.roles.length === 0) return true;
    // Otherwise check if user has required role
    return item.roles.includes(userRole);
  });

  return (
    <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:w-64 md:top-16">
      <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <nav className="flex-1 px-3 py-4 space-y-1">
          {filteredNavigation.map((item) => (
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

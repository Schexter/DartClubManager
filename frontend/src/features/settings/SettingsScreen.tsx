import { AppLayout } from '../../components/layout';
import { Settings } from 'lucide-react';

export function SettingsScreen() {
  return (
    <AppLayout>
      <div className="text-center py-16">
        <div className="bg-white rounded-lg shadow-md p-12 max-w-md mx-auto">
          <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Einstellungen</h2>
          <p className="text-gray-600 mb-6">
            Dieses Feature wird in Kürze verfügbar sein.
          </p>
          <div className="text-sm text-gray-500">
            📋 Geplant für Sprint 6
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// Erstellt von Hans Hahn - Alle Rechte vorbehalten

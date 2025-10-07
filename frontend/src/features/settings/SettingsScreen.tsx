import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../../components/layout';
import { Settings, Trash2 } from 'lucide-react';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../auth/authSlice';
import { selectCurrentOrganization } from '../organization/organizationSlice';
import { organizationService } from '../../lib/api/services';

export function SettingsScreen() {
  const navigate = useNavigate();
  const currentOrg = useAppSelector(selectCurrentOrganization);
  const currentUser = useAppSelector(selectUser);
  const isAdmin = currentUser?.role === 'admin';

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteOrganization = async () => {
    if (!currentOrg?.id) return;

    setIsDeleting(true);
    setError(null);

    try {
      await organizationService.delete(currentOrg.id);
      // Nach erfolgreichem Löschen zur Login-Seite
      window.location.href = '/login';
    } catch (err: any) {
      setError(err.response?.data?.message || 'Fehler beim Löschen der Organisation');
      setIsDeleting(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Einstellungen</h1>

        {/* Organisation Info */}
        {currentOrg && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Organisation</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="text-base font-medium text-gray-900">{currentOrg.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Slug</p>
                <p className="text-base font-mono text-gray-900">{currentOrg.slug}</p>
              </div>
            </div>
          </div>
        )}

        {/* Danger Zone - Nur für ADMIN */}
        {isAdmin && (
          <div className="bg-white rounded-lg shadow-md border-2 border-red-200 overflow-hidden">
            <div className="bg-red-50 px-6 py-4 border-b border-red-200">
              <h2 className="text-xl font-semibold text-red-900">⚠️ Gefahrenzone</h2>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Organisation löschen
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Löscht dauerhaft diese Organisation und alle zugehörigen Daten
                    (Mitglieder, Teams, Matches, etc.). Diese Aktion kann nicht rückgängig gemacht werden.
                  </p>
                </div>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <Trash2 size={16} />
                  Organisation löschen
                </button>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Organisation wirklich löschen?
              </h3>
              <p className="text-gray-600 mb-4">
                Möchtest du <strong>{currentOrg?.name}</strong> wirklich unwiderruflich löschen?
              </p>
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                <p className="text-red-800 text-sm font-medium mb-2">
                  ⚠️ Folgende Daten werden gelöscht:
                </p>
                <ul className="text-red-700 text-sm space-y-1 list-disc list-inside">
                  <li>Alle Mitglieder</li>
                  <li>Alle Teams</li>
                  <li>Alle Matches und Statistiken</li>
                  <li>Alle Termine</li>
                  <li>Alle Beiträge</li>
                </ul>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setError(null);
                  }}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleDeleteOrganization}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? 'Wird gelöscht...' : 'Endgültig löschen'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

// Erstellt von Hans Hahn - Alle Rechte vorbehalten

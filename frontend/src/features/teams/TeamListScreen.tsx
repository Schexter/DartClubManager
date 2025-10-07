/**
 * TeamListScreen - Übersicht aller Teams
 *
 * Features:
 * - Team-Liste mit Mitglieder-Anzahl
 * - Navigation zu Add/Edit/Detail
 * - Delete mit Bestätigung
 *
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Edit2, Trash2, Plus, Shield } from 'lucide-react';
import { AppLayout } from '../../components/layout';
import { teamService } from '../../lib/api/services';
import type { Team } from '../../lib/api/types';

export function TeamListScreen() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState<Team | null>(null);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      setIsLoading(true);
      const data = await teamService.getAll();
      setTeams(data);
      setError(null);
    } catch (err: any) {
      console.error('Fehler beim Laden der Teams:', err);
      setError(err.response?.data?.message || 'Fehler beim Laden der Teams');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTeam = () => {
    navigate('/teams/new');
  };

  const handleEditTeam = (id: string) => {
    navigate(`/teams/${id}/edit`);
  };

  const handleDeleteClick = (team: Team) => {
    setTeamToDelete(team);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (teamToDelete) {
      try {
        await teamService.delete(teamToDelete.id);
        await loadTeams();
        setShowDeleteModal(false);
        setTeamToDelete(null);
      } catch (err: any) {
        console.error('Fehler beim Löschen:', err);
        alert(`Fehler: ${err.response?.data?.message || 'Team konnte nicht gelöscht werden'}`);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setTeamToDelete(null);
  };

  if (error) {
    return (
      <AppLayout>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-medium">⚠️ Fehler beim Laden der Teams</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teams</h1>
          <p className="text-gray-600 mt-1">
            {teams.length} {teams.length === 1 ? 'Team' : 'Teams'}
          </p>
        </div>
        <button
          onClick={handleAddTeam}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
        >
          <Plus size={20} />
          Neues Team
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="text-gray-600 mt-2">Lädt Teams...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && teams.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Noch keine Teams
          </h3>
          <p className="text-gray-600 mb-4">
            Erstelle dein erstes Team und füge Mitglieder hinzu!
          </p>
          <button
            onClick={handleAddTeam}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Team erstellen
          </button>
        </div>
      )}

      {/* Teams Grid */}
      {!isLoading && teams.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6 border-l-4"
              style={{ borderLeftColor: team.color || '#3B82F6' }}
            >
              {/* Team Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {team.name}
                  </h3>
                  {team.season && (
                    <p className="text-sm text-gray-600">Saison: {team.season}</p>
                  )}
                  {team.league && (
                    <p className="text-sm text-gray-600">Liga: {team.league}</p>
                  )}
                </div>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: team.color || '#3B82F6' }}
                >
                  {team.name.substring(0, 2).toUpperCase()}
                </div>
              </div>

              {/* Description */}
              {team.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {team.description}
                </p>
              )}

              {/* Members Count */}
              <div className="flex items-center gap-2 mb-4 text-gray-700">
                <Users size={16} />
                <span className="text-sm">
                  {team.members?.length || 0} Mitglied{(team.members?.length || 0) !== 1 ? 'er' : ''}
                </span>
              </div>

              {/* Captain */}
              {team.captain && (
                <div className="flex items-center gap-2 mb-4 text-gray-700 text-sm">
                  <Shield size={16} />
                  <span>
                    Kapitän: {team.captain.firstName} {team.captain.lastName}
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleEditTeam(team.id)}
                  className="flex-1 px-3 py-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <Edit2 size={16} />
                  Bearbeiten
                </button>
                <button
                  onClick={() => handleDeleteClick(team)}
                  className="flex-1 px-3 py-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Löschen
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && teamToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Team löschen?
            </h3>
            <p className="text-gray-600 mb-6">
              Möchtest du <strong>{teamToDelete.name}</strong> wirklich löschen?
              Diese Aktion kann nicht rückgängig gemacht werden.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

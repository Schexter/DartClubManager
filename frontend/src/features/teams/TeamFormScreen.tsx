/**
 * TeamFormScreen - Formular zum Erstellen/Bearbeiten von Teams
 *
 * Features:
 * - Team-Basis-Infos (Name, Saison, Liga, Beschreibung)
 * - Farb-Auswahl
 * - Kapitän-Auswahl aus Mitgliedern
 * - Mitglieder hinzufügen/entfernen
 *
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Users, Shield, Palette, Plus, X } from 'lucide-react';
import { AppLayout } from '../../components/layout';
import { teamService, memberService } from '../../lib/api/services';
import type { Member, CreateTeamRequest } from '../../lib/api/types';

const PRESET_COLORS = [
  '#3B82F6', // Blue
  '#EF4444', // Red
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#F97316', // Orange
];

interface TeamFormData {
  name: string;
  season: string;
  league: string;
  description: string;
  color: string;
  captainId: string;
  memberIds: string[];
}

export function TeamFormScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [memberSearchQuery, setMemberSearchQuery] = useState('');

  const [formData, setFormData] = useState<TeamFormData>({
    name: '',
    season: new Date().getFullYear().toString(),
    league: '',
    description: '',
    color: PRESET_COLORS[0],
    captainId: '',
    memberIds: [],
  });

  // Load members on mount
  useEffect(() => {
    loadMembers();
  }, []);

  // Load team data if editing
  useEffect(() => {
    if (isEditMode && id) {
      loadTeam(id);
    }
  }, [id, isEditMode]);

  const loadMembers = async () => {
    try {
      const data = await memberService.getAll();
      setMembers(data);
    } catch (error) {
      console.error('Fehler beim Laden der Mitglieder:', error);
      setMembers([]);
    }
  };

  const loadTeam = async (teamId: string) => {
    try {
      setIsLoading(true);
      const team = await teamService.getById(teamId);
      setFormData({
        name: team.name,
        season: team.season || '',
        league: team.league || '',
        description: team.description || '',
        color: team.color || PRESET_COLORS[0],
        captainId: team.captainId || '',
        memberIds: team.members?.map(m => m.id) || [],
      });
    } catch (error) {
      console.error('Fehler beim Laden des Teams:', error);
      alert('Team konnte nicht geladen werden');
      navigate('/teams');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Bitte gib einen Team-Namen ein');
      return;
    }

    setIsLoading(true);

    try {
      const teamRequest: CreateTeamRequest = {
        name: formData.name,
        season: formData.season || undefined,
        league: formData.league || undefined,
        description: formData.description || undefined,
        color: formData.color,
        captainId: formData.captainId || undefined,
      };

      if (isEditMode && id) {
        await teamService.update(id, teamRequest);

        // Update members if changed
        // TODO: Implement member update logic

        console.log('✅ Team updated');
        navigate('/teams');
      } else {
        const createdTeam = await teamService.create(teamRequest);

        // Add members to team
        for (const memberId of formData.memberIds) {
          await teamService.addMember(createdTeam.id, { memberId });
        }

        console.log('✅ Team created');
        navigate('/teams');
      }
    } catch (error: any) {
      console.error('❌ Error saving team:', error);
      alert(`Fehler beim Speichern: ${error.response?.data?.message || error.message || 'Unbekannter Fehler'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMember = (member: Member) => {
    if (!formData.memberIds.includes(member.id)) {
      setFormData({
        ...formData,
        memberIds: [...formData.memberIds, member.id],
      });
    }
    setShowMemberModal(false);
    setMemberSearchQuery('');
  };

  const handleRemoveMember = (memberId: string) => {
    setFormData({
      ...formData,
      memberIds: formData.memberIds.filter(id => id !== memberId),
      // Remove captain if they're being removed
      captainId: formData.captainId === memberId ? '' : formData.captainId,
    });
  };

  const getSelectedMembers = () => {
    return members.filter(m => formData.memberIds.includes(m.id));
  };

  const getAvailableMembers = () => {
    return members.filter(m => !formData.memberIds.includes(m.id));
  };

  const filteredAvailableMembers = getAvailableMembers().filter(m =>
    `${m.firstName} ${m.lastName}`.toLowerCase().includes(memberSearchQuery.toLowerCase())
  );

  if (isLoading && isEditMode) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="text-gray-600 mt-2">Lädt Team...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/teams')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? 'Team bearbeiten' : 'Neues Team'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditMode ? 'Aktualisiere Team-Informationen' : 'Erstelle ein neues Team'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        {/* Basic Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users size={20} />
            Team-Informationen
          </h2>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team-Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="z.B. Mannschaft 1"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Season */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Saison
                </label>
                <input
                  type="text"
                  value={formData.season}
                  onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="z.B. 2024/2025"
                />
              </div>

              {/* League */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Liga
                </label>
                <input
                  type="text"
                  value={formData.league}
                  onChange={(e) => setFormData({ ...formData, league: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="z.B. Kreisliga A"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beschreibung
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Optionale Beschreibung..."
                rows={3}
              />
            </div>

            {/* Color Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Palette size={16} />
                Team-Farbe
              </label>
              <div className="flex gap-3">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({ ...formData, color })}
                    className={`w-12 h-12 rounded-lg border-4 transition-all ${
                      formData.color === color ? 'border-gray-900 scale-110' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Captain Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Shield size={20} />
            Kapitän
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kapitän wählen
            </label>
            <select
              value={formData.captainId}
              onChange={(e) => setFormData({ ...formData, captainId: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Kein Kapitän</option>
              {getSelectedMembers().map((member) => (
                <option key={member.id} value={member.id}>
                  {member.firstName} {member.lastName}
                </option>
              ))}
            </select>
            {formData.memberIds.length === 0 && (
              <p className="text-sm text-gray-500 mt-2">
                Füge erst Mitglieder hinzu, um einen Kapitän auszuwählen
              </p>
            )}
          </div>
        </div>

        {/* Members */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Users size={20} />
              Mitglieder ({formData.memberIds.length})
            </h2>
            <button
              type="button"
              onClick={() => setShowMemberModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              Mitglied hinzufügen
            </button>
          </div>

          {formData.memberIds.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users size={48} className="mx-auto mb-2 opacity-50" />
              <p>Noch keine Mitglieder hinzugefügt</p>
            </div>
          ) : (
            <div className="space-y-2">
              {getSelectedMembers().map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {member.firstName[0]}{member.lastName[0]}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {member.firstName} {member.lastName}
                        {formData.captainId === member.id && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Kapitän
                          </span>
                        )}
                      </div>
                      {member.email && (
                        <div className="text-sm text-gray-600">{member.email}</div>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(member.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate('/teams')}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Abbrechen
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
          >
            {isLoading ? 'Speichert...' : (isEditMode ? 'Aktualisieren' : 'Team erstellen')}
          </button>
        </div>
      </form>

      {/* Member Selection Modal */}
      {showMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Mitglied hinzufügen</h3>
                <button
                  onClick={() => {
                    setShowMemberModal(false);
                    setMemberSearchQuery('');
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <input
                type="text"
                placeholder="Suche nach Name..."
                value={memberSearchQuery}
                onChange={(e) => setMemberSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="overflow-y-auto max-h-96 p-6">
              {filteredAvailableMembers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Keine verfügbaren Mitglieder gefunden</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredAvailableMembers.map((member) => (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => handleAddMember(member)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                    >
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {member.firstName[0]}{member.lastName[0]}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {member.firstName} {member.lastName}
                        </div>
                        {member.email && (
                          <div className="text-sm text-gray-600">{member.email}</div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

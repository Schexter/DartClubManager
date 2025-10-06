/**
 * MemberDetailScreen - Detail-Ansicht eines Mitglieds
 * 
 * Features:
 * - Vollständige Mitgliedsdaten anzeigen
 * - Navigation zu Edit
 * - Delete mit Bestätigung
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchMemberById,
  deleteMember,
  selectCurrentMember,
  selectMembersLoading,
  selectMembersError,
  clearCurrentMember,
} from './membersSlice';

// ========================================
// COMPONENT
// ========================================

export function MemberDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const member = useAppSelector(selectCurrentMember);
  const isLoading = useAppSelector(selectMembersLoading);
  const error = useAppSelector(selectMembersError);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // ========================================
  // EFFECTS
  // ========================================

  useEffect(() => {
    if (id) {
      dispatch(fetchMemberById(id));
    }

    return () => {
      dispatch(clearCurrentMember());
    };
  }, [dispatch, id]);

  // ========================================
  // HANDLERS
  // ========================================

  const handleEdit = () => {
    navigate(`/members/${id}/edit`);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (id) {
      await dispatch(deleteMember(id));
      navigate('/members');
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleBack = () => {
    navigate('/members');
  };

  // ========================================
  // HELPER FUNCTIONS
  // ========================================

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getRoleLabel = (role: string) => {
    const roleMap: Record<string, string> = {
      ADMIN: 'Administrator',
      TRAINER: 'Trainer',
      CAPTAIN: 'Captain',
      PLAYER: 'Spieler',
    };
    return roleMap[role] || role;
  };

  const getHandednessLabel = (handedness?: string) => {
    if (!handedness) return '-';
    return handedness === 'LEFT' ? 'Links' : 'Rechts';
  };

  // ========================================
  // RENDER
  // ========================================

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-medium">⚠️ Fehler beim Laden des Mitglieds</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
          <button
            onClick={handleBack}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Zurück zur Übersicht
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || !member) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="text-gray-600 mt-2">Lädt Mitglied...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header with Actions */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <span className="text-xl mr-2">←</span>
          <span>Zurück zur Übersicht</span>
        </button>
        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            ✏️ Bearbeiten
          </button>
          <button
            onClick={handleDeleteClick}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            🗑️ Löschen
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header mit Avatar */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8">
          <div className="flex items-center space-x-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-blue-600 text-4xl font-bold">
              {member.firstName[0]}{member.lastName[0]}
            </div>

            {/* Name & Role */}
            <div className="text-white">
              <h1 className="text-3xl font-bold">
                {member.firstName} {member.lastName}
              </h1>
              <p className="text-blue-100 text-lg mt-1">
                {getRoleLabel(member.role)}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    member.status === 'ACTIVE'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}
                >
                  {member.status === 'ACTIVE' ? '✓ Aktiv' : 'Inaktiv'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="p-8 space-y-8">
          {/* Kontaktdaten */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">
              Kontaktdaten
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">E-Mail</p>
                <p className="text-base font-medium text-gray-900">
                  {member.email || '-'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Telefon</p>
                <p className="text-base font-medium text-gray-900">
                  {member.phone || '-'}
                </p>
              </div>
            </div>
          </div>

          {/* Persönliche Daten */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">
              Persönliche Daten
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Geburtsdatum</p>
                <p className="text-base font-medium text-gray-900">
                  {formatDate(member.birthdate)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Mitglied seit</p>
                <p className="text-base font-medium text-gray-900">
                  {formatDate(member.joinedAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Dart-Daten */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">
              Dart-Daten
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Lizenznummer</p>
                <p className="text-base font-medium text-gray-900">
                  {member.licenseNo || '-'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Wurfhand</p>
                <p className="text-base font-medium text-gray-900">
                  {getHandednessLabel(member.handedness)}
                </p>
              </div>
            </div>
          </div>

          {/* Metadaten */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">
              System-Informationen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Erstellt am</p>
                <p className="text-base font-medium text-gray-900">
                  {formatDate(member.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Mitglieds-ID</p>
                <p className="text-base font-mono text-sm text-gray-600">
                  {member.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Mitglied löschen?
            </h3>
            <p className="text-gray-600 mb-6">
              Möchtest du <strong>{member.firstName} {member.lastName}</strong> wirklich löschen?
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
    </div>
  );
}

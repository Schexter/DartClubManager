/**
 * MemberListScreen - Übersicht aller Mitglieder
 * 
 * Features:
 * - Mitglieder-Liste mit Search & Filter
 * - Navigation zu Add/Edit/Detail
 * - Delete mit Bestätigung
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../../components/layout';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchMembers,
  deleteMember,
  updateMember,
  selectMembers,
  selectMembersLoading,
  selectMembersError,
} from './membersSlice';
import { selectUser, selectCurrentOrgId } from '../auth/authSlice'; // ⭐ Org-ID Selector
import type { Member } from '../../lib/api/types';
import { UserRole } from '../../lib/api/types';

// ========================================
// COMPONENT
// ========================================

export function MemberListScreen() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const members = useAppSelector(selectMembers);
  const isLoading = useAppSelector(selectMembersLoading);
  const error = useAppSelector(selectMembersError);
  const currentUser = useAppSelector(selectUser);
  const currentOrgId = useAppSelector(selectCurrentOrgId); // ⭐ Aktuelle Org-ID
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('ALL');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);
  const [editingRoleFor, setEditingRoleFor] = useState<string | null>(null);
  const [newRole, setNewRole] = useState<UserRole>(UserRole.PLAYER);

  // ⭐ Load Members on Mount AND when Org changes
  useEffect(() => {
    if (currentOrgId) {
      console.log('🔄 Lade Mitglieder für Organisation:', currentOrgId);
      dispatch(fetchMembers());
    }
  }, [dispatch, currentOrgId]); // ⭐ Re-fetch wenn sich Org ändert

  // ========================================
  // FILTERING
  // ========================================

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = filterRole === 'ALL' || member.role === filterRole;

    return matchesSearch && matchesRole;
  });

  // ========================================
  // HANDLERS
  // ========================================

  const handleAddMember = () => {
    navigate('/members/new');
  };

  const handleEditMember = (id: string) => {
    navigate(`/members/${id}/edit`);
  };

  const handleViewMember = (id: string) => {
    navigate(`/members/${id}`);
  };

  const handleDeleteClick = (member: Member) => {
    setMemberToDelete(member);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (memberToDelete) {
      await dispatch(deleteMember(memberToDelete.id));
      setShowDeleteModal(false);
      setMemberToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setMemberToDelete(null);
  };

  const handleEditRole = (member: Member) => {
    setEditingRoleFor(member.id);
    setNewRole(member.role);
  };

  const handleSaveRole = async (memberId: string) => {
    await dispatch(updateMember({
      id: memberId,
      data: { role: newRole }
    }));
    setEditingRoleFor(null);
  };

  const handleCancelEditRole = () => {
    setEditingRoleFor(null);
  };

  // ========================================
  // RENDER
  // ========================================

  if (error) {
    return (
      <AppLayout>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-medium">⚠️ Fehler beim Laden der Mitglieder</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Mitglieder</h1>
          <p className="text-gray-600 mt-1">
            {filteredMembers.length} {filteredMembers.length === 1 ? 'Mitglied' : 'Mitglieder'}
          </p>
        </div>
        <button
          onClick={handleAddMember}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          + Neues Mitglied
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Suche
            </label>
            <input
              type="text"
              placeholder="Name oder E-Mail..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rolle
            </label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">Alle Rollen</option>
              <option value="ADMIN">Admin</option>
              <option value="TRAINER">Trainer</option>
              <option value="CAPTAIN">Captain</option>
              <option value="PLAYER">Spieler</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="text-gray-600 mt-2">Lädt Mitglieder...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredMembers.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery ? 'Keine Mitglieder gefunden' : 'Noch keine Mitglieder'}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchQuery 
              ? 'Versuche einen anderen Suchbegriff' 
              : 'Füge dein erstes Mitglied hinzu!'
            }
          </p>
          {!searchQuery && (
            <button
              onClick={handleAddMember}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Mitglied hinzufügen
            </button>
          )}
        </div>
      )}

      {/* Members List */}
      {!isLoading && filteredMembers.length > 0 && (
        <div className="space-y-4">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => handleViewMember(member.id)}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all cursor-pointer hover:scale-[1.01]"
            >
              <div className="flex items-center justify-between">
                {/* Left: Member Info */}
                <div className="flex items-center space-x-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {member.firstName[0]}{member.lastName[0]}
                  </div>

                  {/* Info - Nur Name anzeigen */}
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {member.firstName} {member.lastName}
                      </h3>
                      {/* "Du" Badge für eigenen User */}
                      {currentUser?.id === member.userId && (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full font-medium">
                          Du
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditMember(member.id);
                    }}
                    className="px-3 py-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors"
                    title="Bearbeiten"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(member);
                    }}
                    className="px-3 py-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors"
                    title="Löschen"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && memberToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Mitglied löschen?
            </h3>
            <p className="text-gray-600 mb-6">
              Möchtest du <strong>{memberToDelete.firstName} {memberToDelete.lastName}</strong> wirklich löschen?
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

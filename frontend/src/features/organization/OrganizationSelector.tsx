/**
 * OrganizationSelector - Dropdown zum Wechseln der Organisation
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchMyOrganizations,
  setCurrentOrganization,
  selectCurrentOrganization,
  selectOrganizations,
  selectOrganizationLoading,
} from '../organization/organizationSlice';
import { setCurrentOrg } from '../auth/authSlice';  // ⭐ NEU: Import von authSlice
import { fetchMembers } from '../members/membersSlice';

export function OrganizationSelector() {
  const dispatch = useAppDispatch();
  const currentOrg = useAppSelector(selectCurrentOrganization);
  const organizations = useAppSelector(selectOrganizations);
  const isLoading = useAppSelector(selectOrganizationLoading);
  const [isOpen, setIsOpen] = useState(false);

  // Organisationen beim Mount laden
  useEffect(() => {
    dispatch(fetchMyOrganizations());
  }, [dispatch]);

  const handleOrgSwitch = async (orgId: string) => {
    if (orgId === currentOrg?.id) {
      setIsOpen(false);
      return;
    }

    try {
      // Organisation wechseln (setze die neue Organisation)
      const selectedOrg = organizations.find(org => org.id === orgId);
      if (selectedOrg) {
        // ⭐ 1. organizationSlice aktualisieren
        dispatch(setCurrentOrganization(selectedOrg));
        
        // ⭐ 2. authSlice aktualisieren (für current_org_id im localStorage)
        dispatch(setCurrentOrg(orgId));
      }

      // State-Reset: Alle Daten neu laden
      await dispatch(fetchMembers());
      // TODO: Weitere State-Resets (Teams, Matches, Events, etc.)
      
      setIsOpen(false);
    } catch (error) {
      console.error('Fehler beim Wechseln der Organisation:', error);
    }
  };

  if (organizations.length <= 1) {
    // Kein Dropdown, wenn nur 1 Organisation
    return null;
  }

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        disabled={isLoading}
      >
        {currentOrg?.logoUrl ? (
          <img
            src={currentOrg.logoUrl}
            alt={currentOrg.name}
            className="w-6 h-6 rounded-full object-cover"
          />
        ) : (
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold text-xs"
            style={{ backgroundColor: currentOrg?.primaryColor || '#1976D2' }}
          >
            {currentOrg?.name.charAt(0) || 'O'}
          </div>
        )}
        
        <span className="font-medium text-gray-800 dark:text-gray-200">
          {currentOrg?.name || 'Organisation wählen'}
        </span>
        
        <svg
          className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
            <div className="p-2">
              {organizations.map((org) => (
                <button
                  key={org.id}
                  onClick={() => handleOrgSwitch(org.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    org.id === currentOrg?.id
                      ? 'bg-blue-50 dark:bg-blue-900/20'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {org.logoUrl ? (
                    <img
                      src={org.logoUrl}
                      alt={org.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
                      style={{ backgroundColor: org.primaryColor }}
                    >
                      {org.name.charAt(0)}
                    </div>
                  )}
                  
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-800 dark:text-gray-200">
                      {org.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {org.role || 'Mitglied'}
                    </div>
                  </div>
                  
                  {org.id === currentOrg?.id && (
                    <svg
                      className="w-5 h-5 text-blue-600 dark:text-blue-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

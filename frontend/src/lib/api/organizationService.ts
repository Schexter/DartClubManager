/**
 * Organization Service - API Calls für Organisationen
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import { apiClient } from './client';
import type { Organization, AuthResponse } from './types';

/**
 * Alle Organisationen des eingeloggten Users abrufen
 */
export const getMyOrganizations = async (): Promise<Organization[]> => {
  const response = await apiClient.get('/organizations/my-organizations');
  return response.data;
};

/**
 * Einzelne Organisation abrufen
 */
export const getOrganizationById = async (id: string): Promise<Organization> => {
  const response = await apiClient.get(`/organizations/${id}`);
  return response.data;
};

/**
 * Organisation wechseln (generiert neues JWT-Token)
 */
export const switchOrganization = async (orgId: string): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/switch-organization', { orgId });
  return response.data;
};

export const organizationService = {
  getMyOrganizations,
  getOrganizationById,
  switchOrganization,
};

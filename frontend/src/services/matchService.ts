/**
 * matchService.ts - API Calls für Matches
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import apiClient from './apiClient';

const MATCHES_ENDPOINT = '/matches';

export const matchService = {
  /**
   * Alle Matches abrufen
   */
  getAll: () => apiClient.get(MATCHES_ENDPOINT),

  /**
   * Match nach ID abrufen
   */
  getById: (id: string) => apiClient.get(`${MATCHES_ENDPOINT}/${id}`),

  /**
   * Neues Match erstellen
   */
  create: (match: any) => apiClient.post(MATCHES_ENDPOINT, match),

  /**
   * Match aktualisieren
   */
  update: (id: string, match: any) => apiClient.put(`${MATCHES_ENDPOINT}/${id}`, match),

  /**
   * Match löschen
   */
  delete: (id: string) => apiClient.delete(`${MATCHES_ENDPOINT}/${id}`),

  /**
   * Match starten
   */
  start: (id: string) => apiClient.post(`${MATCHES_ENDPOINT}/${id}/start`),

  /**
   * Match beenden
   */
  finalize: (id: string) => apiClient.post(`${MATCHES_ENDPOINT}/${id}/finalize`),

  /**
   * Live-Scoring Daten abrufen
   */
  getLiveData: (id: string) => apiClient.get(`${MATCHES_ENDPOINT}/${id}/live`),
};

export default matchService;

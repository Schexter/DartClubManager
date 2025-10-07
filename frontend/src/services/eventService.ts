/**
 * Event API Service - Kommunikation mit dem Backend
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import apiClient from './apiClient';
import { Event, CreateEventData } from '../features/events/eventsSlice';

const EVENTS_BASE_URL = '/api/events';

export const eventService = {
  /**
   * Holt alle Events
   */
  async getAll(): Promise<Event[]> {
    const response = await apiClient.get<Event[]>(EVENTS_BASE_URL);
    return response.data;
  },

  /**
   * Holt alle kommenden Events
   */
  async getUpcoming(): Promise<Event[]> {
    const response = await apiClient.get<Event[]>(`${EVENTS_BASE_URL}/upcoming`);
    return response.data;
  },

  /**
   * Holt alle vergangenen Events
   */
  async getPast(): Promise<Event[]> {
    const response = await apiClient.get<Event[]>(`${EVENTS_BASE_URL}/past`);
    return response.data;
  },

  /**
   * Holt Events nach Typ
   */
  async getByType(type: 'TRAINING' | 'MATCH' | 'MEETING' | 'OTHER'): Promise<Event[]> {
    const response = await apiClient.get<Event[]>(`${EVENTS_BASE_URL}/type/${type}`);
    return response.data;
  },

  /**
   * Holt Events in einem Zeitraum
   */
  async getByDateRange(start: string, end: string): Promise<Event[]> {
    const response = await apiClient.get<Event[]>(`${EVENTS_BASE_URL}/range`, {
      params: { start, end }
    });
    return response.data;
  },

  /**
   * Holt Events eines Teams
   */
  async getByTeam(teamId: string): Promise<Event[]> {
    const response = await apiClient.get<Event[]>(`${EVENTS_BASE_URL}/team/${teamId}`);
    return response.data;
  },

  /**
   * Holt Events eines Members
   */
  async getByMember(memberId: string): Promise<Event[]> {
    const response = await apiClient.get<Event[]>(`${EVENTS_BASE_URL}/member/${memberId}`);
    return response.data;
  },

  /**
   * Sucht Events nach Titel
   */
  async search(title: string): Promise<Event[]> {
    const response = await apiClient.get<Event[]>(`${EVENTS_BASE_URL}/search`, {
      params: { title }
    });
    return response.data;
  },

  /**
   * Holt ein Event anhand ID
   */
  async getById(id: string): Promise<Event> {
    const response = await apiClient.get<Event>(`${EVENTS_BASE_URL}/${id}`);
    return response.data;
  },

  /**
   * Erstellt ein neues Event
   */
  async create(data: CreateEventData): Promise<Event> {
    const response = await apiClient.post<Event>(EVENTS_BASE_URL, data);
    return response.data;
  },

  /**
   * Aktualisiert ein Event
   */
  async update(id: string, data: Partial<CreateEventData>): Promise<Event> {
    const response = await apiClient.put<Event>(`${EVENTS_BASE_URL}/${id}`, data);
    return response.data;
  },

  /**
   * Löscht ein Event
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(`${EVENTS_BASE_URL}/${id}`);
  },

  /**
   * Fügt einen Teilnehmer hinzu
   */
  async addParticipant(eventId: string, memberId: string): Promise<void> {
    await apiClient.post(`${EVENTS_BASE_URL}/${eventId}/participants`, { memberId });
  },

  /**
   * Zusagen (Status: YES)
   */
  async confirmParticipation(eventId: string, memberId: string, comment?: string): Promise<void> {
    await apiClient.put(`${EVENTS_BASE_URL}/${eventId}/participants/${memberId}/confirm`, comment);
  },

  /**
   * Absagen (Status: NO)
   */
  async declineParticipation(eventId: string, memberId: string, comment?: string): Promise<void> {
    await apiClient.put(`${EVENTS_BASE_URL}/${eventId}/participants/${memberId}/decline`, comment);
  },

  /**
   * Vielleicht (Status: MAYBE)
   */
  async maybeParticipation(eventId: string, memberId: string, comment?: string): Promise<void> {
    await apiClient.put(`${EVENTS_BASE_URL}/${eventId}/participants/${memberId}/maybe`, comment);
  },

  /**
   * Entfernt einen Teilnehmer
   */
  async removeParticipant(eventId: string, memberId: string): Promise<void> {
    await apiClient.delete(`${EVENTS_BASE_URL}/${eventId}/participants/${memberId}`);
  },

  /**
   * Holt alle Teilnehmer eines Events
   */
  async getParticipants(eventId: string): Promise<any[]> {
    const response = await apiClient.get(`${EVENTS_BASE_URL}/${eventId}/participants`);
    return response.data;
  },
};

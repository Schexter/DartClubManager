/**
 * API Services - Type-Safe API Calls
 * 
 * Jede Service-Funktion ist typisiert und nutzt den apiClient
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import apiClient from './client';
import API_ENDPOINTS from './endpoints';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  CreateOrganizationRequest,
  Organization,
  Member,
  CreateMemberRequest,
  CreateMemberWithAccountRequest,
  UpdateMemberRequest,
  Team,
  CreateTeamRequest,
  UpdateTeamRequest,
  AddTeamMemberRequest,
  Match,
  CreateMatchRequest,
  UpdateMatchRequest,
  Event,
  CreateEventRequest,
  RespondToEventRequest,
  CreateThrowRequest,
  Throw,
  PlayerStatistics,
  TeamStatistics,
  PaginatedResponse,
} from './types';

// ========================================
// AUTH SERVICE
// ========================================

export const authService = {
  /**
   * Login
   */
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
    return response.data;
  },

  /**
   * Register
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
    return response.data;
  },

  /**
   * Get Current User
   */
  me: async (): Promise<AuthResponse> => {
    const response = await apiClient.get<AuthResponse>(API_ENDPOINTS.AUTH.ME);
    return response.data;
  },

  /**
   * Refresh Token
   */
  refresh: async (): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REFRESH);
    return response.data;
  },

  /**
   * Logout
   */
  logout: async (): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },
};

// ========================================
// ORGANIZATION SERVICE
// ========================================

export const organizationService = {
  /**
   * Get All Organizations
   */
  getAll: async (): Promise<Organization[]> => {
    const response = await apiClient.get<Organization[]>(API_ENDPOINTS.ORGANIZATIONS.BASE);
    return response.data;
  },

  /**
   * Get Organization by ID
   */
  getById: async (id: string): Promise<Organization> => {
    const response = await apiClient.get<Organization>(API_ENDPOINTS.ORGANIZATIONS.BY_ID(id));
    return response.data;
  },

  /**
   * Get My Organizations (where user is member)
   */
  getMyOrganizations: async (): Promise<Organization[]> => {
    const response = await apiClient.get<Organization[]>(API_ENDPOINTS.ORGANIZATIONS.MY_ORGANIZATIONS);
    return response.data;
  },

  /**
   * Create Organization
   */
  create: async (data: CreateOrganizationRequest): Promise<Organization> => {
    const response = await apiClient.post<Organization>(API_ENDPOINTS.ORGANIZATIONS.BASE, data);
    return response.data;
  },

  /**
   * Update Organization
   */
  update: async (id: string, data: Partial<CreateOrganizationRequest>): Promise<Organization> => {
    const response = await apiClient.put<Organization>(API_ENDPOINTS.ORGANIZATIONS.BY_ID(id), data);
    return response.data;
  },

  /**
   * Join Organization by Slug
   */
  join: async (slug: string): Promise<Organization> => {
    const response = await apiClient.post<Organization>(API_ENDPOINTS.ORGANIZATIONS.JOIN, { slug });
    return response.data;
  },
};

// ========================================
// MEMBER SERVICE
// ========================================

export const memberService = {
  /**
   * Get All Members
   */
  getAll: async (): Promise<Member[]> => {
    const response = await apiClient.get<Member[]>(API_ENDPOINTS.MEMBERS.BASE);
    return response.data;
  },

  /**
   * Get Member by ID
   */
  getById: async (id: string): Promise<Member> => {
    const response = await apiClient.get<Member>(API_ENDPOINTS.MEMBERS.BY_ID(id));
    return response.data;
  },

  /**
   * Create Member
   */
  create: async (data: CreateMemberRequest): Promise<Member> => {
    const response = await apiClient.post<Member>(API_ENDPOINTS.MEMBERS.BASE, data);
    return response.data;
  },

  /**
   * Create Member with User Account
   * Erstellt User + Member + Membership in einem Schritt
   */
  createWithAccount: async (data: CreateMemberWithAccountRequest): Promise<Member> => {
    const response = await apiClient.post<Member>(`${API_ENDPOINTS.MEMBERS.BASE}/create-with-account`, data);
    return response.data;
  },

  /**
   * Update Member
   */
  update: async (id: string, data: UpdateMemberRequest): Promise<Member> => {
    const response = await apiClient.put<Member>(API_ENDPOINTS.MEMBERS.BY_ID(id), data);
    return response.data;
  },

  /**
   * Delete Member
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.MEMBERS.BY_ID(id));
  },

  /**
   * Get Member Statistics
   */
  getStatistics: async (id: string): Promise<PlayerStatistics> => {
    const response = await apiClient.get<PlayerStatistics>(API_ENDPOINTS.MEMBERS.STATISTICS(id));
    return response.data;
  },

  /**
   * Upload Avatar
   */
  uploadAvatar: async (id: string, file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post<{ url: string }>(
      API_ENDPOINTS.MEMBERS.UPLOAD_AVATAR(id),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  /**
   * Import Members from CSV
   */
  importCsv: async (file: File): Promise<{ imported: number; errors: string[] }> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post<{ imported: number; errors: string[] }>(
      API_ENDPOINTS.MEMBERS.IMPORT_CSV,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  /**
   * Export Members to CSV
   */
  exportCsv: async (): Promise<Blob> => {
    const response = await apiClient.get(API_ENDPOINTS.MEMBERS.EXPORT_CSV, {
      responseType: 'blob',
    });
    return response.data;
  },
};

// ========================================
// TEAM SERVICE
// ========================================

export const teamService = {
  /**
   * Get All Teams
   */
  getAll: async (): Promise<Team[]> => {
    const response = await apiClient.get<Team[]>(API_ENDPOINTS.TEAMS.BASE);
    return response.data;
  },

  /**
   * Get Team by ID
   */
  getById: async (id: string): Promise<Team> => {
    const response = await apiClient.get<Team>(API_ENDPOINTS.TEAMS.BY_ID(id));
    return response.data;
  },

  /**
   * Create Team
   */
  create: async (data: CreateTeamRequest): Promise<Team> => {
    const response = await apiClient.post<Team>(API_ENDPOINTS.TEAMS.BASE, data);
    return response.data;
  },

  /**
   * Update Team
   */
  update: async (id: string, data: UpdateTeamRequest): Promise<Team> => {
    const response = await apiClient.put<Team>(API_ENDPOINTS.TEAMS.BY_ID(id), data);
    return response.data;
  },

  /**
   * Delete Team
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.TEAMS.BY_ID(id));
  },

  /**
   * Add Member to Team
   */
  addMember: async (id: string, data: AddTeamMemberRequest): Promise<Team> => {
    const response = await apiClient.post<Team>(API_ENDPOINTS.TEAMS.ADD_MEMBER(id), data);
    return response.data;
  },

  /**
   * Remove Member from Team
   */
  removeMember: async (teamId: string, memberId: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.TEAMS.REMOVE_MEMBER(teamId, memberId));
  },

  /**
   * Get Team Statistics
   */
  getStatistics: async (id: string): Promise<TeamStatistics> => {
    const response = await apiClient.get<TeamStatistics>(API_ENDPOINTS.TEAMS.STATISTICS(id));
    return response.data;
  },
};

// ========================================
// MATCH SERVICE
// ========================================

export const matchService = {
  /**
   * Get All Matches
   */
  getAll: async (): Promise<Match[]> => {
    const response = await apiClient.get<Match[]>(API_ENDPOINTS.MATCHES.BASE);
    return response.data;
  },

  /**
   * Get Match by ID
   */
  getById: async (id: string): Promise<Match> => {
    const response = await apiClient.get<Match>(API_ENDPOINTS.MATCHES.BY_ID(id));
    return response.data;
  },

  /**
   * Create Match
   */
  create: async (data: CreateMatchRequest): Promise<Match> => {
    const response = await apiClient.post<Match>(API_ENDPOINTS.MATCHES.BASE, data);
    return response.data;
  },

  /**
   * Update Match
   */
  update: async (id: string, data: UpdateMatchRequest): Promise<Match> => {
    const response = await apiClient.put<Match>(API_ENDPOINTS.MATCHES.BY_ID(id), data);
    return response.data;
  },

  /**
   * Delete Match
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.MATCHES.BY_ID(id));
  },

  /**
   * Start Match (Status → LIVE)
   */
  start: async (id: string): Promise<Match> => {
    const response = await apiClient.post<Match>(API_ENDPOINTS.MATCHES.START(id));
    return response.data;
  },

  /**
   * Finalize Match (Status → FINISHED)
   */
  finalize: async (id: string): Promise<Match> => {
    const response = await apiClient.post<Match>(API_ENDPOINTS.MATCHES.FINALIZE(id));
    return response.data;
  },

  /**
   * Submit Throw
   */
  submitThrow: async (matchId: string, legId: string, data: CreateThrowRequest): Promise<Throw> => {
    const response = await apiClient.post<Throw>(
      API_ENDPOINTS.MATCHES.THROWS(matchId, legId),
      data
    );
    return response.data;
  },

  /**
   * Download Match PDF
   */
  downloadPdf: async (id: string): Promise<Blob> => {
    const response = await apiClient.get(API_ENDPOINTS.MATCHES.PDF(id), {
      responseType: 'blob',
    });
    return response.data;
  },
};

// ========================================
// EVENT SERVICE
// ========================================

export const eventService = {
  /**
   * Get All Events
   */
  getAll: async (): Promise<Event[]> => {
    const response = await apiClient.get<Event[]>(API_ENDPOINTS.EVENTS.BASE);
    return response.data;
  },

  /**
   * Get Event by ID
   */
  getById: async (id: string): Promise<Event> => {
    const response = await apiClient.get<Event>(API_ENDPOINTS.EVENTS.BY_ID(id));
    return response.data;
  },

  /**
   * Create Event
   */
  create: async (data: CreateEventRequest): Promise<Event> => {
    const response = await apiClient.post<Event>(API_ENDPOINTS.EVENTS.BASE, data);
    return response.data;
  },

  /**
   * Update Event
   */
  update: async (id: string, data: Partial<CreateEventRequest>): Promise<Event> => {
    const response = await apiClient.put<Event>(API_ENDPOINTS.EVENTS.BY_ID(id), data);
    return response.data;
  },

  /**
   * Delete Event
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.EVENTS.BY_ID(id));
  },

  /**
   * Respond to Event (YES, NO, MAYBE)
   */
  respond: async (id: string, data: RespondToEventRequest): Promise<Event> => {
    const response = await apiClient.post<Event>(API_ENDPOINTS.EVENTS.RESPOND(id), data);
    return response.data;
  },

  /**
   * Download iCal File
   */
  downloadIcal: async (id: string): Promise<Blob> => {
    const response = await apiClient.get(API_ENDPOINTS.EVENTS.ICAL(id), {
      responseType: 'blob',
    });
    return response.data;
  },
};

// ========================================
// STATISTICS SERVICE
// ========================================

export const statisticsService = {
  /**
   * Get Player Statistics
   */
  getPlayerStats: async (): Promise<PlayerStatistics[]> => {
    const response = await apiClient.get<PlayerStatistics[]>(API_ENDPOINTS.STATISTICS.PLAYERS);
    return response.data;
  },

  /**
   * Get Team Statistics
   */
  getTeamStats: async (): Promise<TeamStatistics[]> => {
    const response = await apiClient.get<TeamStatistics[]>(API_ENDPOINTS.STATISTICS.TEAMS);
    return response.data;
  },

  /**
   * Get Leaderboard
   */
  getLeaderboard: async (): Promise<PlayerStatistics[]> => {
    const response = await apiClient.get<PlayerStatistics[]>(API_ENDPOINTS.STATISTICS.LEADERBOARD);
    return response.data;
  },

  /**
   * Export Statistics to CSV
   */
  exportCsv: async (): Promise<Blob> => {
    const response = await apiClient.get(API_ENDPOINTS.STATISTICS.EXPORT, {
      responseType: 'blob',
    });
    return response.data;
  },
};

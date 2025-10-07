/**
 * API Endpoints - Zentrale Definition aller Backend-Routen
 * 
 * Alle API-Pfade sind hier definiert für konsistente Nutzung
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

const API_ENDPOINTS = {
  // ========================================
  // AUTH ENDPOINTS
  // ========================================
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    SWITCH_ORGANIZATION: '/auth/switch-organization',
  },

  // ========================================
  // ORGANIZATION ENDPOINTS
  // ========================================
  ORGANIZATIONS: {
    BASE: '/organizations',
    BY_ID: (id: string) => `/organizations/${id}`,
    MY_ORGANIZATIONS: '/organizations/my-organizations',
    JOIN: '/organizations/join',
    MEMBERS: (id: string) => `/organizations/${id}/members`,
    TEAMS: (id: string) => `/organizations/${id}/teams`,
    MATCHES: (id: string) => `/organizations/${id}/matches`,
  },

  // ========================================
  // MEMBER ENDPOINTS
  // ========================================
  MEMBERS: {
    BASE: '/members',
    BY_ID: (id: string) => `/members/${id}`,
    STATISTICS: (id: string) => `/members/${id}/statistics`,
    UPLOAD_AVATAR: (id: string) => `/members/${id}/avatar`,
    IMPORT_CSV: '/members/import',
    EXPORT_CSV: '/members/export',
  },

  // ========================================
  // TEAM ENDPOINTS
  // ========================================
  TEAMS: {
    BASE: '/teams',
    BY_ID: (id: string) => `/teams/${id}`,
    MEMBERS: (id: string) => `/teams/${id}/members`,
    ADD_MEMBER: (id: string) => `/teams/${id}/members`,
    REMOVE_MEMBER: (teamId: string, memberId: string) => `/teams/${teamId}/members/${memberId}`,
    STATISTICS: (id: string) => `/teams/${id}/statistics`,
  },

  // ========================================
  // MATCH ENDPOINTS
  // ========================================
  MATCHES: {
    BASE: '/matches',
    BY_ID: (id: string) => `/matches/${id}`,
    START: (id: string) => `/matches/${id}/start`,
    FINALIZE: (id: string) => `/matches/${id}/finalize`,
    LINEUP: (id: string) => `/matches/${id}/lineup`,
    LEGS: (id: string) => `/matches/${id}/legs`,
    THROWS: (matchId: string) => `/matches/${matchId}/throws`,
    STATISTICS: (id: string) => `/matches/${id}/statistics`,
    PDF: (id: string) => `/matches/${id}/pdf`,
  },

  // ========================================
  // EVENT ENDPOINTS
  // ========================================
  EVENTS: {
    BASE: '/events',
    BY_ID: (id: string) => `/events/${id}`,
    RESPOND: (id: string) => `/events/${id}/respond`,
    PARTICIPANTS: (id: string) => `/events/${id}/participants`,
    ICAL: (id: string) => `/events/${id}/ical`,
  },

  // ========================================
  // POLL ENDPOINTS (Terminfindung)
  // ========================================
  POLLS: {
    BASE: '/polls',
    BY_ID: (id: string) => `/polls/${id}`,
    VOTE: (id: string) => `/polls/${id}/vote`,
    RESULTS: (id: string) => `/polls/${id}/results`,
  },

  // ========================================
  // FEE ENDPOINTS (Beitragsverwaltung)
  // ========================================
  FEES: {
    // Beitragssätze
    BASE: '/fees',
    BY_ID: (id: string) => `/fees/${id}`,
    DEACTIVATE: (id: string) => `/fees/${id}/deactivate`,
    
    // Zuweisungen
    ASSIGNMENTS: '/fees/assignments',
    ASSIGNMENT_BY_ID: (id: string) => `/fees/assignments/${id}`,
    ASSIGNMENTS_BY_MEMBER: (memberId: string) => `/fees/assignments/member/${memberId}`,
    ASSIGNMENTS_BY_FEE: (feeId: string) => `/fees/${feeId}/assignments`,
    
    // Zahlungen
    PAYMENTS: '/fees/payments',
    PAYMENT_BY_ID: (id: string) => `/fees/payments/${id}`,
    PAYMENTS_BY_ASSIGNMENT: (assignmentId: string) => `/fees/payments/assignment/${assignmentId}`,
    PAYMENTS_BY_MEMBER: (memberId: string) => `/fees/payments/member/${memberId}`,
    
    // Status
    STATUS: '/fees/status',
    STATUS_BY_MEMBER: (memberId: string) => `/fees/status/member/${memberId}`,
  },

  // ========================================
  // STATISTICS ENDPOINTS
  // ========================================
  STATISTICS: {
    PLAYERS: '/statistics/players',
    TEAMS: '/statistics/teams',
    LEADERBOARD: '/statistics/leaderboard',
    EXPORT: '/statistics/export',
  },

  // ========================================
  // FILE UPLOAD ENDPOINTS
  // ========================================
  UPLOADS: {
    LOGO: '/uploads/logo',
    AVATAR: '/uploads/avatar',
    DOCUMENT: '/uploads/document',
  },
};

export default API_ENDPOINTS;

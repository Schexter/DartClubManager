/**
 * API Type Definitions
 * 
 * TypeScript Interfaces für alle API Requests & Responses
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

// ========================================
// AUTH TYPES
// ========================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  displayName: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  organization?: Organization;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  TRAINER = 'TRAINER',
  CAPTAIN = 'CAPTAIN',
  PLAYER = 'PLAYER',
}

// ========================================
// ORGANIZATION TYPES
// ========================================

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  createdAt: string;
}

export interface CreateOrganizationRequest {
  name: string;
  slug: string;
  primaryColor?: string;
  secondaryColor?: string;
}

// ========================================
// MEMBER TYPES
// ========================================

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  birthdate?: string;
  licenseNo?: string;
  handedness?: 'LEFT' | 'RIGHT';
  avatarUrl?: string;
  role: UserRole;
  status: 'ACTIVE' | 'INACTIVE';
  joinedAt: string;
  createdAt: string;
}

export interface CreateMemberRequest {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  birthdate?: string;
  licenseNo?: string;
  handedness?: 'LEFT' | 'RIGHT';
  role?: UserRole;
}

export interface CreateMemberWithAccountRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  birthdate?: string;
  password: string;
  licenseNo?: string;
  handedness?: 'LEFT' | 'RIGHT';
  notes?: string;
}

export interface UpdateMemberRequest extends Partial<CreateMemberRequest> {
  status?: 'ACTIVE' | 'INACTIVE';
}

// ========================================
// TEAM TYPES
// ========================================

export interface Team {
  id: string;
  name: string;
  season: string;
  captainId?: string;
  captain?: Member;
  members: Member[];
  stats: TeamStats;
  createdAt: string;
}

export interface TeamStats {
  matchesPlayed: number;
  matchesWon: number;
  matchesLost: number;
  winRate: number;
}

export interface CreateTeamRequest {
  name: string;
  season: string;
  captainId?: string;
}

export interface UpdateTeamRequest extends Partial<CreateTeamRequest> {}

export interface AddTeamMemberRequest {
  memberId: string;
}

// ========================================
// MATCH TYPES
// ========================================

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeTeam?: Team;
  awayTeam?: Team;
  matchDate: string;
  venue?: string;
  league?: string;
  matchType: MatchType;
  status: MatchStatus;
  homeSets: number;
  awaySets: number;
  startingScore: number;
  doubleOut: boolean;
  createdAt: string;
}

export enum MatchType {
  LEAGUE = 'LEAGUE',
  FRIENDLY = 'FRIENDLY',
  TOURNAMENT = 'TOURNAMENT',
  CUP = 'CUP',
}

export enum MatchStatus {
  SCHEDULED = 'SCHEDULED',
  LIVE = 'LIVE',
  FINISHED = 'FINISHED',
  CANCELLED = 'CANCELLED',
}

export interface CreateMatchRequest {
  homeTeamId: string;
  awayTeamId: string;
  matchDate: string;
  venue?: string;
  league?: string;
  matchType?: MatchType;
  startingScore?: number;
  doubleOut?: boolean;
}

export interface UpdateMatchRequest extends Partial<CreateMatchRequest> {
  status?: MatchStatus;
}

// ========================================
// LEG & THROW TYPES
// ========================================

export interface Leg {
  id: string;
  matchId: string;
  setNumber: number;
  legNumber: number;
  startingScore: number;
  winnerId?: string;
  winner?: Member;
  throws: Throw[];
  createdAt: string;
}

export interface Throw {
  id: string;
  legId: string;
  memberId: string;
  member?: Member;
  throwNo: number;
  dart1Multiplier: number;
  dart1Segment: number;
  dart1Score: number;
  dart2Multiplier: number;
  dart2Segment: number;
  dart2Score: number;
  dart3Multiplier: number;
  dart3Segment: number;
  dart3Score: number;
  throwTotal: number;
  remainingScore: number;
  isBust: boolean;
  isCheckout: boolean;
  createdAt: string;
}

export interface CreateThrowRequest {
  memberId: string;
  dart1Multiplier: number;
  dart1Segment: number;
  dart2Multiplier: number;
  dart2Segment: number;
  dart3Multiplier: number;
  dart3Segment: number;
}

// ========================================
// EVENT TYPES
// ========================================

export interface Event {
  id: string;
  title: string;
  description?: string;
  eventType: EventType;
  startDate: string;
  endDate: string;
  location?: string;
  maxParticipants?: number;
  participants: EventParticipant[];
  createdAt: string;
}

export enum EventType {
  TRAINING = 'TRAINING',
  MATCH = 'MATCH',
  MEETING = 'MEETING',
  SOCIAL = 'SOCIAL',
}

export interface EventParticipant {
  memberId: string;
  member: Member;
  status: ParticipantStatus;
  respondedAt: string;
}

export enum ParticipantStatus {
  YES = 'YES',
  NO = 'NO',
  MAYBE = 'MAYBE',
  PENDING = 'PENDING',
}

export interface CreateEventRequest {
  title: string;
  description?: string;
  eventType: EventType;
  startDate: string;
  endDate: string;
  location?: string;
  maxParticipants?: number;
}

export interface RespondToEventRequest {
  status: ParticipantStatus;
}

// ========================================
// STATISTICS TYPES
// ========================================

export interface PlayerStatistics {
  memberId: string;
  member: Member;
  matchesPlayed: number;
  matchesWon: number;
  matchesLost: number;
  legsWon: number;
  legsLost: number;
  average3Dart: number;
  checkoutRate: number;
  doubleRate: number;
  count180s: number;
  count171s: number;
  highestCheckout: number;
  bestLeg: number;
}

export interface TeamStatistics {
  teamId: string;
  team: Team;
  season: string;
  matchesPlayed: number;
  matchesWon: number;
  matchesLost: number;
  points: number;
  teamAverage: number;
  topScorer?: Member;
}

// ========================================
// PAGINATION & FILTERS
// ========================================

export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  status: number;
  timestamp: string;
  path?: string;
}

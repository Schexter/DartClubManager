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
  organizationName?: string; // ⭐ Optional: Name der zu erstellenden Organisation
  organizationSlug?: string; // ⭐ Optional: Slug der zu erstellenden Organisation
}

export interface AuthResponse {
  token: string;
  user: User;
  orgId?: string; // ⭐ Aktuelle Organisation ID
  orgName?: string; // ⭐ Aktueller Organisationsname
  organization?: Organization; // Deprecated, wird durch orgId/orgName ersetzt
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
  role?: string; // Rolle des Users in dieser Organisation
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
  userId?: string;
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
  teams?: TeamSummary[]; // Teams des Members
  createdAt: string;
}

export interface TeamSummary {
  id: string;
  name: string;
  color?: string;
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
  playerName?: string;
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
  season?: string;
  league?: string;
  description?: string;
  color?: string;
  captainId?: string;
  captain?: Member;
  members?: Member[];
  stats?: TeamStats;
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
  season?: string;
  league?: string;
  description?: string;
  color?: string;
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
  // Team-Matches
  homeTeamId?: string; // Optional: Matches können ohne Teams erstellt werden
  awayTeamId?: string; // Optional: Matches können ohne Teams erstellt werden
  homeTeam?: Team;
  awayTeam?: Team;
  // Einzelspieler-Matches
  homePlayerId?: string; // Mitglied aus der eigenen Org
  awayPlayerId?: string; // Mitglied aus der eigenen Org
  homePlayerName?: string; // Gastspieler (wenn nicht homePlayerId)
  awayPlayerName?: string; // Gastspieler (wenn nicht awayPlayerId)
  // Match-Details
  matchDate: string;
  venue?: string;
  league?: string;
  matchType: MatchType;
  status: MatchStatus;
  homeSets: number;
  awaySets: number;
  bestOfSets: number;
  bestOfLegs: number;
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
  homeTeamId?: string; // Optional: Für Matches ohne Teams
  awayTeamId?: string; // Optional: Für Matches ohne Teams
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
// LIVE SCORING TYPES
// ========================================

export interface DartInput {
  multiplier: number;
  segment: number;
}

export interface LiveScoringThrowRequest {
  legId: string;
  darts: DartInput[];
}

export interface LiveScoringThrowResponse {
  throwId: string;
  throwTotal: number;
  remainingScore: number;
  isCheckout: boolean;
  isBust: boolean;
  event?: string;
  legFinished: boolean;
  leg: LiveScoringLegDTO;
}

export interface LiveScoringLegDTO {
  id: string;
  setNumber: number;
  legNumber: number;
  homePlayer: LiveScoringPlayerDTO;
  awayPlayer: LiveScoringPlayerDTO;
  currentPlayer: 'home' | 'away';
}

export interface LiveScoringPlayerDTO {
  id: string;
  name: string;
  remainingScore: number;
  average: number;
  lastThrow?: string;
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
// FEE TYPES (Beitragsverwaltung)
// ========================================

export interface Fee {
  id: string;
  orgId: string;
  name: string;
  amount: number;
  period: FeePeriod;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum FeePeriod {
  YEARLY = 'YEARLY',
  QUARTERLY = 'QUARTERLY',
  MONTHLY = 'MONTHLY',
  ONCE = 'ONCE',
}

export interface FeeAssignment {
  id: string;
  memberId: string;
  memberName?: string;
  feeId: string;
  feeName?: string;
  fee?: Fee; // Vollständiges Fee-Objekt mit allen Details
  startDate: string;
  endDate?: string;
  status: FeeAssignmentStatus;
  notes?: string;
  // Zahlungsinformationen
  totalPaid?: number;
  remainingAmount?: number;
  lastPaymentDate?: string;
  paymentStatus?: 'PAID' | 'PARTIAL' | 'OPEN' | 'OVERDUE';
  createdAt: string;
  updatedAt: string;
}

export enum FeeAssignmentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  CANCELLED = 'CANCELLED',
}

export interface FeePayment {
  id: string;
  feeAssignmentId: string;
  amountPaid: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  periodStart?: string;
  periodEnd?: string;
  referenceNumber?: string;
  notes?: string;
  recordedByUserId?: string;
  recordedByUserName?: string;
  createdAt: string;
  updatedAt: string;
}

export enum PaymentMethod {
  CASH = 'CASH',
  BANK_TRANSFER = 'BANK_TRANSFER',
  SEPA = 'SEPA',
  PAYPAL = 'PAYPAL',
  OTHER = 'OTHER',
}

export interface MemberFeeStatus {
  memberId: string;
  memberName: string;
  email?: string;
  feeId: string;
  feeName: string;
  feeAmount: number;
  totalPaid: number;
  remainingAmount: number;
  lastPaymentDate?: string;
  nextDueDate?: string;
  status: 'PAID' | 'PARTIAL' | 'OPEN' | 'OVERDUE';
  isOverdue: boolean;
}

export interface CreateFeeRequest {
  name: string;
  amount: number;
  period: FeePeriod;
  description?: string;
  isActive?: boolean;
}

export interface UpdateFeeRequest extends Partial<CreateFeeRequest> {}

export interface CreateFeeAssignmentRequest {
  memberId: string;
  feeId: string;
  startDate: string;
  endDate?: string;
  status?: FeeAssignmentStatus;
  notes?: string;
}

export interface UpdateFeeAssignmentRequest extends Partial<CreateFeeAssignmentRequest> {}

export interface CreateFeePaymentRequest {
  feeAssignmentId: string;
  amountPaid: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  periodStart?: string;
  periodEnd?: string;
  referenceNumber?: string;
  notes?: string;
}

export interface UpdateFeePaymentRequest extends Partial<CreateFeePaymentRequest> {}

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

export type EventType =
  | 'TRAINING'
  | 'MATCH'
  | 'FRIENDLY_MATCH'
  | 'MEETING'
  | 'TOURNAMENT'
  | 'OTHER';

export type ParticipationStatus = 'YES' | 'NO' | 'MAYBE' | 'PENDING';

export interface EventParticipant {
  memberId: string;
  memberName: string;
  status: ParticipationStatus;
  comment?: string;
  respondedAt?: string;
}

export interface Event {
  id: string;
  orgId: string;
  title: string;
  description?: string;
  eventType: EventType;
  startTime: string;
  endTime?: string;
  location?: string;
  capacity?: number;
  notes?: string;
  teamId?: string;
  teamName?: string;
  matchId?: string;
  createdBy: string;
  createdByName?: string;
  confirmedCount: number;
  declinedCount: number;
  maybeCount: number;
  pendingCount: number;
  isFull: boolean;
  isPast: boolean;
  isOngoing: boolean;
  participants?: EventParticipant[];
  createdAt: string;
  updatedAt?: string;
}

export interface CreateEventRequest {
  title: string;
  description?: string;
  eventType: EventType;
  startTime: string;
  endTime?: string;
  location?: string;
  capacity?: number;
  notes?: string;
  teamId?: string;
  matchId?: string;
  createdBy: string;
}

export interface UpdateEventRequest {
  title?: string;
  description?: string;
  eventType?: EventType;
  startTime?: string;
  endTime?: string;
  location?: string;
  capacity?: number;
  notes?: string;
  teamId?: string;
  matchId?: string;
}

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  TRAINING: 'Training',
  MATCH: 'Ligaspiel',
  FRIENDLY_MATCH: 'Freundschaftsspiel',
  MEETING: 'Vereinstreffen',
  TOURNAMENT: 'Turnier',
  OTHER: 'Sonstiges',
};

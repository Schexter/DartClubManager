/**
 * Events Redux Slice - State Management für Termine/Events
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { eventService } from '../../lib/api/services';

// Types
export interface EventParticipant {
  memberId: string;
  memberName: string;
  status: 'YES' | 'NO' | 'MAYBE' | 'PENDING';
  comment?: string;
  respondedAt?: string;
}

export interface Event {
  id: string;
  orgId: string;
  title: string;
  description?: string;
  eventType: 'TRAINING' | 'MATCH' | 'MEETING' | 'OTHER';
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
  isFull: boolean;
  isPast: boolean;
  isOngoing: boolean;
  participants?: EventParticipant[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventData {
  title: string;
  description?: string;
  eventType: 'TRAINING' | 'MATCH' | 'MEETING' | 'OTHER';
  startTime: string;
  endTime?: string;
  location?: string;
  capacity?: number;
  notes?: string;
  teamId?: string;
  matchId?: string;
  createdBy: string;
}

export interface UpdateEventData extends Partial<CreateEventData> {
  id: string;
}

interface EventsState {
  events: Event[];
  currentEvent: Event | null;
  loading: boolean;
  error: string | null;
  filter: 'all' | 'upcoming' | 'past';
}

const initialState: EventsState = {
  events: [],
  currentEvent: null,
  loading: false,
  error: null,
  filter: 'upcoming',
};

// Async Thunks

export const fetchEvents = createAsyncThunk(
  'events/fetchAll',
  async (filter: 'all' | 'upcoming' | 'past' = 'all', { rejectWithValue }) => {
    try {
      const events = await eventService.getAll();

      // Filter events based on filter type
      const now = new Date();
      let filteredEvents = events;

      switch (filter) {
        case 'upcoming':
          filteredEvents = events.filter(event => new Date(event.startTime) >= now);
          break;
        case 'past':
          filteredEvents = events.filter(event => new Date(event.startTime) < now);
          break;
        default:
          filteredEvents = events;
      }

      return filteredEvents;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Fehler beim Laden der Events');
    }
  }
);

export const fetchEventById = createAsyncThunk(
  'events/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const event = await eventService.getById(id);
      return event;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Fehler beim Laden des Events');
    }
  }
);

export const createEvent = createAsyncThunk(
  'events/create',
  async (data: CreateEventData, { rejectWithValue }) => {
    try {
      const event = await eventService.create(data);
      return event;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Fehler beim Erstellen des Events');
    }
  }
);

export const updateEvent = createAsyncThunk(
  'events/update',
  async ({ id, ...data }: UpdateEventData, { rejectWithValue }) => {
    try {
      const event = await eventService.update(id, data);
      return event;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Fehler beim Aktualisieren des Events');
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'events/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await eventService.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Fehler beim Löschen des Events');
    }
  }
);

export const confirmParticipation = createAsyncThunk(
  'events/confirmParticipation',
  async ({ eventId, memberId, comment }: { eventId: string; memberId: string; comment?: string }, { rejectWithValue }) => {
    try {
      await eventService.respond(eventId, { memberId, status: 'YES', comment });
      return { eventId, memberId, status: 'YES' as const };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Fehler beim Zusagen');
    }
  }
);

export const declineParticipation = createAsyncThunk(
  'events/declineParticipation',
  async ({ eventId, memberId, comment }: { eventId: string; memberId: string; comment?: string }, { rejectWithValue }) => {
    try {
      await eventService.respond(eventId, { memberId, status: 'NO', comment });
      return { eventId, memberId, status: 'NO' as const };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Fehler beim Absagen');
    }
  }
);

export const maybeParticipation = createAsyncThunk(
  'events/maybeParticipation',
  async ({ eventId, memberId, comment }: { eventId: string; memberId: string; comment?: string }, { rejectWithValue }) => {
    try {
      await eventService.respond(eventId, { memberId, status: 'MAYBE', comment });
      return { eventId, memberId, status: 'MAYBE' as const };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Fehler beim Aktualisieren');
    }
  }
);

// Slice

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<'all' | 'upcoming' | 'past'>) => {
      state.filter = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentEvent: (state) => {
      state.currentEvent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Events
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch Event by ID
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Create Event
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.unshift(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update Event
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.events.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
        if (state.currentEvent?.id === action.payload.id) {
          state.currentEvent = action.payload;
        }
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete Event
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.filter(e => e.id !== action.payload);
        if (state.currentEvent?.id === action.payload) {
          state.currentEvent = null;
        }
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Participation Actions
      .addCase(confirmParticipation.fulfilled, (state, action) => {
        // Update event in list
        const event = state.events.find(e => e.id === action.payload.eventId);
        if (event) {
          event.confirmedCount++;
        }
        // Update current event
        if (state.currentEvent?.id === action.payload.eventId && state.currentEvent.participants) {
          const participant = state.currentEvent.participants.find(p => p.memberId === action.payload.memberId);
          if (participant) {
            participant.status = 'YES';
          }
        }
      })
      .addCase(declineParticipation.fulfilled, (state, action) => {
        const event = state.events.find(e => e.id === action.payload.eventId);
        if (event) {
          event.declinedCount++;
        }
        if (state.currentEvent?.id === action.payload.eventId && state.currentEvent.participants) {
          const participant = state.currentEvent.participants.find(p => p.memberId === action.payload.memberId);
          if (participant) {
            participant.status = 'NO';
          }
        }
      })
      .addCase(maybeParticipation.fulfilled, (state, action) => {
        const event = state.events.find(e => e.id === action.payload.eventId);
        if (event) {
          event.maybeCount++;
        }
        if (state.currentEvent?.id === action.payload.eventId && state.currentEvent.participants) {
          const participant = state.currentEvent.participants.find(p => p.memberId === action.payload.memberId);
          if (participant) {
            participant.status = 'MAYBE';
          }
        }
      });
  },
});

export const { setFilter, clearError, clearCurrentEvent } = eventsSlice.actions;
export default eventsSlice.reducer;

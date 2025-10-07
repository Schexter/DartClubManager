/**
 * EventListScreen - Terminübersicht
 * 
 * Features:
 * - Liste aller Termine (Training, Matches, Meetings)
 * - Filter: Alle, Kommende, Vergangene
 * - Teilnehmerstatus anzeigen
 * - Zu-/Absagen direkt aus der Liste
 * - Neuen Termin erstellen
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppLayout } from '../../components/layout';
import { 
  fetchEvents, 
  setFilter, 
  confirmParticipation, 
  declineParticipation,
  maybeParticipation,
  Event 
} from './eventsSlice';
import { Calendar, Plus, MapPin, Users, Clock, Check, X, HelpCircle } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

export function EventListScreen() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { events, loading, error, filter } = useAppSelector(state => state.events);
  const currentUser = useAppSelector(state => state.auth.user);
  
  // Temporarily unused - will be needed for event detail modal
  // const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchEvents(filter));
  }, [dispatch, filter]);

  const handleFilterChange = (newFilter: 'all' | 'upcoming' | 'past') => {
    dispatch(setFilter(newFilter));
    dispatch(fetchEvents(newFilter));
  };

  const handleConfirm = async (eventId: string) => {
    if (!currentUser?.id) return;
    try {
      await dispatch(confirmParticipation({ 
        eventId, 
        memberId: currentUser.id 
      })).unwrap();
    } catch (error) {
      console.error('Fehler beim Zusagen:', error);
    }
  };

  const handleDecline = async (eventId: string) => {
    if (!currentUser?.id) return;
    try {
      await dispatch(declineParticipation({ 
        eventId, 
        memberId: currentUser.id 
      })).unwrap();
    } catch (error) {
      console.error('Fehler beim Absagen:', error);
    }
  };

  const handleMaybe = async (eventId: string) => {
    if (!currentUser?.id) return;
    try {
      await dispatch(maybeParticipation({ 
        eventId, 
        memberId: currentUser.id 
      })).unwrap();
    } catch (error) {
      console.error('Fehler beim Aktualisieren:', error);
    }
  };

  const getEventTypeLabel = (type: Event['eventType']) => {
    switch (type) {
      case 'TRAINING': return 'Training';
      case 'MATCH': return 'Match';
      case 'MEETING': return 'Meeting';
      case 'OTHER': return 'Sonstiges';
    }
  };

  const getEventTypeBadgeColor = (type: Event['eventType']) => {
    switch (type) {
      case 'TRAINING': return 'bg-blue-100 text-blue-800';
      case 'MATCH': return 'bg-red-100 text-red-800';
      case 'MEETING': return 'bg-purple-100 text-purple-800';
      case 'OTHER': return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading && events.length === 0) {
    return (
      <AppLayout>
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Lade Termine...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-8 h-8 text-primary" />
              Termine
            </h1>
            <p className="text-gray-600 mt-1">
              Verwalte Trainings, Matches und andere Termine
            </p>
          </div>
          <button
            onClick={() => navigate('/events/new')}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Neuer Termin
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => handleFilterChange('upcoming')}
            className={`px-4 py-2 font-medium transition-colors ${
              filter === 'upcoming'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Kommende
          </button>
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-4 py-2 font-medium transition-colors ${
              filter === 'all'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Alle
          </button>
          <button
            onClick={() => handleFilterChange('past')}
            className={`px-4 py-2 font-medium transition-colors ${
              filter === 'past'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Vergangene
          </button>
        </div>

        {/* Events List */}
        {events.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-lg shadow-md p-12 max-w-md mx-auto">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Keine Termine</h2>
              <p className="text-gray-600 mb-6">
                {filter === 'upcoming' && 'Es gibt aktuell keine kommenden Termine.'}
                {filter === 'past' && 'Es gibt keine vergangenen Termine.'}
                {filter === 'all' && 'Es wurden noch keine Termine erstellt.'}
              </p>
              <button
                onClick={() => navigate('/events/new')}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Ersten Termin erstellen
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map(event => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer"
                onClick={() => navigate(`/events/${event.id}`)}
              >
                <div className="flex justify-between items-start">
                  {/* Left Side: Event Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeBadgeColor(event.eventType)}`}>
                            {getEventTypeLabel(event.eventType)}
                          </span>
                          {event.isOngoing && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 animate-pulse">
                              🔴 LIVE
                            </span>
                          )}
                        </div>
                        
                        {/* Date & Time */}
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>
                              {format(new Date(event.startTime), 'dd.MM.yyyy, HH:mm', { locale: de })}
                              {event.endTime && ` - ${format(new Date(event.endTime), 'HH:mm')}`}
                            </span>
                          </div>
                        </div>

                        {/* Location */}
                        {event.location && (
                          <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        )}

                        {/* Description */}
                        {event.description && (
                          <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Participation & Stats */}
                  <div className="flex-shrink-0 ml-6">
                    {/* Participant Stats */}
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1 text-sm">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-gray-700">{event.confirmedCount}</span>
                        <span className="text-gray-500">zugesagt</span>
                      </div>
                      {event.capacity && (
                        <span className="text-sm text-gray-500">
                          / {event.capacity} {event.isFull && '(voll)'}
                        </span>
                      )}
                    </div>

                    {/* Participation Buttons (if not past) */}
                    {!event.isPast && (
                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleConfirm(event.id)}
                          className="p-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition-colors"
                          title="Zusagen"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleMaybe(event.id)}
                          className="p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition-colors"
                          title="Vielleicht"
                        >
                          <HelpCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDecline(event.id)}
                          className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                          title="Absagen"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

// Erstellt von Hans Hahn - Alle Rechte vorbehalten

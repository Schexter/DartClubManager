import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../../components/layout';
import { Calendar, Plus, MapPin, Users, Clock, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { eventService } from '../../lib/api/services';
import { Event, EventType, EVENT_TYPE_LABELS } from '../../types/event';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../auth/authSlice';

export function EventsScreen() {
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectUser);
  const isAdmin = currentUser?.role === 'admin';

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<EventType | 'ALL'>('ALL');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await eventService.getAll();
      setEvents(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Fehler beim Laden der Termine');
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((event) => {
    if (filterType === 'ALL') return true;
    return event.eventType === filterType;
  });

  const upcomingEvents = filteredEvents
    .filter((event) => !event.isPast)
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  const pastEvents = filteredEvents
    .filter((event) => event.isPast)
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getEventTypeColor = (type: EventType) => {
    const colors: Record<EventType, string> = {
      TRAINING: 'bg-blue-100 text-blue-800',
      MATCH: 'bg-red-100 text-red-800',
      FRIENDLY_MATCH: 'bg-orange-100 text-orange-800',
      MEETING: 'bg-purple-100 text-purple-800',
      TOURNAMENT: 'bg-green-100 text-green-800',
      OTHER: 'bg-gray-100 text-gray-800',
    };
    return colors[type];
  };

  const renderEventCard = (event: Event) => (
    <div
      key={event.id}
      onClick={() => navigate(`/events/${event.id}`)}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-primary-500"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEventTypeColor(event.eventType)}`}>
              {EVENT_TYPE_LABELS[event.eventType]}
            </span>
            {event.isOngoing && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500 text-white animate-pulse">
                Läuft gerade
              </span>
            )}
            {event.isFull && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                Ausgebucht
              </span>
            )}
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
          {event.description && (
            <p className="text-gray-600 mt-1 line-clamp-2">{event.description}</p>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center text-gray-600">
          <Calendar size={16} className="mr-2" />
          <span className="font-medium">{formatDate(event.startTime)}</span>
          <Clock size={16} className="ml-4 mr-2" />
          <span>
            {formatTime(event.startTime)}
            {event.endTime && ` - ${formatTime(event.endTime)}`}
          </span>
        </div>

        {event.location && (
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-2" />
            <span>{event.location}</span>
          </div>
        )}

        {event.teamName && (
          <div className="flex items-center text-gray-600">
            <Users size={16} className="mr-2" />
            <span>Team: {event.teamName}</span>
          </div>
        )}

        {/* Participation */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center text-green-600">
            <Users size={16} className="mr-1" />
            <span className="font-medium">{event.confirmedCount} zugesagt</span>
          </div>
          <div className="flex items-center text-red-600">
            <span className="font-medium">{event.declinedCount} abgesagt</span>
          </div>
          <div className="flex items-center text-yellow-600">
            <span className="font-medium">{event.maybeCount} vielleicht</span>
          </div>
          {event.capacity && (
            <div className="text-gray-600 ml-auto">
              <span className="font-medium">
                {event.confirmedCount}/{event.capacity} Plätze
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Lade Termine...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
          <button
            onClick={loadEvents}
            className="mt-2 text-red-700 underline hover:text-red-800"
          >
            Erneut versuchen
          </button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Termine</h1>
            <p className="text-gray-600 mt-1">
              {upcomingEvents.length} kommende Termine
            </p>
          </div>
          {isAdmin && (
            <button
              onClick={() => navigate('/events/new')}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Neuer Termin
            </button>
          )}
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-600" />
              <span className="font-medium text-gray-700">Filter:</span>
            </div>
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filterType === 'ALL'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Alle
            </button>
            {(Object.keys(EVENT_TYPE_LABELS) as EventType[]).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterType === type
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {EVENT_TYPE_LABELS[type]}
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Kommende Termine</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event) => renderEventCard(event))}
            </div>
          </div>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vergangene Termine</h2>
            <div className="space-y-4 opacity-75">
              {pastEvents.map((event) => renderEventCard(event))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Calendar size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Keine Termine gefunden
            </h3>
            <p className="text-gray-600 mb-6">
              {filterType === 'ALL'
                ? 'Es gibt noch keine Termine.'
                : `Es gibt keine Termine vom Typ "${EVENT_TYPE_LABELS[filterType]}".`}
            </p>
            {isAdmin && (
              <button
                onClick={() => navigate('/events/new')}
                className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                Ersten Termin erstellen
              </button>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

// Erstellt von Hans Hahn - Alle Rechte vorbehalten

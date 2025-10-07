/**
 * EventDetailScreen - Termin-Detailansicht mit Teilnehmern
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppLayout } from '../../components/layout';
import { 
  fetchEventById, 
  clearCurrentEvent, 
  deleteEvent,
  confirmParticipation,
  declineParticipation,
  maybeParticipation
} from './eventsSlice';
import { MapPin, Clock, Users, Edit, Trash2, ArrowLeft, Check, X, HelpCircle } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

export function EventDetailScreen() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { currentEvent, loading } = useAppSelector(state => state.events);
  const currentUser = useAppSelector(state => state.auth.user);

  useEffect(() => {
    if (id) {
      dispatch(fetchEventById(id));
    }
    return () => {
      dispatch(clearCurrentEvent());
    };
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (!id) return;
    if (!confirm('Möchtest du diesen Termin wirklich löschen?')) return;

    try {
      await dispatch(deleteEvent(id)).unwrap();
      navigate('/events');
    } catch (error) {
      alert('Fehler beim Löschen');
    }
  };

  const handleConfirm = async () => {
    if (!id || !currentUser?.id) return;
    try {
      await dispatch(confirmParticipation({ eventId: id, memberId: currentUser.id })).unwrap();
    } catch (error) {
      console.error('Fehler:', error);
    }
  };

  const handleDecline = async () => {
    if (!id || !currentUser?.id) return;
    try {
      await dispatch(declineParticipation({ eventId: id, memberId: currentUser.id })).unwrap();
    } catch (error) {
      console.error('Fehler:', error);
    }
  };

  const handleMaybe = async () => {
    if (!id || !currentUser?.id) return;
    try {
      await dispatch(maybeParticipation({ eventId: id, memberId: currentUser.id })).unwrap();
    } catch (error) {
      console.error('Fehler:', error);
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'TRAINING': return 'Training';
      case 'MATCH': return 'Match';
      case 'MEETING': return 'Meeting';
      case 'OTHER': return 'Sonstiges';
      default: return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'YES':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center gap-1"><Check className="w-3 h-3" /> Zugesagt</span>;
      case 'NO':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium flex items-center gap-1"><X className="w-3 h-3" /> Abgesagt</span>;
      case 'MAYBE':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium flex items-center gap-1"><HelpCircle className="w-3 h-3" /> Vielleicht</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Ausstehend</span>;
    }
  };

  if (loading || !currentEvent) {
    return (
      <AppLayout>
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Lade Termin...</p>
        </div>
      </AppLayout>
    );
  }

  const confirmedParticipants = currentEvent.participants?.filter(p => p.status === 'YES') || [];
  const declinedParticipants = currentEvent.participants?.filter(p => p.status === 'NO') || [];
  const maybeParticipants = currentEvent.participants?.filter(p => p.status === 'MAYBE') || [];

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/events')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück zur Übersicht
          </button>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentEvent.title}</h1>
              <span className="px-3 py-1 bg-primary-light text-primary rounded-full text-sm font-medium">
                {getEventTypeLabel(currentEvent.eventType)}
              </span>
              {currentEvent.isOngoing && (
                <span className="ml-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium animate-pulse">
                  🔴 LIVE
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/events/${id}/edit`)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                title="Bearbeiten"
              >
                <Edit className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                title="Löschen"
              >
                <Trash2 className="w-5 h-5 text-red-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Event Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="space-y-4">
            {/* Date & Time */}
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">
                  {format(new Date(currentEvent.startTime), 'dd. MMMM yyyy, HH:mm', { locale: de })} Uhr
                </p>
                {currentEvent.endTime && (
                  <p className="text-sm text-gray-600">
                    bis {format(new Date(currentEvent.endTime), 'HH:mm')} Uhr
                  </p>
                )}
              </div>
            </div>

            {/* Location */}
            {currentEvent.location && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                <p className="text-gray-900">{currentEvent.location}</p>
              </div>
            )}

            {/* Participants */}
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-gray-900">
                  <span className="font-medium">{currentEvent.confirmedCount}</span> Teilnehmer zugesagt
                  {currentEvent.capacity && ` (von max. ${currentEvent.capacity})`}
                </p>
                {currentEvent.isFull && (
                  <p className="text-sm text-red-600 font-medium mt-1">Termin ist ausgebucht</p>
                )}
              </div>
            </div>

            {/* Description */}
            {currentEvent.description && (
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Beschreibung</h3>
                <p className="text-gray-600 whitespace-pre-wrap">{currentEvent.description}</p>
              </div>
            )}

            {/* Notes (Admin only) */}
            {currentEvent.notes && (
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Interne Notizen</h3>
                <p className="text-gray-600 whitespace-pre-wrap">{currentEvent.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Participation Actions */}
        {!currentEvent.isPast && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="font-medium text-gray-900 mb-4">Deine Teilnahme</h3>
            <div className="flex gap-3">
              <button
                onClick={handleConfirm}
                className="flex-1 py-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Zusagen
              </button>
              <button
                onClick={handleMaybe}
                className="flex-1 py-3 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <HelpCircle className="w-5 h-5" />
                Vielleicht
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 py-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Absagen
              </button>
            </div>
          </div>
        )}

        {/* Participants List */}
        {currentEvent.participants && currentEvent.participants.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-medium text-gray-900 mb-4">Teilnehmer ({currentEvent.participants.length})</h3>
            
            {/* Confirmed */}
            {confirmedParticipants.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Zugesagt ({confirmedParticipants.length})
                </h4>
                <div className="space-y-2">
                  {confirmedParticipants.map(participant => (
                    <div key={participant.memberId} className="flex items-center justify-between py-2 px-3 bg-green-50 rounded-lg">
                      <span className="text-gray-900">{participant.memberName}</span>
                      {getStatusBadge(participant.status)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Maybe */}
            {maybeParticipants.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-yellow-600" />
                  Vielleicht ({maybeParticipants.length})
                </h4>
                <div className="space-y-2">
                  {maybeParticipants.map(participant => (
                    <div key={participant.memberId} className="flex items-center justify-between py-2 px-3 bg-yellow-50 rounded-lg">
                      <span className="text-gray-900">{participant.memberName}</span>
                      {getStatusBadge(participant.status)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Declined */}
            {declinedParticipants.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <X className="w-4 h-4 text-red-600" />
                  Abgesagt ({declinedParticipants.length})
                </h4>
                <div className="space-y-2">
                  {declinedParticipants.map(participant => (
                    <div key={participant.memberId} className="flex items-center justify-between py-2 px-3 bg-red-50 rounded-lg">
                      <span className="text-gray-900">{participant.memberName}</span>
                      {getStatusBadge(participant.status)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

// Erstellt von Hans Hahn - Alle Rechte vorbehalten

/**
 * EventFormScreen - Termin erstellen/bearbeiten
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppLayout } from '../../components/layout';
import { createEvent, updateEvent, fetchEventById, clearCurrentEvent } from './eventsSlice';
import { Calendar, ArrowLeft, Save } from 'lucide-react';

export function EventFormScreen() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { currentEvent, loading } = useAppSelector(state => state.events);
  const currentUser = useAppSelector(state => state.auth.user);

  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: 'TRAINING' as 'TRAINING' | 'MATCH' | 'MEETING' | 'OTHER',
    startTime: '',
    endTime: '',
    location: '',
    capacity: '' as string,
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditMode && id) {
      dispatch(fetchEventById(id));
    }
    return () => {
      dispatch(clearCurrentEvent());
    };
  }, [dispatch, id, isEditMode]);

  useEffect(() => {
    if (currentEvent && isEditMode) {
      setFormData({
        title: currentEvent.title,
        description: currentEvent.description || '',
        eventType: currentEvent.eventType,
        startTime: currentEvent.startTime,
        endTime: currentEvent.endTime || '',
        location: currentEvent.location || '',
        capacity: currentEvent.capacity?.toString() || '',
        notes: currentEvent.notes || '',
      });
    }
  }, [currentEvent, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Titel ist erforderlich';
    }

    if (!formData.startTime) {
      newErrors.startTime = 'Startzeit ist erforderlich';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    if (!currentUser?.id) {
      alert('Fehler: Kein Benutzer eingeloggt');
      return;
    }

    try {
      const eventData = {
        title: formData.title,
        description: formData.description || undefined,
        eventType: formData.eventType,
        startTime: formData.startTime,
        endTime: formData.endTime || undefined,
        location: formData.location || undefined,
        capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
        notes: formData.notes || undefined,
        createdBy: currentUser.id,
      };

      if (isEditMode && id) {
        await dispatch(updateEvent({ id, ...eventData })).unwrap();
      } else {
        await dispatch(createEvent(eventData)).unwrap();
      }

      navigate('/events');
    } catch (error: any) {
      alert(error || 'Fehler beim Speichern');
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="w-8 h-8 text-primary" />
            {isEditMode ? 'Termin bearbeiten' : 'Neuer Termin'}
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-6">
            {/* Titel */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Titel *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="z.B. Training Kreisliga"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            {/* Event-Typ */}
            <div>
              <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">
                Typ
              </label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="TRAINING">Training</option>
                <option value="MATCH">Match</option>
                <option value="MEETING">Meeting</option>
                <option value="OTHER">Sonstiges</option>
              </select>
            </div>

            {/* Start- und Endzeit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2">
                  Startzeit *
                </label>
                <input
                  type="datetime-local"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.startTime ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.startTime && <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>}
              </div>

              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-2">
                  Endzeit (optional)
                </label>
                <input
                  type="datetime-local"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Ort */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Ort
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="z.B. Sporthalle Mitte"
              />
            </div>

            {/* Kapazität */}
            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-2">
                Max. Teilnehmer (optional)
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="z.B. 20"
              />
              <p className="mt-1 text-sm text-gray-500">Leer lassen für unbegrenzte Kapazität</p>
            </div>

            {/* Beschreibung */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Beschreibung
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Weitere Informationen zum Termin..."
              />
            </div>

            {/* Notizen */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Interne Notizen
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Notizen für Trainer/Organisatoren..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {loading ? 'Speichern...' : isEditMode ? 'Änderungen speichern' : 'Termin erstellen'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/events')}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Abbrechen
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

// Erstellt von Hans Hahn - Alle Rechte vorbehalten

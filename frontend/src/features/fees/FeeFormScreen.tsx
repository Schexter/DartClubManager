/**
 * FeeFormScreen.tsx
 * 
 * Formular zum Erstellen und Bearbeiten von Beitragssätzen.
 * 
 * Erstellt von Hans Hahn - Alle Rechte vorbehalten
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchFeeById, createFee, updateFee } from './feesSlice';
import { AppLayout } from '../../components/layout/AppLayout';
import { Button, Card } from '../../components/ui';
import { FeePeriod, CreateFeeRequest } from '../../lib/api/types';

export const FeeFormScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isEditMode = !!id;
  
  // Redux State
  const { selectedFee, isLoading } = useAppSelector(state => state.fees);
  
  // Form State
  const [formData, setFormData] = useState<CreateFeeRequest>({
    name: '',
    amount: 0,
    period: FeePeriod.MONTHLY,
    description: '',
    isActive: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load fee for editing
  useEffect(() => {
    if (isEditMode && id) {
      dispatch(fetchFeeById(id));
    }
  }, [isEditMode, id, dispatch]);

  // Populate form with existing fee data
  useEffect(() => {
    if (isEditMode && selectedFee) {
      setFormData({
        name: selectedFee.name,
        amount: selectedFee.amount,
        period: selectedFee.period,
        description: selectedFee.description || '',
        isActive: selectedFee.isActive,
      });
    }
  }, [isEditMode, selectedFee]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' 
        ? parseFloat(value) || 0 
        : type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      alert('Bitte geben Sie einen Namen ein.');
      return;
    }
    if (formData.amount <= 0) {
      alert('Der Betrag muss größer als 0 sein.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (isEditMode && id) {
        // Update
        await dispatch(updateFee({ id, data: formData })).unwrap();
        alert('Beitragssatz erfolgreich aktualisiert!');
      } else {
        // Create
        await dispatch(createFee(formData)).unwrap();
        alert('Beitragssatz erfolgreich erstellt!');
      }
      navigate('/fees');
    } catch (error: any) {
      console.error('Fehler beim Speichern:', error);
      const errorMessage = error?.message || error?.error || 'Fehler beim Speichern.';
      alert(`Fehler: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditMode && isLoading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/fees')}
            className="text-gray-600 hover:text-gray-900 mb-4 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zurück zur Übersicht
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? 'Beitragssatz bearbeiten' : 'Neuer Beitragssatz'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEditMode 
              ? 'Ändern Sie die Details des Beitragssatzes' 
              : 'Erstellen Sie einen neuen Beitragssatz für Ihren Verein'
            }
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card>
            <Card.Content className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="z.B. Monatsbeitrag, Jahresbeitrag"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Geben Sie dem Beitragssatz einen aussagekräftigen Namen
                </p>
              </div>

              {/* Betrag */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  Betrag (€) *
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Der Betrag in Euro (z.B. 20.00 für 20 Euro)
                </p>
              </div>

              {/* Periode */}
              <div>
                <label htmlFor="period" className="block text-sm font-medium text-gray-700 mb-2">
                  Periode *
                </label>
                <select
                  id="period"
                  name="period"
                  value={formData.period}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value={FeePeriod.YEARLY}>Jährlich</option>
                  <option value={FeePeriod.QUARTERLY}>Quartalsweise</option>
                  <option value={FeePeriod.MONTHLY}>Monatlich</option>
                  <option value={FeePeriod.ONCE}>Einmalig</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Wie oft wird dieser Beitrag fällig?
                </p>
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
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Optionale Beschreibung des Beitragssatzes"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Zusätzliche Informationen zum Beitragssatz (optional)
                </p>
              </div>

              {/* Status (nur im Edit-Modus) */}
              {isEditMode && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isActive" className="ml-2 text-sm font-medium text-gray-700">
                    Beitragssatz ist aktiv
                  </label>
                </div>
              )}

              {/* Hinweis */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 Hinweis</h4>
                <p className="text-sm text-blue-800">
                  Nach dem Erstellen können Sie diesen Beitragssatz Mitgliedern zuweisen. 
                  Der Betrag wird basierend auf der gewählten Periode automatisch berechnet.
                </p>
              </div>
            </Card.Content>
          </Card>

          {/* Aktionen */}
          <div className="flex gap-3 justify-end mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/fees')}
              disabled={isSubmitting}
            >
              Abbrechen
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? 'Wird gespeichert...' 
                : isEditMode 
                ? 'Änderungen speichern' 
                : 'Beitragssatz erstellen'
              }
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

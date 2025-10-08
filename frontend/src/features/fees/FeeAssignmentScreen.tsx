/**
 * FeeAssignmentScreen.tsx
 * 
 * Screen zum Zuweisen von Beitragssätzen an Mitglieder.
 * Ermöglicht Auswahl von Mitgliedern und Beitragssätzen,
 * sowie Festlegung des Fälligkeitsdatums.
 * 
 * Erstellt von Hans Hahn - Alle Rechte vorbehalten
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchFees, createAssignment } from './feesSlice';
import { fetchMembers } from '../members/membersSlice';
import { AppLayout } from '../../components/layout/AppLayout';
import { Button, Card } from '../../components/ui';

export const FeeAssignmentScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Redux State
  const { fees, isLoading: feesLoading } = useAppSelector(state => state.fees);
  const { members, isLoading: membersLoading } = useAppSelector(state => state.members);
  
  // Local State
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [selectedFeeType, setSelectedFeeType] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load data on mount
  useEffect(() => {
    dispatch(fetchFees(true)); // Nur aktive Beiträge
    dispatch(fetchMembers());
  }, [dispatch]);

  // Set default due date to today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDueDate(today);
  }, []);

  const handleMemberToggle = (memberId: string) => {
    setSelectedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSelectAll = () => {
    const filteredMemberIds = filteredMembers.map(m => m.id);
    setSelectedMembers(prev =>
      prev.length === filteredMemberIds.length ? [] : filteredMemberIds
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedMembers.length === 0) {
      alert('Bitte wählen Sie mindestens ein Mitglied aus.');
      return;
    }
    
    if (!selectedFeeType) {
      alert('Bitte wählen Sie einen Beitragssatz aus.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Für jedes Mitglied eine Zuweisung erstellen
      const assignments = selectedMembers.map(memberId => ({
        feeId: selectedFeeType,
        memberId,
        // Backend erwartet startDate als LocalDate (nur Datum, keine Zeit!)
        startDate: dueDate, // Format: YYYY-MM-DD
        status: 'ACTIVE',
      }));

      // Alle Zuweisungen parallel erstellen
      const results = await Promise.all(
        assignments.map(assignment => 
          dispatch(createAssignment(assignment)).unwrap()
        )
      );
      
      alert(`Beitrag erfolgreich ${selectedMembers.length} Mitglied(ern) zugewiesen!`);
      navigate('/fees');
    } catch (error: any) {
      console.error('Fehler beim Zuweisen:', error);
      const errorMessage = error?.message || error?.error || 'Fehler beim Zuweisen des Beitrags.';
      alert(`Fehler: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredMembers = members.filter(member =>
    `${member.firstName} ${member.lastName} ${member.email || ''}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const selectedFee = fees.find(f => f.id === selectedFeeType);

  const isLoading = feesLoading || membersLoading;

  // Period Translation Helper
  const getPeriodText = (period: string) => {
    switch (period) {
      case 'YEARLY': return 'Jährlich';
      case 'MONTHLY': return 'Monatlich';
      case 'ONCE': return 'Einmalig';
      default: return period;
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
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
          <h1 className="text-3xl font-bold text-gray-900">Beitrag zuweisen</h1>
          <p className="text-gray-600 mt-2">Weisen Sie Mitgliedern einen Beitragssatz zu</p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Beitragssatz auswählen */}
            <Card>
              <Card.Header>
                <Card.Title>1. Beitragssatz auswählen</Card.Title>
              </Card.Header>
              <Card.Content>
                {fees.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">Keine Beitragssätze verfügbar.</p>
                    <Button
                      type="button"
                      onClick={() => navigate('/fees/create')}
                    >
                      Beitragssatz erstellen
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {fees.map(feeType => (
                      <label
                        key={feeType.id}
                        className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <input
                          type="radio"
                          name="feeType"
                          value={feeType.id}
                          checked={selectedFeeType === feeType.id}
                          onChange={(e) => setSelectedFeeType(e.target.value)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">{feeType.name}</span>
                            <span className="text-lg font-bold text-blue-600">
                              {feeType.amount.toFixed(2)} €
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {getPeriodText(feeType.period)}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </Card.Content>
            </Card>

            {/* Startdatum */}
            <Card>
              <Card.Header>
                <Card.Title>2. Startdatum festlegen</Card.Title>
              </Card.Header>
              <Card.Content>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  Das Startdatum bestimmt, ab wann der Beitrag gültig ist und Zahlungen fällig werden.
                </p>
              </Card.Content>
            </Card>

            {/* Mitglieder auswählen */}
            <Card>
              <Card.Header>
                <div className="flex items-center justify-between">
                  <Card.Title>3. Mitglieder auswählen ({selectedMembers.length})</Card.Title>
                  {filteredMembers.length > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleSelectAll}
                    >
                      {selectedMembers.length === filteredMembers.length ? 'Alle abwählen' : 'Alle auswählen'}
                    </Button>
                  )}
                </div>
              </Card.Header>
              <Card.Content>
                {members.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">Keine Mitglieder verfügbar.</p>
                    <Button
                      type="button"
                      onClick={() => navigate('/members/create')}
                    >
                      Mitglied erstellen
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Suchfeld */}
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Mitglied suchen..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Mitglieder-Liste */}
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {filteredMembers.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">Keine Mitglieder gefunden.</p>
                      ) : (
                        filteredMembers.map(member => (
                          <label
                            key={member.id}
                            className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={selectedMembers.includes(member.id)}
                              onChange={() => handleMemberToggle(member.id)}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <div className="ml-3 flex-1">
                              <div className="font-medium text-gray-900">
                                {member.firstName} {member.lastName}
                              </div>
                              {member.email && (
                                <div className="text-sm text-gray-500">{member.email}</div>
                              )}
                            </div>
                          </label>
                        ))
                      )}
                    </div>
                  </>
                )}
              </Card.Content>
            </Card>

            {/* Zusammenfassung */}
            {selectedMembers.length > 0 && selectedFee && (
              <Card className="bg-blue-50 border-blue-200">
                <Card.Content>
                  <h3 className="font-semibold text-gray-900 mb-3">Zusammenfassung</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Beitragssatz:</span>
                      <span className="font-medium text-gray-900">{selectedFee.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Betrag:</span>
                      <span className="font-medium text-gray-900">{selectedFee.amount.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Startdatum:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(dueDate).toLocaleDateString('de-DE')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Anzahl Mitglieder:</span>
                      <span className="font-medium text-gray-900">{selectedMembers.length}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-blue-300">
                      <span className="font-semibold text-gray-900">Gesamtsumme:</span>
                      <span className="font-bold text-blue-600">
                        {(selectedFee.amount * selectedMembers.length).toFixed(2)} €
                      </span>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            )}

            {/* Aktionen */}
            <div className="flex gap-3 justify-end">
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
                disabled={isSubmitting || selectedMembers.length === 0 || !selectedFeeType || fees.length === 0}
              >
                {isSubmitting ? 'Wird zugewiesen...' : 'Beitrag zuweisen'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </AppLayout>
  );
};

/**
 * PaymentRecordScreen.tsx
 * 
 * Screen zum manuellen Erfassen von Beitragszahlungen.
 * Ermöglicht die Auswahl von offenen Beiträgen und
 * Eingabe von Zahlungsdetails.
 * 
 * Erstellt von Hans Hahn - Alle Rechte vorbehalten
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { Button, Card, Badge } from '../../components/ui';

// Mock data - später durch Redux/API ersetzen
const mockOpenPayments = [
  {
    id: '1',
    member: { id: '1', firstName: 'Max', lastName: 'Mustermann' },
    feeType: { name: 'Jahresbeitrag Erwachsene', amount: 120.00 },
    dueDate: '2024-12-31',
    status: 'OPEN' as const,
  },
  {
    id: '2',
    member: { id: '2', firstName: 'Anna', lastName: 'Schmidt' },
    feeType: { name: 'Jahresbeitrag Erwachsene', amount: 120.00 },
    dueDate: '2024-11-30',
    status: 'OVERDUE' as const,
  },
  {
    id: '3',
    member: { id: '3', firstName: 'Tom', lastName: 'Weber' },
    feeType: { name: 'Monatsbeitrag', amount: 12.00 },
    dueDate: '2024-10-31',
    status: 'OPEN' as const,
  },
  {
    id: '4',
    member: { id: '4', firstName: 'Lisa', lastName: 'Meyer' },
    feeType: { name: 'Trainingsgebühr', amount: 5.00 },
    dueDate: '2024-09-30',
    status: 'OVERDUE' as const,
  },
];

type PaymentMethod = 'CASH' | 'BANK_TRANSFER' | 'SEPA' | 'CARD';

const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: 'CASH', label: 'Bar' },
  { value: 'BANK_TRANSFER', label: 'Überweisung' },
  { value: 'SEPA', label: 'SEPA-Lastschrift' },
  { value: 'CARD', label: 'Karte' },
];

export const PaymentRecordScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>('');
  const [paymentDate, setPaymentDate] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('BANK_TRANSFER');
  const [notes, setNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'OPEN' | 'OVERDUE'>('ALL');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set default payment date to today
  React.useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setPaymentDate(today);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPaymentId) {
      alert('Bitte wählen Sie einen Beitrag aus.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // TODO: API Call
      // await dispatch(recordPayment({ paymentId: selectedPaymentId, paymentDate, paymentMethod, notes }))
      
      console.log('Zahlung erfassen:', {
        paymentId: selectedPaymentId,
        paymentDate,
        paymentMethod,
        notes,
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Zahlung erfolgreich erfasst!');
      navigate('/fees');
    } catch (error) {
      console.error('Fehler beim Erfassen der Zahlung:', error);
      alert('Fehler beim Erfassen der Zahlung.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPayments = mockOpenPayments.filter(payment => {
    const matchesSearch = `${payment.member.firstName} ${payment.member.lastName} ${payment.feeType.name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'ALL' || payment.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const selectedPayment = mockOpenPayments.find(p => p.id === selectedPaymentId);

  const getStatusBadge = (status: 'OPEN' | 'OVERDUE') => {
    if (status === 'OVERDUE') {
      return <Badge variant="error">Überfällig</Badge>;
    }
    return <Badge variant="warning">Offen</Badge>;
  };

  const getDaysOverdue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
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
          <h1 className="text-3xl font-bold text-gray-900">Zahlung erfassen</h1>
          <p className="text-gray-600 mt-2">Erfassen Sie manuelle Beitragszahlungen</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Offene Beiträge */}
          <Card>
            <Card.Header>
              <Card.Title>1. Offenen Beitrag auswählen</Card.Title>
            </Card.Header>
            <Card.Content>
              {/* Filter & Suche */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Mitglied oder Beitrag suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="ALL">Alle</option>
                  <option value="OPEN">Nur Offene</option>
                  <option value="OVERDUE">Nur Überfällige</option>
                </select>
              </div>

              {/* Beitrags-Liste */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredPayments.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Keine offenen Beiträge gefunden.</p>
                ) : (
                  filteredPayments.map(payment => {
                    const daysOverdue = getDaysOverdue(payment.dueDate);
                    
                    return (
                      <label
                        key={payment.id}
                        className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedPaymentId === payment.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={payment.id}
                          checked={selectedPaymentId === payment.id}
                          onChange={(e) => setSelectedPaymentId(e.target.value)}
                          className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">
                              {payment.member.firstName} {payment.member.lastName}
                            </span>
                            {getStatusBadge(payment.status)}
                          </div>
                          <div className="text-sm text-gray-600 mb-1">
                            {payment.feeType.name}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              Fällig: {new Date(payment.dueDate).toLocaleDateString('de-DE')}
                              {daysOverdue > 0 && (
                                <span className="text-red-600 font-medium ml-2">
                                  ({daysOverdue} Tag{daysOverdue !== 1 ? 'e' : ''} überfällig)
                                </span>
                              )}
                            </span>
                            <span className="text-lg font-bold text-blue-600">
                              {payment.feeType.amount.toFixed(2)} €
                            </span>
                          </div>
                        </div>
                      </label>
                    );
                  })
                )}
              </div>
            </Card.Content>
          </Card>

          {/* Zahlungsdetails */}
          {selectedPayment && (
            <>
              <Card>
                <Card.Header>
                  <Card.Title>2. Zahlungsdetails eingeben</Card.Title>
                </Card.Header>
                <Card.Content>
                  <div className="space-y-4">
                    {/* Zahlungsdatum */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Zahlungsdatum *
                      </label>
                      <input
                        type="date"
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Zahlungsmethode */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Zahlungsmethode *
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {PAYMENT_METHODS.map(method => (
                          <label
                            key={method.value}
                            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                              paymentMethod === method.value
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:bg-gray-50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.value}
                              checked={paymentMethod === method.value}
                              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm font-medium text-gray-900">
                              {method.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Notizen */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notizen (optional)
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        placeholder="z.B. Referenznummer, besondere Umstände..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>
                </Card.Content>
              </Card>

              {/* Zusammenfassung */}
              <Card className="bg-green-50 border-green-200">
                <Card.Content>
                  <h3 className="font-semibold text-gray-900 mb-3">Zusammenfassung</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mitglied:</span>
                      <span className="font-medium text-gray-900">
                        {selectedPayment.member.firstName} {selectedPayment.member.lastName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Beitrag:</span>
                      <span className="font-medium text-gray-900">
                        {selectedPayment.feeType.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Zahlungsdatum:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(paymentDate).toLocaleDateString('de-DE')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Zahlungsmethode:</span>
                      <span className="font-medium text-gray-900">
                        {PAYMENT_METHODS.find(m => m.value === paymentMethod)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-green-300">
                      <span className="font-semibold text-gray-900">Betrag:</span>
                      <span className="font-bold text-green-600">
                        {selectedPayment.feeType.amount.toFixed(2)} €
                      </span>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            </>
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
              disabled={isSubmitting || !selectedPaymentId}
            >
              {isSubmitting ? 'Wird erfasst...' : 'Zahlung erfassen'}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

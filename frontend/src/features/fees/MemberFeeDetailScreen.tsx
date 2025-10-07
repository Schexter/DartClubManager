/**
 * MemberFeeDetailScreen.tsx
 * 
 * Screen zur Anzeige aller Beiträge und Zahlungen eines Mitglieds.
 * Zeigt Historie, offene Beiträge und Zahlungsstatistiken.
 * 
 * Erstellt von Hans Hahn - Alle Rechte vorbehalten
 */

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { Button, Card, Badge } from '../../components/ui';

// Mock data - später durch Redux/API ersetzen
const mockMemberData = {
  id: '1',
  firstName: 'Max',
  lastName: 'Mustermann',
  email: 'max@example.com',
  memberSince: '2020-01-15',
  fees: [
    {
      id: '1',
      feeType: { name: 'Jahresbeitrag 2024', amount: 120.00 },
      dueDate: '2024-12-31',
      status: 'PAID' as const,
      payment: {
        paymentDate: '2024-01-15',
        paymentMethod: 'BANK_TRANSFER',
        amount: 120.00,
      },
    },
    {
      id: '2',
      feeType: { name: 'Jahresbeitrag 2023', amount: 110.00 },
      dueDate: '2023-12-31',
      status: 'PAID' as const,
      payment: {
        paymentDate: '2023-02-10',
        paymentMethod: 'CASH',
        amount: 110.00,
      },
    },
    {
      id: '3',
      feeType: { name: 'Trainingsgebühr März', amount: 5.00 },
      dueDate: '2024-03-31',
      status: 'OPEN' as const,
    },
    {
      id: '4',
      feeType: { name: 'Monatsbeitrag Februar', amount: 12.00 },
      dueDate: '2024-02-29',
      status: 'OVERDUE' as const,
    },
  ],
};

export const MemberFeeDetailScreen: React.FC = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const navigate = useNavigate();
  
  // TODO: Fetch member data from API
  const member = mockMemberData;

  const paidFees = member.fees.filter(f => f.status === 'PAID');
  const openFees = member.fees.filter(f => f.status === 'OPEN');
  const overdueFees = member.fees.filter(f => f.status === 'OVERDUE');

  const totalPaid = paidFees.reduce((sum, fee) => sum + (fee.payment?.amount || 0), 0);
  const totalOpen = openFees.reduce((sum, fee) => sum + fee.feeType.amount, 0);
  const totalOverdue = overdueFees.reduce((sum, fee) => sum + fee.feeType.amount, 0);

  const getStatusBadge = (status: 'PAID' | 'OPEN' | 'OVERDUE') => {
    switch (status) {
      case 'PAID':
        return <Badge variant="success">Bezahlt</Badge>;
      case 'OPEN':
        return <Badge variant="warning">Offen</Badge>;
      case 'OVERDUE':
        return <Badge variant="error">Überfällig</Badge>;
      default:
        return null;
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    const methods: Record<string, string> = {
      CASH: 'Bar',
      BANK_TRANSFER: 'Überweisung',
      SEPA: 'SEPA-Lastschrift',
      CARD: 'Karte',
    };
    return methods[method] || method;
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 py-8">
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
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {member.firstName} {member.lastName}
              </h1>
              <p className="text-gray-600 mt-1">
                Mitglied seit {new Date(member.memberSince).toLocaleDateString('de-DE')} • {member.email}
              </p>
            </div>
            <Button
              onClick={() => navigate(`/fees/record?memberId=${memberId}`)}
              className="mt-4 sm:mt-0"
            >
              Zahlung erfassen
            </Button>
          </div>
        </div>

        {/* Statistik-Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card>
            <Card.Content className="text-center py-6">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {totalPaid.toFixed(2)} €
              </div>
              <div className="text-sm text-gray-600">Bezahlt ({paidFees.length})</div>
            </Card.Content>
          </Card>
          
          <Card>
            <Card.Content className="text-center py-6">
              <div className="text-3xl font-bold text-yellow-600 mb-1">
                {totalOpen.toFixed(2)} €
              </div>
              <div className="text-sm text-gray-600">Offen ({openFees.length})</div>
            </Card.Content>
          </Card>
          
          <Card>
            <Card.Content className="text-center py-6">
              <div className="text-3xl font-bold text-red-600 mb-1">
                {totalOverdue.toFixed(2)} €
              </div>
              <div className="text-sm text-gray-600">Überfällig ({overdueFees.length})</div>
            </Card.Content>
          </Card>
        </div>

        {/* Überfällige Beiträge (falls vorhanden) */}
        {overdueFees.length > 0 && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <Card.Header>
              <Card.Title className="text-red-900">
                ⚠️ Überfällige Beiträge
              </Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                {overdueFees.map(fee => {
                  const daysOverdue = Math.ceil(
                    (new Date().getTime() - new Date(fee.dueDate).getTime()) / (1000 * 60 * 60 * 24)
                  );
                  
                  return (
                    <div
                      key={fee.id}
                      className="flex items-center justify-between p-4 bg-white rounded-lg border border-red-200"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 mb-1">
                          {fee.feeType.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          Fällig: {new Date(fee.dueDate).toLocaleDateString('de-DE')}
                          <span className="text-red-600 font-medium ml-2">
                            ({daysOverdue} Tag{daysOverdue !== 1 ? 'e' : ''} überfällig)
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-red-600 mb-1">
                          {fee.feeType.amount.toFixed(2)} €
                        </div>
                        {getStatusBadge(fee.status)}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4">
                <Button
                  onClick={() => navigate(`/fees/record?memberId=${memberId}`)}
                  variant="primary"
                  className="w-full sm:w-auto"
                >
                  Zahlung jetzt erfassen
                </Button>
              </div>
            </Card.Content>
          </Card>
        )}

        {/* Offene Beiträge */}
        {openFees.length > 0 && (
          <Card className="mb-6">
            <Card.Header>
              <Card.Title>Offene Beiträge ({openFees.length})</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                {openFees.map(fee => (
                  <div
                    key={fee.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 mb-1">
                        {fee.feeType.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        Fällig: {new Date(fee.dueDate).toLocaleDateString('de-DE')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600 mb-1">
                        {fee.feeType.amount.toFixed(2)} €
                      </div>
                      {getStatusBadge(fee.status)}
                    </div>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>
        )}

        {/* Zahlungshistorie */}
        <Card>
          <Card.Header>
            <Card.Title>Zahlungshistorie ({paidFees.length})</Card.Title>
          </Card.Header>
          <Card.Content>
            {paidFees.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Noch keine Zahlungen erfasst.
              </p>
            ) : (
              <div className="space-y-3">
                {paidFees.map(fee => (
                  <div
                    key={fee.id}
                    className="flex items-start justify-between p-4 bg-green-50 rounded-lg border border-green-200"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">
                          {fee.feeType.name}
                        </span>
                        {getStatusBadge(fee.status)}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>
                          Fällig: {new Date(fee.dueDate).toLocaleDateString('de-DE')}
                        </div>
                        {fee.payment && (
                          <>
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>
                                Bezahlt am: {new Date(fee.payment.paymentDate).toLocaleDateString('de-DE')}
                              </span>
                            </div>
                            <div>
                              Methode: {getPaymentMethodLabel(fee.payment.paymentMethod)}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        {fee.payment?.amount.toFixed(2) || fee.feeType.amount.toFixed(2)} €
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Zusammenfassung */}
        <Card className="mt-6 bg-gray-50">
          <Card.Content>
            <h3 className="font-semibold text-gray-900 mb-3">Gesamtübersicht</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Gesamt bezahlt:</span>
                <span className="font-medium text-green-600">{totalPaid.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gesamt offen:</span>
                <span className="font-medium text-yellow-600">{totalOpen.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gesamt überfällig:</span>
                <span className="font-medium text-red-600">{totalOverdue.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-300">
                <span className="font-semibold text-gray-900">Gesamt ausstehend:</span>
                <span className="font-bold text-blue-600">
                  {(totalOpen + totalOverdue).toFixed(2)} €
                </span>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </AppLayout>
  );
};

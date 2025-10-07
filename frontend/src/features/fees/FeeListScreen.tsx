/**
 * FeeListScreen.tsx
 * 
 * Übersichtsseite für Beitragsverwaltung.
 * Zeigt Beitragssätze und Zahlungsstatus an.
 * 
 * Erstellt von Hans Hahn - Alle Rechte vorbehalten
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { fetchFees, deleteFee } from './feesSlice';
import { AppLayout } from '../../components/layout/AppLayout';
import { Button, Card } from '../../components/ui';
import { CreditCard, Plus, CheckCircle, Users, Euro } from 'lucide-react';

export const FeeListScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Redux State
  const { fees, isLoading } = useAppSelector(state => state.fees);
  
  // Local State
  const [activeTab, setActiveTab] = useState<'fees' | 'status'>('fees');
  
  // Load fees on mount
  useEffect(() => {
    dispatch(fetchFees(false)); // Lade alle Beiträge (auch inaktive)
  }, [dispatch]);

  const handleDeactivate = async (id: string, name: string) => {
    if (window.confirm(`Möchten Sie den Beitragssatz "${name}" wirklich deaktivieren?`)) {
      try {
        await dispatch(deleteFee(id)).unwrap();
        alert('Beitragssatz erfolgreich deaktiviert!');
      } catch (error) {
        console.error('Fehler beim Deaktivieren:', error);
        alert('Fehler beim Deaktivieren des Beitragssatzes.');
      }
    }
  };

  // Period Translation Helper
  const getPeriodText = (period: string) => {
    switch (period) {
      case 'YEARLY': return 'Jährlich';
      case 'QUARTERLY': return 'Quartalsweise';
      case 'MONTHLY': return 'Monatlich';
      case 'ONCE': return 'Einmalig';
      default: return period;
    }
  };

  // Count active/inactive fees
  const activeFees = fees.filter(f => f.isActive);
  const inactiveFees = fees.filter(f => !f.isActive);

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header mit Icon */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Beitragsverwaltung</h1>
              <p className="text-gray-600 mt-1">Verwalten Sie Beitragssätze und Zahlungen</p>
            </div>
          </div>
          <Button onClick={() => navigate('/fees/create')}>
            <Plus className="w-5 h-5 mr-2" />
            Neuer Beitragssatz
          </Button>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Beitrag zuweisen */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate('/fees/assign')}
          >
            <Card.Content className="flex items-center p-6">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <Plus className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">Beitrag zuweisen</h3>
                <p className="text-gray-600 text-sm">Mitgliedern Beitragssätze zuordnen</p>
              </div>
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Card.Content>
          </Card>

          {/* Zahlung erfassen */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate('/fees/payment')}
          >
            <Card.Content className="flex items-center p-6">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">Zahlung erfassen</h3>
                <p className="text-gray-600 text-sm">Beitragszahlungen dokumentieren</p>
              </div>
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Card.Content>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('fees')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'fees'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Beitragssätze ({activeFees.length})
            </button>
            <button
              onClick={() => setActiveTab('status')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'status'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Zahlungsstatus (0)
            </button>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Beitragssätze Tab */}
            {activeTab === 'fees' && (
              <div>
                {fees.length === 0 ? (
                  <Card>
                    <Card.Content className="text-center py-12">
                      <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Keine Beitragssätze vorhanden
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Erstellen Sie Ihren ersten Beitragssatz, um loszulegen.
                      </p>
                      <Button onClick={() => navigate('/fees/create')}>
                        <Plus className="w-5 h-5 mr-2" />
                        Ersten Beitragssatz erstellen
                      </Button>
                    </Card.Content>
                  </Card>
                ) : (
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Betrag
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Periode
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Aktionen
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {fees.map((fee) => (
                          <tr key={fee.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{fee.name}</div>
                              {fee.description && (
                                <div className="text-sm text-gray-500">{fee.description}</div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-gray-900">
                                {fee.amount.toFixed(2)} €
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{getPeriodText(fee.period)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {fee.isActive ? (
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                  Aktiv
                                </span>
                              ) : (
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                  Inaktiv
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => navigate(`/fees/${fee.id}/edit`)}
                                className="text-blue-600 hover:text-blue-900 mr-4"
                              >
                                Bearbeiten
                              </button>
                              {fee.isActive && (
                                <button
                                  onClick={() => handleDeactivate(fee.id, fee.name)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Löschen
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Zahlungsstatus Tab */}
            {activeTab === 'status' && (
              <Card>
                <Card.Content className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Zahlungsstatus-Übersicht
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Diese Funktion wird in Kürze verfügbar sein.
                  </p>
                  <p className="text-sm text-gray-500">
                    Hier werden Sie eine Übersicht aller Mitglieder mit ihrem Zahlungsstatus sehen.
                  </p>
                </Card.Content>
              </Card>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
};

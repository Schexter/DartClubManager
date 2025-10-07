/**
 * Fee Management Screen - Beitragsverwaltung für Admins
 * 
 * Hauptscreen zur Verwaltung von Beitragssätzen, Zuweisungen und Zahlungen
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { fetchFees, fetchStatusOverview, createFee, deleteFee, setSelectedFee } from './feesSlice';
import { FeePeriod } from '../../lib/api/types';

export function FeeManagementScreen() {
  const dispatch = useAppDispatch();
  const { fees, statusOverview, isLoading } = useAppSelector((state) => state.fees);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'fees' | 'status'>('fees');

  useEffect(() => {
    dispatch(fetchFees());
    dispatch(fetchStatusOverview());
  }, [dispatch]);

  const handleCreateFee = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    await dispatch(createFee({
      name: formData.get('name') as string,
      amount: parseFloat(formData.get('amount') as string),
      period: formData.get('period') as FeePeriod,
      description: formData.get('description') as string,
      isActive: true,
    }));
    
    setShowCreateModal(false);
    dispatch(fetchFees());
  };

  const handleDeleteFee = async (id: string) => {
    if (window.confirm('Beitragssatz wirklich löschen?')) {
      await dispatch(deleteFee(id));
      dispatch(fetchFees());
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const formatPeriod = (period: FeePeriod) => {
    const periodMap = {
      YEARLY: 'Jährlich',
      QUARTERLY: 'Vierteljährlich',
      MONTHLY: 'Monatlich',
      ONCE: 'Einmalig',
    };
    return periodMap[period] || period;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Lädt...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">💶 Beitragsverwaltung</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Neuer Beitragssatz
          </button>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => window.location.href = '/fees/assign'}
            className="flex items-center justify-center gap-2 bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-lg hover:bg-green-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="font-medium">Beitrag zuweisen</span>
          </button>
          
          <button
            onClick={() => window.location.href = '/fees/record'}
            className="flex items-center justify-center gap-2 bg-blue-50 border-2 border-blue-200 text-blue-700 px-4 py-3 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">Zahlung erfassen</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('fees')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'fees'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          Beitragssätze ({fees.length})
        </button>
        <button
          onClick={() => setActiveTab('status')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'status'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          Zahlungsstatus ({statusOverview.length})
        </button>
      </div>

      {/* Content */}
      {activeTab === 'fees' && (
        <div className="bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Betrag</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Periode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aktionen</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fees.map((fee) => (
                <tr key={fee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{fee.name}</div>
                    {fee.description && (
                      <div className="text-sm text-gray-500">{fee.description}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {formatCurrency(fee.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {formatPeriod(fee.period)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        fee.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {fee.isActive ? 'Aktiv' : 'Inaktiv'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => dispatch(setSelectedFee(fee))}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Bearbeiten
                    </button>
                    <button
                      onClick={() => handleDeleteFee(fee.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Löschen
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {fees.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Keine Beitragssätze vorhanden. Erstellen Sie einen neuen.
            </div>
          )}
        </div>
      )}

      {activeTab === 'status' && (
        <div className="bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mitglied</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Beitrag</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Betrag</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bezahlt</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Offen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {statusOverview.map((status) => (
                <tr key={`${status.memberId}-${status.feeId}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{status.memberName}</div>
                    {status.email && (
                      <div className="text-sm text-gray-500">{status.email}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {status.feeName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {formatCurrency(status.feeAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600">
                    {formatCurrency(status.totalPaid)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-red-600">
                    {formatCurrency(status.remainingAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        status.status === 'PAID'
                          ? 'bg-green-100 text-green-800'
                          : status.status === 'OVERDUE'
                          ? 'bg-red-100 text-red-800'
                          : status.status === 'PARTIAL'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {status.status === 'PAID' && 'Bezahlt'}
                      {status.status === 'OVERDUE' && 'Überfällig'}
                      {status.status === 'PARTIAL' && 'Teilweise'}
                      {status.status === 'OPEN' && 'Offen'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {statusOverview.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Keine Zahlungsdaten vorhanden.
            </div>
          )}
        </div>
      )}

      {/* Create Fee Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Neuer Beitragssatz</h2>
            <form onSubmit={handleCreateFee}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="z.B. Jahresbeitrag Erwachsene"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Betrag (€) *
                  </label>
                  <input
                    type="number"
                    name="amount"
                    step="0.01"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="50.00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Periode *
                  </label>
                  <select
                    name="period"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="YEARLY">Jährlich</option>
                    <option value="QUARTERLY">Vierteljährlich</option>
                    <option value="MONTHLY">Monatlich</option>
                    <option value="ONCE">Einmalig</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Beschreibung
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Optional..."
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Erstellen
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
                >
                  Abbrechen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

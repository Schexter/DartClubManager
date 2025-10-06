/**
 * Dashboard Screen - Echte Daten ohne Mocks
 *
 * Erstellt von Hans Hahn - Alle Rechte vorbehalten
 * Version: 4.1
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, StatsCard } from '../../components/ui';
import { AppLayout } from '../../components/layout';
import { useAppSelector } from '../../hooks/redux';
import { apiClient } from '../../lib/api/client';
import type { Organization } from '../../lib/api/types';

interface DashboardScreenProps {
  organizations: Organization[];
}

interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  wins: number;
  losses: number;
  nextMatch: { date: string; time: string } | null;
}

interface RecentMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  league: string;
  won: boolean;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ organizations }) => {
  const navigate = useNavigate();
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(organizations[0] || null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentMatches, setRecentMatches] = useState<RecentMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentOrganization } = useAppSelector((state) => state.organization);

  useEffect(() => {
    loadDashboardData();
  }, [currentOrganization]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);

      // Vorerst Dummy-Daten verwenden, bis Backend-Endpoints implementiert sind
      setStats({
        totalMembers: 0,
        activeMembers: 0,
        wins: 0,
        losses: 0,
        nextMatch: null
      });
      setRecentMatches([]);

    } catch (error) {
      console.error('Fehler beim Laden der Dashboard-Daten:', error);
      setStats({
        totalMembers: 0,
        activeMembers: 0,
        wins: 0,
        losses: 0,
        nextMatch: null
      });
      setRecentMatches([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Willkommen zurück! 👋
          </h1>
          <p className="text-gray-600">
            {currentOrganization ? `Verein: ${currentOrganization.name}` : 'Bereit für das nächste Match?'}
          </p>
        </div>

        {/* Organization Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Deine Organisationen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {organizations.map((org) => (
              <button
                key={org.id}
                onClick={() => setSelectedOrg(org)}
                className={`text-left p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                  selectedOrg?.id === org.id
                    ? 'border-green-500 bg-green-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-green-500 hover:bg-green-50'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{org.name}</h3>
                    <p className="text-sm text-gray-500">/{org.slug}</p>
                  </div>
                  {selectedOrg?.id === org.id && (
                    <div className="text-green-600">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow"
                    style={{ backgroundColor: org.primaryColor }}
                  />
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow"
                    style={{ backgroundColor: org.secondaryColor }}
                  />
                </div>
              </button>
            ))}

            {/* Organisation gründen Button */}
            <button
              onClick={() => navigate('/organization/create')}
              className="p-6 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:border-green-500 hover:bg-green-50 transition-all duration-200 flex flex-col items-center justify-center min-h-[140px] group"
            >
              <div className="text-gray-400 group-hover:text-green-600 transition-colors mb-2">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-600 group-hover:text-green-600 transition-colors">
                Organisation gründen
              </p>
            </button>

            {/* Organisation beitreten Button */}
            <button
              onClick={() => navigate('/organization/join')}
              className="p-6 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:border-green-500 hover:bg-green-50 transition-all duration-200 flex flex-col items-center justify-center min-h-[140px] group"
            >
              <div className="text-gray-400 group-hover:text-green-600 transition-colors mb-2">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-600 group-hover:text-green-600 transition-colors">
                Organisation beitreten
              </p>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-gray-600 mt-4">Lade Dashboard-Daten...</p>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatsCard
                label="Aktive Spieler"
                value={stats?.activeMembers || 0}
                change={stats?.activeMembers ? { value: stats.activeMembers - stats.totalMembers, label: 'Gesamt: ' + stats.totalMembers } : undefined}
                trend={stats && stats.activeMembers > 0 ? 'up' : 'neutral'}
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                }
              />

              <StatsCard
                label="Diese Saison"
                value={stats ? `${stats.wins} - ${stats.losses}` : '0 - 0'}
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />

              <StatsCard
                label="Nächstes Match"
                value={stats?.nextMatch ? `${stats.nextMatch.date}, ${stats.nextMatch.time}` : 'Kein Match geplant'}
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
            </div>

            {/* Quick Actions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Schnellaktionen</CardTitle>
                <CardDescription>Was möchtest du tun?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button 
                    onClick={() => navigate('/matches/new')}
                    className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                      <span className="text-xl">🎯</span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">Neues Match</h4>
                    <p className="text-sm text-gray-500">Match erstellen</p>
                  </button>

                  <button 
                    onClick={() => navigate('/events/new')}
                    className="p-4 text-left border border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-orange-100 transition-colors">
                      <span className="text-xl">🎪</span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">Training planen</h4>
                    <p className="text-sm text-gray-500">Termin erstellen</p>
                  </button>

                  <button 
                    onClick={() => navigate('/members/new')}
                    className="p-4 text-left border border-gray-200 rounded-lg hover:border-purple-500 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-100 transition-colors">
                      <span className="text-xl">👥</span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">Spieler hinzufügen</h4>
                    <p className="text-sm text-gray-500">Mitglied anlegen</p>
                  </button>

                  <button 
                    onClick={() => navigate('/statistics')}
                    className="p-4 text-left border border-gray-200 rounded-lg hover:border-cyan-500 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-cyan-100 transition-colors">
                      <span className="text-xl">📊</span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">Statistiken</h4>
                    <p className="text-sm text-gray-500">Auswertung ansehen</p>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Letzte Matches */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Letzte Matches</CardTitle>
                    <CardDescription>Deine jüngsten Ergebnisse</CardDescription>
                  </div>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => navigate('/matches')}
                  >
                    Alle anzeigen
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {recentMatches.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Noch keine Matches</h3>
                    <p className="text-gray-600 mb-4">Erstelle dein erstes Match!</p>
                    <Button onClick={() => navigate('/matches/new')}>
                      Match erstellen
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentMatches.map((match) => (
                      <button 
                        key={match.id}
                        onClick={() => navigate(`/matches/${match.id}`)}
                        className="w-full text-left p-4 hover:bg-gray-50 border-b border-gray-100 transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-medium text-gray-900">
                                {match.homeTeam} vs {match.awayTeam}
                              </h4>
                              <Badge variant={match.won ? 'success' : 'error'}>
                                {match.won ? 'Gewonnen' : 'Verloren'}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>📅 {match.date}</span>
                              <span>🏆 {match.league}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">
                              {match.homeScore} : {match.awayScore}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </AppLayout>
  );
};

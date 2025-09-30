// lib/features/matches/presentation/match_list_screen.dart
// DartClub Manager - Match List mit Filterung
// Erstellt von Hans Hahn - Alle Rechte vorbehalten

import 'package:flutter/material.dart';

class MatchListScreen extends StatefulWidget {
  const MatchListScreen({Key? key}) : super(key: key);

  @override
  State<MatchListScreen> createState() => _MatchListScreenState();
}

class _MatchListScreenState extends State<MatchListScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Matches'),
        actions: [
          IconButton(
            icon: const Icon(Icons.filter_list),
            onPressed: () {
              // Filter Dialog
            },
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'Kommend'),
            Tab(text: 'Live'),
            Tab(text: 'Beendet'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: const [
          _UpcomingMatchesTab(),
          _LiveMatchesTab(),
          _FinishedMatchesTab(),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          // Neues Match anlegen
        },
        icon: const Icon(Icons.add),
        label: const Text('Neues Match'),
      ),
    );
  }
}

// ==============================
// KOMMENDE MATCHES TAB
// ==============================
class _UpcomingMatchesTab extends StatelessWidget {
  const _UpcomingMatchesTab();

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        MatchCard(
          homeTeam: 'Falcons',
          awayTeam: 'Eagles',
          date: '29.09.2025',
          time: '19:00',
          venue: 'Sporthalle Nord',
          league: 'Kreisliga A',
          status: MatchStatus.scheduled,
          onTap: () {
            // Zu Match Details
          },
        ),
        const SizedBox(height: 12),
        MatchCard(
          homeTeam: 'Hawks',
          awayTeam: 'Panthers',
          date: '05.10.2025',
          time: '18:30',
          venue: 'Vereinsheim',
          league: 'Freundschaftsspiel',
          status: MatchStatus.scheduled,
          onTap: () {},
        ),
        const SizedBox(height: 12),
        MatchCard(
          homeTeam: 'Falcons',
          awayTeam: 'Spartans',
          date: '12.10.2025',
          time: '20:00',
          venue: 'Sporthalle Süd',
          league: 'Kreisliga A',
          status: MatchStatus.scheduled,
          onTap: () {},
        ),
      ],
    );
  }
}

// ==============================
// LIVE MATCHES TAB
// ==============================
class _LiveMatchesTab extends StatelessWidget {
  const _LiveMatchesTab();

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        MatchCard(
          homeTeam: 'Falcons',
          awayTeam: 'Tigers',
          date: 'Heute',
          time: 'LIVE',
          venue: 'Sporthalle Nord',
          league: 'Kreisliga A',
          status: MatchStatus.live,
          homeScore: 2,
          awayScore: 1,
          currentSet: 'Set 1, Leg 3',
          onTap: () {
            // Zu Live Scoring
          },
        ),
      ],
    );
  }
}

// ==============================
// BEENDETE MATCHES TAB
// ==============================
class _FinishedMatchesTab extends StatelessWidget {
  const _FinishedMatchesTab();

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        MatchCard(
          homeTeam: 'Falcons',
          awayTeam: 'Dragons',
          date: '22.09.2025',
          time: '19:00',
          venue: 'Sporthalle Nord',
          league: 'Kreisliga A',
          status: MatchStatus.finished,
          homeScore: 5,
          awayScore: 3,
          onTap: () {
            // Zu Match Details
          },
        ),
        const SizedBox(height: 12),
        MatchCard(
          homeTeam: 'Eagles',
          awayTeam: 'Falcons',
          date: '15.09.2025',
          time: '18:30',
          venue: 'Auswärtshalle',
          league: 'Kreisliga A',
          status: MatchStatus.finished,
          homeScore: 2,
          awayScore: 5,
          onTap: () {},
        ),
      ],
    );
  }
}

// ==============================
// MATCH CARD WIDGET
// ==============================
enum MatchStatus {
  scheduled,
  live,
  finished,
  cancelled,
}

class MatchCard extends StatelessWidget {
  final String homeTeam;
  final String awayTeam;
  final String date;
  final String time;
  final String venue;
  final String league;
  final MatchStatus status;
  final int? homeScore;
  final int? awayScore;
  final String? currentSet;
  final VoidCallback onTap;

  const MatchCard({
    Key? key,
    required this.homeTeam,
    required this.awayTeam,
    required this.date,
    required this.time,
    required this.venue,
    required this.league,
    required this.status,
    this.homeScore,
    this.awayScore,
    this.currentSet,
    required this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Status Badge
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  _StatusBadge(status: status),
                  if (currentSet != null)
                    Text(
                      currentSet!,
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: Colors.grey[600],
                            fontStyle: FontStyle.italic,
                          ),
                    ),
                ],
              ),
              const SizedBox(height: 12),

              // Teams & Score
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Home Team
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '🏠 $homeTeam',
                          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                                fontWeight: FontWeight.bold,
                              ),
                        ),
                      ],
                    ),
                  ),
                  
                  // Score (wenn vorhanden)
                  if (homeScore != null && awayScore != null)
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      decoration: BoxDecoration(
                        color: Theme.of(context).colorScheme.primary.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        '$homeScore : $awayScore',
                        style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                              fontWeight: FontWeight.bold,
                              color: Theme.of(context).colorScheme.primary,
                            ),
                      ),
                    )
                  else
                    const SizedBox(width: 16),

                  // Away Team
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text(
                          '$awayTeam ✈️',
                          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                                fontWeight: FontWeight.bold,
                              ),
                          textAlign: TextAlign.right,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),

              // Details
              Row(
                children: [
                  Icon(Icons.calendar_today, size: 16, color: Colors.grey[600]),
                  const SizedBox(width: 4),
                  Text(
                    '$date • $time',
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: Colors.grey[600],
                        ),
                  ),
                  const SizedBox(width: 16),
                  Icon(Icons.location_on, size: 16, color: Colors.grey[600]),
                  const SizedBox(width: 4),
                  Expanded(
                    child: Text(
                      venue,
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: Colors.grey[600],
                          ),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  Icon(Icons.emoji_events, size: 16, color: Colors.grey[600]),
                  const SizedBox(width: 4),
                  Text(
                    league,
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: Colors.grey[600],
                        ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// Status Badge Widget
class _StatusBadge extends StatelessWidget {
  final MatchStatus status;

  const _StatusBadge({required this.status});

  @override
  Widget build(BuildContext context) {
    Color color;
    String label;
    IconData icon;

    switch (status) {
      case MatchStatus.scheduled:
        color = Colors.blue;
        label = 'Geplant';
        icon = Icons.calendar_today;
        break;
      case MatchStatus.live:
        color = Colors.red;
        label = 'LIVE';
        icon = Icons.circle;
        break;
      case MatchStatus.finished:
        color = Colors.green;
        label = 'Beendet';
        icon = Icons.check_circle;
        break;
      case MatchStatus.cancelled:
        color = Colors.grey;
        label = 'Abgesagt';
        icon = Icons.cancel;
        break;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 14, color: color),
          const SizedBox(width: 4),
          Text(
            label,
            style: TextStyle(
              color: color,
              fontSize: 12,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}

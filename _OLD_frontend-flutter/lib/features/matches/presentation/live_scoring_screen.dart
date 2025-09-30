// lib/features/matches/presentation/live_scoring_screen.dart
// DartClub Manager - Live Scoring mit Einzelwurf-Erfassung
// Erstellt von Hans Hahn - Alle Rechte vorbehalten

import 'package:flutter/material.dart';

class LiveScoringScreen extends StatefulWidget {
  const LiveScoringScreen({Key? key}) : super(key: key);

  @override
  State<LiveScoringScreen> createState() => _LiveScoringScreenState();
}

class _LiveScoringScreenState extends State<LiveScoringScreen> {
  // Match State
  int homeScore = 2;
  int awayScore = 1;
  int currentSet = 1;
  int currentLeg = 3;
  
  // Current Player
  bool isHomePlayerActive = true;
  String currentPlayerName = 'Hans Hahn';
  int remainingScore = 301;
  
  // Current Throw
  final List<String> currentThrow = [];
  int currentThrowScore = 0;

  void _addDart(String dart, int score) {
    if (currentThrow.length < 3) {
      setState(() {
        currentThrow.add(dart);
        currentThrowScore += score;
      });
    }
  }

  void _clearThrow() {
    setState(() {
      currentThrow.clear();
      currentThrowScore = 0;
    });
  }

  void _submitThrow() {
    if (currentThrow.isEmpty) return;

    // Berechne neue Restpunkte
    int newRemaining = remainingScore - currentThrowScore;

    // Bust Check (vereinfacht - echte Logik in Backend)
    if (newRemaining < 0 || newRemaining == 1) {
      // Bust!
      _showBustDialog();
      _clearThrow();
      return;
    }

    // Checkout Check
    if (newRemaining == 0) {
      _showCheckoutDialog();
      _clearThrow();
      return;
    }

    setState(() {
      remainingScore = newRemaining;
      _clearThrow();
      // Nächster Spieler
      isHomePlayerActive = !isHomePlayerActive;
      currentPlayerName = isHomePlayerActive ? 'Hans Hahn' : 'Peter Müller';
    });
  }

  void _showBustDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('BUST!'),
        content: Text('$currentPlayerName hat überworfen!'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  void _showCheckoutDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('🎯 CHECKOUT!'),
        content: Text('$currentPlayerName hat das Leg gewonnen!'),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              // Nächstes Leg starten
            },
            child: const Text('Nächstes Leg'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Live Scoring', style: TextStyle(fontSize: 16)),
            Text(
              'Set $currentSet, Leg $currentLeg',
              style: const TextStyle(fontSize: 12, fontWeight: FontWeight.normal),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.pause),
            onPressed: () {
              // Pause Match
            },
          ),
          IconButton(
            icon: const Icon(Icons.more_vert),
            onPressed: () {
              // Match Optionen
            },
          ),
        ],
      ),
      body: Column(
        children: [
          // Score Header
          Container(
            padding: const EdgeInsets.all(16),
            color: Theme.of(context).colorScheme.primary.withOpacity(0.1),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _TeamScore(
                  teamName: '🏠 Falcons',
                  score: homeScore,
                  isActive: isHomePlayerActive,
                ),
                Text(
                  ':',
                  style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                ),
                _TeamScore(
                  teamName: 'Eagles ✈️',
                  score: awayScore,
                  isActive: !isHomePlayerActive,
                ),
              ],
            ),
          ),

          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  // Aktueller Spieler
                  Card(
                    elevation: 4,
                    color: isHomePlayerActive
                        ? Theme.of(context).colorScheme.primary.withOpacity(0.1)
                        : Theme.of(context).colorScheme.secondary.withOpacity(0.1),
                    child: Padding(
                      padding: const EdgeInsets.all(20),
                      child: Column(
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                isHomePlayerActive ? Icons.home : Icons.flight,
                                size: 24,
                              ),
                              const SizedBox(width: 8),
                              Text(
                                currentPlayerName,
                                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                                      fontWeight: FontWeight.bold,
                                    ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 16),
                          Text(
                            'Restpunkte',
                            style: Theme.of(context).textTheme.bodyLarge,
                          ),
                          Text(
                            '$remainingScore',
                            style: Theme.of(context).textTheme.displayLarge?.copyWith(
                                  fontWeight: FontWeight.bold,
                                  color: Theme.of(context).colorScheme.primary,
                                ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),

                  // Aktueller Wurf
                  Card(
                    elevation: 2,
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        children: [
                          Text(
                            'Aktueller Wurf',
                            style: Theme.of(context).textTheme.titleMedium,
                          ),
                          const SizedBox(height: 12),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              _DartDisplay(dart: currentThrow.isNotEmpty ? currentThrow[0] : null),
                              const SizedBox(width: 8),
                              _DartDisplay(dart: currentThrow.length > 1 ? currentThrow[1] : null),
                              const SizedBox(width: 8),
                              _DartDisplay(dart: currentThrow.length > 2 ? currentThrow[2] : null),
                            ],
                          ),
                          const SizedBox(height: 12),
                          Text(
                            'Score: $currentThrowScore',
                            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                                  fontWeight: FontWeight.bold,
                                ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),

                  // Dart Input Pad
                  _DartInputPad(
                    onDartSelected: _addDart,
                    onClear: _clearThrow,
                    onSubmit: _submitThrow,
                    canSubmit: currentThrow.isNotEmpty,
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ==============================
// TEAM SCORE WIDGET
// ==============================
class _TeamScore extends StatelessWidget {
  final String teamName;
  final int score;
  final bool isActive;

  const _TeamScore({
    required this.teamName,
    required this.score,
    required this.isActive,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          teamName,
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                fontWeight: isActive ? FontWeight.bold : FontWeight.normal,
                color: isActive ? Theme.of(context).colorScheme.primary : null,
              ),
        ),
        const SizedBox(height: 8),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          decoration: BoxDecoration(
            color: isActive
                ? Theme.of(context).colorScheme.primary
                : Colors.grey[300],
            borderRadius: BorderRadius.circular(12),
          ),
          child: Text(
            '$score',
            style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: isActive ? Colors.white : Colors.black87,
                ),
          ),
        ),
      ],
    );
  }
}

// ==============================
// DART DISPLAY WIDGET
// ==============================
class _DartDisplay extends StatelessWidget {
  final String? dart;

  const _DartDisplay({this.dart});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 80,
      height: 80,
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey[400]!, width: 2),
        borderRadius: BorderRadius.circular(12),
        color: dart != null ? Theme.of(context).colorScheme.primary.withOpacity(0.1) : null,
      ),
      child: Center(
        child: Text(
          dart ?? '—',
          style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.bold,
                color: dart != null ? Theme.of(context).colorScheme.primary : Colors.grey,
              ),
        ),
      ),
    );
  }
}

// ==============================
// DART INPUT PAD
// ==============================
class _DartInputPad extends StatelessWidget {
  final Function(String dart, int score) onDartSelected;
  final VoidCallback onClear;
  final VoidCallback onSubmit;
  final bool canSubmit;

  const _DartInputPad({
    required this.onDartSelected,
    required this.onClear,
    required this.onSubmit,
    required this.canSubmit,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          'Wurf eingeben',
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.bold,
              ),
        ),
        const SizedBox(height: 16),

        // Triple
        Text('Triple', style: Theme.of(context).textTheme.bodyMedium),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          alignment: WrapAlignment.center,
          children: [
            _DartButton(label: 'T20', score: 60, onPressed: onDartSelected),
            _DartButton(label: 'T19', score: 57, onPressed: onDartSelected),
            _DartButton(label: 'T18', score: 54, onPressed: onDartSelected),
            _DartButton(label: 'T17', score: 51, onPressed: onDartSelected),
          ],
        ),
        const SizedBox(height: 16),

        // Double
        Text('Double', style: Theme.of(context).textTheme.bodyMedium),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          alignment: WrapAlignment.center,
          children: [
            _DartButton(label: 'D20', score: 40, onPressed: onDartSelected),
            _DartButton(label: 'D19', score: 38, onPressed: onDartSelected),
            _DartButton(label: 'D18', score: 36, onPressed: onDartSelected),
            _DartButton(label: 'D16', score: 32, onPressed: onDartSelected),
          ],
        ),
        const SizedBox(height: 16),

        // Single
        Text('Single', style: Theme.of(context).textTheme.bodyMedium),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          alignment: WrapAlignment.center,
          children: [
            _DartButton(label: '20', score: 20, onPressed: onDartSelected),
            _DartButton(label: '19', score: 19, onPressed: onDartSelected),
            _DartButton(label: '18', score: 18, onPressed: onDartSelected),
            _DartButton(label: '17', score: 17, onPressed: onDartSelected),
            _DartButton(label: '16', score: 16, onPressed: onDartSelected),
            _DartButton(label: '15', score: 15, onPressed: onDartSelected),
          ],
        ),
        const SizedBox(height: 16),

        // Bull
        Text('Bull', style: Theme.of(context).textTheme.bodyMedium),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          alignment: WrapAlignment.center,
          children: [
            _DartButton(label: 'Bull', score: 50, onPressed: onDartSelected),
            _DartButton(label: '25', score: 25, onPressed: onDartSelected),
          ],
        ),
        const SizedBox(height: 16),

        // Miss
        _DartButton(
          label: 'MISS',
          score: 0,
          onPressed: onDartSelected,
          color: Colors.grey,
        ),
        const SizedBox(height: 24),

        // Action Buttons
        Row(
          children: [
            Expanded(
              child: OutlinedButton.icon(
                onPressed: onClear,
                icon: const Icon(Icons.clear),
                label: const Text('ZURÜCKSETZEN'),
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.all(16),
                ),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: ElevatedButton.icon(
                onPressed: canSubmit ? onSubmit : null,
                icon: const Icon(Icons.check),
                label: const Text('BESTÄTIGEN'),
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.all(16),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

// ==============================
// DART BUTTON WIDGET
// ==============================
class _DartButton extends StatelessWidget {
  final String label;
  final int score;
  final Function(String, int) onPressed;
  final Color? color;

  const _DartButton({
    required this.label,
    required this.score,
    required this.onPressed,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () => onPressed(label, score),
      style: ElevatedButton.styleFrom(
        backgroundColor: color ?? Theme.of(context).colorScheme.primary,
        foregroundColor: Colors.white,
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
      child: Text(
        label,
        style: const TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}

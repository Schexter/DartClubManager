// lib/main.dart
// DartClub Manager - Main App Entry Point
// Erstellt von Hans Hahn - Alle Rechte vorbehalten

import 'package:flutter/material.dart';
import 'core/config/theme.dart';
import 'features/auth/presentation/login_screen.dart';
import 'features/dashboard/presentation/dashboard_screen.dart';
import 'features/matches/presentation/match_list_screen.dart';
import 'features/matches/presentation/live_scoring_screen.dart';

void main() {
  runApp(const DartClubApp());
}

class DartClubApp extends StatelessWidget {
  const DartClubApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'DartClub Manager',
      debugShowCheckedModeBanner: false,
      
      // Theme aus theme.dart
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.system,
      
      // Routing
      initialRoute: '/login',
      routes: {
        '/login': (context) => const LoginScreen(),
        '/dashboard': (context) => const DashboardScreen(),
        '/matches': (context) => const MatchListScreen(),
        '/live-scoring': (context) => const LiveScoringScreen(),
      },
    );
  }
}

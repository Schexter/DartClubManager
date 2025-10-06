import React from 'react';
import heroImage from '../../assets/anding-page-hero.jpg'; // Bild importieren
import LandingFooter from './LandingFooter';

// Icon-Komponenten (inline SVGs für bessere Performance)
const CheckIcon = () => (
  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-12 h-12 text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-12 h-12 text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-12 h-12 text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const TargetIcon = () => (
  <svg className="w-12 h-12 text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  // Prüfen ob User eingeloggt ist
  const isAuthenticated = !!localStorage.getItem('auth_token');

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    window.location.reload(); // Seite neu laden um State zu aktualisieren
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-transparent backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-20">

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-white hover:text-secondary transition-colors duration-200 drop-shadow-md">
              Features
            </a>
            <a href="#how-it-works" className="text-white hover:text-secondary transition-colors duration-200 drop-shadow-md">
              So geht's
            </a>
            <a href="#contact" className="text-white hover:text-secondary transition-colors duration-200 drop-shadow-md">
              Kontakt
            </a>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-transparent text-white border-2 border-white rounded-lg font-medium hover:bg-white hover:text-primary transition-all duration-200 drop-shadow-lg"
              >
                Logout
              </button>
            ) : (
              <a href="/login" className="px-4 py-2 bg-transparent text-white border-2 border-white rounded-lg font-medium hover:bg-white hover:text-primary transition-all duration-200 drop-shadow-lg">
                Login
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-secondary p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in bg-gray-900/95 backdrop-blur-sm rounded-lg mt-2">
            <a href="#features" className="block text-white hover:text-secondary transition-colors px-4">
              Features
            </a>
            <a href="#how-it-works" className="block text-white hover:text-secondary transition-colors px-4">
              So geht's
            </a>
            <a href="#contact" className="block text-white hover:text-secondary transition-colors px-4">
              Kontakt
            </a>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 bg-transparent text-white border-2 border-white rounded-lg font-medium hover:bg-white hover:text-primary transition-all text-center mx-4"
              >
                Logout
              </button>
            ) : (
              <a href="/login" className="block w-full px-4 py-2 bg-transparent text-white border-2 border-white rounded-lg font-medium hover:bg-white hover:text-primary transition-all text-center mx-4">
                Login
              </a>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  const [isCreatingDemo, setIsCreatingDemo] = React.useState(false);

  const handleDemoClick = async () => {
    setIsCreatingDemo(true);
    
    try {
      // API-Call zum Backend
      const response = await fetch('http://localhost:8080/api/demo/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Demo-Erstellung fehlgeschlagen');
      }

      const data = await response.json();
      
      // Token speichern
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirect zum Dashboard
      window.location.href = '/dashboard';
      
    } catch (error) {
      console.error('Fehler beim Erstellen des Demo-Accounts:', error);
      alert('Demo konnte nicht erstellt werden. Bitte versuchen Sie es später erneut.');
      setIsCreatingDemo(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Dartboard Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        {/* Dark Overlay für bessere Lesbarkeit */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-primary-dark/80 to-gray-900/85"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
            Treffe dein Bullseye.<br />
            <span className="text-secondary" style={{ 
              background: 'linear-gradient(to right, #FF6F00, #FFA040)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Nicht deine Excel-Tabelle.
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
            Die moderne Vereinsverwaltung für den Dartsport.
          </p>
          
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Schluss mit Excel-Listen und Zettelwirtschaft. Verwalte Mitglieder, organisiere Matches und behalte alle Statistiken im Blick – alles an einem Ort.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="px-8 py-4 bg-secondary text-white rounded-lg font-bold text-lg hover:bg-secondary-dark transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-center">
              Jetzt als Pilot-Verein starten
            </a>
            <button 
              onClick={handleDemoClick}
              disabled={isCreatingDemo}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg font-bold text-lg hover:bg-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto sm:mx-0"
            >
              {isCreatingDemo ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Demo wird erstellt...
                </>
              ) : (
                'Demo ansehen'
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

// Problem Section
const ProblemSection = () => (
  <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Kommt dir das bekannt vor?
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Diese Probleme kennt jeder Dartverein – bis jetzt!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Unübersichtliche Mitgliederlisten",
            description: "Veraltete Daten in Excel, keine Versionierung, Fehler bei der Beitragserfassung.",
            icon: "📊"
          },
          {
            title: "Termin-Chaos in Chatgruppen",
            description: "Wer kommt zum Training? Wer spielt am Wochenende? Wichtige Infos gehen unter.",
            icon: "💬"
          },
          {
            title: "Verlorene Spieldaten",
            description: "Spielberichte auf Zetteln, keine Statistiken, keine Historie.",
            icon: "📝"
          }
        ].map((problem, index) => (
          <div 
            key={index}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="text-5xl mb-4">{problem.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {problem.title}
            </h3>
            <p className="text-gray-600">
              {problem.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Features Section
const FeaturesSection = () => (
  <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Entdecke die drei Säulen unseres Systems
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Alles, was dein Verein braucht – in einer App vereint
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <UsersIcon />,
            title: "Unkomplizierte Mitgliederverwaltung",
            description: "Verwalte deine Spieler mit Profilen, Kontaktdaten und individuellen Verträgen. Zuweisungen zu Teams sind nur einen Klick entfernt.",
            features: ["Profile & Daten", "Teams & Rollen", "Beitragsverwaltung"]
          },
          {
            icon: <CalendarIcon />,
            title: "Termine: Chaos in Chatgruppen",
            description: "Nie wieder verlorene Termine. Kalender für Training, Abstimmungen per Doodle-System, und iCal-Export in deinen Privat-Kalender.",
            features: ["Kalender", "Abstimmungen", "iCal-Export"]
          },
          {
            icon: <ChartIcon />,
            title: "Moderne Spielplanung",
            description: "Spielberichte und Statistiken auf Profi-Niveau. Von der Einzelwurf-Erfassung bis zum automatischen PDF-Report.",
            features: ["Live-Scoring", "Statistiken", "PDF-Reports"]
          }
        ].map((feature, index) => (
          <div 
            key={index}
            className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-primary"
          >
            <div className="flex justify-center">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              {feature.title}
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              {feature.description}
            </p>
            <ul className="space-y-2">
              {feature.features.map((item, i) => (
                <li key={i} className="flex items-center text-gray-700">
                  <CheckIcon />
                  <span className="ml-2">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Feature Highlights (Detailed)
const FeatureHighlights = () => (
  <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Alles, was dein Verein braucht.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <TargetIcon />,
            title: "Live-Scoring wie die Profis",
            description: "Erfasse jeden Wurf live. Die App berechnet Averages, Checkout-Quoten und Restpunkte automatisch."
          },
          {
            icon: <UsersIcon />,
            title: "Zentrale Mitglieder- & Teamverwaltung",
            description: "Verwalte alle Mitgliederdaten, weise Spieler Teams zu und definiere Rollen wie Trainer oder Kapitän."
          },
          {
            icon: <ChartIcon />,
            title: "Automatische Statistiken",
            description: "Analysiere die Leistung deines Teams und einzelner Spieler. Von der 180er-Statistik bis zur Formkurve."
          }
        ].map((feature, index) => (
          <div 
            key={index}
            className="bg-white p-8 rounded-xl text-center hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-center">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// How It Works Section
const HowItWorksSection = () => (
  <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          In 3 Schritten startklar.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {[
          {
            number: "1",
            title: "Verein registrieren",
            description: "Erstelle in unter 2 Minuten den Account für deinen Verein."
          },
          {
            number: "2",
            title: "Mitglieder einladen",
            description: "Füge deine Mitglieder hinzu oder lade sie per Link ein."
          },
          {
            number: "3",
            title: "Direkt loslegen",
            description: "Lege das erste Training an oder plane das nächste Ligaspiel."
          }
        ].map((step, index) => (
          <div key={index} className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white text-3xl font-bold mb-6 shadow-lg">
              {step.number}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {step.title}
            </h3>
            <p className="text-gray-600 text-lg">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Final CTA Section
const FinalCTASection = () => (
  <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-primary-dark">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-white mb-6">
        Bereit für den digitalen Wurf?
      </h2>
      <p className="text-xl text-white/90 mb-8">
        Werde jetzt einer unserer ersten Beta-Tester und nutze DartClubManager 6 Monate lang völlig kostenlos.
      </p>
      <a href="/register" className="inline-block px-8 py-4 bg-white text-primary rounded-lg font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl">
        Registriere dich als Beta-Tester
      </a>
    </div>
  </section>
);

// Main Landing Page Component
const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navigation />
      <main>
        <HeroSection />
        <ProblemSection />
        <FeaturesSection />
        <FeatureHighlights />
        <HowItWorksSection />
        <FinalCTASection />
      </main>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;

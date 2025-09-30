import React from 'react';

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

const RocketIcon = () => (
  <svg className="w-12 h-12 text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              🎯 DartClubManager
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-primary transition-colors duration-200">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-primary transition-colors duration-200">
              So geht's
            </a>
            <a href="#contact" className="text-gray-700 hover:text-primary transition-colors duration-200">
              Kontakt
            </a>
            <button className="px-4 py-2 text-secondary border-2 border-secondary rounded-lg font-medium hover:bg-secondary hover:text-white transition-all duration-200">
              Zum Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <a href="#features" className="block text-gray-700 hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="block text-gray-700 hover:text-primary transition-colors">
              So geht's
            </a>
            <a href="#contact" className="block text-gray-700 hover:text-primary transition-colors">
              Kontakt
            </a>
            <button className="w-full px-4 py-2 text-secondary border-2 border-secondary rounded-lg font-medium hover:bg-secondary hover:text-white transition-all">
              Zum Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-primary-dark to-gray-900">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>
    </div>

    {/* Content */}
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <div className="animate-fade-in-up">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
          Die Zukunft deiner<br />
          <span className="bg-gradient-to-r from-secondary to-yellow-400 bg-clip-text text-transparent">
            Vereinsverwaltung.
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
          Digital, einfach & für den Dartsport gemacht.
        </p>
        
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          Verabschiede dich von Excel-Listen und Zettelchaos. Mit DartClubManager hast du alles an einem Ort – 
          von der Mitgliederverwaltung bis zum Live-Scoring.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-secondary text-white rounded-lg font-bold text-lg hover:bg-secondary-dark transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
            Jetzt als Pilot-Verein starten
          </button>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg font-bold text-lg hover:bg-white/20 transition-all duration-200">
            Demo ansehen
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div>
            <div className="text-4xl font-bold text-white mb-2">500+</div>
            <div className="text-gray-400">Mitglieder</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">50+</div>
            <div className="text-gray-400">Vereine</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">1000+</div>
            <div className="text-gray-400">Matches</div>
          </div>
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
      <button className="px-8 py-4 bg-white text-primary rounded-lg font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl">
        Registriere dich als Beta-Tester
      </button>
    </div>
  </section>
);

// Footer
const Footer = () => (
  <footer id="contact" className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-bold mb-4">🎯 DartClubManager</h3>
          <p className="text-gray-400">
            Die moderne Vereinsverwaltung für den Dartsport.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Links</h4>
          <ul className="space-y-2">
            <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
            <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">So geht's</a></li>
            <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Kontakt</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Rechtliches</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Impressum</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Datenschutz</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">AGB</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
        <p>© 2025 DartClubManager - Erstellt von Hans Hahn - Alle Rechte vorbehalten</p>
      </div>
    </div>
  </footer>
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
      <Footer />
    </div>
  );
};

export default LandingPage;

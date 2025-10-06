import React from 'react';

const LandingFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">🎯 DartClub Manager</h3>
            <p className="text-sm text-gray-400 mb-3">
              Die moderne Vereinsverwaltung für den Dartsport.
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-yellow-500 text-yellow-900 px-2 py-1 rounded font-semibold">
                BETA
              </span>
              <span className="text-gray-500">v0.1.0</span>
            </div>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#features"
                  className="hover:text-white transition-colors duration-200"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-white transition-colors duration-200"
                >
                  So geht's
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors duration-200"
                >
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Rechtliches</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/impressum"
                  className="hover:text-white transition-colors duration-200"
                >
                  Impressum
                </a>
              </li>
              <li>
                <a
                  href="/datenschutz"
                  className="hover:text-white transition-colors duration-200"
                >
                  Datenschutzerklärung
                </a>
              </li>
              <li>
                <a
                  href="/agb"
                  className="hover:text-white transition-colors duration-200"
                >
                  AGB
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Beta Warning */}
        <div className="border-t border-gray-800 pt-6 mb-6">
          <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="text-sm">
                <p className="text-yellow-400 font-semibold mb-1">Beta-Version</p>
                <p className="text-gray-400 text-xs">
                  Diese Anwendung befindet sich im Beta-Stadium. Es können Fehler auftreten
                  und Datenverluste sind möglich. Nutzen Sie die Anwendung auf eigene Gefahr.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Copyright */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div className="text-center md:text-left">
              <p>
                © {currentYear} Hans Hahn. Alle Rechte vorbehalten.
              </p>
              <p className="mt-1 text-xs">
                Ein nicht-kommerzielles Community-Projekt
              </p>
            </div>
            <div className="text-center md:text-right text-xs">
              <p>Hans Hahn</p>
              <p>Hensges Neuhaus 1</p>
              <p>42349 Wuppertal</p>
              <p className="mt-1">
                <a href="mailto:info@dartclubmanager.de" className="hover:text-white transition-colors">
                  info@dartclubmanager.de
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const ImpressumScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="text-primary-600 hover:text-primary-700 mb-4 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Zurück
            </button>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Impressum</h1>
            <p className="text-gray-600">Angaben gemäß § 5 TMG</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Angaben gemäß § 5 TMG</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2"><strong>Betreiber:</strong></p>
                <p>Hans Hahn</p>
                <p>Hensges Neuhaus 1</p>
                <p>42349 Wuppertal</p>
                <p>Deutschland</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Kontakt</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2"><strong>E-Mail:</strong> <a href="mailto:info@dartclubmanager.de" className="text-primary-600 hover:text-primary-700">info@dartclubmanager.de</a></p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Art des Angebots</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p>
                  DartClub Manager ist ein privates, nicht-kommerzielles Community-Projekt im Beta-Stadium.
                  Die Anwendung wird kostenlos zur Verfügung gestellt und dient der Verwaltung von Dartvereinen.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Haftungsausschluss</h2>
              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Beta-Version</h3>
                <p className="mb-4">
                  Diese Anwendung befindet sich im Beta-Stadium. Es handelt sich um eine Testversion,
                  die Fehler enthalten kann und deren Funktionalität nicht garantiert wird.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Haftung für Inhalte</h3>
                <p className="mb-4">
                  Als privater Betreiber eines Community-Projekts übernehme ich keine Haftung für die
                  Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Inhalte. Die Nutzung
                  erfolgt auf eigene Gefahr.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Datenverlust</h3>
                <p className="mb-4">
                  Es wird keine Haftung für Datenverluste übernommen. Nutzer sind selbst dafür
                  verantwortlich, wichtige Daten zu sichern. Da sich die Anwendung im Beta-Stadium
                  befindet, können Daten jederzeit verloren gehen.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Haftung für Links</h3>
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
                  keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
                  Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Urheberrecht</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-4">
                  Die durch den Betreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                  dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede
                  Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
                  Zustimmung des Betreibers.
                </p>
                <p>
                  © {new Date().getFullYear()} Hans Hahn - Alle Rechte vorbehalten
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Streitschlichtung</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                  <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 ml-1">
                    https://ec.europa.eu/consumers/odr/
                  </a>
                </p>
                <p className="mt-4">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>Stand: {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpressumScreen;

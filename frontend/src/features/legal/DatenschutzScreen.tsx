import React from 'react';
import { useNavigate } from 'react-router-dom';

const DatenschutzScreen: React.FC = () => {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Datenschutzerklärung</h1>
            <p className="text-gray-600">Informationen zur Verarbeitung Ihrer Daten</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Datenschutz auf einen Blick</h2>
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Allgemeine Hinweise</h3>
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                  personenbezogenen Daten passiert, wenn Sie diese Anwendung nutzen. Personenbezogene
                  Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Verantwortliche Stelle</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-2"><strong>Verantwortlich für die Datenverarbeitung:</strong></p>
                <p>Hans Hahn</p>
                <p>Hensges Neuhaus 1</p>
                <p>42349 Wuppertal</p>
                <p>Deutschland</p>
                <p className="mt-4">
                  <strong>E-Mail:</strong> <a href="mailto:info@dartclubmanager.de" className="text-primary-600 hover:text-primary-700">info@dartclubmanager.de</a>
                </p>
                <p className="mt-4 text-sm text-gray-600">
                  Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder
                  gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen
                  Daten (z.B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Datenerfassung in dieser Anwendung</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.1 Welche Daten werden erfasst?</h3>
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <p className="mb-3"><strong>Beim Registrieren und Nutzen der Anwendung:</strong></p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>E-Mail-Adresse (für Login und Kommunikation)</li>
                  <li>Vorname und Nachname</li>
                  <li>Geburtsdatum (optional)</li>
                  <li>Telefonnummer (optional)</li>
                  <li>Vereinsinformationen</li>
                  <li>Spielerdaten (Scores, Statistiken, Spielergebnisse)</li>
                  <li>Passwort (verschlüsselt gespeichert)</li>
                </ul>

                <p className="mt-4 mb-3"><strong>Technische Daten:</strong></p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>IP-Adresse (wird derzeit noch nicht erfasst, in zukünftigen Versionen geplant)</li>
                  <li>Browser-Typ und Version</li>
                  <li>Zugriffszeiten</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.2 Wofür nutzen wir Ihre Daten?</h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <ul className="list-disc ml-6 space-y-2">
                  <li>Bereitstellung der Vereinsverwaltungsfunktionen</li>
                  <li>Organisation von Spielen und Turnieren</li>
                  <li>Verwaltung von Mitgliedschaften und Teams</li>
                  <li>Erstellung von Statistiken und Ranglisten</li>
                  <li>Kommunikation zwischen Vereinsmitgliedern</li>
                  <li>Authentifizierung und Zugriffskontrolle</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.3 Welche Rechte haben Sie?</h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-3">Sie haben jederzeit das Recht:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Auskunft über Ihre bei uns gespeicherten Daten zu erhalten (Art. 15 DSGVO)</li>
                  <li>Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)</li>
                  <li>Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO)</li>
                  <li>Einschränkung der Datenverarbeitung zu verlangen (Art. 18 DSGVO)</li>
                  <li>Datenübertragbarkeit zu verlangen (Art. 20 DSGVO)</li>
                  <li>Der Datenverarbeitung zu widersprechen (Art. 21 DSGVO)</li>
                  <li>Beschwerde bei einer Aufsichtsbehörde einzureichen (Art. 77 DSGVO)</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Rechtsgrundlage der Verarbeitung</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-3">Die Verarbeitung Ihrer Daten erfolgt auf Grundlage von:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li><strong>Art. 6 Abs. 1 lit. a DSGVO:</strong> Einwilligung durch Registrierung</li>
                  <li><strong>Art. 6 Abs. 1 lit. b DSGVO:</strong> Vertragserfüllung bzw. vorvertragliche Maßnahmen</li>
                  <li><strong>Art. 6 Abs. 1 lit. f DSGVO:</strong> Berechtigte Interessen (z.B. Systemsicherheit)</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Speicherdauer</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p>
                  Ihre Daten werden gespeichert, solange Sie die Anwendung aktiv nutzen. Bei Löschung
                  Ihres Accounts werden alle personenbezogenen Daten gelöscht, sofern keine gesetzlichen
                  Aufbewahrungspflichten bestehen.
                </p>
                <p className="mt-4 text-yellow-700 font-semibold">
                  ⚠️ Hinweis: Da sich die Anwendung im Beta-Stadium befindet, kann es zu Datenverlusten
                  kommen. Wir empfehlen, wichtige Daten regelmäßig zu sichern.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Datensicherheit</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-3">Wir nutzen folgende Sicherheitsmaßnahmen:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>SSL/TLS-Verschlüsselung für Datenübertragung (geplant)</li>
                  <li>Verschlüsselte Passwortspeicherung (BCrypt)</li>
                  <li>Zugriffskontrolle mittels JWT-Tokens</li>
                  <li>Organisationsbezogene Datentrennung</li>
                </ul>
                <p className="mt-4 text-yellow-700 font-semibold">
                  ⚠️ Beta-Hinweis: Diese Anwendung befindet sich im Beta-Stadium. Trotz Sicherheitsmaßnahmen
                  kann keine vollständige Datensicherheit garantiert werden.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Hosting und Datenverarbeitung</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-3"><strong>Aktuell:</strong></p>
                <p>Die Anwendung wird derzeit lokal entwickelt und getestet. Eine Produktivumgebung
                   mit externem Hosting-Anbieter ist in Planung.</p>

                <p className="mt-4 mb-3"><strong>Geplant:</strong></p>
                <p>Hosting bei einem deutschen oder EU-basierten Anbieter mit DSGVO-Konformität.
                   Details werden hier aktualisiert, sobald das Hosting eingerichtet ist.</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies und Tracking</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-3"><strong>Aktuell:</strong></p>
                <p>Diese Anwendung verwendet derzeit keine Cookies oder Tracking-Tools für Analyse-
                   oder Marketing-Zwecke.</p>

                <p className="mt-4 mb-3"><strong>Technisch notwendige Speicherung:</strong></p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>LocalStorage für JWT-Token (Authentifizierung)</li>
                  <li>LocalStorage für Benutzereinstellungen</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Weitergabe von Daten</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p>
                  Ihre Daten werden nicht an Dritte weitergegeben, verkauft oder anderweitig
                  vermarktet. Eine Weitergabe erfolgt nur:
                </p>
                <ul className="list-disc ml-6 mt-3 space-y-2">
                  <li>Bei rechtlicher Verpflichtung</li>
                  <li>Zur Verteidigung eigener Rechte</li>
                  <li>An technische Dienstleister (z.B. Hosting), die vertraglich zur Einhaltung
                      der DSGVO verpflichtet sind (in Zukunft)</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Widerruf und Löschung</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-3">
                  Sie können Ihre Einwilligung zur Datenverarbeitung jederzeit widerrufen und die
                  Löschung Ihrer Daten verlangen.
                </p>
                <p className="mb-3">
                  <strong>Kontakt für Datenlöschung:</strong> <a href="mailto:info@dartclubmanager.de" className="text-primary-600 hover:text-primary-700">info@dartclubmanager.de</a>
                </p>
                <p className="text-sm text-gray-600">
                  Nach Ihrem Löschantrag werden Ihre Daten innerhalb von 30 Tagen vollständig
                  aus unserem System entfernt, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Änderungen dieser Datenschutzerklärung</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p>
                  Diese Datenschutzerklärung kann aufgrund rechtlicher Änderungen oder Änderungen
                  unserer Dienste angepasst werden. Die aktuelle Version ist stets auf dieser Seite
                  verfügbar.
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

export default DatenschutzScreen;

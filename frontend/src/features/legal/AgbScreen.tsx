import React from 'react';
import { useNavigate } from 'react-router-dom';

const AgbScreen: React.FC = () => {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Allgemeine Geschäftsbedingungen (AGB)
            </h1>
            <p className="text-gray-600">Nutzungsbedingungen für DartClub Manager</p>
          </div>

          {/* Beta Warning */}
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-4">
              <svg className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">⚠️ Beta-Version</h3>
                <p className="text-gray-700">
                  Diese Anwendung befindet sich im Beta-Stadium. Die Nutzung erfolgt vollständig
                  auf eigene Gefahr. Es können Fehler auftreten, Funktionen können sich ändern,
                  und Datenverluste sind möglich.
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Geltungsbereich</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-3">
                  Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung der
                  Anwendung "DartClub Manager" (nachfolgend "Anwendung" genannt), die von
                  Hans Hahn (nachfolgend "Betreiber" genannt) zur Verfügung gestellt wird.
                </p>
                <p>
                  Durch die Registrierung und Nutzung der Anwendung erklären Sie sich mit
                  diesen AGB einverstanden.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Leistungsbeschreibung</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">2.1 Art der Leistung</h3>
                <p className="mb-4">
                  Die Anwendung ist ein kostenloses Community-Projekt zur Verwaltung von
                  Dartvereinen. Sie bietet Funktionen zur:
                </p>
                <ul className="list-disc ml-6 space-y-2 mb-4">
                  <li>Verwaltung von Vereinen und Mitgliedschaften</li>
                  <li>Organisation von Teams und Spielern</li>
                  <li>Durchführung und Auswertung von Spielen</li>
                  <li>Erstellung von Statistiken und Ranglisten</li>
                  <li>Kommunikation zwischen Vereinsmitgliedern</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">2.2 Beta-Status</h3>
                <p>
                  Die Anwendung befindet sich im Beta-Stadium. Funktionen können unvollständig
                  sein, sich ändern oder zeitweise nicht verfügbar sein. Es besteht kein
                  Anspruch auf Verfügbarkeit oder fehlerfreien Betrieb.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Nutzerkonto und Registrierung</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">3.1 Registrierung</h3>
                <p className="mb-4">
                  Die Nutzung der Anwendung erfordert eine Registrierung. Bei der Registrierung
                  sind wahrheitsgemäße Angaben zu machen. Der Nutzer ist für die Richtigkeit
                  und Aktualität seiner Daten verantwortlich.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">3.2 Zugangsdaten</h3>
                <p className="mb-4">
                  Der Nutzer ist verpflichtet, seine Zugangsdaten geheim zu halten und vor dem
                  Zugriff Dritter zu schützen. Bei Verdacht auf Missbrauch ist der Betreiber
                  unverzüglich zu informieren.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">3.3 Account-Sperre</h3>
                <p>
                  Der Betreiber kann Accounts bei Missbrauch, Verstoß gegen diese AGB oder
                  aus anderen wichtigen Gründen sperren oder löschen.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Nutzungsrechte und Pflichten</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">4.1 Erlaubte Nutzung</h3>
                <p className="mb-4">
                  Die Anwendung darf ausschließlich für den vorgesehenen Zweck der
                  Vereinsverwaltung genutzt werden.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">4.2 Verbotene Handlungen</h3>
                <p className="mb-3">Der Nutzer verpflichtet sich, folgende Handlungen zu unterlassen:</p>
                <ul className="list-disc ml-6 space-y-2 mb-4">
                  <li>Manipulation oder Reverse-Engineering der Anwendung</li>
                  <li>Automatisierte Zugriffe (Bots, Scraper) ohne Genehmigung</li>
                  <li>Überlastung der Systeme (DoS, DDoS)</li>
                  <li>Verbreitung von Schadsoftware</li>
                  <li>Missbrauch von Daten anderer Nutzer</li>
                  <li>Beleidigungen, Diskriminierung oder andere rechtswidrige Inhalte</li>
                  <li>Kommerzielle Nutzung ohne Genehmigung</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">4.3 Inhalte</h3>
                <p>
                  Der Nutzer ist für die von ihm eingestellten Inhalte selbst verantwortlich
                  und stellt den Betreiber von Ansprüchen Dritter frei.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Kosten</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-3">
                  Die Nutzung der Anwendung ist derzeit kostenlos. Der Betreiber behält sich
                  vor, in Zukunft kostenpflichtige Zusatzfunktionen anzubieten.
                </p>
                <p>
                  Bestehende Nutzer werden über Änderungen rechtzeitig informiert und können
                  dann entscheiden, ob sie die kostenpflichtigen Funktionen nutzen möchten.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Haftungsausschluss</h2>
              <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">6.1 Keine Gewährleistung</h3>
                <p className="mb-4">
                  Als kostenloses Community-Projekt im Beta-Stadium wird die Anwendung "wie
                  besehen" (as-is) zur Verfügung gestellt. Es besteht keine Gewährleistung
                  für Verfügbarkeit, Funktionalität oder Fehlerfreiheit.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">6.2 Datenverlust</h3>
                <p className="mb-4">
                  Der Betreiber übernimmt keine Haftung für Datenverluste. Nutzer sind selbst
                  dafür verantwortlich, wichtige Daten zu sichern. Im Beta-Stadium können
                  Daten jederzeit ohne Vorankündigung verloren gehen.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">6.3 Schadenersatz</h3>
                <p className="mb-4">
                  Der Betreiber haftet nur für Schäden, die auf vorsätzlichem oder grob
                  fahrlässigem Verhalten beruhen. Eine weitergehende Haftung ist ausgeschlossen,
                  soweit gesetzlich zulässig.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">6.4 Verfügbarkeit</h3>
                <p>
                  Es besteht kein Anspruch auf ununterbrochene Verfügbarkeit der Anwendung.
                  Der Betreiber kann die Anwendung jederzeit ohne Ankündigung einstellen oder
                  Wartungsarbeiten durchführen.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Datenschutz</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p>
                  Für die Verarbeitung personenbezogener Daten gilt unsere separate
                  <a href="/datenschutz" className="text-primary-600 hover:text-primary-700 ml-1">
                    Datenschutzerklärung
                  </a>, die integraler Bestandteil dieser AGB ist.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Beendigung der Nutzung</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">8.1 Kündigung durch Nutzer</h3>
                <p className="mb-4">
                  Der Nutzer kann sein Konto jederzeit ohne Angabe von Gründen löschen.
                  Die Löschung erfolgt über die Account-Einstellungen oder per E-Mail an
                  <a href="mailto:info@dartclubmanager.de" className="text-primary-600 hover:text-primary-700 ml-1">
                    info@dartclubmanager.de
                  </a>.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">8.2 Kündigung durch Betreiber</h3>
                <p className="mb-4">
                  Der Betreiber kann das Nutzungsverhältnis jederzeit ohne Angabe von Gründen
                  beenden, insbesondere bei:
                </p>
                <ul className="list-disc ml-6 space-y-2 mb-4">
                  <li>Verstoß gegen diese AGB</li>
                  <li>Missbrauch der Anwendung</li>
                  <li>Längerer Inaktivität (mehr als 12 Monate)</li>
                  <li>Einstellung des Dienstes</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">8.3 Daten nach Kündigung</h3>
                <p>
                  Nach Beendigung der Nutzung werden die Daten des Nutzers gemäß der
                  Datenschutzerklärung gelöscht.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Änderungen der AGB</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-3">
                  Der Betreiber behält sich vor, diese AGB jederzeit zu ändern. Nutzer werden
                  über wesentliche Änderungen per E-Mail oder durch Hinweis in der Anwendung
                  informiert.
                </p>
                <p>
                  Widerspricht der Nutzer den geänderten AGB nicht innerhalb von 4 Wochen nach
                  Bekanntgabe, gelten diese als akzeptiert. Bei Widerspruch endet das
                  Nutzungsverhältnis.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Schlussbestimmungen</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">10.1 Anwendbares Recht</h3>
                <p className="mb-4">
                  Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des
                  UN-Kaufrechts.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">10.2 Gerichtsstand</h3>
                <p className="mb-4">
                  Gerichtsstand ist Wuppertal, soweit der Nutzer Kaufmann, juristische Person
                  des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">10.3 Salvatorische Klausel</h3>
                <p>
                  Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt
                  die Wirksamkeit der übrigen Bestimmungen hiervon unberührt.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Kontakt</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-3">Bei Fragen zu diesen AGB wenden Sie sich bitte an:</p>
                <p>Hans Hahn</p>
                <p>Hensges Neuhaus 1</p>
                <p>42349 Wuppertal</p>
                <p>E-Mail: <a href="mailto:info@dartclubmanager.de" className="text-primary-600 hover:text-primary-700">info@dartclubmanager.de</a></p>
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

export default AgbScreen;

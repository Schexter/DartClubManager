/**
 * CreateMemberScreen - Neues Mitglied erstellen
 *
 * Zwei Modi:
 * 1. Einladen - Link generieren zum Beitritt
 * 2. Direkt anlegen - Mit Passwort, erstellt User + Member + Membership
 *
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../../components/layout';
import { Card, CardHeader, CardTitle, CardContent, Button } from '../../components/ui';
import { memberService } from '../../lib/api/services';

type CreationMode = 'invite' | 'direct';

export function CreateMemberScreen() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<CreationMode>('direct');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form Data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthdate: '',
    password: '',
    passwordConfirm: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === 'direct') {
      // Validierung
      if (formData.password !== formData.passwordConfirm) {
        setError('Passwörter stimmen nicht überein');
        return;
      }

      if (formData.password.length < 6) {
        setError('Passwort muss mindestens 6 Zeichen lang sein');
        return;
      }

      setIsLoading(true);
      try {
        // API Call zum Erstellen des Members mit User-Account
        await memberService.createWithAccount({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          birthdate: formData.birthdate,
          password: formData.password,
        });

        navigate('/members');
      } catch (err: any) {
        setError(err.message || 'Fehler beim Erstellen des Mitglieds');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Einladungs-Modus
      setIsLoading(true);
      try {
        // TODO: API Call zum Generieren des Einladungs-Links
        console.log('Generating invite for:', formData);

        // Vorerst simulieren
        await new Promise(resolve => setTimeout(resolve, 1000));

        alert('Einladungslink wurde generiert (noch nicht implementiert)');
        navigate('/members');
      } catch (err: any) {
        setError(err.message || 'Fehler beim Erstellen der Einladung');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/members')}
            className="text-primary hover:underline mb-4"
          >
            ← Zurück zur Mitglieder-Liste
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Neues Mitglied</h1>
        </div>

        {/* Mode Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Erstellungsmodus wählen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setMode('direct')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  mode === 'direct'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">👤</div>
                  <h3 className="font-semibold mb-1">Direkt anlegen</h3>
                  <p className="text-sm text-gray-600">
                    Mit Passwort, sofort einsatzbereit
                  </p>
                </div>
              </button>

              <button
                onClick={() => setMode('invite')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  mode === 'invite'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">✉️</div>
                  <h3 className="font-semibold mb-1">Einladen</h3>
                  <p className="text-sm text-gray-600">
                    Link generieren zum Beitritt
                  </p>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>
              {mode === 'direct' ? 'Mitglied direkt anlegen' : 'Einladung erstellen'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Vorname */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vorname *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Nachname */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nachname *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-Mail *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Telefon */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Geburtsdatum */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Geburtsdatum
                </label>
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Passwort-Felder nur im Direct-Modus */}
              {mode === 'direct' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Passwort *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      minLength={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Mindestens 6 Zeichen
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Passwort bestätigen *
                    </label>
                    <input
                      type="password"
                      name="passwordConfirm"
                      value={formData.passwordConfirm}
                      onChange={handleInputChange}
                      required
                      minLength={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate('/members')}
                >
                  Abbrechen
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Wird erstellt...' : mode === 'direct' ? 'Mitglied anlegen' : 'Einladung senden'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

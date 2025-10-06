// DartClub Manager - Join Organization Screen
// Erstellt von Hans Hahn - Alle Rechte vorbehalten

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { organizationService } from '../../lib/api/services'

const ArrowLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
)

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

export default function JoinOrganizationScreen() {
  const navigate = useNavigate()

  const [slug, setSlug] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSlug(value)
    setError(null)
    setSuccessMessage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)

    if (!slug || slug.length < 3) {
      setError('Bitte gib einen gültigen Slug ein (mindestens 3 Zeichen)')
      return
    }

    setIsLoading(true)

    try {
      console.log('Joining organization:', slug)

      // API Call to join organization
      const organization = await organizationService.join(slug)

      console.log('Successfully joined:', organization)
      setSuccessMessage(`Erfolgreich beigetreten: ${organization.name}`)

      // Navigate to dashboard after successful join
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)

    } catch (err: any) {
      console.error('Error joining organization:', err)
      
      const errorMessage = err.response?.data?.message || err.message || 'Fehler beim Beitreten'
      
      // Bessere Fehlermeldungen
      if (errorMessage.includes('nicht gefunden')) {
        setError('Organisation mit diesem Slug wurde nicht gefunden')
      } else if (errorMessage.includes('bereits Mitglied')) {
        setError('Du bist bereits Mitglied dieser Organisation')
      } else {
        setError(errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeftIcon />
          <span>Zurück</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="text-5xl mb-4">🎯</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Organisation beitreten
          </h1>
          <p className="text-gray-600">
            Gib den Slug der Organisation ein, der du beitreten möchtest
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Slug Input */}
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                Organisations-Slug *
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={slug}
                  onChange={handleInputChange}
                  required
                  minLength={3}
                  maxLength={50}
                  pattern="^[a-z0-9\-]+$"
                  placeholder="z.B. falcons-dartclub"
                  className="input-field font-mono pr-10"
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <SearchIcon />
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Der Slug ist der eindeutige Identifikator der Organisation (nur Kleinbuchstaben, Zahlen und Bindestriche)
              </p>
            </div>

            {/* Info Box */}
            <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">
                💡 Wo finde ich den Slug?
              </h3>
              <p className="text-sm text-blue-700">
                Der Administrator deiner Organisation kann dir den Slug mitteilen. Du findest ihn auch in der URL der Organisation (z.B. https://dartclub.app/org/<strong>falcons-dartclub</strong>)
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading || !slug || slug.length < 3}
                className="btn-primary w-full text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Beitreten...
                  </span>
                ) : (
                  'Organisation beitreten'
                )}
              </button>
            </div>
          </form>

          {/* Alternative Option */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              Noch keine Organisation?{' '}
              <button
                onClick={() => navigate('/organization/create')}
                className="text-primary hover:underline font-medium"
              >
                Gründe jetzt deine eigene
              </button>
            </p>
          </div>
        </div>

        {/* Info Text */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Nach dem Beitreten kannst du auf Teams, Matches und Termine zugreifen</p>
        </div>
      </div>
    </div>
  )
}

// DartClub Manager - Create Organization Screen
// Erstellt von Hans Hahn - Alle Rechte vorbehalten

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'  // ⭐ NEU
import { organizationService } from '../../lib/api/services'
import { setCurrentOrg } from '../auth/authSlice'  // ⭐ NEU
import { setCurrentOrganization } from './organizationSlice'  // ⭐ NEU

const ArrowLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
)

export default function CreateOrganizationScreen() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()  // ⭐ NEU: Redux dispatch

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#F59E0B'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Auto-generate slug from name
    if (name === 'name') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .replace(/-+/g, '-') // Replace multiple dashes with single dash
      setFormData(prev => ({ ...prev, slug }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      console.log('Creating organization:', formData)

      // API Call to create organization
      const newOrg = await organizationService.create({
        name: formData.name,
        slug: formData.slug,
        primaryColor: formData.primaryColor,
        secondaryColor: formData.secondaryColor
      })

      // ⭐ NEU: Neue Organisation im State setzen
      dispatch(setCurrentOrganization(newOrg))
      dispatch(setCurrentOrg(newOrg.id))

      // Navigate to dashboard after successful creation with reload
      window.location.href = '/dashboard'
    } catch (err: any) {
      console.error('Error creating organization:', err)
      setError(err.response?.data?.message || err.message || 'Organisation konnte nicht erstellt werden')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeftIcon />
          <span>Zurück</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="text-5xl mb-4">🎯</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Organisation gründen
          </h1>
          <p className="text-gray-600">
            Erstelle deine Dart-Organisation und starte durch
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Organization Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Organisationsname *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                minLength={3}
                maxLength={100}
                placeholder="z.B. Falcons Dartclub"
                className="input-field"
              />
              <p className="mt-1 text-sm text-gray-500">
                Der Name deiner Organisation (3-100 Zeichen)
              </p>
            </div>

            {/* Slug */}
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                URL-Slug *
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
                pattern="^[a-z0-9\-]+$"
                minLength={3}
                maxLength={50}
                placeholder="z.B. falcons-dartclub"
                className="input-field font-mono"
              />
              <p className="mt-1 text-sm text-gray-500">
                Eindeutige URL für deine Organisation (nur Kleinbuchstaben, Zahlen und Bindestriche)
              </p>
            </div>

            {/* Colors */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Primary Color */}
              <div>
                <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 mb-2">
                  Primärfarbe
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    id="primaryColor"
                    name="primaryColor"
                    value={formData.primaryColor}
                    onChange={handleInputChange}
                    className="h-12 w-20 rounded-lg border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.primaryColor}
                    onChange={(e) => setFormData(prev => ({ ...prev, primaryColor: e.target.value }))}
                    pattern="^#[0-9A-Fa-f]{6}$"
                    placeholder="#3B82F6"
                    className="input-field font-mono flex-1"
                  />
                </div>
              </div>

              {/* Secondary Color */}
              <div>
                <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700 mb-2">
                  Sekundärfarbe
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    id="secondaryColor"
                    name="secondaryColor"
                    value={formData.secondaryColor}
                    onChange={handleInputChange}
                    className="h-12 w-20 rounded-lg border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.secondaryColor}
                    onChange={(e) => setFormData(prev => ({ ...prev, secondaryColor: e.target.value }))}
                    pattern="^#[0-9A-Fa-f]{6}$"
                    placeholder="#F59E0B"
                    className="input-field font-mono flex-1"
                  />
                </div>
              </div>
            </div>

            {/* Color Preview */}
            <div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
              <p className="text-sm font-medium text-gray-700 mb-3">Farbvorschau:</p>
              <div className="flex gap-3">
                <div
                  className="flex-1 h-16 rounded-lg shadow-md flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: formData.primaryColor }}
                >
                  Primär
                </div>
                <div
                  className="flex-1 h-16 rounded-lg shadow-md flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: formData.secondaryColor }}
                >
                  Sekundär
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Organisation wird erstellt...' : 'Organisation gründen'}
              </button>
            </div>
          </form>
        </div>

        {/* Info Text */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Nach der Erstellung kannst du Mitglieder einladen, Teams erstellen und Matches planen</p>
        </div>
      </div>
    </div>
  )
}

// DartClub Manager - Login Screen
// Erstellt von Hans Hahn - Alle Rechte vorbehalten

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Validation Schema
const loginSchema = z.object({
  email: z.string().email('Ungültige E-Mail-Adresse'),
  password: z.string().min(6, 'Passwort muss mindestens 6 Zeichen haben'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginScreen() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      // API Call zum Backend
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Login fehlgeschlagen')
      }

      const result = await response.json()
      console.log('Login erfolgreich:', result)

      // TODO: Token im LocalStorage speichern
      // localStorage.setItem('token', result.token)

      // Erfolgreicher Login → Dashboard
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login fehlgeschlagen. Bitte überprüfen Sie Ihre Zugangsdaten.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
            <span className="text-4xl">🎯</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">DartClub Manager</h1>
          <p className="text-primary-light">Vereinsverwaltung & Live-Scoring</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Anmelden</h2>

          {/* Error Message */}
          {error && (
            <div className="bg-status-error/10 border border-status-error text-status-error px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-Mail
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className="input-field"
                placeholder="ihre.email@beispiel.de"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-status-error text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Passwort
              </label>
              <input
                {...register('password')}
                type="password"
                id="password"
                className="input-field"
                placeholder="••••••••"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-status-error text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-gray-600">Angemeldet bleiben</span>
              </label>
              <a href="#" className="text-primary hover:text-primary-dark font-medium">
                Passwort vergessen?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Wird geladen...' : 'Anmelden'}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Noch kein Konto?{' '}
            <a href="/register" className="text-primary hover:text-primary-dark font-medium">
              Registrieren
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-white text-sm">
          <p>© 2025 DartClub Manager</p>
          <p className="mt-1">Erstellt von Hans Hahn - Alle Rechte vorbehalten</p>
        </div>
      </div>
    </div>
  )
}

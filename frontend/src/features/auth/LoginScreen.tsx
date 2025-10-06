import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { login, clearError, selectAuth } from './authSlice';
import heroImage from '../../assets/anding-page-hero.jpg'; // Bild importieren

// Validation Schema
const loginSchema = z.object({
  email: z.string().email('Ungültige E-Mail-Adresse'),
  password: z.string().min(1, 'Bitte gib dein Passwort ein'),
});

type LoginFormData = z.infer<typeof loginSchema>;

// Main Component
export default function LoginScreen() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, error } = useAppSelector(selectAuth);

  // Check for registration success message from URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isJustRegistered = queryParams.get('registered') === 'true';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(login(data)).unwrap();
      // On success, useEffect handles navigation
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block text-4xl font-bold text-white drop-shadow-lg">
            🎯 DartClubManager
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Anmelden</h2>

          {/* Success Message on Registration */}
          {isJustRegistered && (
            <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-lg mb-6 text-center">
              Registrierung erfolgreich! Du kannst dich jetzt anmelden.
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                E-Mail-Adresse
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-white/10 rounded-lg text-white border border-transparent focus:border-secondary focus:ring-2 focus:ring-secondary transition-all duration-200"
                placeholder="deine.email@verein.de"
                disabled={isLoading}
                autoComplete="email"
              />
              {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Passwort
              </label>
              <input
                {...register('password')}
                type="password"
                id="password"
                className="w-full px-4 py-3 bg-white/10 rounded-lg text-white border border-transparent focus:border-secondary focus:ring-2 focus:ring-secondary transition-all duration-200"
                placeholder="••••••••"
                disabled={isLoading}
                autoComplete="current-password"
              />
              {errors.password && <p className="text-red-400 text-sm mt-2">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-8 py-3 bg-secondary text-white rounded-lg font-bold text-lg hover:bg-secondary-dark transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Wird geladen...' : 'Anmelden'}
            </button>
          </form>

          {/* Link to Register */}
          <div className="mt-6 text-center text-sm text-gray-400">
            Noch kein Konto?{' '}
            <Link to="/register" className="font-medium text-secondary hover:text-secondary-light transition-colors">
              Jetzt registrieren
            </Link>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-8 text-center">
            <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                Zurück zur Startseite
            </Link>
        </div>
      </div>
    </div>
  );
}

import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { register as registerUser, clearError, selectAuth } from './authSlice';
import heroImage from '../../assets/anding-page-hero.jpg'; // Bild importieren

// Validation Schema
const registerSchema = z.object({
  displayName: z.string().min(2, 'Name muss mindestens 2 Zeichen haben'),
  email: z.string().email('Ungültige E-Mail-Adresse'),
  password: z.string().min(8, 'Passwort muss mindestens 8 Zeichen haben'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwörter stimmen nicht überein",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

// Main Component
export default function RegisterScreen() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(selectAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await dispatch(registerUser({
        email: data.email,
        password: data.password,
        displayName: data.displayName,
      })).unwrap();
      
      // On success, navigate to the login page with a success message
      navigate('/login?registered=true');

    } catch (err) {
      // Error is handled and displayed via the Redux state
      console.error('Registration failed:', err);
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
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Neues Konto erstellen</h2>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Display Name */}
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-2">
                Dein Name
              </label>
              <input
                {...register('displayName')}
                type="text"
                id="displayName"
                className="w-full px-4 py-3 bg-white/10 rounded-lg text-white border border-transparent focus:border-secondary focus:ring-2 focus:ring-secondary transition-all duration-200"
                placeholder="Max Mustermann"
                disabled={isLoading}
              />
              {errors.displayName && <p className="text-red-400 text-sm mt-2">{errors.displayName.message}</p>}
            </div>

            {/* Email */}
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
              />
              {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Passwort
              </label>
              <input
                {...register('password')}
                type="password"
                id="password"
                className="w-full px-4 py-3 bg-white/10 rounded-lg text-white border border-transparent focus:border-secondary focus:ring-2 focus:ring-secondary transition-all duration-200"
                placeholder="Mindestens 8 Zeichen"
                disabled={isLoading}
              />
              {errors.password && <p className="text-red-400 text-sm mt-2">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Passwort bestätigen
              </label>
              <input
                {...register('confirmPassword')}
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-3 bg-white/10 rounded-lg text-white border border-transparent focus:border-secondary focus:ring-2 focus:ring-secondary transition-all duration-200"
                placeholder="Passwort wiederholen"
                disabled={isLoading}
              />
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-2">{errors.confirmPassword.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-8 py-3 bg-secondary text-white rounded-lg font-bold text-lg hover:bg-secondary-dark transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Konto wird erstellt...' : 'Jetzt registrieren'}
            </button>
          </form>

          {/* Link to Login */}
          <div className="mt-6 text-center text-sm text-gray-400">
            Bereits ein Konto?{' '}
            <Link to="/login" className="font-medium text-secondary hover:text-secondary-light transition-colors">
              Hier anmelden
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

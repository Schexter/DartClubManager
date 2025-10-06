/**
 * MemberFormScreen - Formular zum Erstellen/Bearbeiten von Mitgliedern
 * 
 * Features:
 * - Add Mode: Neues Mitglied erstellen
 * - Edit Mode: Bestehendes Mitglied bearbeiten
 * - Validierung
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  createMember,
  updateMember,
  fetchMemberById,
  selectCurrentMember,
  selectMembersLoading,
  selectMembersError,
  clearCurrentMember,
} from './membersSlice';
import type { CreateMemberRequest, UpdateMemberRequest } from '../../lib/api/types';

// ========================================
// TYPES
// ========================================

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthdate: string;
  licenseNo: string;
  handedness: 'LEFT' | 'RIGHT' | '';
  role: 'ADMIN' | 'TRAINER' | 'CAPTAIN' | 'PLAYER';
  status: 'ACTIVE' | 'INACTIVE';
}

// ========================================
// COMPONENT
// ========================================

export function MemberFormScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentMember = useAppSelector(selectCurrentMember);
  const isLoading = useAppSelector(selectMembersLoading);
  const error = useAppSelector(selectMembersError);

  const isEditMode = !!id;

  // ========================================
  // STATE
  // ========================================

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthdate: '',
    licenseNo: '',
    handedness: '',
    role: 'PLAYER',
    status: 'ACTIVE',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // ========================================
  // EFFECTS
  // ========================================

  // Load Member wenn Edit Mode
  useEffect(() => {
    if (isEditMode && id) {
      dispatch(fetchMemberById(id));
    }

    return () => {
      dispatch(clearCurrentMember());
    };
  }, [dispatch, isEditMode, id]);

  // Populate Form mit currentMember
  useEffect(() => {
    if (currentMember) {
      setFormData({
        firstName: currentMember.firstName,
        lastName: currentMember.lastName,
        email: currentMember.email || '',
        phone: currentMember.phone || '',
        birthdate: currentMember.birthdate || '',
        licenseNo: currentMember.licenseNo || '',
        handedness: currentMember.handedness || '',
        role: currentMember.role,
        status: currentMember.status,
      });
    }
  }, [currentMember]);

  // ========================================
  // HANDLERS
  // ========================================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error für dieses Feld
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Required Fields
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Vorname ist erforderlich';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Nachname ist erforderlich';
    }

    // Email Validation (optional, aber wenn vorhanden, muss gültig sein)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
    }

    // Birthdate Validation (optional, aber muss in der Vergangenheit liegen)
    if (formData.birthdate) {
      const birthDate = new Date(formData.birthdate);
      const today = new Date();
      if (birthDate > today) {
        newErrors.birthdate = 'Geburtsdatum darf nicht in der Zukunft liegen';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (isEditMode && id) {
        // UPDATE
        const updateData: UpdateMemberRequest = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email || undefined,
          phone: formData.phone || undefined,
          birthdate: formData.birthdate || undefined,
          licenseNo: formData.licenseNo || undefined,
          handedness: formData.handedness || undefined,
          role: formData.role,
          status: formData.status,
        };
        await dispatch(updateMember({ id, data: updateData })).unwrap();
      } else {
        // CREATE
        const createData: CreateMemberRequest = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email || undefined,
          phone: formData.phone || undefined,
          birthdate: formData.birthdate || undefined,
          licenseNo: formData.licenseNo || undefined,
          handedness: formData.handedness || undefined,
          role: formData.role,
        };
        await dispatch(createMember(createData)).unwrap();
      }

      setSubmitSuccess(true);
      
      // Navigate back nach 1 Sekunde
      setTimeout(() => {
        navigate('/members');
      }, 1000);
    } catch (err) {
      // Error wird von Redux Slice gehandelt
      console.error('Submit error:', err);
    }
  };

  const handleCancel = () => {
    navigate('/members');
  };

  // ========================================
  // RENDER
  // ========================================

  if (isLoading && isEditMode && !currentMember) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="text-gray-600 mt-2">Lädt Mitglied...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditMode ? 'Mitglied bearbeiten' : 'Neues Mitglied'}
        </h1>
        <p className="text-gray-600 mt-1">
          {isEditMode
            ? 'Aktualisiere die Mitgliedsdaten'
            : 'Füge ein neues Mitglied zum Verein hinzu'}
        </p>
      </div>

      {/* Success Message */}
      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 font-medium">
            ✅ Mitglied erfolgreich {isEditMode ? 'aktualisiert' : 'erstellt'}!
          </p>
          <p className="text-green-600 text-sm mt-1">Du wirst weitergeleitet...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800 font-medium">⚠️ Fehler</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Persönliche Daten */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Persönliche Daten</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Vorname */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vorname <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.firstName
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="z.B. Max"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Nachname */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nachname <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.lastName
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="z.B. Mustermann"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>

            {/* E-Mail */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-Mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="max@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Telefon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefon
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+49 123 456789"
              />
            </div>

            {/* Geburtsdatum */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Geburtsdatum
              </label>
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.birthdate
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.birthdate && (
                <p className="text-red-500 text-sm mt-1">{errors.birthdate}</p>
              )}
            </div>
          </div>
        </div>

        {/* Dart-Spezifische Daten */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Dart-Daten</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Lizenznummer */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lizenznummer
              </label>
              <input
                type="text"
                name="licenseNo"
                value={formData.licenseNo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="z.B. 12345"
              />
            </div>

            {/* Handedness */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wurfhand
              </label>
              <select
                name="handedness"
                value={formData.handedness}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Nicht angegeben</option>
                <option value="LEFT">Links</option>
                <option value="RIGHT">Rechts</option>
              </select>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rolle <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="PLAYER">Spieler</option>
                <option value="CAPTAIN">Captain</option>
                <option value="TRAINER">Trainer</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            {/* Status (nur im Edit Mode) */}
            {isEditMode && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ACTIVE">Aktiv</option>
                  <option value="INACTIVE">Inaktiv</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Abbrechen
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Speichert...' : isEditMode ? 'Speichern' : 'Erstellen'}
          </button>
        </div>
      </form>
    </div>
  );
}

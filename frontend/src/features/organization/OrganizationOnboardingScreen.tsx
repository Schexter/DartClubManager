// DartClub Manager - Organization Onboarding Screen
// Erstellt von Hans Hahn - Alle Rechte vorbehalten

import { useNavigate } from 'react-router-dom'
import { Navbar } from '../../components/layout'

const PlusCircleIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const UserGroupIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

export default function OrganizationOnboardingScreen() {
  const navigate = useNavigate()

  const handleCreateOrg = () => {
    navigate('/organization/create')
  }

  const handleJoinOrg = () => {
    navigate('/organization/join')
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-4">🎯</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-3">
            Willkommen beim DartClub Manager
          </h1>
          <p className="text-gray-600 text-lg">
            Um loszulegen, erstelle deine Organisation oder tritt einer bestehenden bei
          </p>
        </div>

        {/* Options */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Create Organization Card */}
          <div
            onClick={handleCreateOrg}
            className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-100 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                <PlusCircleIcon />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Organisation gründen
              </h2>
              <p className="text-gray-600 mb-6">
                Erstelle deine eigene Dart-Organisation und verwalte Teams, Matches und Mitglieder
              </p>
              <div className="text-primary font-semibold text-lg group-hover:underline">
                Jetzt gründen →
              </div>
            </div>
          </div>

          {/* Join Organization Card */}
          <div
            onClick={handleJoinOrg}
            className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-100 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-secondary mb-4 group-hover:scale-110 transition-transform">
                <UserGroupIcon />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Organisation beitreten
              </h2>
              <p className="text-gray-600 mb-6">
                Tritt einer bestehenden Organisation bei und werde Teil des Teams
              </p>
              <div className="text-secondary font-semibold text-lg group-hover:underline">
                Beitreten →
              </div>
            </div>
          </div>
        </div>

        {/* Info Text */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Du kannst später jederzeit weitere Organisationen erstellen oder beitreten</p>
        </div>
      </div>
      </div>
    </>
  )
}

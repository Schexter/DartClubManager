// DartClub Manager - Dashboard Wrapper
// Prüft ob User eine Organisation hat und lädt sie in den Redux Store
// Erstellt von Hans Hahn - Alle Rechte vorbehalten

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchMyOrganizations, setCurrentOrganization, selectOrganizations } from '../organization/organizationSlice'
import { setCurrentOrg } from '../auth/authSlice'  // ⭐ NEU: Import von authSlice
import OrganizationOnboardingScreen from '../organization/OrganizationOnboardingScreen'
import { DashboardScreen } from './DashboardScreen'

export default function DashboardWrapper() {
  const dispatch = useAppDispatch()
  const organizations = useAppSelector(selectOrganizations)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        // Lade Organisationen via Redux Thunk
        const result = await dispatch(fetchMyOrganizations()).unwrap()

        // Versuche gespeicherte Organisation aus localStorage zu laden
        const savedOrgId = localStorage.getItem('current_org_id')  // ⭐ current_org_id (nicht selectedOrganizationId!)
        if (savedOrgId && result.length > 0) {
          const savedOrg = result.find(o => o.id === savedOrgId)
          if (savedOrg) {
            dispatch(setCurrentOrganization(savedOrg))
            dispatch(setCurrentOrg(savedOrg.id))  // ⭐ NEU: Auch im authSlice setzen
            console.log('Gespeicherte Organisation geladen:', savedOrg.name)
          } else {
            // Fallback: Erste Organisation wählen
            dispatch(setCurrentOrganization(result[0]))
            dispatch(setCurrentOrg(result[0].id))  // ⭐ NEU: Auch im authSlice setzen
            console.log('Fallback: Erste Organisation gewählt:', result[0].name)
          }
        } else if (result.length > 0) {
          // Keine gespeicherte Organisation: Erste wählen
          dispatch(setCurrentOrganization(result[0]))
          dispatch(setCurrentOrg(result[0].id))  // ⭐ NEU: Auch im authSlice setzen
          console.log('Erste Organisation gewählt:', result[0].name)
        }
      } catch (error) {
        console.error('Failed to load organizations:', error)
      } finally {
        setLoading(false)
      }
    }

    loadOrganizations()
  }, [dispatch])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🎯</div>
          <p className="text-gray-600">Lade Organisationen...</p>
        </div>
      </div>
    )
  }

  if (organizations.length === 0) {
    return <OrganizationOnboardingScreen />
  }

  return <DashboardScreen organizations={organizations} />
}

// DartClub Manager - Dashboard Wrapper
// Prüft ob User eine Organisation hat
// Erstellt von Hans Hahn - Alle Rechte vorbehalten

import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { selectUser } from '../auth/authSlice'
import { setOrganizations } from '../organization/organizationSlice'
import OrganizationOnboardingScreen from '../organization/OrganizationOnboardingScreen'
import { DashboardScreen } from './DashboardScreen'
import { organizationService } from '../../lib/api/services'
import type { Organization } from '../../lib/api/types'

export default function DashboardWrapper() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const [organizations, setLocalOrganizations] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        const orgs = await organizationService.getMyOrganizations()
        setLocalOrganizations(orgs)
        dispatch(setOrganizations(orgs))
      } catch (error) {
        console.error('Failed to load organizations:', error)
        setLocalOrganizations([])
        dispatch(setOrganizations([]))
      } finally {
        setLoading(false)
      }
    }

    loadOrganizations()
  }, [])

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

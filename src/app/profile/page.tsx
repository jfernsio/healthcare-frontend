'use client'

import { useAuth } from '../contexts/app_contexts_AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    router.push('/login')
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Your Profile</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Height:</strong> {user.height} cm</p>
          <p><strong>Weight:</strong> {user.weight} kg</p>
          <p><strong>Blood Type:</strong> {user.bloodType}</p>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-4">
        <Button onClick={() => router.push('/emergency-contacts')} className="w-full bg-blue-600 hover:bg-blue-700">
          View Emergency Contacts
        </Button>
        <Button onClick={() => router.push('/appointments')} className="w-full bg-blue-600 hover:bg-blue-700">
          View Appointments
        </Button>
        <Button onClick={() => router.push('/medicine-reminders')} className="w-full bg-blue-600 hover:bg-blue-700">
          View Medicine Reminders
        </Button>
      </div>
    </div>
  )
}


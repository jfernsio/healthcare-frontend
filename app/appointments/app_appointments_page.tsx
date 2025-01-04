'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'

interface Appointment {
  id: number;
  title: string;
  description: string;
  location: string;
  datetime: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [newAppointment, setNewAppointment] = useState({ title: '', description: '', location: '', datetime: '' })
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  const addAppointment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newAppointment.title && newAppointment.datetime) {
      setAppointments([...appointments, { ...newAppointment, id: Date.now() }])
      setNewAppointment({ title: '', description: '', location: '', datetime: '' })
    }
  }

  const deleteAppointment = (id: number) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id))
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Appointment Scheduler</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Appointment</CardTitle>
          <CardDescription>Schedule a new appointment reminder</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={addAppointment} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newAppointment.title}
                  onChange={(e) => setNewAppointment({...newAppointment, title: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newAppointment.location}
                  onChange={(e) => setNewAppointment({...newAppointment, location: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="datetime">Date and Time</Label>
                <Input
                  id="datetime"
                  type="datetime-local"
                  value={newAppointment.datetime}
                  onChange={(e) => setNewAppointment({...newAppointment, datetime: e.target.value})}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newAppointment.description}
                  onChange={(e) => setNewAppointment({...newAppointment, description: e.target.value})}
                  className="h-24"
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" /> Add Appointment
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map(appointment => (
          <Card key={appointment.id}>
            <CardHeader>
              <CardTitle>{appointment.title}</CardTitle>
              <CardDescription>{new Date(appointment.datetime).toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">{appointment.location}</p>
              <p className="text-gray-600">{appointment.description}</p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => deleteAppointment(appointment.id)} 
                variant="destructive"
                className="w-full"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}


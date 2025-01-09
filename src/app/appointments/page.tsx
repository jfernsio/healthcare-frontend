'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin, Trash2, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { format } from 'date-fns'

interface Appointment {
  _id: string
  title: string
  description: string
  location: string
  notifyAt: string
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    appointmentTime: ''
  })

  // Fetch appointments on component mount
  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const response = await fetch('https://healthcare-api-production-1930.up.railway.app/api/get/apt/reminder', {
        credentials: 'include'
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch appointments')
      }
      
      const data = await response.json()
      setAppointments(data)
    } catch (err: any) {
      setError('Failed to load appointments')
      console.error(err)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('https://healthcare-api-production-1930.up.railway.app/api/apt/reminder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create appointment')
      }

      // Reset form and refresh appointments
      setFormData({
        title: '',
        description: '',
        location: '',
        appointmentTime: ''
      })
      setShowForm(false)
      fetchAppointments()
    } catch (err: any) {
      setError(err.message || 'Failed to create appointment')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (appointmentId: string) => {
    try {
      const response = await fetch(`https://healthcare-api-production-1930.up.railway.app/api/del/apt/reminder/${appointmentId}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to delete appointment')
      }

      // Remove appointment from state
      setAppointments(prev => prev.filter(app => app._id !== appointmentId))
    } catch (err: any) {
      setError('Failed to delete appointment')
      console.error(err)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800">My Appointments</h1>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="appointmentTime">Appointment Time</Label>
                <Input
                  id="appointmentTime"
                  type="datetime-local"
                  required
                  value={formData.appointmentTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, appointmentTime: e.target.value }))}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create Appointment'}
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appointments.map((appointment) => (
          <Card key={appointment._id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg text-blue-800">{appointment.title}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDelete(appointment._id)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
              
              <p className="text-gray-600 mt-2">{appointment.description}</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {format(new Date(appointment.notifyAt), 'PPp')}
                </div>
                
                {appointment.location && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {appointment.location}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {appointments.length === 0 && !isLoading && (
        <div className="text-center text-gray-600 mt-8">
          No appointments scheduled. Create one to get started!
        </div>
      )}
    </div>
  )
}


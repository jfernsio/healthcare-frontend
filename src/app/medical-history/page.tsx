'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin, CheckCircle, Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Appointment {
  _id: string
  title: string
  description: string
  location: string
  notifyAt: string
  status: 'completed' | 'upcoming' | 'cancelled'
}

export default function MedicalHistoryPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'completed' | 'upcoming'>('all')

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const response = await fetch('https://healthcare-api-production-1930.up.railway.app/api/appointments/history', {
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Failed to fetch medical history')
      }

      const data = await response.json()
      setAppointments(data)
    } catch (err) {
      setError('Failed to load medical history')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'all') return true
    if (filter === 'completed') return appointment.status === 'completed'
    if (filter === 'upcoming') return appointment.status === 'upcoming'
    return true
  })

  const sortedAppointments = [...filteredAppointments].sort((a, b) => 
    new Date(b.notifyAt).getTime() - new Date(a.notifyAt).getTime()
  )

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading medical history...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800 mb-4 md:mb-0">Medical History</h1>
        
        <div className="w-full md:w-auto">
          <Select
            value={filter}
            onValueChange={(value: 'all' | 'completed' | 'upcoming') => setFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter appointments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Appointments</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {sortedAppointments.map((appointment) => (
          <Card 
            key={appointment._id}
            className={`hover:shadow-md transition-shadow ${
              appointment.status === 'completed' ? 'border-l-4 border-green-500' :
              appointment.status === 'upcoming' ? 'border-l-4 border-blue-500' :
              'border-l-4 border-gray-500'
            }`}
          >
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-800">
                      {appointment.title}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {appointment.description}
                    </p>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {appointment.location}
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {format(new Date(appointment.notifyAt), 'PPP')}
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {format(new Date(appointment.notifyAt), 'p')}
                  </div>
                </div>

                <div className="mt-4 md:mt-0 md:ml-6">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                    appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                    appointment.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {sortedAppointments.length === 0 && (
          <div className="text-center text-gray-600 py-8">
            No appointments found for the selected filter.
          </div>
        )}
      </div>
    </div>
  )
}

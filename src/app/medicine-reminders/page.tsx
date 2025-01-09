'use client'

import { useState, useEffect } from 'react'
import { Clock, Trash2, Plus, Pill } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { format } from 'date-fns'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MedicineReminder {
  _id: string
  name: string
  description: string
  dosage: string
  frequency: string
  notifyAt: string
}

export default function MedicineRemindersPage() {
  const [reminders, setReminders] = useState<MedicineReminder[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  
  const [formData, setFormData] = useState({
    medicineName: '',
    description: '',
    dosage: '',
    frequency: '',
    notifyAt: ''
  })

  // Fetch reminders on component mount
  useEffect(() => {
    fetchReminders()
  }, [])

  const fetchReminders = async () => {
    try {
      const response = await fetch('https://healthcare-api-production-1930.up.railway.app/api/med/reminder', {
        credentials: 'include'
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch reminders')
      }
      
      const data = await response.json()
      setReminders(data)
    } catch (err: any) {
      setError('Failed to load medicine reminders')
      console.error(err)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('https://healthcare-api-production-1930.up.railway.app/api/reminder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create reminder')
      }

      // Reset form and refresh reminders
      setFormData({
        medicineName: '',
        description: '',
        dosage: '',
        frequency: '',
        notifyAt: ''
      })
      setShowForm(false)
      fetchReminders()
    } catch (err: any) {
      setError(err.message || 'Failed to create reminder')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (medId: string) => {
    try {
      const response = await fetch(`https://healthcare-api-production-1930.up.railway.app/api/del/med/reminder/${medId}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Failed to delete reminder')
      }

      // Remove reminder from state
      setReminders(prev => prev.filter(rem => rem._id !== medId))
    } catch (err: any) {
      setError('Failed to delete reminder')
      console.error(err)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800">Medicine Reminders</h1>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Reminder
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
            <CardTitle>Create New Medicine Reminder</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="medicineName">Medicine Name</Label>
                <Input
                  id="medicineName"
                  required
                  value={formData.medicineName}
                  onChange={(e) => setFormData(prev => ({ ...prev, medicineName: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description/Notes</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dosage">Dosage</Label>
                <Input
                  id="dosage"
                  required
                  placeholder="e.g., 1 tablet"
                  value={formData.dosage}
                  onChange={(e) => setFormData(prev => ({ ...prev, dosage: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select
                  value={formData.frequency}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, frequency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="twice_daily">Twice Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notifyAt">Reminder Time</Label>
                <Input
                  id="notifyAt"
                  type="datetime-local"
                  required
                  value={formData.notifyAt}
                  onChange={(e) => setFormData(prev => ({ ...prev, notifyAt: e.target.value }))}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create Reminder'}
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
        {reminders.map((reminder) => (
          <Card key={reminder._id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-blue-800 flex items-center">
                    <Pill className="h-5 w-5 mr-2" />
                    {reminder.name}
                  </h3>
                  <p className="text-sm text-blue-600">{reminder.dosage}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDelete(reminder._id)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
              
              <p className="text-gray-600 mt-2">{reminder.description}</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {format(new Date(reminder.notifyAt), 'PPp')}
                </div>
                
                <div className="text-sm text-gray-600">
                  Frequency: {reminder.frequency.replace('_', ' ')}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reminders.length === 0 && !isLoading && (
        <div className="text-center text-gray-600 mt-8">
          No medicine reminders set. Create one to get started!
        </div>
      )}
    </div>
  )
}


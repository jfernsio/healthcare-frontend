'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface MedicineReminder {
  id: number;
  name: string;
  dosage: string;
  description: string;
  frequency: string;
}

const frequencies = ['Daily', 'Weekly', 'Monthly']

export default function MedicineRemindersPage() {
  const [reminders, setReminders] = useState<MedicineReminder[]>([])
  const [newReminder, setNewReminder] = useState({ name: '', dosage: '', description: '', frequency: '' })

  const addReminder = (e: React.FormEvent) => {
    e.preventDefault()
    if (newReminder.name && newReminder.dosage && newReminder.frequency) {
      setReminders([...reminders, { ...newReminder, id: Date.now() }])
      setNewReminder({ name: '', dosage: '', description: '', frequency: '' })
    }
  }

  const deleteReminder = (id: number) => {
    setReminders(reminders.filter(reminder => reminder.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Medicine Reminders</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Medicine Reminder</CardTitle>
          <CardDescription>Set up a new medicine reminder</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={addReminder} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Medicine Name</Label>
                <Input
                  id="name"
                  value={newReminder.name}
                  onChange={(e) => setNewReminder({...newReminder, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="dosage">Dosage</Label>
                <Input
                  id="dosage"
                  value={newReminder.dosage}
                  onChange={(e) => setNewReminder({...newReminder, dosage: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="frequency">Frequency</Label>
                <Select 
                  onValueChange={(value) => setNewReminder({...newReminder, frequency: value})}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencies.map((freq) => (
                      <SelectItem key={freq} value={freq}>{freq}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newReminder.description}
                  onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
                  className="h-24"
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" /> Add Reminder
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reminders.map(reminder => (
          <Card key={reminder.id}>
            <CardHeader>
              <CardTitle>{reminder.name}</CardTitle>
              <CardDescription>{reminder.dosage} - {reminder.frequency}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{reminder.description}</p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => deleteReminder(reminder.id)} 
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


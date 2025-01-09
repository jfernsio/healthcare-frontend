'use client'

import { useState, useEffect } from 'react'
import { Phone, Trash2, Plus, UserPlus, Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface EmergencyContact {
  _id: string
  name: string
  phoneNumber: string
  relationship: string
}

export default function EmergencyContactsPage() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    relation: ''
  })

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch('https://healthcare-api-production-1930.up.railway.app/api/get/contacts', {
        credentials: 'include'
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch contacts')
      }
      
      const data = await response.json()
      if (Array.isArray(data)) {
        setContacts(data)
      } else {
        setContacts([])
      }
    } catch (err: any) {
      setError('Failed to load emergency contacts')
      console.error(err)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('https:/healthcare-api-production-1930.up.railway.app/create/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.msg || 'Failed to create contact')
      }

      // Reset form and refresh contacts
      setFormData({
        name: '',
        phone: '',
        relation: ''
      })
      setShowForm(false)
      fetchContacts()
    } catch (err: any) {
      setError(err.message || 'Failed to create contact')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (contactId: string) => {
    try {
      const response = await fetch(`https://healthcare-api-production-1930.up.railway.app/api/del/contact/${contactId}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Failed to delete contact')
      }

      // Remove contact from state
      setContacts(prev => prev.filter(contact => contact._id !== contactId))
    } catch (err: any) {
      setError('Failed to delete contact')
      console.error(err)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800">Emergency Contacts</h1>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add Contact
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
            <CardTitle>Add Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1234567890"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="relation">Relationship</Label>
                <Input
                  id="relation"
                  required
                  value={formData.relation}
                  onChange={(e) => setFormData(prev => ({ ...prev, relation: e.target.value }))}
                  placeholder="e.g., Parent, Spouse, Sibling"
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Adding...' : 'Add Contact'}
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
        {contacts.map((contact) => (
          <Card key={contact._id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-blue-800">{contact.name}</h3>
                  <div className="flex items-center text-blue-600">
                    <Heart className="h-4 w-4 mr-1" />
                    {contact.relationship}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDelete(contact._id)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="mt-4 flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <a href={`tel:${contact.phoneNumber}`} className="hover:text-blue-600">
                  {contact.phoneNumber}
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {contacts.length === 0 && !isLoading && (
        <div className="text-center text-gray-600 mt-8">
          No emergency contacts added yet. Add some contacts to get started!
        </div>
      )}
    </div>
  )
}


'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from '../contexts/app_contexts_AuthContext'
import { useRouter } from 'next/navigation'

interface Contact {
  id: number;
  name: string;
  phone: string;
  relation: string;
}

export default function EmergencyContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [newContact, setNewContact] = useState({ name: '', phone: '', relation: '' })
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  const addContact = (e: React.FormEvent) => {
    e.preventDefault()
    if (newContact.name && newContact.phone && newContact.relation) {
      setContacts([...contacts, { ...newContact, id: Date.now() }])
      setNewContact({ name: '', phone: '', relation: '' })
    }
  }

  const deleteContact = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id))
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Emergency Contacts</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Contact</CardTitle>
          <CardDescription>Add an emergency contact to your list</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={addContact} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="relation">Relation</Label>
                <Input
                  id="relation"
                  value={newContact.relation}
                  onChange={(e) => setNewContact({...newContact, relation: e.target.value})}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" /> Add Contact
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map(contact => (
          <Card key={contact.id}>
            <CardHeader>
              <CardTitle>{contact.name}</CardTitle>
              <CardDescription>{contact.relation}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{contact.phone}</p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => deleteContact(contact.id)} 
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


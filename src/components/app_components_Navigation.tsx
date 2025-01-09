'use client'

import Link from 'next/link'
import { useAuth } from '../app/contexts/app_contexts_AuthContext'
import { LogOut } from 'lucide-react'

export default function Navigation() {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout() // This will now handle the redirection
  }

  return (
    <nav>
      <ul className="flex space-x-4">
        {user ? (
          <>
            <li><Link href="/profile" className="text-blue-600 hover:text-blue-800">Profile</Link></li>
            <li><Link href="/emergency-contacts" className="text-blue-600 hover:text-blue-800">Emergency Contacts</Link></li>
            <li><Link href="/appointments" className="text-blue-600 hover:text-blue-800">Appointments</Link></li>
            <li><Link href="/medicine-reminders" className="text-blue-600 hover:text-blue-800">Medicine Reminders</Link></li>
            <li>
              <button 
                onClick={handleLogout}
                className="flex items-center text-sm font-medium text-red-600 hover:text-red-700"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link href="/faq" className="text-blue-600 hover:text-blue-800">FAQ</Link></li>
            <li><Link href="/login" className="text-blue-600 hover:text-blue-800">Login</Link></li>
            <li><Link href="/signup" className="text-blue-600 hover:text-blue-800">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  )
}


'use client'

import Link from 'next/link'
import { useAuth } from '../app/contexts/app_contexts_AuthContext'

export default function Navigation() {
  const { user, logout } = useAuth()

  return (
    <nav>
      <ul className="flex space-x-4">
        {user ? (
          <>
            <li><Link href="/profile" className="text-blue-600 hover:text-blue-800">Profile</Link></li>
            <li><Link href="/emergency-contacts" className="text-blue-600 hover:text-blue-800">Emergency Contacts</Link></li>
            <li><Link href="/appointments" className="text-blue-600 hover:text-blue-800">Appointments</Link></li>
            <li><Link href="/medicine-reminders" className="text-blue-600 hover:text-blue-800">Medicine Reminders</Link></li>
            <li><button onClick={logout} className="text-blue-600 hover:text-blue-800">Logout</button></li>
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


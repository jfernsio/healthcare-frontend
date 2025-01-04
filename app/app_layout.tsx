import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import './globals.css'
import { AuthProvider } from './contexts/AuthContext'
import Navigation from './components/Navigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-blue-50">
        <AuthProvider>
          <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" className="flex items-center">
                <PlusCircle className="h-8 w-8 text-blue-600 mr-2" />
                <span className="text-2xl font-bold text-blue-800">HealthHub</span>
              </Link>
              <Navigation />
            </div>
          </header>

          <main className="flex-grow">
            {children}
          </main>

          <footer className="bg-blue-800 text-white py-4">
            <div className="container mx-auto px-4 text-center">
              &copy; 2023 HealthHub. All rights reserved.
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  )
}


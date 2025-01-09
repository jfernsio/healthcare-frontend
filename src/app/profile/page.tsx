'use client'

import { useState, useEffect } from 'react'
import { User, Mail, Phone, Calendar, Weight, Ruler, Droplet, Activity, History } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'

interface UserProfile {
  name: string
  email: string
  age: number
  height: number
  weight: number
  bloodType: string
  gender: string
}

// Add BMI calculation function
const calculateBMI = (weight: number, height: number): { value: number; category: string } => {
  // Convert height from cm to meters
  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)
  
  let category = ''
  if (bmi < 18.5) category = 'Underweight'
  else if (bmi < 25) category = 'Normal weight'
  else if (bmi < 30) category = 'Overweight'
  else category = 'Obese'

  return {
    value: Number(bmi.toFixed(1)),
    category
  }
}

// Add function to capitalize blood type
const formatBloodType = (bloodType: string): string => {
  return bloodType.toUpperCase()
}



export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('https://healthcare-api-production-1930.up.railway.app/api/user/profile', {
        credentials: 'include' // for sending cookies
      })

      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }

      const data = await response.json()
      setProfile(data)
    } catch (err) {
      setError('Failed to load profile')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading profile...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-600 text-center">{error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">My Profile</h1>

      {profile && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <User className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">Name</div>
                    <div className="font-medium">{profile.name}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium">{profile.email}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">Age</div>
                    <div className="font-medium">{profile.age} years</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <User className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">Gender</div>
                    <div className="font-medium">{profile.gender}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Ruler className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">Height</div>
                    <div className="font-medium">{profile.height} cm</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Weight className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">Weight</div>
                    <div className="font-medium">{profile.weight} kg</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Droplet className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">Blood Type</div>
                    <div className="font-medium">{formatBloodType(profile.bloodType)}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">BMI (Body Mass Index)</div>
                    <div className="font-medium">
                      {calculateBMI(profile.weight, profile.height).value}
                    </div>
                    <div className={`text-sm ${
                      calculateBMI(profile.weight, profile.height).category === 'Normal weight' 
                        ? 'text-green-600' 
                        : 'text-orange-600'
                    }`}>
                      {calculateBMI(profile.weight, profile.height).category}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>BMI Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    BMI Categories:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-200 mr-2"></div>
                      Underweight: &lt; 18.5
                    </li>
                    <li className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-200 mr-2"></div>
                      Normal weight: 18.5 - 24.9
                    </li>
                    <li className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-200 mr-2"></div>
                      Overweight: 25 - 29.9
                    </li>
                    <li className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-200 mr-2"></div>
                      Obese: ≥ 30
                    </li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-4">
                    Note: BMI is a general indicator and may not be accurate for athletes, 
                    elderly, or during pregnancy. Consult your healthcare provider for 
                    personalized advice.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Link href="/medical-history">
              <Card className="hover:shadow-lg transition-all cursor-pointer border-blue-100 hover:border-blue-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <History className="h-6 w-6 text-blue-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-blue-800">View Medical History</h3>
                        <p className="text-gray-600">Access your past appointments and medical records</p>
                      </div>
                    </div>
                    <div className="text-blue-600">→</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}


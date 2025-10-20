import React from 'react'
import Navbar from '../components/navbar'
import ProfileContent from '../components/ProfileContent'

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ProfileContent />
    </div>
  )
}

export default Profile


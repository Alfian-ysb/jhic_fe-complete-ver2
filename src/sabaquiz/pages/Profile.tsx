import React from 'react'
import Navbar from '../componets/navbar'
import ProfileContent from '../componets/ProfileContent'

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ProfileContent />
    </div>
  )
}

export default Profile


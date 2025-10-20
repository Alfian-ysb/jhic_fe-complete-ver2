// components/sabaquiz/ProfileContent.tsx
import React, { useState } from 'react'

interface UserProfile {
  firstName: string
  lastName: string
  nis: string
  class: string
  gender: string
  avatar: string
}

const ProfileContent: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    nis: '',
    class: '',
    gender: '',
    avatar: '/images/piala.svg'
  })

  const [isEditing, setIsEditing] = useState(false)
  const [tempProfile, setTempProfile] = useState<UserProfile>(profile)

  // Handle Edit Mode
  const handleEdit = () => {
    setTempProfile(profile) // Simpan data sementara
    setIsEditing(true)
  }

  // Handle Cancel
  const handleCancel = () => {
    setTempProfile(profile) // Reset ke data asli
    setIsEditing(false)
  }

  // Handle Save
  const handleSave = () => {
    setProfile(tempProfile) // Simpan perubahan
    setIsEditing(false)
    alert('Berhasil Mengupdate Profil') // Bisa diganti dengan toast/notification
  }

  // Handle Input Change
  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setTempProfile({
      ...tempProfile,
      [field]: value
    })
  }

  // Handle Avatar Upload
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setTempProfile({
          ...tempProfile,
          avatar: reader.result as string
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Profil</h1>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-md p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Avatar */}
            <div className="lg:col-span-1 px-4">
              <div className="flex flex-col items-center lg:items-start space-y-4">
                {/* Avatar */}
                <div className="relative mx-auto w-55 h-55 bg-gray-200 rounded-2xl flex items-center justify-center overflow-hidden group">
                  <img 
                    src={isEditing ? tempProfile.avatar : profile.avatar}
                    alt="Profile Avatar"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23999"%3E%3Cpath d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/%3E%3C/svg%3E'
                    }}
                  />
                  
                  {/* Upload Overlay - Muncul saat hover (edit mode) */}
                  {isEditing && (
                    <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-white text-center">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm font-medium">Ubah Foto Profil</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                        id="avatar-upload"
                      />
                    </label>
                  )}
                </div>

                {/* Upload Button - Visible Button */}
                {isEditing && (
                  <label 
                    htmlFor="avatar-upload"
                    className="w-full cursor-pointer"
                  >
                    <div className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span className="text-sm font-medium">Unggah Foto</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                      id="avatar-upload"
                    />
                  </label>
                )}

                {/* User Name Display */}
                <div className="w-full space-y-2 text-center lg:text-left">
                  <h3 className="text-xl font-bold text-gray-900">
                    {profile.firstName} {profile.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">Kelas : {profile.class} </p>
                </div>

                {/* Stats or Badge (Optional) */}
                <div className="flex gap-2">
                  <div className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                    Siswa
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Account Details */}
            <div className="lg:col-span-2">
              <div className="border-b-2 border-gray-300 pb-4 mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Detail Akun</h2>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="font-medium text-gray-700 mb-2">
                    Nama Depan
                  </label>
                  <input
                    type="text"
                    value={isEditing ? tempProfile.firstName : profile.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder='Ubah Nama Depan'
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg ${
                      isEditing 
                        ? 'bg-white border-blue-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                        : 'bg-gray-200 border-gray-300 text-gray-700'
                    }`}
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="font-medium text-gray-700 mb-2">
                    Nama Belakang
                  </label>
                  <input
                    type="text"
                    value={isEditing ? tempProfile.lastName : profile.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder='Ubah Nama Belakang'
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg ${
                      isEditing 
                        ? 'bg-white border-blue-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                        : 'bg-gray-200 border-gray-300 text-gray-700'
                    }`}
                  />
                </div>

                {/* NIS */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NIS
                  </label>
                  <input
                    type="text"
                    value={isEditing ? tempProfile.nis : profile.nis}
                    onChange={(e) => handleInputChange('nis', e.target.value)}
                    placeholder='Masukkan NIS'
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg ${
                      isEditing 
                        ? 'bg-white border-blue-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                        : 'bg-gray-200 border-gray-300 text-gray-700'
                    }`}
                  />
                </div>

                {/* Class */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kelas
                  </label>
                   {isEditing ? (
                    <select
                      value={tempProfile.class}

                      onChange={(e) => handleInputChange('class', e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-blue-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Pilih Kelas</option>
                      <option value="X">X</option>
                      <option value="XI">XI</option>
                      <option value="XII">XII</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={profile.class}
                      disabled
                      placeholder='Masukkan Kelas'
                      className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg text-gray-700"
                    />
                  )}
                </div>

                {/* Gender */}
                <div className="sm:col-span-2">
                  <label className="font-medium text-gray-700 mb-2">
                    Jenis Kelamin
                  </label>
                  {isEditing ? (
                    <select
                      value={tempProfile.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-blue-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="Laki - laki">Laki - laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={profile.gender}
                      disabled
                      placeholder='Masukkan Jenis Kelamin'
                      className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg text-gray-700"
                    />
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-8">
                {isEditing ? (
                  <>
                    {/* Cancel Button */}
                    <button 
                      onClick={handleCancel}
                      className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Batalkan
                    </button>
                    {/* Save Button */}
                    <button 
                      onClick={handleSave}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                    >
                      Simpan Perubahan
                    </button>
                  </>
                ) : (
                  /* Edit Button */
                  <button 
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    <span>Edit Profile</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileContent
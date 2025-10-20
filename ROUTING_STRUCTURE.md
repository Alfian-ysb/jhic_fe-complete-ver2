# Routing Structure - JHIC Frontend

## Overview
All routing has been consolidated into a single `src/App.tsx` file for better maintainability and clarity.

## Structure

```
main.tsx (BrowserRouter)
  └── App.tsx (All Routes)
       ├── /auth/* (Authentication routes)
       ├── /lentera-karya/* (Lentera Karya routes)
       ├── /sabaquiz/* (SabaQuiz routes)
       └── /* (Home/Main routes)
```

## Route Paths

### Home Routes (/)
- `/` - Home page
- `/sejarah` - Sejarah page
- `/visi-dan-misi` - Visi dan Misi page
- `/sarana-prasarana` - Sarana Prasarana page
- `/struktur-organisasi` - Struktur Organisasi page
- `/teaching-factory` - Teaching Factory page
- `/ekstrakurikuler` - Ekstrakurikuler page
- `/organisasi-siswa` - Organisasi Siswa page
- `/berita` - Berita list page
- `/berita/:id` - Berita detail page
- `/program-keahlian/:id` - Program Keahlian detail page
- `/program-keahlian/hehe` - Program Keahlian hehe page
- `/prestasi` - Prestasi page

### Auth Routes (/auth)
- `/auth/login` - Login page
- `/auth/signup` - Signup page
- `/auth/dashboard` - Dashboard (Protected)

### Lentera Karya Routes (/lentera-karya)
- `/lentera-karya` - Main Lentera Karya page
- `/lentera-karya/dashboard` - Dashboard page
- `/lentera-karya/upload` - Upload Karya page
- `/lentera-karya/detail/:id` - Karya detail page
- `/lentera-karya/admin` - Admin dashboard
- `/lentera-karya/admin/categories/add` - Add category page

### SabaQuiz Routes (/sabaquiz)
- `/sabaquiz` - Main SabaQuiz page
- `/sabaquiz/minigame` - Mini game page
- `/sabaquiz/leaderboard` - Leaderboard page
- `/sabaquiz/profile` - Profile page
- `/sabaquiz/create-quiz` - Create quiz page
- `/sabaquiz/league` - League overview page

## File Changes

### Modified Files:
- `src/main.tsx` - Simplified to only contain BrowserRouter and App component
- `src/App.tsx` - **NEW** - Contains all routing logic
- `src/home/App.tsx` - Emptied (no longer used)
- `src/auth/App.tsx` - Emptied (no longer used)
- `src/lentera-karya/App.tsx` - Emptied (no longer used)
- `src/sabaquiz/App.tsx` - Emptied (no longer used)

## Benefits

1. **Single Source of Truth**: All routes are in one place
2. **No Router Conflicts**: Only one BrowserRouter instance
3. **Easier Debugging**: Clear route hierarchy
4. **Better Maintainability**: Easy to add/modify routes
5. **Improved Performance**: No nested routers

## Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

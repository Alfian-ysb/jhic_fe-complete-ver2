# Instructions to Complete the Setup

## Copy Frontend Code

Please copy the following directories from their respective repos:

### 1. Home Frontend
Copy from: `jhic_FE-home/client/src/*`
To: `Front-End-Complete/src/home/`

### 2. Auth Frontend  
Copy from: `jhic_FE-Auth/src/*`
To: `Front-End-Complete/src/auth/`

### 3. Lentera Karya Frontend
Copy from: `JHIC_FE-LenteraKarya/src/*`
To: `Front-End-Complete/src/lentera-karya/`

### 4. SabaQuiz Frontend
Copy from: `JHIC_FE-SabaQuiz/src/*`
To: `Front-End-Complete/src/sabaquiz/`

## Then Run

```bash
cd Front-End-Complete
npm install
npm run build:nocheck
```

This will build all 4 frontends into one `dist/` folder with all errors bypassed!

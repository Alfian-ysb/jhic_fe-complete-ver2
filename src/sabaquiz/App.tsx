import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import SabaQuiz from './pages/SabaQuiz'
import MiniGame from './pages/MiniGame'
import NotFound from './pages/notFound'
import LeaderBoard from './pages/LeaderBoard'
import Profile from './pages/Profile'
import CreateQuiz from './pages/CreateQuiz'
import LeagueOverview from './pages/League'




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sabaquiz" element={<SabaQuiz />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/minigame" element={<MiniGame />} />
        <Route path="/leaderboard" element={<LeaderBoard /> } />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path='/league' element={<LeagueOverview />} />
      </Routes>
    </Router>
  )
} 

export default App
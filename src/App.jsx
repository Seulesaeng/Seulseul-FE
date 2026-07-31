import { Route, Routes } from 'react-router-dom'
import Home from '@/app/Home'
import Chat from '@/app/Chat'
import My from '@/app/My'
import Onboarding from '@/app/Onboarding'
import Scanning from '@/app/Scanning'
import ReserveComplete from '@/app/ReserveComplete'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/scanning" element={<Scanning />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/reserve-complete" element={<ReserveComplete />} />
      <Route path="/my" element={<My />} />
    </Routes>
  )
}

export default App

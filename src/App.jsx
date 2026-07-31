import { Route, Routes } from 'react-router-dom'
import Home from '@/app/Home'
import Chat from '@/app/Chat'
import My from '@/app/My'
import Profile from './app/Onboarding/Profile'
import CareSelect from './app/Onboarding/CareSelect'
import Permission from './app/Onboarding/Permission'
import Scanning from './app/Onboarding/Scanning'
import ScanResult from './app/Onboarding/ScanResult'
import ReserveComplete from '@/app/ReserveComplete'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/onboarding/profile" element={<Profile />} />
      <Route path="/onboarding/care-select" element={<CareSelect />} />
      <Route path="/onboarding/permission" element={<Permission />} />
      <Route path="/onboarding/scanning" element={<Scanning />} />
      <Route path="/onboarding/scan-result" element={<ScanResult />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/reserve-complete" element={<ReserveComplete />} />
      <Route path="/my" element={<My />} />
    </Routes>
  )
}

export default App

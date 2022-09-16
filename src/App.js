import './App.css'
import Work from './pages/Work'
import NotFound from './pages/NotFound'
import ArtPiece from './pages/ArtPiece'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/work" element={<Work />} />
      <Route path="/work/:slug" element={<ArtPiece />} />
      <Route path="*" element={<NotFound />} />
      {/* if not other routs match */}
    </Routes>
  )
}

export default App

// for dynamic values we specify what is known as a URL param in react router
// Instead of /1 we have /:userId
// The useId param will match any value as long as the pattern is the same.
// So the url value will be /anyvalue

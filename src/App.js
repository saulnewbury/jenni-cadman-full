import './App.css'
import Work from './pages/Work'
import NotFound from './pages/NotFound'
import ArtPiece from './pages/ArtPiece'
import Layout from './components/shared/Layout'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

function App() {
  const location = useLocation()
  return (
    <Layout>
      <AnimatePresence exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<ArtPiece />} />
          <Route path="*" element={<NotFound />} />
          {/* if not other routs match */}
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}

export default App

// for dynamic values we specify what is known as a URL param in react router
// Instead of /1 we have /:userId
// The useId param will match any value as long as the pattern is the same.
// So the url value will be /anyvalue

// AnimatePresence - detects if the key of its child changes it waits until the exit of all its children are finished before unmounting those components. After the exits animations are done it mounts the new components. Therefore we have to give <Routes> a key.

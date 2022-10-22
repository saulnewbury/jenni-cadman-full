import React from 'react'
import { motion } from 'framer-motion'
import './animate-page.scss'

const animations = {
  // On mount we'll animates from initial to animate
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  // When component unmounts it will transition to the exit state
  exit: { opacity: 0 }
}

const AnimatePage = ({ children }) => {
  React.useEffect(() => {
    if (window.history.scrollRestoration)
      window.history.scrollRestoration = 'manual'
  }, [])

  return (
    <motion.div
      className="motion-div"
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

export default AnimatePage

// The history object has a scrollRestoration object on new browsers.
// It will be truthy. If it doesn't exist it will be falsy.
// If the former (if it exist) we set it to 'manual'. This stops automatic scroll position restore.

// 'if' used in order to avoid setting a variable that doesn't exist.

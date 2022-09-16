import React from 'react'
import { motion } from 'framer-motion'

const animations = {
  // On mount we'll animates from initial to animate
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  // When component unmounts it will transition to the exit state
  exit: { opacity: 0 }
}

const AnimatePage = ({ children }) => {
  return (
    <motion.div
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

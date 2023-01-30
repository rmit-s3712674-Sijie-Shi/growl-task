import React, { useEffect } from 'react'

import './growl.css'

export const Growl = ({ active, message, onDismissed }) => (
  <div className={`growl${active ? " active" : ""}`}>
    {message}
    <div onClick={onDismissed} className="growl-close" />
  </div>
)

export function useGrowl(time = 3000) {
    // state of the growl
    const [growlActive, setGrowlActive] = React.useState(false)
    useEffect(() => {
      if (growlActive) {
        const setDismiss = setTimeout(() => setGrowlActive(false), time);
        return () => clearTimeout(setDismiss);
      }
    }, [growlActive, time]);
    return [
        // the first arg is the state
        growlActive, 

        // the second arg is a fn that allows you to safely set its state
        (active) => {
            setGrowlActive(active)
        },
    ]
}
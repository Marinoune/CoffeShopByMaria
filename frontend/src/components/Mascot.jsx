import React, { useEffect, useState } from 'react'

export default function Mascot(){
  const [msg, setMsg] = useState('Good morning, sunshine!')
  const messages = [
    'Good morning, sunshine!',
    'Hop in for a latte Baby ☕',
    'You look adorable today!',
    'Fresh pastries are waiting 🥐',
    'Maria says: Smile! 😊'
  ]

  useEffect(() => {
    const t = setInterval(() => {
      setMsg(messages[Math.floor(Math.random()*messages.length)])
    }, 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="mascot">
      <div className="mascot-bubble">{msg}</div>
      <div className="mascot-body" aria-hidden>
        <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <g>
            
          </g>
        </svg>
      </div>
    </div>
  )
}
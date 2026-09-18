import React, { useEffect, useState } from 'react'

export default function MusicToggle(){
  const [playing, setPlaying] = useState(false)
  const [audio] = useState(() => new Audio('/public/cutie-japan-lofi-402355.mp3'))

  useEffect(() => {
    audio.loop = true
    return () => audio.pause()
  }, [audio])

  const toggle = async () => {
    try {
      if(playing){ audio.pause(); setPlaying(false) }
      else { await audio.play(); setPlaying(true) }
    } catch(e){ console.warn('Audio play failed', e) }
  }

  return (
    <button className="tab" onClick={toggle} aria-pressed={playing}>
      {playing ? 'Stop Music' : 'Play Music'}
    </button>
  )
}
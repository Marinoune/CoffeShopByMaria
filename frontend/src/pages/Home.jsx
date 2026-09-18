import { Link } from 'react-router-dom'
import Mascot from '../components/Mascot'
import MusicToggle from '../components/MusicToggle'

export default function Home(){
  return (
    <div>
    <div className="hero">
      <div className="card">
        <span className="badge"><MusicToggle /></span>
        <div style={{marginTop:12}}><Mascot /></div>
        <h1>Welcome to Maria's Coffee </h1>
        <p>Your cozy corner for breakfast, brunch...ext. crafted with love and a sprinkle of pastel magic.</p>
        <div className="cta">
          <Link to="/menu" className="btn">Explore Menu</Link>
          <Link to="/order" className="btn ghost">Order Now</Link>
        </div>
      </div>
      <div>
      <img src='/cup.png' alt="cute hero" style={{width:'100%',borderRadius:16,boxShadow:'0 6px 22px rgba(0,0,0,.08)',position: 'relative',
    zIndex: 0}}/>
      <div className="beans"></div>
      </div>
    </div>
    <div className='pepa'>
      <p className="pepa-text t1">
        Discover Our Coffee</p>
      <p className="pepa-text t2">Join our Membership club <br></br> & win countless gifts!</p></div>

    </div>
  )
}

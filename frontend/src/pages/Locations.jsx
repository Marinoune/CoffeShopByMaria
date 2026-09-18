import { useEffect, useState } from 'react'
import { API } from '../api'

export default function Locations(){
  const [locations, setLocations] = useState([])
  useEffect(() => {
  fetch("http://localhost:5000/api/locations")
    .then(res => res.json())
    .then(data => setLocations(data))
    .catch(err => console.error("Error loading locations:", err));
}, []);


  return (
    <div>
      <div className="section-title">
        <div>
          <div className="kicker">Find us</div>
          <h2>Our Locations</h2>
        </div>
      </div>
      <div className="gridspecial">
        {locations.map(l => (
          <article key={l.id} className="cardbig">
            <img src={l.image} alt={l.city} />
            <h3>{l.name}</h3>
            <div className="kicker">{l.address}</div>
          </article>
        ))}
      </div>
    </div>
  )
}

import { useEffect, useMemo, useState } from 'react'
import React from "react"
import { API } from '../api.js'
import { useCart } from '../cart/CartContext.jsx'

export default function Menu(){
  const [dailyId, setDailyId] = React.useState(null)
  const [menu, setMenu] = useState([])
  const [tab, setTab] = useState('all')
  const [q, setQ] = useState('')
  const { add } = useCart()
  const target = document.getElementById("order-button");


  useEffect(() => {
    fetch("/api/menu")
      .then(res => res.json())
      .then(data => setMenu(data))
      .catch(err => console.error("Error loading menu:", err));
  }, [])


  const handleAdd = (e, item) => {
    console.log(item.image);
    const rect = e.currentTarget.getBoundingClientRect();

    const startX = rect.left + rect.width / 2 + window.scrollX;
    const startY = rect.top + rect.height / 2 + window.scrollY;

    const target = document.getElementById("order-button");

    if (!target) return; // safety

    const targetRect = target.getBoundingClientRect();

    const endX = targetRect.left + targetRect.width / 2 + window.scrollX;
    const endY = targetRect.top + targetRect.height / 2 + window.scrollY;

    createFlyingItem(startX, startY, endX, endY, item.image);

    add(item);
  };




  const createFlyingItem = (startX, startY, endX, endY, imageSrc) => {
    console.log("IMAGE SRC:", imageSrc);
    const el = document.createElement("img");

    el.src = imageSrc.startsWith('/') ? imageSrc : `/${imageSrc}`;
    el.onload = () => console.log("IMAGE LOADED OK");
    el.onerror = () => console.log("IMAGE FAILED TO LOAD");
    el.style.position = "absolute";
    el.style.left = `${startX}px`;
    el.style.top = `${startY}px`;
    el.style.width = "40px";
    el.style.height = "40px";
    el.style.pointerEvents = "none";
    el.style.transition = "transform 0.7s ease-in-out, opacity 0.7s";

    document.body.appendChild(el);

    requestAnimationFrame(() => {
      const dx = endX - startX;
      const dy = endY - startY;

      el.style.transform = `translate(${dx}px, ${dy}px) scale(0.5)`;
      el.style.opacity = "0";
    });

    setTimeout(() => el.remove(), 700);
  };

  const filtered = useMemo(() => {
    return (menu || []).filter(it => {
      const okTab = tab === 'all' || it.category.toLowerCase() === tab.toLowerCase()
      const okQ = !q || it.name.toLowerCase().includes(q.toLowerCase())
      return okTab && okQ
    })
  }, [menu, tab, q])

  return (
    <div>
      <div className="section-title">
        <div>
          <div className="kicker">Our selection</div>
          <h2 style={{ fontSize: "28px", margin: "0px", fontFamily: "cursive" }}>Menu</h2>
        </div>
        <div className="tabs">
          <button className={tab==='all'?'tab active':'tab'} onClick={()=>setTab('all')}>All</button>
          <button className={tab==='breakfast'?'tab active':'tab'} onClick={()=>setTab('breakfast')}>Breakfast</button>
          <button className={tab==='brunch'?'tab active':'tab'} onClick={()=>setTab('brunch')}>Brunch</button>
          <button className={tab==='usual'?'tab active':'tab'} onClick={()=>setTab('usual')}>Usual</button>
        </div>
      </div>
      <div className="row" style={{marginTop:12}}>
        <input
          className="input"
          placeholder="Search drinks or dishes…"
          value={q}
          onChange={e=>setQ(e.target.value)}
        />
      </div>

      <div className="grid">
        {filtered.map(it => (
          <article key={it.id} className="card">
            <img src={it.image.startsWith('/') ? it.image : `/${it.image}`} alt={it.name} />
            <h3>
              {it.name} {dailyId === it.id && <span className="star-badge" style={{marginLeft:8}}>🌟 Today's Pick</span>}
            </h3>
            <div className="kicker">{it.description}</div>
            <div className="row">
              <span className="price">${it.price.toFixed(2)}</span>
              <button className="btn" id={it.id} onClick={(e) => handleAdd(e, it)}>Add</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

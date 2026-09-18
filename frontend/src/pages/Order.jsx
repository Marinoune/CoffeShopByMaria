import { useEffect, useState } from 'react'
import { useCart } from '../cart/CartContext.jsx'
import { API } from '../api.js'

export default function Order({ user }){

  const [stamps, setStamps] = useState(user?.stamps || 0);
  const { items, setQty, remove, total, clear } = useCart()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  const [status, setStatus] = useState(null)
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            price: i.price,
            qty: i.qty,
          })),
          customer: { name, phone, email, note },
          username: name 
        }),
      });

  const result = await res.json();
  if (result.ok) {
    setStatus(`Order placed! Confirmation: ${result.order._id}`);
    clear();     
    setName("");
    setPhone("");
    setEmail("");
    setNote("");
    setStamps(result.stamps); 
  } else {
    setStatus(result.error || "Oops, failed to place order.");
  }
} catch (err) {
      setStatus("Failed to connect to server.");
      console.error(err);
    }

};


  return (
    <div className="order-grid">
      <section className="card">
        <h2>Your Cart</h2>
        {items.length === 0 && <p className="kicker">Your cart is empty. Add some cute treats from the <a href="/menu">menu</a>.</p>}
        <div className="stack">
          {items.map(i => (
            <div key={i.id} className="cart-item">
              <div>
                <strong>{i.name}</strong>
                <div className="kicker">${i.price.toFixed(2)}</div>
              </div>
              <div className="qty">
                <button className="tab" onClick={()=>setQty(i.id, Math.max(1, (i.qty||1)-1))}>-</button>
                <span>{i.qty||1}</span>
                <button className="tab" onClick={()=>setQty(i.id, (i.qty||1)+1)}>+</button>
              </div>
              <button className="tab" onClick={()=>remove(i.id)}>Remove</button>
            </div>
          ))}
        </div>
        <div className="sep"></div>
        <div className="total"><span>Total</span><span>${total.toFixed(2)}</span></div>
      </section>
      <aside className="cart">
        <h3>Delivery details</h3>
        <div className="kicker">Loyalty</div>
        <div className="loyalty-stamps" style={{marginBottom:12}}>
          {Array.from({length:10}).map((_,i)=> <div key={i} className={`stamp ${i < stamps ? "active" : ""}`}>{i<stamps?"★":i+1}</div>)}
        </div>
        {stamps>=10 && <div className="badge">🎂 Free Cupcake Unlocked! Show this on pickup.</div>}
        <div className="stack">
          <input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
          <input className="input" placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <textarea className="input" rows="4" placeholder="Notes (exemple: no sugar, dairy free.....)" value={note} onChange={e=>setNote(e.target.value)} />
          <button className="btn" disabled={!items.length} onClick={handleSubmit}>Place order</button>
          {status && <p className="kicker">{status}</p>}
        </div>
      </aside>
    </div>
  )
}

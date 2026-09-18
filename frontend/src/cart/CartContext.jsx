import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartCtx = createContext()

export function CartProvider({ children }){
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart') || '[]') } catch { return [] }
  })
  useEffect(() => localStorage.setItem('cart', JSON.stringify(items)), [items])

  const add = (it) => {
    setItems(prev => {
      const idx = prev.findIndex(p => p.id === it.id)
      if(idx >= 0){
        const next = [...prev]
        next[idx] = { ...next[idx], qty: (next[idx].qty || 1) + 1 }
        return next
      }
      return [...prev, { ...it, qty: 1 }]
    })
  }
  const remove = (id) => setItems(prev => prev.filter(p => p.id !== id))
  const setQty = (id, qty) => setItems(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, qty) } : p))
  const clear = () => setItems([])
  const total = useMemo(() => items.reduce((s, it) => s + it.price * (it.qty || 1), 0), [items])

  return <CartCtx.Provider value={{ items, add, remove, setQty, clear, total }}>{children}</CartCtx.Provider>
}

export const useCart = () => useContext(CartCtx)

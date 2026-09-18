import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import Order from './pages/Order.jsx'
import Locations from './pages/Locations.jsx'
import Login from "./pages/LoginPage.jsx";
import { CartProvider } from './cart/CartContext.jsx'
import ProtectedRoute from './pages/ProtectedRoute.jsx'
import Navbar from './components/navbar.jsx'


export default function App() {
  return (
    
    <CartProvider>
      <div className="shell">
        <Navbar/>
        <main className="content">
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute/>}>
            <Route path="/order" element={<Order />} />
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/locations" element={<Locations />} />
            </Route>
          </Routes>
        </main>
        <div className="floating-heart" style={{ left: "20px", right: "auto" }}>
          <svg className="float-anim" width="200" height="200" viewBox="0 0 24 24"><path fill="#ffb3c1" d="M12 21s-7.5-4.7-10-8.3C-1 6.9 4.5 3 7.5 6.2 9 7.9 12 10 12 10s3-2.1 4.5-3.8C19.5 3 25 6.9 22 12.7 19.5 16.3 12 21 12 21z"/></svg>
        </div>
        <div className="floating-heart" style={{ left: "auto", right: "120px" }}>
          <svg className="float-anim" width="150" height="150" viewBox="0 0 24 24"><path fill="#ffb3c1" d="M12 21s-7.5-4.7-10-8.3C-1 6.9 4.5 3 7.5 6.2 9 7.9 12 10 12 10s3-2.1 4.5-3.8C19.5 3 25 6.9 22 12.7 19.5 16.3 12 21 12 21z"/></svg>
        </div>
        <div className="floating-heart">
          <svg className="float-anim" width="100" height="100" viewBox="0 0 24 24"><path fill="#ffb3c1" d="M12 21s-7.5-4.7-10-8.3C-1 6.9 4.5 3 7.5 6.2 9 7.9 12 10 12 10s3-2.1 4.5-3.8C19.5 3 25 6.9 22 12.7 19.5 16.3 12 21 12 21z"/></svg>
        </div>
        <footer className="footer">© {new Date().getFullYear()} Maria's Coffee & Co. Made with love Baby </footer>
      </div>
    </CartProvider>
  )
}

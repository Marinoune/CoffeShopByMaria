import { NavLink } from 'react-router-dom'


export default function Navbar() {
//     const token = localStorage.getItem("token")
//     let isConnected = false;
// const handleVerifyLogin = () =>{
//     if(token){
//         isConnected = true
//     } else {
//         isConnected = false;
//     }
// }
    return(
        <header className="topbar">
        <div className="brand"></div>
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/menu">Menu</NavLink>
            <NavLink to="/login" end>Login</NavLink>
            <NavLink to="/order" id="order-button">Order</NavLink>
            <NavLink to="/locations">Locations</NavLink>
          </nav>
          </header>)
}
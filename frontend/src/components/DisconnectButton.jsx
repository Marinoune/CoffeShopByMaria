import { useNavigate } from "react-router-dom"

export default function DisconnectButton(){
    const navigate = useNavigate()

    const handleDisconnect=() =>{
        localStorage.removeItem("token")
        navigate("/")
    }
    return(
        <button style={{
    borderRadius: "20px",
    color: "#ffffff",           
    backgroundColor: "#222222", 
    border: "none",
    cursor: "pointer"          
  }}onClick={handleDisconnect}>DISCONNECT</button>
    )
}
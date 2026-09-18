// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />; // redirect if not logged in
  }
  return <Outlet/>; // show the page if logged in
}

import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
 return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
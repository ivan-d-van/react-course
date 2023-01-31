import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
    const { idToken } = useSelector(state => state.auth);
    return idToken ? children : <Navigate to="/" replace />;
  }
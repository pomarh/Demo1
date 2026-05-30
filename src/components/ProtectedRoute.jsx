import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRole }) {
    const { user, perfil, loading } = useAuth();

    if (loading) {
        return <div className="p-10">cargando...</div>;
    }

    if (!user) {
        return <Navigate to="/" />;
    }

    if (perfil?.rol !== allowedRole) {
        return <Navigate to="/" />;
    }
    return children;
}

export default ProtectedRoute;

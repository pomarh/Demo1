import DashboardLayout from "../components/layout/DashboardLayout";
import { useAuth } from "../context/AuthContext";

import { supabase } from "../lib/supabase";

function Dashboard() {
    const { perfil } = useAuth();

    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold">Bienvenido {perfil?.nombre}</h1>

            <p>Rol: {perfil?.rol}</p>
        </DashboardLayout>
    );
}

export default Dashboard;

import React from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function DashboardAdmin() {
    const { perfil, logout } = useAuth();

    const navigate = useNavigate();

    const cerrerSesion = async () => {
        await logout();
        window.location.href = "/";
    };
    return (
        <>
            <div className="p-10">
                <h1 className="text-4xl font-bold">Dashboard Admin</h1>

                <p className="mb-8">Bienvenido {perfil.nombre}</p>

                <button onClick={cerrerSesion} className="bg-red-500 text-white px-5 py-3 rounded-xl">
                    Cerrar Sesion
                </button>
            </div>
        </>
    );
}

export default DashboardAdmin;

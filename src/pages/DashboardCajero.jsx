import React from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AppPrueva from "../components/Prueva";

function DashboardCajero() {
    const { perfil, logout } = useAuth();

    const cerrerSesion = async () => {
        await logout();
        window.location.href = "/";
    };
    return (
        <>
            <div className="p-10">
                <h1 className="text-4xl font-bold">Dashboard Cajero</h1>
                <button onClick={cerrerSesion} className="bg-red-500 text-white px-5 py-3 rounded-xl">
                    Cerrar Sesion
                </button>
                <AppPrueva />
            </div>
        </>
    );
}

export default DashboardCajero;

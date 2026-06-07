import React from "react";

import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

function Header() {
    const { perfil } = useAuth();

    // Funcion cerrar secion
    const cerrarSecion = async () => {
        await supabase.auth.signOut();
    };

    return (
        <>
            <header className="flex items-center justify-between border-b bg-white px-6 py-4">
                <div>
                    <h1 className="font-bold text-slate-800">{perfil?.nombre}</h1>
                    <p className="text-sm text-slate-500">Rol: {perfil?.rol}</p>
                </div>

                <button onClick={cerrarSecion} className="rounded-lg bg-red-500 px-4 py2 text-white hover:bg-red-600">
                    Cerrar Secion
                </button>
            </header>
        </>
    );
}

export default Header;

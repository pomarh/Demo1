import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    //creamos las variables de estado
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { user, perfil } = useAuth();

    useEffect(() => {
        if (!user || !perfil) return;

        if (perfil.rol === "admin") {
            navigate("/admin", { replace: true });
        }

        if (perfil.rol === "cajero") {
            navigate("/cajero", { replace: true });
        }

        if (perfil.rol === "recepcionista") {
            navigate("/recepcion", { replace: true });
        }
    }, [user, perfil, navigate]);

    // creamos la funcion asincrona para email y pasword
    const login = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert(error.message);
        }
    };
    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-slate-100">
                <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg ">
                    <h1 className="mb-6 text-center text-3xl font-bold">Demo de Prueba</h1>

                    <input
                        type="email"
                        placeholder="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-4 w-full rounded-lx border p-4"
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-6 w-full rounded-xl border p-4"
                    />

                    <button onClick={login} className="w-full rounded-xl bg-emerald-500 p-4 text-white">
                        Iniciar Sesion
                    </button>
                </div>
            </div>
        </>
    );
}

export default Login;

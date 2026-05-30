import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        obtenerSesion();
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(() => {
            obtenerSesion();
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const obtenerSesion = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        setUser(user);

        if (user) {
            const { data } = await supabase.from("perfiles").select("*").eq("id", user.id).single();

            setPerfil(data);
        } else {
            setPerfil(null);
        }

        setLoading(false);
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log(error);
        }
    };

    return <AuthContext.Provider value={{ user, perfil, loading, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}

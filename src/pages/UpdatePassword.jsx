import { useState } from "react";
import { supabase } from "../lib/supabase";

function UpdatePassword() {
    const [password, setPassword] = useState("");

    const actualizarPassword = async () => {
        const { error } = await supabase.auth.updateUser({
            password,
        });

        if (error) {
            alert(error.message);

            return;
        }

        alert("Password actualizada");
    };

    return (
        <div>
            <input type="password" placeholder="Nueva password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={actualizarPassword}>Guardar</button>
        </div>
    );
}

export default UpdatePassword;

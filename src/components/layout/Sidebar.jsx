import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
    const { perfil } = useAuth();

    if (!perfil) {
        return null;
    }

    const menu = {
        admin: [
            { name: "Dashboard", path: "/dashboard" },
            { name: "Usuarios", path: "/dashboard/usuarios" },
            { name: "Ventas", path: "/dashboard/ventas" },
            { name: "Compras", path: "/dashboard/compras" },
            { name: "Inventario", path: "/dashboard/inventario" },
            { name: "Reportes", path: "/dashboard/reportes" },
        ],

        cajero: [
            { name: "Dashboard", path: "/dashboard" },
            { name: "Ventas", path: "/dashboard/ventas" },
            { name: "Compras", path: "/dashboard/compras" },
            { name: "Inventario", path: "/dashboard/inventario" },
            { name: "Caja", path: "/dashboard/caja" },
        ],

        contador: [
            { name: "Dashboard", path: "/dashboard" },
            { name: "Ventas", path: "/dashboard/ventas" },
            { name: "Compras", path: "/dashboard/compras" },
            { name: "Inventario", path: "/dashboard/inventario" },
            { name: "Reportes", path: "/dashboard/reportes" },
        ],
    };

    return (
        <aside className="w-64 bg-slate-800 text-white">
            <div className=" border-b border-slate-700 p-4">
                <h2 className="text-xl font-bold">Sistema General</h2>
                <p className="text-sm text-slate-400">{perfil.rol}</p>
            </div>

            {menu[perfil?.rol]?.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `block p-4 transition ${isActive ? "bg-emerald-500 text-white" : "hover:bg-slate-700"}`}>
                    {item.name}
                </NavLink>
            ))}
        </aside>
    );
}

export default Sidebar;

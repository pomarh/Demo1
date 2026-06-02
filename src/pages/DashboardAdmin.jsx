import React from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import AppPrueva from "../components/Prueva";

function DashboardAdmin() {
    const { user, perfil, logout } = useAuth();
    const [empleados, setEmpleados] = useState([]);

    //estadso para crear a un usuario con rol
    const [nombre, setNombre] = useState("");
    const [rol, setRol] = useState("cajero");
    const [sucursalId, setSucursalId] = useState("");
    const [sucursales, setSucursales] = useState([]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [editar, setEditar] = useState(null);

    //funcion cargar empleados
    const cargarEmpleados = async () => {
        const { data, error } = await supabase.from("perfiles").select(`*, sucursales(nombre)`).order("nombre");

        if (error) {
            console.log(error);
            return;
        }

        setEmpleados(data);
    };

    // creamos la funcion para las sucursales
    const cargarSucursales = async () => {
        const { data, error } = await supabase.from("sucursales").select("*").order("nombre");

        if (error) {
            console.log(error);
            return;
        }

        setSucursales(data);
    };

    // CREAR empleados
    const crearEmpleado = async () => {
        const { error } = await supabase.from("perfiles").insert({ nombre, rol, sucursal_id: sucursalId, activo: true });

        if (error) {
            console.log(error);
            alert("Error al crear Empleado");
            return;
        }

        alert("Empleado creado!!!");

        setNombre("");
        setRol("cajero");
        setSucursalId("");
        cargarEmpleados();
    };

    // EDITAR EMPLEADO

    const editarEmpleado = async (id) => {
        const { error } = await supabase.from("perfiles").update({ nombre, rol, sucursal_id: sucursalId }).eq("id", id);

        if (error) {
            console.log(error);
            return;
        }

        setEditar(null);
        cargarEmpleados();
    };

    // ACTIVAS Y DESACTIVAR EMPLEADOR
    const cambiarEstado = async (empleado) => {
        const { error } = await supabase.from("perfiles").update({ activo: !empleado.activo }).eq("id", empleado.id);

        if (error) {
            console.log(error);
            return;
        }

        cargarEmpleados();
    };

    // RESET PASSWORD
    const resetPaswrod = async (email) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: "http://localhost:5173/update-password" });

        if (error) {
            console.log(error);
            alert(error.message);
            return;
        }
        alert("Correo de recuperacion enviado");
    };

    //cargamos la funcion en useEffect para mostrar en pantalla
    useEffect(() => {
        cargarEmpleados();
        cargarSucursales();
    }, []);

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

                <div className="mb-8 rounded-2xl bg-white p-6 shadow">
                    <h2 className="mb-5 text-xl font-bold">Crear Empleado</h2>

                    <input
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="mb-4 w-full rounded-xl border p-3"
                    />

                    <select value={rol} onChange={(e) => setRol(e.target.value)} className="mb-4 w-full rounded-xl border p-3">
                        <option value="admin">Admin</option>

                        <option value="cajero">Cajero</option>

                        <option value="recepcionista">Recepcionista</option>
                    </select>

                    <select value={sucursalId} onChange={(e) => setSucursalId(e.target.value)} className="mb-4 w-full rounded-xl border p-3">
                        <option value="">Seleccionar sucursal</option>

                        {sucursales.map((sucursal) => (
                            <option key={sucursal.id} value={sucursal.id}>
                                {sucursal.nombre}
                            </option>
                        ))}
                    </select>

                    <input
                        type="email"
                        placeholder="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-4 w-full rounded-xl border p-3"
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-4 w-full rounded-xl border p-3"
                    />

                    <button
                        onClick={() => (editar ? editarEmpleado(editar) : crearEmpleado())}
                        className="w-full rounded-xl bg-emerald-500 p-4 text-white">
                        {editar ? "Guardar Cambios" : "Crear Empleado"}
                    </button>
                </div>

                <h2 className="mb-6 text-2xl font-bold">Gestion Empleados</h2>

                <div className="space-y-4">
                    {empleados.map((empleado) => (
                        <div key={empleado.id} className="rounded-2xl border bg-white shadow-sm">
                            <h3 className="font-bold">{empleado.nombre}</h3>
                            <p>Rol: {empleado.rol}</p>
                            <p>Sucursal: {empleado.sucursales?.nombre}</p>
                            <p>Estado: {empleado.activo ? "Activo" : "Desactivado"}</p>

                            {user.id !== empleado.id && (
                                <button onClick={() => cambiarEstado(empleado)} className="mt-3 rounded-xl bg-red-500 px-4 py-2 text-white">
                                    {empleado.activo ? "Desactivar" : "Activar"}
                                </button>
                            )}

                            {user.id !== empleado.id && (
                                <button
                                    onClick={() => {
                                        setNombre(empleado.nombre);
                                        setRol(empleado.rol);
                                        setSucursalId(empleado.sucursal_id);
                                        setEditar(empleado.id);
                                    }}
                                    className="mt-3 rounded-xl bg-blue-500 px-4 py-2 text-white">
                                    Editar
                                </button>
                            )}

                            <button onClick={() => resetPaswrod(empleado.email)} className="rounded-xl bg-yellow-500 px-4 py-2 text-white">
                                Reseter contraseña
                            </button>
                        </div>
                    ))}
                </div>

                <button onClick={cerrerSesion} className="bg-red-500 text-white px-5 py-3 rounded-xl">
                    Cerrar Sesion
                </button>

                <AppPrueva />
            </div>
        </>
    );
}

export default DashboardAdmin;

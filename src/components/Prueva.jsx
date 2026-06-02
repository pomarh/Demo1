import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

import { useAuth } from "../context/AuthContext";

function AppPrueva() {
    const { perfil, loading } = useAuth();

    console.log("perfil", perfil);

    const [producto, setProducto] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [precio, setPrecio] = useState("");
    const [metodoPago, setMetodoPago] = useState("Efectivo");
    // estado de ventas
    const [ventas, setVentas] = useState([]);

    //  array de productos para el formulario
    const productosGym = ["Proteina", "Creatina", "Agua", "Barra enegetica", "Jugos"];

    // (HISTORIAL DE VENTAS)

    const cargarVentas = async () => {
        if (!perfil) return;

        let query = supabase.from("ventas").select("*").order("id", { ascending: false });

        if (perfil?.rol !== "admin") {
            query = query.eq("sucursal_id", perfil.sucursal_id);
        }

        const { data, error } = await query;

        if (error) {
            console.log(error);
            return;
        }

        console.log("ventas", data);
        setVentas(data);
    };

    // useEffect para cargar al abrir

    useEffect(() => {
        if (!loading && perfil) {
            cargarVentas();
        }
    }, [perfil, loading]);

    // eliminar ventas

    const eliminarVenta = async (id) => {
        const confimar = window.confirm("Eliminar esta venta SEGURO!!!");

        if (!confimar) return;

        const { error } = await supabase.from("ventas").delete().eq("id", id);

        if (error) {
            console.log(error);
            return;
        }

        cargarVentas();
    };

    // funcion para registrar ventas

    const registrarVenta = async () => {
        const total = Number(cantidad) * Number(precio);

        const { error } = await supabase.from("ventas").insert([
            {
                producto,
                cantidad,
                precio,
                total,
                metodo_pago: metodoPago,

                sucursal_id: perfil.sucursal_id,
            },
        ]);

        if (error) {
            console.log(error);
            alert("Error al registrar venta");
            return;
        }

        alert("Venta registrada!");

        setProducto("");
        setCantidad("");
        setPrecio("");
        setMetodoPago("Efectivo");

        cargarVentas();
    };

    return (
        <div className="m-5 lg:m-10">
            {/* header mas dashboard */}

            <header>
                <h1 className="text-3xl font-bold text-slate-800 md:text-4xl">Sistema y control de ventas</h1>

                <p className="mt-2 text-slate-500">Control Financiero</p>
            </header>

            <section>
                <h2 className="mb-4 text-xl font-semibold text-slate-700">Dashboard Financiero</h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {/* TOTAL */}

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <p className="text-sm text-slate-500">Total General</p>

                        <h3 className="mt-3 text-3xl font-bold text-emerald-600">
                            {ventas.reduce((acc, v) => acc + Number(v.total), 0).toFixed(2)} Bs
                        </h3>
                    </div>

                    {/* EFECTIVO */}

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <p className="text-sm text-slate-500">Efectivo</p>

                        <h3 className="mt-3 text-3xl font-bold text-blue-600">
                            {ventas
                                .filter((v) => v.metodo_pago === "Efectivo")
                                .reduce((acc, v) => acc + Number(v.total), 0)
                                .toFixed(2)}{" "}
                            Bs
                        </h3>
                    </div>

                    {/* QR */}

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <p className="text-sm text-slate-500">QR</p>

                        <h3 className="mt-3 text-3xl font-bold text-purple-600">
                            {ventas
                                .filter((v) => v.metodo_pago === "QR")
                                .reduce((acc, v) => acc + Number(v.total), 0)
                                .toFixed(2)}{" "}
                            Bs
                        </h3>
                    </div>

                    {/* TRANSFERENCIA */}

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <p className="text-sm text-slate-500">Transferencia</p>

                        <h3 className="mt-3 text-3xl font-bold text-yellow-600">
                            {ventas
                                .filter((v) => v.metodo_pago === "Transferencia")
                                .reduce((acc, v) => acc + Number(v.total), 0)
                                .toFixed(2)}{" "}
                            Bs
                        </h3>
                    </div>
                </div>
            </section>

            {/* formulario de ventas */}

            <section>
                <h2 className="mb-4 text-xl font-semibold text-slate-700">Formulario de Venta</h2>

                <div className="space-y-6 rounded-3xl bg-white p-6 shadow-sm">
                    {/* PRODUCTO */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-600">Producto</label>

                        <select
                            value={producto}
                            onChange={(e) => setProducto(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                            <option value="">Seleccionar producto</option>

                            {productosGym.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* GRID */}

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* CANTIDAD */}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-600">Cantidad</label>

                            <input
                                type="number"
                                placeholder="Cantidad"
                                value={cantidad}
                                onChange={(e) => setCantidad(e.target.value)}
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            />
                        </div>

                        {/* PRECIO */}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-600">Precio Unitario</label>

                            <input
                                type="number"
                                placeholder="0.00"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* TOTAL */}

                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                        <p className="text-sm text-slate-500">Total a Pagar</p>

                        <h3 className="mt-2 text-4xl font-bold text-emerald-600">{(Number(cantidad || 0) * Number(precio || 0)).toFixed(2)} Bs</h3>
                    </div>

                    {/* METODO */}

                    <div>
                        <label className="mb-3 block text-sm font-medium text-slate-600">Método de Pago</label>

                        <div className="grid grid-cols-3 gap-3">
                            {["Efectivo", "QR", "Transferencia"].map((metodo) => (
                                <button
                                    key={metodo}
                                    type="button"
                                    onClick={() => setMetodoPago(metodo)}
                                    className={`rounded-xl py-3 font-medium transition ${
                                        metodoPago === metodo ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-700"
                                    }`}>
                                    {metodo}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* BOTON */}

                    <button
                        onClick={registrarVenta}
                        className="w-full rounded-2xl bg-emerald-500 py-4 font-semibold text-white transition hover:bg-emerald-600">
                        Registrar Venta
                    </button>
                </div>
            </section>

            {/* historial de venas */}

            <section>
                <h2 className="mb-4 text-xl font-semibold text-slate-700">Historial de Ventas</h2>

                <div className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
                    {ventas.map((venta) => (
                        <div key={venta.id} className="rounded-2xl border border-slate-200 p-5 transition hover:shadow-md">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                {/* IZQUIERDA */}

                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">{venta.producto}</h3>

                                    <p className="mt-1 text-sm text-slate-500">{new Date(venta.created_at).toLocaleString()}</p>
                                </div>

                                {/* CENTRO */}

                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium">Cantidad: {venta.cantidad}</span>

                                    <span className="rounded-xl bg-emerald-100 px-3 py-2 text-sm font-medium text-emerald-700">
                                        {venta.metodo_pago}
                                    </span>
                                </div>

                                {/* DERECHA */}

                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-sm text-slate-400">Total</p>

                                        <h3 className="text-2xl font-bold text-emerald-600">{Number(venta.total).toFixed(2)} Bs</h3>
                                    </div>

                                    <button
                                        onClick={() => eliminarVenta(venta.id)}
                                        className="rounded-xl bg-red-500 px-4 py-2 text-white transition hover:bg-red-600">
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Resumen de caja */}

            <section>
                <h2 className="mb-4 text-xl font-semibold text-slate-700">Resumen de Caja</h2>

                <div className="space-y-6 rounded-3xl bg-white p-6 shadow-sm">
                    {/* FILA 1 */}

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {/* TOTAL */}

                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                            <p className="text-sm text-slate-500">Total General</p>

                            <h3 className="mt-3 text-3xl font-bold text-emerald-600">
                                {ventas.reduce((acc, v) => acc + Number(v.total), 0).toFixed(2)} Bs
                            </h3>
                        </div>

                        {/* VENTAS */}

                        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
                            <p className="text-sm text-slate-500">Ventas Registradas</p>

                            <h3 className="mt-3 text-3xl font-bold text-blue-600">{ventas.length}</h3>
                        </div>

                        {/* PROMEDIO */}

                        <div className="rounded-2xl border border-purple-200 bg-purple-50 p-5">
                            <p className="text-sm text-slate-500">Promedio Venta</p>

                            <h3 className="mt-3 text-3xl font-bold text-purple-600">
                                {ventas.length ? (ventas.reduce((acc, v) => acc + Number(v.total), 0) / ventas.length).toFixed(2) : "0.00"} Bs
                            </h3>
                        </div>
                    </div>

                    {/* METODOS */}

                    <div>
                        <h3 className="mb-4 font-semibold text-slate-700">Métodos de Pago</h3>

                        <div className="space-y-5">
                            {/* EFECTIVO */}

                            <div>
                                <div className="mb-2 flex justify-between">
                                    <span>Efectivo</span>

                                    <span>
                                        {ventas
                                            .filter((v) => v.metodo_pago === "Efectivo")
                                            .reduce((acc, v) => acc + Number(v.total), 0)
                                            .toFixed(2)}{" "}
                                        Bs
                                    </span>
                                </div>

                                <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                                    <div
                                        className="h-full rounded-full bg-blue-500"
                                        style={{
                                            width: `${
                                                ventas.length
                                                    ? (ventas
                                                          .filter((v) => v.metodo_pago === "Efectivo")
                                                          .reduce((acc, v) => acc + Number(v.total), 0) /
                                                          ventas.reduce((acc, v) => acc + Number(v.total), 0)) *
                                                      100
                                                    : 0
                                            }%`,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* QR */}

                            <div>
                                <div className="mb-2 flex justify-between">
                                    <span>QR</span>

                                    <span>
                                        {ventas
                                            .filter((v) => v.metodo_pago === "QR")
                                            .reduce((acc, v) => acc + Number(v.total), 0)
                                            .toFixed(2)}{" "}
                                        Bs
                                    </span>
                                </div>

                                <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                                    <div
                                        className="h-full rounded-full bg-purple-500"
                                        style={{
                                            width: `${
                                                ventas.length
                                                    ? (ventas.filter((v) => v.metodo_pago === "QR").reduce((acc, v) => acc + Number(v.total), 0) /
                                                          ventas.reduce((acc, v) => acc + Number(v.total), 0)) *
                                                      100
                                                    : 0
                                            }%`,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* TRANSFERENCIA */}

                            <div>
                                <div className="mb-2 flex justify-between">
                                    <span>Transferencia</span>

                                    <span>
                                        {ventas
                                            .filter((v) => v.metodo_pago === "Transferencia")
                                            .reduce((acc, v) => acc + Number(v.total), 0)
                                            .toFixed(2)}{" "}
                                        Bs
                                    </span>
                                </div>

                                <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                                    <div
                                        className="h-full rounded-full bg-yellow-500"
                                        style={{
                                            width: `${
                                                ventas.length
                                                    ? (ventas
                                                          .filter((v) => v.metodo_pago === "Transferencia")
                                                          .reduce((acc, v) => acc + Number(v.total), 0) /
                                                          ventas.reduce((acc, v) => acc + Number(v.total), 0)) *
                                                      100
                                                    : 0
                                            }%`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AppPrueva;

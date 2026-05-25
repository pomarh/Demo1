import React from "react";

function ResumenCaja() {
    return (
        <>
            <section>
                <h2
                    className="
text-xl
font-semibold
mb-4
text-slate-700
">
                    Resumen de Caja
                </h2>

                <div
                    className="
bg-white
rounded-3xl
shadow-sm
p-6
space-y-6
">
                    {/* FILA 1 */}

                    <div
                        className="
grid
grid-cols-1
md:grid-cols-3
gap-4
">
                        {/* TOTAL */}

                        <div
                            className="
bg-emerald-50
border
border-emerald-200
rounded-2xl
p-5
">
                            <p
                                className="
text-slate-500
text-sm
">
                                Total General
                            </p>

                            <h3
                                className="
text-3xl
font-bold
text-emerald-600
mt-3
">
                                {ventas.reduce((acc, v) => acc + Number(v.total), 0).toFixed(2)}
                                Bs
                            </h3>
                        </div>

                        {/* CANTIDAD VENTAS */}

                        <div
                            className="
bg-blue-50
border
border-blue-200
rounded-2xl
p-5
">
                            <p
                                className="
text-slate-500
text-sm
">
                                Ventas Registradas
                            </p>

                            <h3
                                className="
text-3xl
font-bold
text-blue-600
mt-3
">
                                {ventas.length}
                            </h3>
                        </div>

                        {/* TICKET PROMEDIO */}

                        <div
                            className="
bg-purple-50
border
border-purple-200
rounded-2xl
p-5
">
                            <p
                                className="
text-slate-500
text-sm
">
                                Promedio Venta
                            </p>

                            <h3
                                className="
text-3xl
font-bold
text-purple-600
mt-3
">
                                {ventas.length ? (ventas.reduce((acc, v) => acc + Number(v.total), 0) / ventas.length).toFixed(2) : "0.00"}
                                Bs
                            </h3>
                        </div>
                    </div>

                    {/* METODOS PAGO */}

                    <div>
                        <h3
                            className="
font-semibold
text-slate-700
mb-4
">
                            Métodos de Pago
                        </h3>

                        <div className="space-y-4">
                            {/* EFECTIVO */}

                            <div>
                                <div
                                    className="
flex
justify-between
mb-2
">
                                    <span>Efectivo</span>

                                    <span>
                                        {ventas
                                            .filter((v) => v.metodo_pago === "Efectivo")
                                            .reduce((acc, v) => acc + Number(v.total), 0)
                                            .toFixed(2)}
                                        Bs
                                    </span>
                                </div>

                                <div
                                    className="
bg-slate-200
rounded-full
h-3
overflow-hidden
">
                                    <div
                                        className="
bg-blue-500
h-full
rounded-full
"
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
                                <div
                                    className="
flex
justify-between
mb-2
mt-4
">
                                    <span>QR</span>

                                    <span>
                                        {ventas
                                            .filter((v) => v.metodo_pago === "QR")
                                            .reduce((acc, v) => acc + Number(v.total), 0)
                                            .toFixed(2)}
                                        Bs
                                    </span>
                                </div>

                                <div
                                    className="
bg-slate-200
rounded-full
h-3
overflow-hidden
">
                                    <div
                                        className="
bg-purple-500
h-full
rounded-full
"
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
                                <div
                                    className="
flex
justify-between
mb-2
mt-4
">
                                    <span>Transferencia</span>

                                    <span>
                                        {ventas
                                            .filter((v) => v.metodo_pago === "Transferencia")
                                            .reduce((acc, v) => acc + Number(v.total), 0)
                                            .toFixed(2)}
                                        Bs
                                    </span>
                                </div>

                                <div
                                    className="
bg-slate-200
rounded-full
h-3
overflow-hidden
">
                                    <div
                                        className="
bg-yellow-500
h-full
rounded-full
"
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
        </>
    );
}

export default ResumenCaja;

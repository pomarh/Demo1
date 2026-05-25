import React from "react";

function Vebtas() {
    return (
        <>
            <h1>Sistema Ventas Gym</h1>

            <select value={producto} onChange={(e) => setProducto(e.target.value)}>
                <option value="">Seleccionar producto</option>
                {productosGym.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>

            <br />
            <br />

            <input type="number" placeholder="Cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />

            <br />
            <br />

            <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />

            <br />
            <br />

            <select value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}>
                <option>Efectivo</option>
                <option>QR</option>
                <option>Transferencia</option>
            </select>

            <br />
            <br />

            <button onClick={registrarVenta}>Registrar Venta</button>

            {/*  historial de ventas  */}

            <hr />

            <h2>Historial de ventas</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Total</th>
                        <th>Pago</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta) => (
                        <tr key={venta.id}>
                            <td>{venta.producto}</td>
                            <td>{venta.cantidad}</td>
                            <td>{venta.precio}</td>
                            <td>{venta.total}</td>
                            <td>{venta.metodo_pago}</td>
                            <td>{new Date(venta.creado_en).toLocaleString()}</td>
                            <td>
                                <button onClick={() => eliminarVenta(venta.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* resumen de CAJA */}
            <div className="bg-gray-100">
                <h2>Resumen de Caja</h2>

                <p>total General:{ventas.reduce((acc, venta) => acc + Number(venta.total), 0).toFixed(2)} bs</p>
                <p>
                    Efectivo:
                    {ventas
                        .filter((v) => v.metodo_pago === "Efectivo")
                        .reduce((acc, v) => acc + Number(v.total), 0)
                        .toFixed(2)}
                    bs
                </p>
                <p>
                    QR:
                    {ventas
                        .filter((v) => v.metodo_pago === "QR")
                        .reduce((acc, v) => acc + Number(v.total), 0)
                        .toFixed(2)}
                    bs
                </p>
                <p>
                    Transferencia:
                    {ventas
                        .filter((v) => v.metodo_pago === "Transferencia")
                        .reduce((acc, v) => acc + Number(v.total), 0)
                        .toFixed(2)}
                    bs
                </p>
            </div>
        </>
    );
}

export default Vebtas;

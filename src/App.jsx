import { BrowserRouter, Routes, Route } from "react-router-dom";

//componentes, pages, context, hook,
import Header from "./components/Header";
import AppPrueva from "./components/Prueva";

import Login from "./pages/Login";

import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardCajero from "./pages/DashboardCajero";
import DashboardRecepcion from "./pages/DashboardRecepcion";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute allowedRole="admin">
                                <DashboardAdmin />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/cajero"
                        element={
                            <ProtectedRoute allowedRole="cajero">
                                <DashboardCajero />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/recepcion"
                        element={
                            <ProtectedRoute allowedRole="recepcionista">
                                <DashboardRecepcion />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

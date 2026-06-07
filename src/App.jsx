import { BrowserRouter, Routes, Route } from "react-router-dom";

// Componentes arquitectura final
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import UsuariosPage from "./pages/UsuariosPage";
import VentasPage from "./pages/VentasPage";
import ComprasPage from "./pages/ComprasPage";
import InventarioPage from "./pages/InventarioPage";
import CajaPage from "./pages/CajaPage";
import ReportesPage from "./pages/ReportesPage";

import ProtectedRoute from "./components/ProtectedRoute";
import UpdatePassword from "./pages/UpdatePassword";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/dashboard/usuarios"
                        element={
                            <ProtectedRoute>
                                <UsuariosPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/dashboard/ventas"
                        element={
                            <ProtectedRoute>
                                <VentasPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/dashboard/compras"
                        element={
                            <ProtectedRoute>
                                <ComprasPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/dashboard/inventario"
                        element={
                            <ProtectedRoute>
                                <InventarioPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/dashboard/caja"
                        element={
                            <ProtectedRoute>
                                <CajaPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/dashboard/reportes"
                        element={
                            <ProtectedRoute>
                                <ReportesPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="/update-password" element={<UpdatePassword />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

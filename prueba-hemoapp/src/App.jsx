import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import PedidosSangre from './pages/PedidosSangre.jsx';
import Map from './pages/Map.jsx';
import Profile from './pages/Profile.jsx';
import EstadoDonante from './pages/EstadoDonante.jsx';
import RequestBloodPage from './pages/RequestBloodPage.jsx';
import { Toaster } from './components/ui/toaster.jsx';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in (localStorage)
    const storedUser = localStorage.getItem('hemoapp_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (e) {
        // Handle potential parsing errors
        console.error("Error parsing stored user data:", e);
        localStorage.removeItem('hemoapp_user');
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('hemoapp_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('hemoapp_user');
  };

  // Se usa para actualizar el estado global del usuario (ej. en ProfilePage)
  const handleUpdateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('hemoapp_user', JSON.stringify(userData));
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/register" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <Register onRegister={handleLogin} />
          } 
        />
        <Route path="/solicitar-sangre" element={<RequestBloodPage />} />

        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? 
            <Dashboard user={user} onLogout={handleLogout} /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/solicitudes" 
          element={
            isAuthenticated ? 
            <PedidosSangre user={user} onLogout={handleLogout} /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/mapa" 
          element={
            isAuthenticated ? 
            <Map user={user} onLogout={handleLogout} /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/perfil" 
          element={
            isAuthenticated ? 
            <Profile user={user} onLogout={handleLogout} onUpdateUser={handleUpdateUser} /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/estado-donador" 
          element={
            isAuthenticated ? 
            <EstadoDonante user={user} onLogout={handleLogout} /> : 
            <Navigate to="/login" replace />
          } 
        />
        {/* Agregando una ruta 404 básica como buena práctica */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </Router>
  );
}
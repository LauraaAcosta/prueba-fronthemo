import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';
import botonDonar from '@/assets/boton-donar.png';
import botonMapa from '@/assets/boton-mapa.png';
import botonEstado from '@/assets/boton-estado.png';
import Header from '@/components/Header'; // Asegúrate de que el path sea correcto

/**
 * @param {object} props
 * @param {any} props.user
 * @param {() => void} props.onLogout
 */
export default function DashboardPage({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={onLogout} />
      
      <div className="container mx-auto py-12 px-6">
        {/* Logo y bienvenida */}
        <div className="text-center mb-12">
          <img src={logo} alt="HemoApp" className="w-20 h-20 mx-auto mb-4 object-contain" />
          <h1 className="text-4xl font-bold text-accent mb-2">
            ¿Qué quieres ver hoy?
          </h1>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Link to="/solicitudes" className="group">
            <div className="text-center transition-transform hover:scale-105">
              <div className="mb-4">
                <img src={botonDonar} alt="Donar" className="w-48 h-48 mx-auto object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-accent">Donar</h3>
            </div>
          </Link>

          <Link to="/mapa" className="group">
            <div className="text-center transition-transform hover:scale-105">
              <div className="mb-4">
                <img src={botonMapa} alt="Mapa" className="w-48 h-48 mx-auto object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-accent">Mapa</h3>
            </div>
          </Link>

          <Link to="/estado-donador" className="group">
            <div className="text-center transition-transform hover:scale-105">
              <div className="mb-4">
                <img src={botonEstado} alt="Estado como donador" className="w-48 h-48 mx-auto object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-accent">Estado como donador</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
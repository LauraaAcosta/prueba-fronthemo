import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';
import icono1 from '@/assets/icono-1.png';
import icono2 from '@/assets/icono-2.png';
import icono3 from '@/assets/icono-3.png';
import icono4 from '@/assets/icono-4.png';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-primary py-4 px-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="HemoApp" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-bold text-primary-foreground">
              Hemo<span className="font-normal">App</span>
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <a href="#nosotros" className="text-primary-foreground hover:opacity-80 font-medium">
              Nosotros
            </a>
            <a href="#servicios" className="text-primary-foreground hover:opacity-80 font-medium">
              Servicios
            </a>
            <Link to="/login">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-accent to-primary py-20 px-6 relative overflow-hidden min-h-[600px]">
        <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-secondary/40 rounded-full blur-3xl"></div>
        <div className="absolute right-20 top-1/2 w-[400px] h-[400px] bg-accent/30 rounded-full blur-3xl"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6 uppercase">
                CONECTAMOS CON QUIENES MÁS LO NECESITAN
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
                HemoApp es la plataforma que une donantes de sangre con hospitales e instituciones de salud de manera rápida y segura.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg shadow-xl rounded-full">
                    Quiero donar
                  </Button>
                </Link>
                <Link to="/solicitar-sangre">
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-6 text-lg rounded-full">
                    Necesito recibir una donación
                  </Button>
                </Link>
              </div>
            </div>
            <div className="text-primary-foreground/80 leading-relaxed text-lg">
              Cada día, miles de personas necesitan sangre para cirugías, emergencias y tratamientos. Sin embargo, la falta de donantes disponibles sigue siendo un gran desafío.
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="servicios" className="py-16 px-6 bg-primary">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-4 rounded-full border-8 border-accent/80 bg-primary flex items-center justify-center shadow-lg">
                  <img src={icono1} alt="Registro de donantes" className="w-20 h-20 object-contain" />
                </div>
                <p className="text-sm font-bold text-primary-foreground">Registro de donantes<br />voluntarios</p>
              </div>
              <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-4 rounded-full border-8 border-accent/80 bg-primary flex items-center justify-center shadow-lg">
                  <img src={icono2} alt="Solicitudes urgentes" className="w-20 h-20 object-contain" />
                </div>
                <p className="text-sm font-bold text-primary-foreground">Solicitudes urgentes de<br />sangre en tiempo real</p>
              </div>
              <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-4 rounded-full border-8 border-accent/80 bg-primary flex items-center justify-center shadow-lg">
                  <img src={icono3} alt="Geolocalización" className="w-20 h-20 object-contain" />
                </div>
                <p className="text-sm font-bold text-primary-foreground">Geolocalización de<br />instituciones cercanas</p>
              </div>
              <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-4 rounded-full border-8 border-accent/80 bg-primary flex items-center justify-center shadow-lg">
                  <img src={icono4} alt="Notificaciones" className="w-20 h-20 object-contain" />
                </div>
                <p className="text-sm font-bold text-primary-foreground">Notificaciones y<br />recordatorios<br />personalizados</p>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground leading-tight">
                HemoApp simplifica el proceso de donación conectando donantes, receptores e instituciones en un solo lugar.
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-accent via-secondary to-accent">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-primary-foreground mb-12">
            ¿Qué necesito saber para donar?
          </h2>
          <div className="max-w-4xl mx-auto bg-card p-8 rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-bold text-primary mb-4">Requisitos básicos:</h3>
            <ul className="space-y-2 text-card-foreground mb-6">
              <li className="flex items-start gap-2">
                <span className="text-accent text-xl">✓</span>
                <span>Tener entre 18 y 65 años</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent text-xl">✓</span>
                <span>Pesar más de 50 kg</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent text-xl">✓</span>
                <span>Estar en buen estado de salud</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent text-xl">✓</span>
                <span>No haber donado en los últimos 3 meses</span>
              </li>
            </ul>
            <h3 className="text-2xl font-bold text-destructive mb-4">No puedes donar si:</h3>
            <ul className="space-y-2 text-card-foreground">
              <li className="flex items-start gap-2">
                <span className="text-destructive text-xl">✗</span>
                <span>Tienes tatuajes o piercings recientes (menos de 12 meses)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive text-xl">✗</span>
                <span>Has tenido fiebre o infecciones en las últimas 2 semanas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive text-xl">✗</span>
                <span>Estás embarazada o amamantando</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive text-xl">✗</span>
                <span>Has tenido cirugías recientes</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-accent via-primary to-accent">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="text-primary-foreground">
              <h3 className="text-3xl font-bold mb-4">¿Es seguro donar sangre con HemoApp?</h3>
              <p className="text-lg">Sí, trabajamos únicamente con bancos de sangre y hospitales certificados</p>
            </div>
            <div className="text-primary-foreground">
              <h3 className="text-3xl font-bold mb-4">¿Tiene costo de servicio?</h3>
              <p className="text-lg">No, HemoApp es totalmente gratuito para donantes y pacientes</p>
            </div>
          </div>
          <div className="text-center bg-gradient-to-b from-accent to-secondary py-12 rounded-3xl">
            <h3 className="text-4xl font-bold text-primary-foreground mb-4">¿Cómo me registro?</h3>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto px-6">
              Descarga la app, completa tus datos y podrás recibir notificaciones cuando alguien necesite tu ayuda
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-6 bg-gradient-to-br from-secondary via-accent to-secondary">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Únete a nuestra comunidad de héroes anónimos
          </h2>
          <p className="text-2xl text-primary-foreground mb-8">
            Doná cerca, salvá lejos.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-12 py-8 text-xl rounded-full shadow-2xl">
              Registrarme ahora
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-primary">
        <div className="container mx-auto text-center">
          <div className="flex justify-center gap-6 text-primary-foreground">
            <a href="#nosotros" className="hover:opacity-80">Nosotros</a>
            <span>|</span>
            <a href="#servicios" className="hover:opacity-80">Servicios</a>
            <span>|</span>
            <Link to="#" className="hover:opacity-80">Preguntas frecuentes</Link>
            <span>|</span>
            <Link to="#" className="hover:opacity-80">Términos y condiciones</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
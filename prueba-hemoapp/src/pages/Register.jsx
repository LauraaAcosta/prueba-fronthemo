import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Lock, Phone, Droplet, Calendar, LogIn } from 'lucide-react';
import logo from '@/assets/logo.png';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    birthdate: '',
    bloodType: '',
    province: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDonor, setIsDonor] = useState(true); // Asume que por defecto es donante

  const provinces = ['Formosa', 'Chaco', 'Corrientes', 'Misiones', 'Otro'];
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validación básica
    if (isDonor && (!formData.bloodType || !formData.birthdate)) {
        setError('Por favor, completa todos los campos requeridos para el registro de donante.');
        setLoading(false);
        return;
    }

    // Simulación de registro
    setTimeout(() => {
      setLoading(false);
      // Aquí se enviaría el dato al backend y se manejaría la respuesta
      console.log('Datos de registro:', formData);
      alert('¡Registro exitoso! Por favor, inicia sesión.');
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-card shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-2">
            <img src={logo} alt="HemoApp Logo" className="w-12 h-12 object-contain" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary">
            Únete a Hemo<span className="font-normal">App</span>
          </CardTitle>
          <CardDescription className="text-lg text-card-foreground/70 mt-2">
            Regístrate en pocos pasos y empieza a salvar vidas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Toggle Donante / Solicitante */}
          <div className="flex justify-center gap-4 mb-6">
            <Button 
              type="button"
              onClick={() => setIsDonor(true)}
              variant={isDonor ? 'default' : 'outline'}
              className={isDonor ? 'bg-accent hover:bg-accent/90' : ''}
            >
              Quiero ser Donante
            </Button>
            <Button 
              type="button"
              onClick={() => setIsDonor(false)}
              variant={!isDonor ? 'default' : 'outline'}
              className={!isDonor ? 'bg-destructive hover:bg-destructive/90' : ''}
            >
              Solo quiero solicitar
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campos de registro básico */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nombre y Apellido</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                        id="name"
                        placeholder="Juan Pérez"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                        id="phone"
                        type="tel"
                        placeholder="3704-555555"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                        />
                    </div>
                </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Campos de donante (condicionales) */}
            {isDonor && (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="birthdate">Fecha de Nacimiento</Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                id="birthdate"
                                type="date"
                                value={formData.birthdate}
                                onChange={handleInputChange}
                                className="pl-10"
                                required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bloodType">Grupo Sanguíneo</Label>
                            <Select onValueChange={(value) => handleSelectChange('bloodType', value)} required>
                                <SelectTrigger className="w-full">
                                    <Droplet className="h-4 w-4 text-muted-foreground mr-2" />
                                    <SelectValue placeholder="Selecciona tu tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {bloodTypes.map(type => (
                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="province">Provincia de Residencia</Label>
                        <Select onValueChange={(value) => handleSelectChange('province', value)} required>
                            <SelectTrigger className="w-full">
                                <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                                <SelectValue placeholder="Selecciona tu provincia" />
                            </SelectTrigger>
                            <SelectContent>
                                {provinces.map(prov => (
                                    <SelectItem key={prov} value={prov}>{prov}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </>
            )}
            
            {error && (
              <p className="text-sm text-destructive font-medium text-center bg-destructive/10 p-2 rounded-lg border border-destructive/20">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 text-lg rounded-xl" disabled={loading}>
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <><LogIn className="w-5 h-5 mr-2" /> Registrarme</>
              )}
            </Button>
          </form>
        </CardContent>
        <div className="text-sm text-center text-card-foreground/80 pb-6">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-primary font-semibold hover:text-primary/80 transition-colors">
              Inicia Sesión
            </Link>
        </div>
      </Card>
    </div>
  );
}
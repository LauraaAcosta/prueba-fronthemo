import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Lock, LogIn } from 'lucide-react';
import logo from '@/assets/logo.png';

/**
 * @param {object} props
 * @param {(user: { email: string, name: string }) => void} props.onLogin
 */
export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Lógica de simulación de inicio de sesión
    if (email === 'admin@hemoapp.com' && password === '123456') {
      setTimeout(() => {
        setLoading(false);
        const mockUser = { email: email, name: 'Donante Ejemplo' };
        onLogin(mockUser);
        navigate('/dashboard');
      }, 1500);
    } else {
      setTimeout(() => {
        setLoading(false);
        setError('Email o contraseña incorrectos.');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="HemoApp Logo" className="w-16 h-16 object-contain" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary">
            Hemo<span className="font-normal">App</span>
          </CardTitle>
          <CardDescription className="text-lg text-card-foreground/70 mt-2">
            Inicia sesión para continuar tu misión de salvar vidas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 text-base"
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
                  placeholder="Tu contraseña secreta"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 text-base"
                  required
                />
              </div>
            </div>
            
            {error && (
              <p className="text-sm text-destructive font-medium text-center bg-destructive/10 p-2 rounded-lg border border-destructive/20">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 text-lg rounded-xl" disabled={loading}>
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <><LogIn className="w-5 h-5 mr-2" /> Iniciar Sesión</>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors mb-4">
            ¿Olvidaste tu contraseña?
          </Link>
          <div className="text-sm text-center text-card-foreground/80">
            ¿Aún no tienes cuenta?{' '}
            <Link to="/register" className="text-accent font-semibold hover:text-accent/80 transition-colors">
              Regístrate aquí
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
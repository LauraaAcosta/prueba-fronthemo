import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users, TrendingUp } from 'lucide-react';

/**
 * @param {object} props
 * @param {any} props.user
 * @param {() => void} props.onLogout
 */
export default function DonorStatusPage({ user, onLogout }) {
  const lastDonation = new Date('2025-01-15');
  const nextDonation = new Date('2025-04-15');
  const totalDonations = 8;
  const peopleHelped = totalDonations * 3;
  // Cálculo de días hasta la próxima donación
  const daysUntilNext = Math.ceil((nextDonation.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const canDonateNow = daysUntilNext <= 0;

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const donationHistory = [
    { id: 1, date: '15 Enero 2025', hospital: 'Hospital Central', status: 'Completa' },
    { id: 2, date: '20 Octubre 2024', hospital: 'HAC', status: 'Completa' },
    { id: 3, date: '15 Julio 2024', hospital: 'Centro Provincial', status: 'Completa' },
    { id: 4, date: '10 Abril 2024', hospital: 'Hospital Central', status: 'Completa' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={onLogout} />
      
      <div className="container mx-auto py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-2">Estado como Donador</h1>
          <p className="text-muted-foreground mb-8">Tu historial e impacto como donante</p>

          {/* Main Stats */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-2 border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                  <Calendar className="w-5 h-5" />
                  Última donación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground mb-2">
                  {formatDate(lastDonation)}
                </p>
                <p className="text-sm text-muted-foreground">Hace 3 meses</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                  <Calendar className="w-5 h-5" />
                  {canDonateNow ? '¡Puedes donar ahora!' : 'Próxima donación disponible'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {canDonateNow ? (
                  <p className="text-2xl font-bold text-green-500">
                    ¡Ya estás listo para donar de nuevo!
                  </p>
                ) : (
                  <>
                    <p className="text-3xl font-bold text-foreground mb-2">
                      {formatDate(nextDonation)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Faltan {daysUntilNext} días
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Impact */}
          <Card className="mb-8 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Users className="w-5 h-5" />
                Tu Impacto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Personas ayudadas</span>
                  <span className="text-sm font-medium text-accent">{peopleHelped} / 30</span>
                </div>
                <Progress value={(peopleHelped / 30) * 100} className="h-3" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total donaciones</p>
                  <p className="text-3xl font-bold text-primary">{totalDonations}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Vidas salvadas</p>
                  <p className="text-3xl font-bold text-accent">{peopleHelped}</p>
                </div>
              </div>

              <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                <p className="text-center font-semibold text-foreground mb-1">
                  ¡Gracias por ser un héroe! 💪
                </p>
                <p className="text-center text-sm text-muted-foreground">
                  Cada donación salva hasta 3 vidas
                </p>
              </div>
            </CardContent>
          </Card>

          {/* History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Historial de Donaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {donationHistory.map((donation) => (
                  <div
                    key={donation.id}
                    className="flex justify-between items-center p-4 rounded-lg border hover:border-accent transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-foreground">{donation.date}</p>
                      <p className="text-sm text-muted-foreground">{donation.hospital}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                      {donation.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
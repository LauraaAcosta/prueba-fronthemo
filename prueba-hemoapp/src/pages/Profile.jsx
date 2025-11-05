import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, Award, Heart, Droplet, LogOut, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/**
 * @param {object} props
 * @param {any} props.user
 * @param {() => void} props.onLogout
 * @param {(user: any) => void} props.onUpdateUser
 */
export default function ProfilePage({ user, onLogout, onUpdateUser }) {
  const [profileImage, setProfileImage] = useState(user.profileImage || null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    bloodType: user.bloodType || '',
    weight: user.weight || '',
  });
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setProfileImage(imageUrl);
        
        // Update user in localStorage
        const updatedUser = { ...user, profileImage: imageUrl };
        onUpdateUser(updatedUser);
        localStorage.setItem('hemoapp_user', JSON.stringify(updatedUser));
        
        const users = JSON.parse(localStorage.getItem('hemoapp_users') || '[]');
        const userIndex = users.findIndex((u) => u.id === user.id);
        if (userIndex !== -1) {
          users[userIndex] = updatedUser;
          localStorage.setItem('hemoapp_users', JSON.stringify(users));
        }

        toast({
          title: "Foto actualizada",
          description: "Tu foto de perfil se ha actualizado correctamente",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const handleUpdateProfile = () => {
    const updatedUser = { ...user, ...formData };
    onUpdateUser(updatedUser);
    localStorage.setItem('hemoapp_user', JSON.stringify(updatedUser));
    
    const users = JSON.parse(localStorage.getItem('hemoapp_users') || '[]');
    const userIndex = users.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('hemoapp_users', JSON.stringify(users));
    }

    setIsEditing(false);
    toast({
      title: "Perfil actualizado",
      description: "Tus datos se han actualizado correctamente",
    });
  };

  const getInitials = () => {
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
  };

  // Badges simulados
  const badges = [
    { id: 1, name: 'Primera Donación', icon: Heart, color: 'bg-accent' },
    { id: 2, name: '5 Donaciones', icon: Droplet, color: 'bg-primary' },
    { id: 3, name: 'Donante Regular', icon: Award, color: 'bg-yellow-500' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      
      <div className="container mx-auto py-8 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-primary">
                    <AvatarImage src={profileImage || undefined} />
                    <AvatarFallback className="text-3xl bg-secondary text-secondary-foreground">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg hover:bg-accent/90 transition-colors"
                  >
                    <Camera className="w-5 h-5 text-accent-foreground" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  {!isEditing ? (
                    <>
                      <h1 className="text-3xl font-bold text-primary mb-2">
                        {user.firstName} {user.lastName}
                      </h1>
                      <p className="text-muted-foreground mb-4">{user.email}</p>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                        <Badge variant="outline" className="bg-accent/10 text-accent border-accent">
                          <Droplet className="w-3 h-3 mr-1" />
                          {user.bloodType}
                        </Badge>
                        <Badge variant="outline">
                          {user.weight} kg
                        </Badge>
                      </div>
                      <Button 
                        onClick={() => setIsEditing(true)} 
                        variant="outline"
                        className="mt-2"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar Perfil
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Nombre</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Apellido</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="bloodType">Tipo de Sangre</Label>
                          <Select value={formData.bloodType} onValueChange={(value) => setFormData({ ...formData, bloodType: value })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A+">A+</SelectItem>
                              <SelectItem value="A-">A-</SelectItem>
                              <SelectItem value="B+">B+</SelectItem>
                              <SelectItem value="B-">B-</SelectItem>
                              <SelectItem value="AB+">AB+</SelectItem>
                              <SelectItem value="AB-">AB-</SelectItem>
                              <SelectItem value="O+">O+</SelectItem>
                              <SelectItem value="O-">O-</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="weight">Peso (kg)</Label>
                          <Input
                            id="weight"
                            type="number"
                            value={formData.weight}
                            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleUpdateProfile} className="flex-1">
                          Guardar Cambios
                        </Button>
                        <Button onClick={() => setIsEditing(false)} variant="outline">
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Donaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary">8</p>
                <p className="text-sm text-muted-foreground">veces</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Última donación</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-accent">15 Ene 2025</p>
                <p className="text-sm text-muted-foreground">Hace 3 meses</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Vidas salvadas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-accent">24</p>
                <p className="text-sm text-muted-foreground">personas</p>
              </CardContent>
            </Card>
          </div>

          {/* Badges/Reconocimientos */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                Reconocimientos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex flex-col items-center p-4 rounded-lg border-2 border-border hover:border-accent transition-colors"
                  >
                    <div className={`w-16 h-16 ${badge.color} rounded-full flex items-center justify-center mb-2`}>
                      <badge.icon className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-center">{badge.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Logout Button */}
          <Card>
            <CardContent className="pt-6">
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="w-full"
                size="lg"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Cerrar Sesión
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
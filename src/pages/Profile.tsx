
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { User, MapPin, Phone, Mail, Camera, Save, X, Calendar, Globe, Edit3, UserPlus, MessageCircle, MoreHorizontal } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import BackButton from '../components/BackButton';

const Profile = () => {
  const { user, updateUserProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [location, setLocation] = useState(user?.location || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [website, setWebsite] = useState(user?.website || '');
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '');
  const { toast } = useToast();

  const handleUpdateProfile = async () => {
    setIsEditing(false);
    const updatedProfile = {
      name,
      email,
      bio,
      location,
      phone,
      website,
      profilePicture,
    };

    try {
      await updateUserProfile(updatedProfile);
      toast({
        title: "Profil mis à jour !",
        description: "Votre profil a été mis à jour avec succès.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur s'est produite lors de la mise à jour du profil.",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Déconnexion réussie !",
        description: "Vous avez été déconnecté avec succès.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur s'est produite lors de la déconnexion.",
      });
    }
  };

  const firstName = name.split(' ')[0] || '';
  const lastName = name.split(' ').slice(1).join(' ') || '';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <BackButton to="/" className="fixed top-4 left-4 z-10 bg-white dark:bg-gray-800 shadow-md" />
      
      {/* Cover Photo Section */}
      <div className="relative">
        <div className="h-80 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          {isEditing && (
            <Button 
              variant="secondary" 
              size="sm" 
              className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-900"
            >
              <Camera className="h-4 w-4 mr-2" />
              Modifier la couverture
            </Button>
          )}
        </div>

        {/* Profile Picture */}
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 md:left-8 md:transform-none">
          <div className="relative">
            <Avatar className="w-40 h-40 border-4 border-white shadow-lg">
              <AvatarImage src={profilePicture || "https://github.com/shadcn.png"} alt={name} />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {firstName.charAt(0)}{lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button 
                size="sm" 
                className="absolute bottom-2 right-2 rounded-full w-10 h-10 p-0 bg-gray-100 hover:bg-gray-200 text-gray-700"
                variant="secondary"
              >
                <Camera className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 pt-24 md:pt-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - About */}
          <div className="space-y-6">
            {/* About Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">À propos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {bio && (
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {bio}
                  </p>
                )}
                
                <div className="space-y-3">
                  {location && (
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <MapPin className="h-4 w-4 mr-3 text-gray-400" />
                      <span>Vit à {location}</span>
                    </div>
                  )}
                  
                  {email && (
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Mail className="h-4 w-4 mr-3 text-gray-400" />
                      <span>{email}</span>
                    </div>
                  )}
                  
                  {phone && (
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Phone className="h-4 w-4 mr-3 text-gray-400" />
                      <span>{phone}</span>
                    </div>
                  )}
                  
                  {website && (
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Globe className="h-4 w-4 mr-3 text-gray-400" />
                      <a href={website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {website}
                      </a>
                    </div>
                  )}
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar className="h-4 w-4 mr-3 text-gray-400" />
                    <span>A rejoint e-lo Bénin en 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleLogout}
                >
                  Se déconnecter
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Center Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6">
                  <div className="mb-4 md:mb-0">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {name || 'Nom non défini'}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {bio || 'Aucune bio disponible'}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>125 amis</span>
                      <span>•</span>
                      <span>15 photos</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          <X className="h-4 w-4 mr-2" />
                          Annuler
                        </Button>
                        <Button onClick={handleUpdateProfile}>
                          <Save className="h-4 w-4 mr-2" />
                          Enregistrer
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" onClick={() => setIsEditing(true)}>
                          <Edit3 className="h-4 w-4 mr-2" />
                          Modifier le profil
                        </Button>
                        <Button variant="outline">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Ajouter ami
                        </Button>
                        <Button>
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {user?.role || 'aucun'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Edit Profile Form */}
            {isEditing && (
              <Card>
                <CardHeader>
                  <CardTitle>Modifier les informations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nom complet</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Votre nom complet"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Parlez-nous de vous..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Localisation</Label>
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Votre ville"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+229 XX XX XX XX"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="website">Site web</Label>
                    <Input
                      id="website"
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://votre-site.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="profilePicture">URL de la photo de profil</Label>
                    <Input
                      id="profilePicture"
                      type="url"
                      value={profilePicture}
                      onChange={(e) => setProfilePicture(e.target.value)}
                      placeholder="https://exemple.com/photo.jpg"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Posts Section */}
            <Card>
              <CardHeader>
                <CardTitle>Publications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aucune publication pour le moment.</p>
                  <p className="text-sm">Commencez à partager vos expériences !</p>
                </div>
              </CardContent>
            </Card>

            {/* Photos Section */}
            <Card>
              <CardHeader>
                <CardTitle>Photos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aucune photo partagée.</p>
                  <p className="text-sm">Ajoutez des photos de vos propriétés !</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const Label = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
  <label
    htmlFor={htmlFor}
    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
  >
    {children}
  </label>
);

export default Profile;

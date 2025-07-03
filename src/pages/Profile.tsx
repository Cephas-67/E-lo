
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { User, Home, MessageSquare, Settings, Star, MapPin, Phone, Mail, Camera, Upload, Save, X } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+229 XX XX XX XX',
    address: 'Cotonou, Bénin',
    bio: 'Passionné par l\'immobilier béninois',
    profileImage: null as string | null,
    coverImage: null as string | null
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été sauvegardées avec succès.",
    });
  };

  const handleImageUpload = (type: 'profile' | 'cover', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileData(prev => ({
          ...prev,
          [type === 'profile' ? 'profileImage' : 'coverImage']: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderProprietaireContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Home className="w-5 h-5" />
            <span>Mes Propriétés</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Propriétés Actives</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Propriétés Louées</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">4</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">En Attente</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenus Mensuels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600">2,450,000 CFA</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">+12% par rapport au mois dernier</p>
        </CardContent>
      </Card>
    </div>
  );

  const renderLocataireContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Home className="w-5 h-5" />
            <span>Mon Logement Actuel</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <img 
              src="/placeholder.svg" 
              alt="Logement" 
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold">Appartement 3 pièces</h3>
              <p className="text-gray-600 dark:text-gray-400">Cotonou, Akpakpa</p>
              <p className="text-lg font-bold text-green-600">450,000 CFA/mois</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5" />
            <span>Mes Favoris</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 dark:text-gray-400">
            <Star className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>5 propriétés sauvegardées</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDefaultContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bienvenue sur e-lo Bénin</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">Complétez votre profil</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Choisissez votre rôle pour accéder aux fonctionnalités adaptées
            </p>
            <div className="flex justify-center space-x-4">
              <Button className="bg-benin-green hover:bg-benin-green/90">
                Devenir Propriétaire
              </Button>
              <Button variant="outline">
                Je suis Locataire
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Photo de couverture */}
          <div className="relative h-48 bg-gradient-to-r from-benin-green to-benin-blue rounded-t-lg overflow-hidden">
            {profileData.coverImage && (
              <img src={profileData.coverImage} alt="Couverture" className="w-full h-full object-cover" />
            )}
            {isEditing && (
              <div className="absolute top-4 right-4">
                <label htmlFor="cover-upload" className="cursor-pointer">
                  <div className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
                    <Camera className="w-5 h-5" />
                  </div>
                  <input
                    id="cover-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload('cover', e)}
                  />
                </label>
              </div>
            )}
          </div>

          {/* En-tête du profil */}
          <Card className="mb-8 -mt-6 relative">
            <CardContent className="p-6 pt-12">
              <div className="flex items-center space-x-6">
                <div className="relative -mt-16">
                  <div className="w-24 h-24 bg-gradient-to-r from-benin-green to-benin-blue rounded-full flex items-center justify-center border-4 border-white dark:border-gray-800 overflow-hidden">
                    {profileData.profileImage ? (
                      <img src={profileData.profileImage} alt="Profil" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white text-3xl font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  {isEditing && (
                    <label htmlFor="profile-upload" className="absolute bottom-0 right-0 cursor-pointer">
                      <div className="bg-benin-green text-white p-1 rounded-full hover:bg-benin-green/90 transition-colors">
                        <Camera className="w-4 h-4" />
                      </div>
                      <input
                        id="profile-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload('profile', e)}
                      />
                    </label>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    {isEditing ? (
                      <Input
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        className="text-2xl font-bold border-0 p-0 h-auto"
                      />
                    ) : (
                      <h1 className="text-2xl font-bold">{profileData.name}</h1>
                    )}
                    <Badge className="bg-benin-green text-white capitalize">
                      {user?.role}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        {isEditing ? (
                          <Input
                            value={profileData.email}
                            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                            className="border-0 p-0 h-auto text-sm"
                          />
                        ) : (
                          <span>{profileData.email}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        {isEditing ? (
                          <Input
                            value={profileData.phone}
                            onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                            className="border-0 p-0 h-auto text-sm"
                          />
                        ) : (
                          <span>{profileData.phone}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        {isEditing ? (
                          <Input
                            value={profileData.address}
                            onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                            className="border-0 p-0 h-auto text-sm"
                          />
                        ) : (
                          <span>{profileData.address}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      {isEditing ? (
                        <Textarea
                          value={profileData.bio}
                          onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                          className="text-sm resize-none"
                          rows={2}
                        />
                      ) : (
                        <p className="text-sm text-gray-600 dark:text-gray-400">{profileData.bio}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <Button 
                        onClick={handleSave}
                        className="bg-benin-green hover:bg-benin-green/90 flex items-center space-x-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Sauvegarder</span>
                      </Button>
                      <Button 
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="flex items-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        <span>Annuler</span>
                      </Button>
                    </>
                  ) : (
                    <Button 
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Modifier</span>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contenu spécifique au rôle */}
          {user?.role === 'proprietaire' && renderProprietaireContent()}
          {user?.role === 'locataire' && renderLocataireContent()}
          {user?.role === 'aucun' && renderDefaultContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;

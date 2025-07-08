
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { User, Home, MessageSquare, Settings, Star, MapPin, Phone, Mail, Camera, Save, X, Calendar, Eye, Heart, TrendingUp, Search } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+229 97 45 32 18',
    address: 'Quartier Akpakpa, Cotonou, Bénin',
    bio: 'Passionné par l\'immobilier béninois depuis 5 ans. Je recherche des partenariats durables et des investissements rentables.',
    profileImage: null as string | null,
    coverImage: null as string | null,
    joinDate: 'Janvier 2023',
    verificationStatus: 'Vérifié'
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Home className="w-5 h-5" />
              <span>Portfolio Immobilier</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-3xl font-bold text-green-600">15</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Propriétés Actives</div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">12</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Propriétés Louées</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-3xl font-bold text-yellow-600">3</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">En Négociation</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">8</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Visites ce mois</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Taux d'occupation</span>
                <span className="font-bold text-green-600">85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Note moyenne</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">4.7/5</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Revenus ce mois</span>
                <span className="font-bold text-benin-green">2,850,000 CFA</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Propriétés Récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Villa Moderne Calavi", status: "Louée", price: "650,000 CFA" },
                { name: "Appartement 3P Akpakpa", status: "Disponible", price: "450,000 CFA" },
                { name: "Studio Meublé Cadjehoun", status: "En visite", price: "280,000 CFA" }
              ].map((property, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{property.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{property.price}/mois</p>
                  </div>
                  <Badge variant={property.status === 'Louée' ? 'default' : property.status === 'Disponible' ? 'secondary' : 'outline'}>
                    {property.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Messages Récents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Marie Adjovi", message: "Intéressée par la villa de Calavi", time: "Il y a 2h" },
                { name: "Jean Koffi", message: "Question sur les charges", time: "Il y a 5h" },
                { name: "Fatou Sossa", message: "Demande de visite", time: "Hier" }
              ].map((msg, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-10 h-10 bg-benin-green rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {msg.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{msg.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{msg.message}</p>
                    <p className="text-xs text-gray-500">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderLocataireContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Home className="w-5 h-5" />
              <span>Mon Logement Actuel</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src="/placeholder.svg" 
                alt="Logement" 
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold">Appartement 3 pièces</h3>
                <p className="text-gray-600 dark:text-gray-400 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Cotonou, Akpakpa
                </p>
                <p className="text-lg font-bold text-green-600">450,000 CFA/mois</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Date d'entrée:</span>
                <p className="font-medium">15 Mars 2024</p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Fin de bail:</span>
                <p className="font-medium">14 Mars 2025</p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Dépôt de garantie:</span>
                <p className="font-medium">900,000 CFA</p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Propriétaire:</span>
                <p className="font-medium">M. Adjovi</p>
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
            <div className="space-y-3">
              {[
                { name: "Villa Moderne Porto-Novo", price: "750,000 CFA", views: "125" },
                { name: "Appartement Neuf Calavi", price: "520,000 CFA", views: "89" },
                { name: "Studio Centre-ville", price: "300,000 CFA", views: "156" }
              ].map((fav, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    <div>
                      <p className="font-medium text-sm">{fav.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{fav.price}/mois</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Eye className="w-3 h-3" />
                    <span>{fav.views}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Activité de Recherche</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Recherches ce mois</span>
                <span className="font-bold">47</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Propriétés visitées</span>
                <span className="font-bold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Demandes envoyées</span>
                <span className="font-bold">8</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Critères de Recherche</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Budget préféré:</span>
                <p className="font-medium">400,000 - 600,000 CFA</p>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Zones préférées:</span>
                <p className="font-medium">Akpakpa, Calavi, Cadjehoun</p>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Type de logement:</span>
                <p className="font-medium">Appartement 2-3 pièces</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historique des Paiements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { date: "01 Déc 2024", amount: "450,000 CFA", status: "Payé" },
                { date: "01 Nov 2024", amount: "450,000 CFA", status: "Payé" },
                { date: "01 Oct 2024", amount: "450,000 CFA", status: "Payé" }
              ].map((payment, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <div>
                    <p className="text-sm font-medium">{payment.date}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Loyer mensuel</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{payment.amount}</p>
                    <Badge variant="default" className="text-xs">
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderDefaultContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Bienvenue sur e-lo Bénin</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">Complétez votre profil</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Choisissez votre rôle pour accéder aux fonctionnalités adaptées et profiter pleinement de la plateforme
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

      <Card>
        <CardHeader>
          <CardTitle>Fonctionnalités Disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Search className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-medium">Recherche Avancée</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Trouvez le logement idéal</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <MessageSquare className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-medium">Messagerie Intégrée</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Communiquez directement</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Star className="w-6 h-6 text-purple-600" />
              <div>
                <p className="font-medium">Système de Notes</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Évaluez et soyez évalué</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Photo de couverture et profil */}
          <div className="relative h-64 bg-gradient-to-r from-benin-green via-benin-blue to-benin-yellow rounded-t-2xl overflow-hidden mb-8">
            {profileData.coverImage && (
              <img src={profileData.coverImage} alt="Couverture" className="w-full h-full object-cover" />
            )}
            {isEditing && (
              <div className="absolute top-4 right-4">
                <label htmlFor="cover-upload" className="cursor-pointer">
                  <div className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors">
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
            
            {/* Profil utilisateur */}
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <div className="w-32 h-32 bg-white dark:bg-gray-800 rounded-full p-2 shadow-xl">
                  <div className="w-full h-full bg-gradient-to-r from-benin-green to-benin-blue rounded-full flex items-center justify-center overflow-hidden">
                    {profileData.profileImage ? (
                      <img src={profileData.profileImage} alt="Profil" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white text-4xl font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
                {isEditing && (
                  <label htmlFor="profile-upload" className="absolute bottom-2 right-2 cursor-pointer">
                    <div className="bg-benin-green text-white p-2 rounded-full hover:bg-benin-green/90 transition-colors shadow-lg">
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
            </div>
          </div>

          {/* En-tête du profil */}
          <Card className="mb-8">
            <CardContent className="p-8 pt-20">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1 mb-6 lg:mb-0">
                  <div className="flex items-center space-x-4 mb-4">
                    {isEditing ? (
                      <Input
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        className="text-3xl font-bold border-0 p-0 h-auto bg-transparent"
                      />
                    ) : (
                      <h1 className="text-3xl font-bold">{profileData.name}</h1>
                    )}
                    <Badge className="bg-benin-green text-white capitalize text-sm px-3 py-1">
                      {user?.role}
                    </Badge>
                    {profileData.verificationStatus && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        ✓ {profileData.verificationStatus}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Mail className="w-4 h-4" />
                      {isEditing ? (
                        <Input
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          className="border-0 p-0 h-auto text-sm bg-transparent"
                        />
                      ) : (
                        <span className="text-sm">{profileData.email}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Phone className="w-4 h-4" />
                      {isEditing ? (
                        <Input
                          value={profileData.phone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                          className="border-0 p-0 h-auto text-sm bg-transparent"
                        />
                      ) : (
                        <span className="text-sm">{profileData.phone}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      {isEditing ? (
                        <Input
                          value={profileData.address}
                          onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                          className="border-0 p-0 h-auto text-sm bg-transparent"
                        />
                      ) : (
                        <span className="text-sm">{profileData.address}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Membre depuis {profileData.joinDate}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    {isEditing ? (
                      <Textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                        className="text-sm resize-none bg-transparent border-0 p-0"
                        rows={3}
                      />
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">{profileData.bio}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-3">
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
                      <span>Modifier le Profil</span>
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

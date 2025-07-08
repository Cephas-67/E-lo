import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { User, Home, MessageSquare, Settings, Star, MapPin, Phone, Mail, Camera, Save, X, Calendar, Eye, Heart, TrendingUp, Search } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <BackButton to="/" />
        
        {/* Profile Header */}
        <div className="relative mb-8">
          <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">
                {isEditing ? "Modifier le Profil" : "Mon Profil"}
              </CardTitle>
              {isEditing ? (
                <div className="space-x-2">
                  <Button variant="ghost" onClick={() => setIsEditing(false)}>
                    <X className="h-4 w-4 mr-2" />
                    Annuler
                  </Button>
                  <Button onClick={handleUpdateProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    Enregistrer
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              )}
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profilePicture || "https://github.com/shadcn.png"} alt={name} />
                  <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{name}</h2>
                  <p className="text-gray-500 dark:text-gray-400">{email}</p>
                  <Badge variant="secondary">
                    <User className="h-4 w-4 mr-2" />
                    {user?.role}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
              <CardHeader className="py-4 px-6">
                <CardTitle className="text-lg font-semibold">
                  Informations du Profil
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Localisation</Label>
                  <Input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Site web</Label>
                  <Input
                    id="website"
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
								<div>
									<Label htmlFor="profilePicture">URL de la photo de profil</Label>
									<Input
										id="profilePicture"
										type="url"
										value={profilePicture}
										onChange={(e) => setProfilePicture(e.target.value)}
										disabled={!isEditing}
										className="mt-1"
									/>
								</div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div>
            <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
              <CardHeader className="py-4 px-6">
                <CardTitle className="text-lg font-semibold">Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleLogout}
                >
                  Déconnexion
                </Button>
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
    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
  >
    {children}
  </label>
);

export default Profile;

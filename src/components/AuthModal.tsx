
import React, { useState } from 'react';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { toast } from '@/hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'aucun' as UserRole
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let success = false;
      
      if (isLogin) {
        success = await login(formData.email, formData.password);
      } else {
        success = await register(formData.email, formData.password, formData.name, formData.role);
      }

      if (success) {
        toast({
          title: isLogin ? "Connexion réussie !" : "Inscription réussie !",
          description: `Bienvenue sur e-lo Bénin ${isLogin ? '' : formData.name}`,
        });
        onClose();
        setFormData({ email: '', password: '', name: '', role: 'aucun' });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="auth-slide-container w-full max-w-4xl h-[600px] flex overflow-hidden">
        {/* Welcome Section */}
        <div className={`w-1/2 bg-gradient-to-br from-benin-green via-benin-blue to-benin-yellow p-8 flex flex-col justify-center text-white transition-transform duration-500 ${
          isLogin ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">
              {isLogin ? 'Bon retour !' : 'Bienvenue !'}
            </h2>
            <p className="text-xl mb-6 opacity-90">
              {isLogin 
                ? 'Connectez-vous pour accéder à vos propriétés et gérer vos locations sur e-lo Bénin.'
                : 'Rejoignez la communauté e-lo Bénin et découvrez les meilleures offres de location au Bénin.'
              }
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span>Recherche avancée de propriétés</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-100"></div>
                <span>Gestion simplifiée des locations</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-200"></div>
                <span>Support client 24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className={`w-1/2 p-8 flex flex-col justify-center transition-transform duration-500 ${
          isLogin ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="w-full max-w-sm mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {isLogin ? 'Connexion' : 'Inscription'}
              </h3>
              <Button
                variant="ghost"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="animate-slide-in-right">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required={!isLogin}
                    className="mt-1"
                  />
                </div>
              )}

              <div className="animate-fade-in">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="mt-1"
                />
              </div>

              <div className="animate-fade-in">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                  className="mt-1"
                />
              </div>

              {!isLogin && (
                <div className="animate-slide-in-right">
                  <Label htmlFor="role">Votre statut</Label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value as UserRole})}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-benin-green focus:border-transparent dark:border-gray-600 dark:bg-gray-800"
                    required={!isLogin}
                  >
                    <option value="aucun">Aucun des deux</option>
                    <option value="proprietaire">Propriétaire</option>
                    <option value="locataire">Locataire</option>
                  </select>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-benin-green to-benin-blue hover:from-benin-green/90 hover:to-benin-blue/90 text-white font-medium py-2 rounded-md transition-all duration-300"
              >
                {isLoading ? 'Chargement...' : (isLogin ? 'Se connecter' : "S'inscrire")}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-benin-blue hover:text-benin-green transition-colors font-medium"
              >
                {isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

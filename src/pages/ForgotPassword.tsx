
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation d'envoi d'email
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsEmailSent(true);
    toast({
      title: "Email envoyé !",
      description: "Vérifiez votre boîte de réception pour réinitialiser votre mot de passe.",
    });
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-benin-green/10 via-white to-benin-blue/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8">
          <div className="flex items-center mb-6">
            <Link to="/" className="flex items-center text-benin-green hover:text-benin-blue transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Mot de passe oublié
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {isEmailSent 
                ? "Un email a été envoyé à votre adresse"
                : "Entrez votre email pour recevoir un lien de réinitialisation"
              }
            </p>
          </div>

          {!isEmailSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Adresse email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                  placeholder="votre@email.com"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-benin-green to-benin-blue hover:from-benin-green/90 hover:to-benin-blue/90 text-white font-medium py-3 rounded-md transition-all duration-300"
              >
                {isLoading ? 'Envoi en cours...' : 'Envoyer le lien'}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-benin-green/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-benin-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Vérifiez votre boîte de réception et suivez les instructions pour réinitialiser votre mot de passe.
              </p>
              <Button
                onClick={() => {
                  setIsEmailSent(false);
                  setEmail('');
                }}
                variant="outline"
                className="w-full"
              >
                Renvoyer l'email
              </Button>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-benin-blue hover:text-benin-green transition-colors font-medium"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

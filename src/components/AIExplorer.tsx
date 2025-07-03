
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Bot, Send, Lightbulb, TrendingUp, MapPin, DollarSign } from 'lucide-react';

interface AIExplorerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIExplorer: React.FC<AIExplorerProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const predefinedSuggestions = [
    "Appartements pas chers à Cotonou",
    "Villas familiales à Porto-Novo",
    "Studios pour étudiants",
    "Logements près des universités",
    "Maisons avec jardin",
    "Quartiers les plus sûrs",
    "Transports en commun accessibles",
    "Écoles et services à proximité"
  ];

  const aiInsights = [
    {
      icon: <TrendingUp className="w-5 h-5 text-green-500" />,
      title: "Tendance du marché",
      description: "Les prix à Cotonou ont augmenté de 8% ce trimestre"
    },
    {
      icon: <MapPin className="w-5 h-5 text-blue-500" />,
      title: "Quartier recommandé",
      description: "Akpakpa offre le meilleur rapport qualité-prix"
    },
    {
      icon: <DollarSign className="w-5 h-5 text-yellow-500" />,
      title: "Budget optimal",
      description: "Pour votre profil: 300-500K CFA/mois"
    }
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    // Simulation d'une recherche IA
    setTimeout(() => {
      const newSuggestions = [
        `Recherche: "${query}"`,
        "Voici 5 propriétés correspondantes trouvées",
        "Filtres recommandés appliqués",
        "Propriétés similaires dans d'autres quartiers"
      ];
      setSuggestions(newSuggestions);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickSearch = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <CardHeader className="bg-gradient-to-r from-benin-green to-benin-blue text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Bot className="w-6 h-6" />
              <span>Assistant IA - Explorateur Immobilier</span>
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={onClose}
            >
              ×
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Recherche IA */}
          <div className="mb-6">
            <div className="flex space-x-2 mb-4">
              <Input
                placeholder="Décrivez ce que vous recherchez... (ex: 'Appartement 2 pièces, budget 400k, proche université')"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-benin-green hover:bg-benin-green/90"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            
            {suggestions.length > 0 && (
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                  Résultats de l'IA :
                </h4>
                <ul className="space-y-1">
                  {suggestions.map((suggestion, index) => (
                    <li key={index} className="text-green-700 dark:text-green-300 text-sm">
                      • {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Suggestions rapides */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <span>Suggestions Populaires</span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {predefinedSuggestions.map((suggestion, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-benin-green hover:text-white transition-colors p-2 text-center justify-center"
                  onClick={() => handleQuickSearch(suggestion)}
                >
                  {suggestion}
                </Badge>
              ))}
            </div>
          </div>

          {/* Insights IA */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center space-x-2">
              <Bot className="w-5 h-5 text-benin-blue" />
              <span>Insights Personnalisés</span>
            </h3>
            <div className="space-y-3">
              {aiInsights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  {insight.icon}
                  <div>
                    <h4 className="font-medium">{insight.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conseils IA */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              💡 Conseil de l'IA
            </h4>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Pour trouver le logement idéal, précisez votre budget, vos préférences de localisation, 
              et le nombre de pièces souhaité. L'IA peut également vous recommander des quartiers 
              selon votre profil et vos besoins.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIExplorer;

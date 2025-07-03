
import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Link, useLocation } from 'react-router-dom';
import { User, Home, MessageSquare, Bot, Search, FileText, Map, Mail } from 'lucide-react';

interface NavigationProps {
  onAuthClick: () => void;
  onChatToggle: () => void;
  onAIToggle: () => void;
  onRentalRequest?: () => void;
  onRentalOffer?: () => void;
  onMapView?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  onAuthClick, 
  onChatToggle, 
  onAIToggle,
  onRentalRequest,
  onRentalOffer,
  onMapView
}) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'floating-nav shadow-xl backdrop-blur-md bg-white/90 dark:bg-gray-900/90' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-benin-green to-benin-blue rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">e</span>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">e-lo Bénin</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Location Immobilière</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-10">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`flex items-center space-x-2 font-medium transition-colors px-3 py-2 rounded-lg ${
                    location.pathname === '/dashboard' 
                      ? 'text-benin-green bg-benin-green/10' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-benin-green hover:bg-benin-green/5'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Tableau de Bord</span>
                </Link>
                <Link 
                  to="/messages" 
                  className={`flex items-center space-x-2 font-medium transition-colors px-3 py-2 rounded-lg ${
                    location.pathname === '/messages' 
                      ? 'text-benin-green bg-benin-green/10' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-benin-green hover:bg-benin-green/5'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Messages</span>
                </Link>
                <a href="#proprietes" className="text-gray-700 dark:text-gray-300 hover:text-benin-blue transition-colors font-medium px-3 py-2 rounded-lg hover:bg-benin-blue/5">
                  Propriétés
                </a>
                <a href="#services" className="text-gray-700 dark:text-gray-300 hover:text-benin-yellow transition-colors font-medium px-3 py-2 rounded-lg hover:bg-benin-yellow/5">
                  Services
                </a>
              </>
            ) : (
              <>
                <a href="#accueil" className="text-gray-700 dark:text-gray-300 hover:text-benin-green transition-colors font-medium px-3 py-2 rounded-lg hover:bg-benin-green/5">
                  Accueil
                </a>
                <a href="#proprietes" className="text-gray-700 dark:text-gray-300 hover:text-benin-blue transition-colors font-medium px-3 py-2 rounded-lg hover:bg-benin-blue/5">
                  Propriétés
                </a>
                <a href="#services" className="text-gray-700 dark:text-gray-300 hover:text-benin-yellow transition-colors font-medium px-3 py-2 rounded-lg hover:bg-benin-yellow/5">
                  Services
                </a>
              </>
            )}
            <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-benin-red transition-colors font-medium px-3 py-2 rounded-lg hover:bg-benin-red/5">
              Contact
            </a>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Action Buttons for authenticated users only */}
            {isAuthenticated && (
              <div className="flex items-center space-x-3 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onRentalRequest}
                      className="w-12 h-12 rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-md transition-all hover:scale-105"
                    >
                      <Search className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Faire une demande de location</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onRentalOffer}
                      className="w-12 h-12 rounded-full bg-orange-500 text-white hover:bg-orange-600 shadow-md transition-all hover:scale-105"
                    >
                      <FileText className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Faire une offre de location</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onMapView}
                      className="w-12 h-12 rounded-full bg-green-500 text-white hover:bg-green-600 shadow-md transition-all hover:scale-105"
                    >
                      <Map className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Voir la carte</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onAIToggle}
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-md transition-all hover:scale-105"
                    >
                      <Bot className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Assistant IA</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onChatToggle}
                      className="w-12 h-12 rounded-full bg-benin-green text-white hover:bg-benin-green/90 shadow-md transition-all hover:scale-105"
                    >
                      <MessageSquare className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Chat support</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-12 h-12 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </Button>

            {/* User Section */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-12 w-12 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-benin-green text-white text-lg">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-xl" align="end">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
                    <p className="text-xs text-benin-green capitalize font-medium">{user.role}</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center space-x-2 w-full">
                      <User className="w-4 h-4" />
                      <span>Mon Profil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={onAuthClick}
                className="bg-gradient-to-r from-benin-green to-benin-blue hover:from-benin-green/90 hover:to-benin-blue/90 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Se connecter
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

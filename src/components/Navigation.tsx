
import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Link, useLocation } from 'react-router-dom';
import { User, Home, MessageSquare, Bot } from 'lucide-react';

interface NavigationProps {
  onAuthClick: () => void;
  onChatToggle: () => void;
  onAIToggle: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onAuthClick, onChatToggle, onAIToggle }) => {
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
      isScrolled ? 'floating-nav shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-benin-green to-benin-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">e</span>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">e-lo Bénin</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Location Immobilière</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`flex items-center space-x-1 font-medium transition-colors ${
                    location.pathname === '/dashboard' 
                      ? 'text-benin-green' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-benin-green'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Tableau de Bord</span>
                </Link>
                <a href="#proprietes" className="text-gray-700 dark:text-gray-300 hover:text-benin-blue transition-colors font-medium">
                  Propriétés
                </a>
                <a href="#services" className="text-gray-700 dark:text-gray-300 hover:text-benin-yellow transition-colors font-medium">
                  Services
                </a>
              </>
            ) : (
              <>
                <a href="#accueil" className="text-gray-700 dark:text-gray-300 hover:text-benin-green transition-colors font-medium">
                  Accueil
                </a>
                <a href="#proprietes" className="text-gray-700 dark:text-gray-300 hover:text-benin-blue transition-colors font-medium">
                  Propriétés
                </a>
                <a href="#services" className="text-gray-700 dark:text-gray-300 hover:text-benin-yellow transition-colors font-medium">
                  Services
                </a>
              </>
            )}
            <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-benin-red transition-colors font-medium">
              Contact
            </a>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* AI Assistant Button */}
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAIToggle}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
              >
                <Bot className="w-5 h-5" />
              </Button>
            )}

            {/* Chat Button */}
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onChatToggle}
                className="w-10 h-10 rounded-full bg-benin-green text-white hover:bg-benin-green/90"
              >
                <MessageSquare className="w-5 h-5" />
              </Button>
            )}

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </Button>

            {/* User Section */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-benin-green text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" align="end">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
                    <p className="text-xs text-benin-green capitalize">{user.role}</p>
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
                className="bg-gradient-to-r from-benin-green to-benin-blue hover:from-benin-green/90 hover:to-benin-blue/90 text-white font-medium px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
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

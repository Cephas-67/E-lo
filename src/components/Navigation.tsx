
import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Link, useLocation } from 'react-router-dom';
import { User, Home, MessageSquare, Bot, Search, FileText, Map, Mail, Menu, X, Moon, Sun } from 'lucide-react';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-benin-green to-benin-blue rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg lg:text-xl">e</span>
            </div>
            <div>
              <h1 className="text-lg lg:text-xl xl:text-2xl font-bold gradient-text">e-lo Bénin</h1>
              <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">Location Immobilière</p>
            </div>
          </Link>

          {/* Navigation Links - Show on desktop */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
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

          {/* Actions Section */}
          <div className="flex items-center space-x-3">
            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Action Buttons for authenticated users only */}
              {isAuthenticated && (
                <div className="flex items-center space-x-2 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-1.5 shadow-lg">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={onRentalRequest}
                        className="w-10 h-10 rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-md transition-all hover:scale-105"
                      >
                        <Search className="w-4 h-4" />
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
                        className="w-10 h-10 rounded-full bg-orange-500 text-white hover:bg-orange-600 shadow-md transition-all hover:scale-105"
                      >
                        <FileText className="w-4 h-4" />
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
                        className="w-10 h-10 rounded-full bg-green-500 text-white hover:bg-green-600 shadow-md transition-all hover:scale-105"
                      >
                        <Map className="w-4 h-4" />
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
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-md transition-all hover:scale-105"
                      >
                        <Bot className="w-4 h-4" />
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
                        className="w-10 h-10 rounded-full bg-benin-green text-white hover:bg-benin-green/90 shadow-md transition-all hover:scale-105"
                      >
                        <MessageSquare className="w-4 h-4" />
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
                className="w-10 h-10 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </Button>

              {/* User Section */}
              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-benin-green text-white">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-benin-green capitalize font-medium">{user.role}</p>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Mon Profil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      Se déconnecter
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={onAuthClick}
                  className="bg-gradient-to-r from-benin-green to-benin-blue hover:from-benin-green/90 hover:to-benin-blue/90 text-white px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:scale-105"
                >
                  Se connecter
                </Button>
              )}
            </div>

            {/* Mobile/Tablet Actions */}
            <div className="flex items-center space-x-2 lg:hidden">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </Button>

              {/* User/Auth for medium screens */}
              <div className="hidden md:block">
                {isAuthenticated && user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-benin-green text-white text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64 shadow-xl z-50" align="end">
                      <div className="px-4 py-3 border-b">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-benin-green capitalize font-medium">{user.role}</p>
                      </div>
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="flex items-center space-x-2 w-full">
                          <User className="w-4 h-4" />
                          <span>Mon Profil</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <button onClick={onRentalRequest} className="flex items-center space-x-2 w-full">
                          <Search className="w-4 h-4" />
                          <span>Demande de location</span>
                        </button>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <button onClick={onRentalOffer} className="flex items-center space-x-2 w-full">
                          <FileText className="w-4 h-4" />
                          <span>Offre de location</span>
                        </button>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <button onClick={onAIToggle} className="flex items-center space-x-2 w-full">
                          <Bot className="w-4 h-4" />
                          <span>Assistant IA</span>
                        </button>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <button onClick={onChatToggle} className="flex items-center space-x-2 w-full">
                          <MessageSquare className="w-4 h-4" />
                          <span>Chat support</span>
                        </button>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                        Se déconnecter
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    onClick={onAuthClick}
                    size="sm"
                    className="bg-gradient-to-r from-benin-green to-benin-blue hover:from-benin-green/90 hover:to-benin-blue/90 text-white font-medium px-4 py-2 rounded-full transition-all duration-300"
                  >
                    Se connecter
                  </Button>
                )}
              </div>
            
              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0">
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-benin-green to-benin-blue rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">e</span>
                        </div>
                        <div>
                          <h2 className="font-bold gradient-text">e-lo Bénin</h2>
                          <p className="text-xs text-muted-foreground">Location Immobilière</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-8 h-8 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* User Info for authenticated users */}
                    {isAuthenticated && user && (
                      <div className="p-6 border-b bg-muted/20">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-benin-green text-white text-lg">
                              {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <p className="text-xs text-benin-green capitalize font-medium">{user.role}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation Links */}
                    <div className="flex-1 p-6">
                      <nav className="space-y-4">
                        {isAuthenticated ? (
                          <>
                            <Link 
                              to="/dashboard" 
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                                location.pathname === '/dashboard' 
                                  ? 'bg-benin-green/10 text-benin-green' 
                                  : 'hover:bg-muted'
                              }`}
                            >
                              <Home className="w-5 h-5" />
                              <span>Tableau de Bord</span>
                            </Link>
                            <Link 
                              to="/messages" 
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                                location.pathname === '/messages' 
                                  ? 'bg-benin-green/10 text-benin-green' 
                                  : 'hover:bg-muted'
                              }`}
                            >
                              <Mail className="w-5 h-5" />
                              <span>Messages</span>
                            </Link>
                            <Link 
                              to="/profile" 
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                                location.pathname === '/profile' 
                                  ? 'bg-benin-green/10 text-benin-green' 
                                  : 'hover:bg-muted'
                              }`}
                            >
                              <User className="w-5 h-5" />
                              <span>Mon Profil</span>
                            </Link>
                            <a 
                              href="#proprietes" 
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                            >
                              <FileText className="w-5 h-5" />
                              <span>Propriétés</span>
                            </a>
                            <a 
                              href="#services" 
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                            >
                              <Bot className="w-5 h-5" />
                              <span>Services</span>
                            </a>
                          </>
                        ) : (
                          <>
                            <a 
                              href="#accueil" 
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                            >
                              <Home className="w-5 h-5" />
                              <span>Accueil</span>
                            </a>
                            <a 
                              href="#proprietes" 
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                            >
                              <FileText className="w-5 h-5" />
                              <span>Propriétés</span>
                            </a>
                            <a 
                              href="#services" 
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                            >
                              <Bot className="w-5 h-5" />
                              <span>Services</span>
                            </a>
                          </>
                        )}
                        <a 
                          href="#contact" 
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                        >
                          <Mail className="w-5 h-5" />
                          <span>Contact</span>
                        </a>
                      </nav>

                      {/* Action Buttons for authenticated users */}
                      {isAuthenticated && (
                        <div className="mt-8 space-y-3">
                          <h3 className="text-sm font-medium text-muted-foreground mb-3">Actions rapides</h3>
                          <Button
                            onClick={() => {
                              onRentalRequest?.();
                              setIsMobileMenuOpen(false);
                            }}
                            className="w-full justify-start bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            <Search className="w-4 h-4 mr-2" />
                            Demande de location
                          </Button>
                          <Button
                            onClick={() => {
                              onRentalOffer?.();
                              setIsMobileMenuOpen(false);
                            }}
                            className="w-full justify-start bg-orange-500 hover:bg-orange-600 text-white"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Offre de location
                          </Button>
                          <Button
                            onClick={() => {
                              onMapView?.();
                              setIsMobileMenuOpen(false);
                            }}
                            className="w-full justify-start bg-green-500 hover:bg-green-600 text-white"
                          >
                            <Map className="w-4 h-4 mr-2" />
                            Voir la carte
                          </Button>
                          <Button
                            onClick={() => {
                              onAIToggle();
                              setIsMobileMenuOpen(false);
                            }}
                            className="w-full justify-start bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                          >
                            <Bot className="w-4 h-4 mr-2" />
                            Assistant IA
                          </Button>
                          <Button
                            onClick={() => {
                              onChatToggle();
                              setIsMobileMenuOpen(false);
                            }}
                            className="w-full justify-start bg-benin-green hover:bg-benin-green/90 text-white"
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Chat support
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t space-y-3">
                      <Button
                        variant="outline"
                        onClick={toggleTheme}
                        className="w-full justify-start"
                      >
                        {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                        <span className="ml-2">
                          {theme === 'light' ? 'Mode sombre' : 'Mode clair'}
                        </span>
                      </Button>
                      
                      {isAuthenticated && user ? (
                        <Button
                          variant="outline"
                          onClick={() => {
                            handleLogout();
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                        >
                          Se déconnecter
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            onAuthClick();
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full bg-gradient-to-r from-benin-green to-benin-blue hover:from-benin-green/90 hover:to-benin-blue/90 text-white"
                        >
                          Se connecter
                        </Button>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;


import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from '@/hooks/use-toast';
import { Facebook, Instagram, Linkedin, MessageCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setIsLoading(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adresse',
      content: 'Quartier Ganhi, Cotonou\nBénin',
      color: 'benin-green'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      content: '+229 XX XX XX XX\n+229 YY YY YY YY',
      color: 'benin-blue'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'contact@elobenin.com\nsupport@elobenin.com',
      color: 'benin-yellow'
    },
    {
      icon: Clock,
      title: 'Horaires',
      content: 'Lun - Ven: 8h - 18h\nSam: 9h - 15h',
      color: 'benin-red'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Contactez</span>
            <span className="text-gray-900 dark:text-white"> nous</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Une question ? Un projet ? Notre équipe est là pour vous accompagner dans votre recherche immobilière
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 justify-items-center max-w-7xl mx-auto">
          {/* Contact Form */}
          <Card className="animate-slide-in-left">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Envoyez-nous un message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Sujet *</Label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      required
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-benin-green focus:border-transparent dark:border-gray-600 dark:bg-gray-800"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="location">Recherche de location</option>
                      <option value="propriete">Mise en location</option>
                      <option value="support">Support technique</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    rows={5}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-benin-green focus:border-transparent dark:border-gray-600 dark:bg-gray-800 resize-none"
                    placeholder="Décrivez votre demande en détail..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-benin-green to-benin-blue hover:from-benin-green/90 hover:to-benin-blue/90 text-white font-semibold py-3 rounded-md transition-all duration-300"
                >
                  {isLoading ? 'Envoi en cours...' : 'Envoyer le message'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6 animate-slide-in-right">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 justify-items-center">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                   <CardContent className="p-6 text-center">
                     <div className={`inline-flex items-center justify-center w-12 h-12 mb-4 bg-${info.color}/10 rounded-full group-hover:bg-${info.color}/20 transition-colors duration-300`}>
                       <info.icon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                     </div>
                    
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {info.title}
                    </h4>
                    
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line text-sm">
                      {info.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social Media */}
            <Card className="bg-gradient-to-r from-benin-green/10 to-benin-blue/10">
              <CardContent className="p-6 text-center">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Suivez-nous sur les réseaux sociaux
                </h4>
                
                <div className="flex justify-center space-x-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-md hover:shadow-lg hover:bg-blue-50 dark:hover:bg-blue-900"
                  >
                    <Facebook className="w-5 h-5 text-blue-600" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-md hover:shadow-lg hover:bg-pink-50 dark:hover:bg-pink-900"
                  >
                    <Instagram className="w-5 h-5 text-pink-600" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-md hover:shadow-lg hover:bg-blue-50 dark:hover:bg-blue-900"
                  >
                    <Linkedin className="w-5 h-5 text-blue-700" />
                  </a>
                  <a
                    href="https://wa.me/22900000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-md hover:shadow-lg hover:bg-green-50 dark:hover:bg-green-900"
                  >
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card>
              <CardContent className="p-0">
                <div className="h-64 bg-gradient-to-br from-benin-green/20 to-benin-blue/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-600 dark:text-gray-300" />
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      Carte interactive
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Cotonou, Bénin
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

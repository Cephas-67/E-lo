
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';
import { X, Upload } from 'lucide-react';

interface RentalOfferFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const RentalOfferForm: React.FC<RentalOfferFormProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    propertyType: '',
    price: '',
    location: '',
    bedrooms: '',
    area: '',
    description: '',
    amenities: '',
    contact: '',
    availability: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Offre publiée",
      description: "Votre offre de location a été publiée avec succès.",
    });
    onClose();
    setFormData({
      title: '',
      propertyType: '',
      price: '',
      location: '',
      bedrooms: '',
      area: '',
      description: '',
      amenities: '',
      contact: '',
      availability: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Publier une Offre de Location</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Titre de l'annonce</label>
              <Input
                placeholder="Ex: Bel appartement 3 pièces à Cotonou"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Type de propriété</label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="appartement">Appartement</SelectItem>
                    <SelectItem value="maison">Maison</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="duplex">Entrer/Coucher</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Prix mensuel (CFA)</label>
                <Input
                  placeholder="Ex: 450,000"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Localisation</label>
                <Input
                  placeholder="Quartier, Ville"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Chambres</label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, bedrooms: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Nombre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 chambre</SelectItem>
                    <SelectItem value="2">2 chambres</SelectItem>
                    <SelectItem value="3">3 chambres</SelectItem>
                    <SelectItem value="4+">4+ chambres</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Surface (m²)</label>
                <Input
                  placeholder="Ex: 80"
                  value={formData.area}
                  onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Disponibilité</label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, availability: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Quand?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immédiatement</SelectItem>
                  <SelectItem value="week">Dans la semaine</SelectItem>
                  <SelectItem value="month">Dans le mois</SelectItem>
                  <SelectItem value="negotiate">À négocier</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description détaillée</label>
              <Textarea
                placeholder="Décrivez votre propriété en détail..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Équipements et commodités</label>
              <Textarea
                placeholder="Ex: Climatisation, parking, piscine, sécurité..."
                value={formData.amenities}
                onChange={(e) => setFormData(prev => ({ ...prev, amenities: e.target.value }))}
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Photos</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Cliquez pour ajouter des photos</p>
                <p className="text-xs text-gray-500 mt-1">Jusqu'à 10 photos (JPG, PNG)</p>
                <input type="file" multiple accept="image/*" className="hidden" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Contact</label>
              <Input
                placeholder="Téléphone ou email"
                value={formData.contact}
                onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                required
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <Button type="submit" className="flex-1 bg-benin-green hover:bg-benin-green/90">
                Publier l'offre
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Annuler
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RentalOfferForm;

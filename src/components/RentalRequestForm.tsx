
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';
import { X } from 'lucide-react';

interface RentalRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const RentalRequestForm: React.FC<RentalRequestFormProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    propertyType: '',
    budget: '',
    location: '',
    bedrooms: '',
    description: '',
    contact: '',
    urgency: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demande envoyée",
      description: "Votre demande de location a été soumise avec succès.",
    });
    onClose();
    setFormData({
      propertyType: '',
      budget: '',
      location: '',
      bedrooms: '',
      description: '',
      contact: '',
      urgency: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Demande de Location</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Budget (CFA)</label>
                <Input
                  placeholder="Ex: 500,000"
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Localisation souhaitée</label>
                <Input
                  placeholder="Ex: Cotonou, Akpakpa"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Nombre de chambres</label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, bedrooms: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 chambre</SelectItem>
                    <SelectItem value="2">2 chambres</SelectItem>
                    <SelectItem value="3">3 chambres</SelectItem>
                    <SelectItem value="4+">4+ chambres</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Urgence</label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immédiat (dans la semaine)</SelectItem>
                  <SelectItem value="month">Dans le mois</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description / Exigences particulières</label>
              <Textarea
                placeholder="Décrivez vos besoins spécifiques..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Contact préféré</label>
              <Input
                placeholder="Téléphone ou email"
                value={formData.contact}
                onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <Button type="submit" className="flex-1 bg-benin-green hover:bg-benin-green/90">
                Envoyer la demande
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

export default RentalRequestForm;

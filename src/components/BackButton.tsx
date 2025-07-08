
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface BackButtonProps {
  to?: string;
  className?: string;
  variant?: 'default' | 'ghost' | 'outline';
}

const BackButton: React.FC<BackButtonProps> = ({ 
  to, 
  className = "mb-4", 
  variant = "ghost" 
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      variant={variant}
      onClick={handleBack}
      className={`flex items-center space-x-2 ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Retour</span>
    </Button>
  );
};

export default BackButton;

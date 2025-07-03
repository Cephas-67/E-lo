
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useAuth } from '../contexts/AuthContext';
import { MessageSquare, Send, Minimize2, Maximize2, X } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose, onToggle }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Support e-lo',
      content: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
      timestamp: new Date(),
      isOwn: false
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: user?.name || 'Utilisateur',
        content: newMessage,
        timestamp: new Date(),
        isOwn: true
      };
      setMessages([...messages, message]);
      setNewMessage('');

      // Simulation d'une réponse automatique
      setTimeout(() => {
        const reply: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'Support e-lo',
          content: 'Merci pour votre message ! Un agent va vous répondre sous peu.',
          timestamp: new Date(),
          isOwn: false
        };
        setMessages(prev => [...prev, reply]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={onToggle}
          className="bg-benin-green hover:bg-benin-green/90 text-white rounded-full w-14 h-14 shadow-lg"
          size="icon"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 h-96">
      <Card className="h-full flex flex-col shadow-xl">
        <CardHeader className="bg-benin-green text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Messagerie e-lo</CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-white/20"
                onClick={onToggle}
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-white/20"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className={message.isOwn ? 'bg-benin-blue text-white' : 'bg-benin-green text-white'}>
                      {message.sender.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`p-3 rounded-lg ${message.isOwn ? 'bg-benin-blue text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder="Votre message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-benin-green hover:bg-benin-green/90"
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatWidget;

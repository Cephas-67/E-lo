
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Search, Send, Paperclip, Image, Phone, Video, MoreVertical } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
  type: 'text' | 'image' | 'file';
}

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Marie Kouassi',
      lastMessage: 'Bonjour, l\'appartement est-il toujours disponible ?',
      timestamp: '10:30',
      unread: 2,
      online: true
    },
    {
      id: '2',
      name: 'Jean Baptiste',
      lastMessage: 'Merci pour les informations',
      timestamp: 'Hier',
      unread: 0,
      online: false
    },
    {
      id: '3',
      name: 'Fatou Diallo',
      lastMessage: 'Quand puis-je visiter ?',
      timestamp: 'Mer',
      unread: 1,
      online: true
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (selectedContact) {
      // Simuler des messages existants
      setMessages([
        {
          id: '1',
          sender: selectedContact.name,
          content: 'Bonjour ! Je suis intéressé par votre propriété.',
          timestamp: new Date(Date.now() - 3600000),
          isOwn: false,
          type: 'text'
        },
        {
          id: '2',
          sender: 'Vous',
          content: 'Bonjour ! Merci pour votre intérêt. Quelle information souhaitez-vous ?',
          timestamp: new Date(Date.now() - 1800000),
          isOwn: true,
          type: 'text'
        }
      ]);
    }
  }, [selectedContact]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'Vous',
        content: newMessage,
        timestamp: new Date(),
        isOwn: true,
        type: 'text'
      };
      setMessages([...messages, message]);
      setNewMessage('');

      // Simulation d'une réponse
      setTimeout(() => {
        const reply: Message = {
          id: (Date.now() + 1).toString(),
          sender: selectedContact.name,
          content: 'Merci pour votre réponse !',
          timestamp: new Date(),
          isOwn: false,
          type: 'text'
        };
        setMessages(prev => [...prev, reply]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <Card className="h-[80vh] flex">
            {/* Liste des contacts */}
            <div className="w-1/3 border-r border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Messages</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Rechercher un contact..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <div className="overflow-y-auto max-h-[calc(80vh-120px)]">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                      selectedContact?.id === contact.id ? 'bg-benin-green/10' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-benin-green text-white">
                            {contact.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-medium text-sm truncate">{contact.name}</h3>
                          <span className="text-xs text-gray-500">{contact.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {contact.lastMessage}
                        </p>
                      </div>
                      {contact.unread > 0 && (
                        <div className="bg-benin-green text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {contact.unread}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Zone de conversation */}
            <div className="flex-1 flex flex-col">
              {selectedContact ? (
                <>
                  {/* En-tête de conversation */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-benin-green text-white">
                            {selectedContact.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{selectedContact.name}</h3>
                          <p className="text-sm text-gray-500">
                            {selectedContact.online ? 'En ligne' : 'Hors ligne'}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Video className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start space-x-2 max-w-[70%] ${message.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className={message.isOwn ? 'bg-benin-blue text-white' : 'bg-benin-green text-white'}>
                              {message.sender.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`p-3 rounded-lg ${message.isOwn ? 'bg-benin-blue text-white' : 'bg-white dark:bg-gray-800'}`}>
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

                  {/* Zone de saisie */}
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleFileUpload}
                        className="text-gray-500 hover:text-benin-green"
                      >
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-500 hover:text-benin-green"
                      >
                        <Image className="w-4 h-4" />
                      </Button>
                      <Input
                        placeholder="Tapez votre message..."
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

                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx"
                  />
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Sélectionnez une conversation</h3>
                    <p className="text-sm">Choisissez un contact pour commencer à discuter</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;

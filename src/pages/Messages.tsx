import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Send, Search, Phone, Video, MoreVertical, Paperclip, Smile, Image, File, User } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import BackButton from '../components/BackButton';

const Messages = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'John Doe', content: 'Hello!', timestamp: '10:00 AM' },
    { id: 2, sender: 'You', content: 'Hi John!', timestamp: '10:02 AM' },
    { id: 3, sender: 'John Doe', content: 'How are you?', timestamp: '10:05 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', avatar: 'https://github.com/shadcn.png', status: 'Online' },
    { id: 2, name: 'Jane Smith', avatar: 'https://github.com/shadcn.png', status: 'Offline' },
    { id: 3, name: 'Mike Johnson', avatar: 'https://github.com/shadcn.png', status: 'Away' },
  ]);
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to bottom on message change
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMsg = {
        id: messages.length + 1,
        sender: 'You',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleAttachment = () => {
    toast({
      title: "Pièce jointe",
      description: "Cette fonctionnalité sera bientôt disponible.",
    });
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <div className="p-4 border-b bg-white dark:bg-gray-800">
        <BackButton to="/" />
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-white dark:bg-gray-800 border-r flex flex-col">
          <div className="p-4">
            <Input type="text" placeholder="Rechercher un contact..." className="mb-2" />
          </div>
          <div className="overflow-y-auto flex-1">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${selectedContact?.id === contact.id ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                onClick={() => handleContactClick(contact)}
              >
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{contact.status}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b bg-white dark:bg-gray-800">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={selectedContact?.avatar} alt={selectedContact?.name} />
                <AvatarFallback>{selectedContact?.name?.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{selectedContact?.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{selectedContact?.status}</div>
              </div>
            </div>
          </div>

          <div ref={chatAreaRef} className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg) => (
              <div key={msg.id} className={`mb-2 flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-xs rounded-lg p-2 ${msg.sender === 'You' ? 'bg-blue-100 dark:bg-blue-800 text-right' : 'bg-gray-200 dark:bg-gray-700'}`}>
                  {msg.content}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{msg.timestamp}</div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t bg-white dark:bg-gray-800">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={handleAttachment}>
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                type="text"
                placeholder="Tapez votre message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                className="flex-1"
              />
              <Button onClick={handleSendMessage}>
                Envoyer <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;

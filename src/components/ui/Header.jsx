import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import ChatbotPanel from './ChatbotPanel';

const Header = ({ userRole = null, isAuthenticated = false, userName = '', onLogout = () => {} }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [notifications, setNotifications] = useState(2);
  const [chatbotPosition, setChatbotPosition] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm AyurSutra Assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const chatbotRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chatbot opens
  useEffect(() => {
    if (isChatbotOpen && inputRef.current) {
      // Small delay to ensure the chatbot is fully rendered
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isChatbotOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location?.pathname]);

  // Handle dragging with boundary constraints
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && chatbotRef.current) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;

        // Get chatbot dimensions
        const chatbotRect = chatbotRef.current.getBoundingClientRect();
        const maxX = window.innerWidth - chatbotRect.width;
        const maxY = window.innerHeight - chatbotRect.height;

        // Constrain to viewport
        const constrainedX = Math.max(0, Math.min(maxX, newX));
        const constrainedY = Math.max(0, Math.min(maxY, newY));

        setChatbotPosition({
          x: constrainedX,
          y: constrainedY
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      // Prevent text selection while dragging
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDragging, dragOffset]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
    if (!isChatbotOpen) {
      // Reset messages when opening chatbot
      setMessages([
        {
          id: 1,
          text: "Hello! I'm AyurSutra Assistant. How can I help you today?",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
      setInputMessage('');
    }
  };

  const handleDragStart = (e) => {
    // Prevent dragging if clicking on input area or buttons
    const target = e.target;
    const isInteractiveElement = target.closest('input, button, .chatbot-input-area, .chatbot-messages');

    if (isInteractiveElement || e.target.closest('.chatbot-close-btn')) {
      return;
    }

    if (e.button !== 0) return; // Only left click

    const rect = chatbotRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
    e.preventDefault();
    e.stopPropagation();
  };

  const sendMessageToGemini = async (message) => {
    // Replace with your actual Gemini API key
    const API_KEY = "AIzaSyBQ1qqJICZ4lBpKsZmBc_NUr6STO-Gsklg";

    // Updated model name
    const MODEL_NAME = "gemini-2.0-flash";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are AyurSutra Assistant, a helpful and knowledgeable chatbot for an Ayurvedic therapy platform. 
              You should provide helpful, accurate information about:
              - Ayurvedic principles and treatments
              - Platform registration and navigation
              - Therapy session booking and preparation
              - General wellness guidance based on Ayurvedic principles
              
              Keep responses concise but informative. Be friendly and professional.
              
              User message: ${message}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0]) {
        return data.candidates[0].content.parts[0].text;
      } else {
        console.error('Unexpected API response structure:', data);
        throw new Error('Invalid response structure from Gemini API');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);

      if (error.message.includes('403')) {
        return "I'm sorry, there seems to be an authentication issue. Please check the API configuration.";
      } else if (error.message.includes('429')) {
        return "I'm receiving too many requests right now. Please wait a moment and try again.";
      } else if (error.message.includes('500')) {
        return "The AI service is temporarily unavailable. Please try again in a few moments.";
      } else {
        return "I'm sorry, I'm having trouble connecting to the server. Please try again later.";
      }
    }
  };

  const handleSendMessage = useCallback(async () => {
    const trimmedMessage = inputMessage.trim();
    if (!trimmedMessage || isLoading) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: trimmedMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Get response from Gemini API
      const botResponse = await sendMessageToGemini(trimmedMessage);

      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble responding right now. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // Ensure input stays focused after sending
      setTimeout(() => {
        if (inputRef.current && isChatbotOpen) {
          inputRef.current.focus();
        }
      }, 100);
    }
  }, [inputMessage, isLoading, isChatbotOpen]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const handleInputChange = useCallback((e) => {
    setInputMessage(e.target.value);
  }, []);

  const getPatientNavItems = () => [
    {
      label: 'Dashboard',
      path: '/patient-dashboard',
      icon: 'LayoutDashboard',
      isActive: location?.pathname === '/patient-dashboard'
    },
    {
      label: 'Book Therapy',
      path: '/therapy-booking',
      icon: 'Calendar',
      isActive: location?.pathname === '/therapy-booking'
    },
    {
      label: 'Preparation',
      path: '/therapy-preparation',
      icon: 'CheckSquare',
      isActive: location?.pathname === '/therapy-preparation'
    }
  ];

  const getPractitionerNavItems = () => [
    {
      label: 'Calendar',
      path: '/practitioner-calendar',
      icon: 'CalendarDays',
      isActive: location?.pathname === '/practitioner-calendar'
    }
  ];

  const getPreAuthNavItems = () => [
    {
      label: 'Login',
      path: '/patient-login',
      icon: 'LogIn',
      isActive: location?.pathname === '/patient-login'
    },
    {
      label: 'Register',
      path: '/patient-registration',
      icon: 'UserPlus',
      isActive: location?.pathname === '/patient-registration'
    }
  ];

  const getNavigationItems = () => {
    if (!isAuthenticated) return getPreAuthNavItems();
    if (userRole === 'patient') return getPatientNavItems();
    if (userRole === 'practitioner') return getPractitionerNavItems();
    return [];
  };

  const navigationItems = getNavigationItems();

  const NotificationBadge = ({ count }) => (
    count > 0 && (
      <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
        {count > 9 ? '9+' : count}
      </span>
    )
  );

  const NavItem = ({ item, isMobile = false }) => (
    <button
      onClick={() => handleNavigation(item?.path)}
      className={`
        relative flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-breathing
        touch-target focus-ring hover-lift
        ${item?.isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-text-secondary hover:text-foreground hover:bg-muted'
        }
        ${isMobile ? 'w-full justify-start' : ''}
      `}
    >
      <Icon name={item?.icon} size={18} />
      <span className="font-body">{item?.label}</span>
      {item?.label === 'Dashboard' && userRole === 'patient' && (
        <NotificationBadge count={notifications} />
      )}
      {item?.label === 'Calendar' && userRole === 'practitioner' && (
        <NotificationBadge count={notifications} />
      )}
    </button>
  );

  const ChatbotIcon = () => (
    <button
      onClick={toggleChatbot}
      className="relative flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-foreground hover:bg-muted transition-breathing touch-target focus-ring"
      aria-label={isChatbotOpen ? "Close chatbot" : "Open chatbot"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 64 64"
        className="w-6 h-6"
      >
        <rect x="14" y="20" width="36" height="30" rx="4" ry="4" />
        <circle cx="22" cy="30" r="3" fill="white" />
        <circle cx="42" cy="30" r="3" fill="white" />
        <rect x="26" y="38" width="12" height="2" fill="white" />
        <rect x="30" y="50" width="4" height="4" fill="currentColor" />
        <rect x="10" y="10" width="44" height="8" rx="2" ry="2" />
      </svg>
      {isChatbotOpen && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      )}
    </button>
  );

  const UserMenu = () => (
    isAuthenticated && (
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-2 text-sm">
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
            <Icon name="User" size={16} className="text-secondary-foreground" />
          </div>
          <span className="font-body text-foreground">{userName || 'User'}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          iconName="LogOut"
          iconSize={16}
          className="text-text-secondary hover:text-foreground"
        >
          <span className="hidden md:inline">Logout</span>
        </Button>
      </div>
    )
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Chatbot Icon */}
          <div className="flex-shrink-0 flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                  <path d="M12 16L13.09 22.26L20 23L13.09 23.74L12 30L10.91 23.74L4 23L10.91 22.26L12 16Z" opacity="0.6" />
                </svg>
              </div>
              <div className="font-heading font-semibold text-xl text-foreground">
                AyurSutra
              </div>
            </div>
            {/* Chatbot icon next to logo */}
            <ChatbotIcon />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <NavItem key={item?.path} item={item} />
            ))}
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center">
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {isAuthenticated && (
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-secondary-foreground" />
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              iconSize={20}
              className="touch-target"
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems?.map((item) => (
                <NavItem key={item?.path} item={item} isMobile />
              ))}
              {isAuthenticated && (
                <div className="pt-4 border-t border-border mt-4">
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="font-body text-sm text-foreground">
                      {userName || 'User'}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onLogout}
                      iconName="LogOut"
                      iconSize={16}
                      className="text-text-secondary"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Floating Chatbot Panel */}
      <ChatbotPanel
        ref={chatbotRef}
        isChatbotOpen={isChatbotOpen}
        chatbotPosition={chatbotPosition}
        handleDragStart={handleDragStart}
        toggleChatbot={toggleChatbot}
        messages={messages}
        messagesEndRef={messagesEndRef}
        inputRef={inputRef}
        inputMessage={inputMessage}
        handleInputChange={handleInputChange}
        handleKeyPress={handleKeyPress}
        handleSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </header>
  );
};

export default Header;
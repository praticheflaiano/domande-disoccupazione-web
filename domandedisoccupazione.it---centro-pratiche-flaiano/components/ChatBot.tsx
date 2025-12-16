import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles, Loader2 } from 'lucide-react';
import { sendChatMessage, ChatMessage } from '../services/chatService';
import { Page } from '../types';

interface ChatBotProps {
  onNavigate: (page: Page) => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Ciao! 👋 Sono l\'assistente del Centro Flaiano. Posso aiutarti con Calcolo NASpI, Anticipo o Domande Online. Chiedimi pure!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Hide tooltip after 10 seconds or when opened
  useEffect(() => {
    if (isOpen) {
        setShowTooltip(false);
    } else {
        const timer = setTimeout(() => setShowTooltip(false), 15000);
        return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    
    // Add user message
    const newHistory = [...messages, { role: 'user', text: userMsg } as ChatMessage];
    setMessages(newHistory);
    setIsLoading(true);

    // Get response
    const responseText = await sendChatMessage(messages, userMsg);
    
    setMessages([...newHistory, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleQuickAction = (action: string, page?: Page) => {
    if (page) {
      onNavigate(page);
      // Optional: close chat on navigation or keep open
    } else {
      setInput(action);
      // We don't auto-send to let user confirm, or we could:
      // handleSend(); 
    }
  };

  // Helper function to render text with Bold (**text**) and Links [text](url)
  const renderMessageContent = (text: string) => {
    // Regex to match markdown links: [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    // Regex to match bold: **text**
    const boldRegex = /\*\*([^*]+)\*\*/g;

    // We need to split by links first, then by bold within the parts
    const parts = [];
    let lastIndex = 0;
    let match;

    // Reset regex index
    linkRegex.lastIndex = 0;

    while ((match = linkRegex.exec(text)) !== null) {
        // Push text before link
        if (match.index > lastIndex) {
            parts.push({ type: 'text', content: text.substring(lastIndex, match.index) });
        }
        // Push link
        parts.push({ type: 'link', text: match[1], url: match[2] });
        lastIndex = linkRegex.lastIndex;
    }
    // Push remaining text
    if (lastIndex < text.length) {
        parts.push({ type: 'text', content: text.substring(lastIndex) });
    }

    // Now process bold in text parts
    return parts.map((part, idx) => {
        if (part.type === 'link') {
            return (
                <a 
                    key={idx} 
                    href={part.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white underline font-bold hover:text-blue-100 break-words"
                    style={{ textDecorationThickness: '2px' }}
                >
                    {part.text}
                </a>
            );
        } else {
            // Process bold
            const subParts = part.content?.split(boldRegex) || [];
            return (
                <span key={idx}>
                    {subParts.map((subPart, subIdx) => (
                        subIdx % 2 === 1 ? <strong key={subIdx} className="font-extrabold">{subPart}</strong> : subPart
                    ))}
                </span>
            );
        }
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none font-sans">
      
      {/* Tooltip Invitation */}
      {showTooltip && !isOpen && (
        <div className="bg-white px-4 py-3 rounded-xl shadow-xl border border-blue-100 mb-4 mr-2 animate-in slide-in-from-right-4 fade-in duration-500 relative pointer-events-auto">
            <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white border-b border-r border-blue-100 transform rotate-45"></div>
            <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-1.5 rounded-full">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                    <p className="font-bold text-slate-800 text-sm">Serve aiuto con la NASpI?</p>
                    <p className="text-xs text-slate-500">Chiedi all'assistente virtuale!</p>
                </div>
                <button onClick={() => setShowTooltip(false)} className="text-slate-400 hover:text-slate-600 ml-2">
                    <X className="w-3 h-3" />
                </button>
            </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-[340px] md:w-[380px] h-[500px] rounded-2xl shadow-2xl border border-slate-200 flex flex-col mb-4 pointer-events-auto overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 ring-1 ring-slate-900/5">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm border border-white/10">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Assistente Flaiano</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
                  <span className="text-xs text-blue-100 font-medium">Online con IA</span>
                </div>
              </div>
            </div>
            <button 
                onClick={() => setIsOpen(false)} 
                className="text-blue-200 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4 scroll-smooth">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  {msg.role === 'model' && (
                    <div className="font-bold text-[10px] uppercase tracking-wide text-blue-600 mb-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Flaiano AI
                    </div>
                  )}
                  <div className={msg.role === 'user' ? 'text-white' : 'text-slate-700'}>
                    {renderMessageContent(msg.text)}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2 shadow-sm">
                  <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                  <span className="text-xs text-slate-400 font-medium">Sto scrivendo...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="bg-white border-t border-slate-100 p-2 overflow-x-auto whitespace-nowrap flex gap-2 hide-scrollbar">
            <button onClick={() => handleQuickAction("Calcola NASpI", "calculator")} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-full hover:bg-blue-100 border border-blue-100 transition-colors">
               Calcolatore
            </button>
            <button onClick={() => handleQuickAction("Voglio fare domanda", "apply")} className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-full hover:bg-green-100 border border-green-100 transition-colors">
               Richiedi Online
            </button>
             <button onClick={() => handleQuickAction("Info Anticipo", "anticipo")} className="px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-bold rounded-full hover:bg-purple-100 border border-purple-200 transition-colors">
               Anticipo
            </button>
            <button onClick={() => handleQuickAction("Contatti", "office")} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-full hover:bg-slate-200 border border-slate-200 transition-colors">
               Dove siamo
            </button>
          </div>

          {/* Input Area */}
          <div className="bg-white p-3 border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Scrivi qui..."
              className="flex-1 bg-slate-100 text-slate-900 text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg active:scale-95 transform"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto h-16 w-16 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 border-4 border-white z-[100] ${
          isOpen ? 'bg-slate-800 rotate-90' : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400'
        }`}
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <div className="relative">
              <MessageCircle className="w-8 h-8 text-white" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-blue-500"></span>
          </div>
        )}
      </button>
    </div>
  );
};

export default ChatBot;

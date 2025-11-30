import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { Send, X, MessageCircle, Sparkles } from 'lucide-react';

interface ChatSupportProps {
  onClose: () => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatSupport: React.FC<ChatSupportProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const initChat = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const chat = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: "You are Riya, a friendly and polite receptionist at Priyanka Spa. You speak in a mix of Hindi and English (Hinglish). You help customers choose a massage. Available massages range from ₹500 (Head Massage) to ₹5000 (Couples/Four Hands). We have centers in all major cities of Rajasthan (Jaipur, Jodhpur, Udaipur, Kota, Ajmer, etc.). Your goal is to help them find the right service and encourage them to book via the website form. If they ask for payment or booking, guide them to the booking form on the site. Be brief, warm, and professional.",
          },
          history: [
            {
              role: 'model',
              parts: [{ text: "Namaste! Main Riya hu, Priyanka Spa se. Kese help kar sakti hu aapki aaj? (How can I help you today?)" }],
            },
          ],
        });
        chatRef.current = chat;
        setMessages([{ role: 'model', text: "Namaste! Main Riya hu, Priyanka Spa se. Kese help kar sakti hu aapki aaj? (How can I help you today?)" }]);
      } catch (error) {
        console.error("Chat init error", error);
        setMessages([{ role: 'model', text: "Network error. Please try again later." }]);
      }
    };
    initChat();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || !chatRef.current || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userMessage });
      const text = response.text || "Sorry, I didn't catch that.";
      setMessages(prev => [...prev, { role: 'model', text: text }]);
    } catch (error) {
      console.error("Message error", error);
      setMessages(prev => [...prev, { role: 'model', text: "Maaf kijiye, kuch network issue hai. Kripya thodi der baad try kare." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-pink-200 overflow-hidden z-50 animate-fade-in-up flex flex-col h-[500px]">
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 p-5 text-white flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
           <div className="bg-white/20 backdrop-blur p-2 rounded-full border border-white/30">
             <MessageCircle className="h-5 w-5 text-white" />
           </div>
           <div>
             <span className="font-bold block text-sm tracking-wide">Priyanka Spa Chat</span>
             <span className="text-xs text-pink-100 block font-medium">Riya (Receptionist)</span>
           </div>
        </div>
        <button onClick={onClose} className="hover:bg-white/20 p-1.5 rounded-full transition-colors"><X className="h-5 w-5" /></button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 bg-gradient-to-b from-purple-50 to-white space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-3.5 text-sm shadow-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-br-none' 
                : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none shadow-md'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-500 border border-gray-100 rounded-2xl rounded-bl-none p-4 text-sm shadow-md flex items-center gap-2">
              <Sparkles className="h-4 w-4 animate-spin text-pink-500" />
              <span className="text-xs font-medium">Riya is typing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-100 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
          />
          <button 
            onClick={handleSend} 
            disabled={!input.trim() || isLoading}
            className={`p-2 rounded-full transition-colors transform active:scale-95 ${
              input.trim() && !isLoading ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md' : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSupport;

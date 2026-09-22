import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  FileText, 
  ShoppingBag, 
  FileStack, 
  Headphones, 
  ChevronRight, 
  CheckCircle2, 
  ArrowUpRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import type { ChatMessage, ActiveTab, Product, LegalApplication } from '../../types';


interface ChatbotWidgetProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  setActiveTab: (tab: ActiveTab) => void;
  onAddToCart: (prod: Product) => void;
  onOpenTicketModal: (inquiryText: string) => void;
  applications: LegalApplication[];
  products: Product[];
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  isOpen,
  setIsOpen,
  setActiveTab,
  onAddToCart,
  onOpenTicketModal,
  applications,
  products
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: 'Namaste! I am SevaMitra, your hybrid AI assistant. How may I assist you today with citizen document tracking, PDF tools, or verified electronics?',
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [unreadBadge, setUnreadBadge] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Track PAN Status',
    'Laptop Deals under ₹60,000',
    'Merge PDF Help',
    'Govt File Size Limits'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadBadge(false);
    }
  }, [isOpen, messages]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Rule-Based Engine Evaluation
    setTimeout(() => {
      const lower = text.toLowerCase();
      let botResponse: ChatMessage;

      // 1. Check for PAN / Aadhaar / Status / Tracking queries
      if (lower.includes('track') || lower.includes('pan') || lower.includes('aadhaar') || lower.includes('status') || lower.includes('ration') || lower.includes('voter')) {
        const matchedApp = applications.find(a => 
          lower.includes(a.id.toLowerCase()) || 
          lower.includes(a.documentType.toLowerCase().split(' ')[0]) ||
          lower.includes(a.applicantName.toLowerCase().split(' ')[0])
        ) || applications[0]; // default to first real application for demo

        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `Found active document status record for your inquiry:`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          cardType: 'application_status',
          data: matchedApp
        };
      }
      // 2. Check for Laptop / Electronics / Products / Deals / Phones
      else if (lower.includes('laptop') || lower.includes('phone') || lower.includes('hardware') || lower.includes('price') || lower.includes('deals') || lower.includes('pi') || lower.includes('ssd') || lower.includes('electronics')) {
        const matchedProd = products.find(p => {
          if (lower.includes('laptop') && p.category === 'Laptops') return true;
          if (lower.includes('phone') && p.category === 'Mobile Devices') return true;
          if (lower.includes('pi') && p.title.toLowerCase().includes('pi')) return true;
          return p.category === 'Laptops';
        }) || products[0];

        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `Here is a verified genuine electronic product matching your specifications:`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          cardType: 'product_card',
          data: matchedProd
        };
      }
      // 3. Check for PDF / Compress / Merge / Resizer / Size
      else if (lower.includes('pdf') || lower.includes('compress') || lower.includes('merge') || lower.includes('resize') || lower.includes('size') || lower.includes('photo') || lower.includes('signature') || lower.includes('limit')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `You can use our In-Browser PDF Utility Suite to compress files strictly under 200KB or resize passport photos:`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          cardType: 'tool_shortcut'
        };
      }
      // 4. Fallback / Unresolved Query -> Contact Human Support
      else {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `I couldn't find an exact match for your request in our automated knowledge base. Would you like to connect with a duty support officer?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          cardType: 'support_escalation',
          data: { originalQuery: text }
        };
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-14 h-14 rounded-full bg-linear-to-r from-blue-600 via-indigo-600 to-slate-900 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer group"
          title="Open SevaMitra AI Assistant"
        >
          <MessageSquare className="w-6 h-6 text-white group-hover:rotate-6 transition-transform" />
          
          {unreadBadge && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 ring-2 ring-white"></span>
            </span>
          )}
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[410px] h-[580px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-linear-to-r from-slate-900 via-indigo-950 to-blue-900 text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-blue-500/30 flex items-center justify-center text-blue-200 border border-blue-400/30">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-900" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm leading-tight">SevaMitra AI</h3>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-semibold">
                    Verified
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">Govt Portals & Tech Support Desk</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-xs shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs shadow-xs'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* 1. Application Status Card */}
                  {msg.cardType === 'application_status' && msg.data && (
                    <div className="mt-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-slate-900">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-blue-600 text-[11px]">
                          {msg.data.id}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                          {msg.data.status}
                        </span>
                      </div>
                      <div className="text-[11px]">
                        <div className="font-semibold">{msg.data.applicantName}</div>
                        <div className="text-slate-500 text-[10px]">{msg.data.documentType} • SLA: {msg.data.estimatedDays} Days</div>
                      </div>
                      <button
                        onClick={() => {
                          setActiveTab('documents');
                          setIsOpen(false);
                        }}
                        className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>View in Status Tracker</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* 2. Product Card */}
                  {msg.cardType === 'product_card' && msg.data && (
                    <div className="mt-2.5 p-2 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-slate-900">
                      <div className="flex gap-2.5 items-center">
                        <img
                          src={msg.data.image}
                          alt="Product"
                          className="w-12 h-12 rounded-lg object-cover border border-slate-200 bg-white shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-[11px] line-clamp-1">{msg.data.title}</div>
                          <div className="text-blue-600 font-extrabold text-xs">
                            ₹{msg.data.price.toLocaleString('en-IN')}
                          </div>
                          <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1 rounded font-semibold">
                            BIS Certified
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          onAddToCart(msg.data);
                        }}
                        className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add to Procurement Cart</span>
                      </button>
                    </div>
                  )}

                  {/* 3. PDF Tool Shortcut */}
                  {msg.cardType === 'tool_shortcut' && (
                    <div className="mt-2.5 p-2.5 bg-indigo-50 border border-indigo-200 rounded-xl space-y-2 text-indigo-950">
                      <div className="flex items-center gap-2">
                        <FileStack className="w-4 h-4 text-indigo-600" />
                        <span className="font-bold text-[11px]">In-Browser &lt;200KB PDF Suite</span>
                      </div>
                      <p className="text-[10px] text-indigo-800">
                        Zero server uploads. Runs 100% locally on your device for strict Aadhaar & PAN portal rules.
                      </p>
                      <button
                        onClick={() => {
                          setActiveTab('pdftools');
                          setIsOpen(false);
                        }}
                        className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>Open PDF Tools Suite</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* 4. Support Ticket Escalation Card */}
                  {msg.cardType === 'support_escalation' && (
                    <div className="mt-2.5 p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-2 text-amber-950">
                      <div className="flex items-center gap-2">
                        <Headphones className="w-4 h-4 text-amber-600" />
                        <span className="font-bold text-[11px]">Connect With Human Support</span>
                      </div>
                      <p className="text-[10px] text-amber-800 leading-relaxed">
                        A dedicated Grievance Redressal Officer can review your case directly.
                      </p>
                      <button
                        onClick={() => {
                          onOpenTicketModal(msg.data?.originalQuery || '');
                        }}
                        className="w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-xs"
                      >
                        <span>Open Support Ticket</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Recommendation Chips */}
          <div className="p-2 border-t border-slate-100 bg-white overflow-x-auto flex gap-1.5">
            {quickPrompts.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 whitespace-nowrap transition-colors cursor-pointer shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-slate-200 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about PAN, laptops under ₹50k, PDF resize..."
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-hidden"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`p-2 rounded-xl text-white transition-colors cursor-pointer ${
                  !inputText.trim() ? 'bg-slate-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
};

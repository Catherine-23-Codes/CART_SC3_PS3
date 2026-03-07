import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { Send, Bot, User, Trash2, Sprout } from 'lucide-react';

export default function ChatbotPage() {
    const [messages, setMessages] = useState<{ role: 'ai' | 'user', content: string }[]>([
        { role: 'ai', content: 'Hi there! I am the EcoSort AI Assistant. I can help you with recycling rules, identifying items, or giving you eco-friendly advice. What would you like to know today?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInput('');
        setIsTyping(true);

        // Simple Rule-Base / Mock AI response for demo
        setTimeout(() => {
            let reply = "That's a great question about waste management! Always remember to rinse containers, check local guidelines for complex items, and never bag your recyclables. What else can I help with?";

            const lowerMsg = userMsg.toLowerCase();
            if (lowerMsg.includes('battery') || lowerMsg.includes('batteries')) {
                reply = "Batteries are considered E-Waste and can be a fire hazard if thrown in regular recycling bins. Please find an E-Waste drop off center near you using our Recycling Centers map!";
            } else if (lowerMsg.includes('pizza')) {
                reply = "Ah, pizza boxes! While cardboard is normally paper-recyclable, the grease and cheese ruins it. Cut out the clean top lid to recycle as Paper, and throw the greasy bottom half into the compost/Organic bin or Trash!";
            } else if (lowerMsg.includes('second life') || lowerMsg.includes('upcycle')) {
                reply = "Upcycling is amazing! Old t-shirts make great cleaning rags, glass jars are perfect for food storage, and plastic bottles can be cut to make small self-watering planters. Check out our Second Life Ideas page for more!";
            }

            setMessages(prev => [...prev, { role: 'ai', content: reply }]);
            setIsTyping(false);
        }, 1200);
    };

    return (
        <div className="pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 h-[calc(100vh-64px)] flex flex-col">
            <Head>
                <title>AI Assistant - EcoSort</title>
            </Head>

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <Bot className="w-8 h-8 text-eco" />
                        AI Eco-Assistant
                    </h1>
                    <p className="mt-1 text-gray-500">Ask any doubts about sorting waste & local recycling rules.</p>
                </div>
                <button
                    onClick={() => setMessages([messages[0]])}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-white rounded-lg border border-gray-200" title="Clear Chat"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col mb-6">

                {/* Chat window */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`p-2 rounded-xl shrink-0 ${msg.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-eco-light/50 text-eco'}`}>
                                {msg.role === 'user' ? <User className="w-6 h-6" /> : <Sprout className="w-6 h-6" />}
                            </div>
                            <div className={`px-5 py-3.5 rounded-2xl max-w-[80%] shadow-sm ${msg.role === 'user'
                                    ? 'bg-indigo-600 text-white rounded-tr-none'
                                    : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
                                }`}>
                                <p className="leading-relaxed">{msg.content}</p>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex items-start gap-4">
                            <div className="p-2 rounded-xl shrink-0 bg-eco-light/50 text-eco">
                                <Bot className="w-6 h-6" />
                            </div>
                            <div className="px-5 py-4 bg-white border border-gray-100 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input area */}
                <div className="p-4 bg-white border-t border-gray-100">
                    <form onSubmit={handleSend} className="flex items-center gap-2 relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your recycling question here..."
                            className="flex-1 py-4 pl-6 pr-14 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-eco/50 transition-shadow"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            className="absolute right-2 p-2.5 bg-eco hover:bg-eco-dark disabled:bg-gray-300 text-white rounded-lg transition-colors flex items-center justify-center"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                    <p className="text-xs text-center text-gray-400 mt-2">The AI can make mistakes. Check local recycling guidelines for tricky items.</p>
                </div>
            </div>
        </div>
    );
}

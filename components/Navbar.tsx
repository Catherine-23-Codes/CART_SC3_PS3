import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Leaf, BarChart2, MapPin, Award, Home, Bot, Lightbulb } from 'lucide-react';

export default function Navbar() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
        const name = localStorage.getItem('userName');
        if (name) setUserName(name);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        setUserName(null);
        router.push('/login');
    };

    const navItems = [
        { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
        { name: 'Analytics', path: '/analytics', icon: <BarChart2 className="w-5 h-5" /> },
        { name: 'AI Chatbot', path: '/chatbot', icon: <Bot className="w-5 h-5" /> },
        { name: 'Heatmap', path: '/heatmap', icon: <MapPin className="w-5 h-5" /> },
        { name: 'Recycling Centers', path: '/recycling-centers', icon: <MapPin className="w-5 h-5" /> },
        { name: 'Second Life Ideas', path: '/second-life', icon: <Lightbulb className="w-5 h-5" /> },
        { name: 'Eco Points', path: '/eco-points', icon: <Award className="w-5 h-5" /> },
    ];

    if (!mounted) return null;

    // Don't show regular navbar links on auth pages
    const isAuthPage = router.pathname === '/login' || router.pathname === '/signup';

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex">
                        <Link href="/" className="flex items-center gap-2">
                            <Leaf className="h-6 w-6 text-eco" />
                            <span className="font-bold text-xl text-gray-900 tracking-tight">EcoSort AI</span>
                        </Link>
                    </div>

                    {!isAuthPage && (
                        <>
                            <div className="flex space-x-1 sm:space-x-4">
                                {navItems.map((item) => {
                                    const isActive = router.pathname === item.path;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.path}
                                            className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-colors ${isActive
                                                ? 'text-eco border-b-2 border-eco pb-1'
                                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md'
                                                }`}
                                        >
                                            <div className="flex items-center gap-1.5">
                                                <span className="hidden lg:inline-block">{item.icon}</span>
                                                {item.name}
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="flex items-center gap-4">
                                {userName ? (
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-medium text-gray-700">Hi, {userName}</span>
                                        <button
                                            onClick={handleLogout}
                                            className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <Link href="/login" className="px-4 py-2 text-sm font-medium text-white bg-eco hover:bg-eco-dark rounded-lg transition-colors">
                                        Login
                                    </Link>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

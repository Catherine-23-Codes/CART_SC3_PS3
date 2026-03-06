import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Leaf, ScanLine, BarChart3, Globe2, ArrowRight } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-[#fdfdfd] text-gray-900 flex flex-col font-sans">
            <Head>
                <title>EcoSort AI \u2013 Smart Waste Detection</title>
                <meta name="description" content="AI Powered Waste Detection for a Greener Planet" />
            </Head>

            <header className="px-6 py-6 sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-eco rounded-xl text-white shadow-lg shadow-eco/30">
                            <Leaf className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black tracking-tight text-gray-800">
                            EcoSort <span className="text-eco">AI</span>
                        </span>
                    </div>
                    <nav className="hidden md:flex gap-8 font-medium text-gray-600">
                        <a href="#features" className="hover:text-eco transition-colors">Features</a>
                        <a href="#about" className="hover:text-eco transition-colors">About</a>
                        <a href="#impact" className="hover:text-eco transition-colors">Impact</a>
                    </nav>
                    <Link href="/detect">
                        <button className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold transition-colors shadow-md">
                            Try App
                        </button>
                    </Link>
                </div>
            </header>

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative pt-24 pb-32 overflow-hidden px-4">
                    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#86efac] to-[#22c55e] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
                    </div>

                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-eco/30 bg-eco-light/30 text-eco-dark font-semibold text-sm mb-8 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-eco animate-pulse"></span>
                            Smart Waste Management 2.0
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-gray-900 leading-tight">
                            AI Powered Waste Detection for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-700">Greener Planet</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                            Upload images of waste, and our advanced AI will instantly classify the material, guiding you toward proper recycling and compost practices to minimize environmental impact.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Link href="/detect">
                                <button className="px-8 py-4 bg-eco hover:bg-eco-dark text-white rounded-2xl font-bold text-lg shadow-xl shadow-eco/30 transition-all hover:scale-105 hover:-translate-y-1 flex items-center gap-3 w-full sm:w-auto justify-center">
                                    Start Detection <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>
                            <a href="#features">
                                <button className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-2xl font-bold text-lg transition-all shadow-sm w-full sm:w-auto justify-center">
                                    Learn More
                                </button>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 bg-white border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 px-4">
                            <h2 className="text-sm font-bold tracking-widest text-eco uppercase mb-3">Capabilities</h2>
                            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">Empowering Smart Recycling</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 hover:shadow-xl hover:bg-white hover:-translate-y-2 transition-all duration-300 group">
                                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex flex-col items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                                    <ScanLine className="w-7 h-7" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">AI Waste Detection</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    Utilize state-of-the-art computer vision to instantly identify waste types from images, accurately sorting plastics, metals, organics, and more.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 hover:shadow-xl hover:bg-white hover:-translate-y-2 transition-all duration-300 group">
                                <div className="w-14 h-14 bg-green-100 rounded-2xl flex flex-col items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                                    <Leaf className="w-7 h-7" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">Eco Score Impact</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    Earn points and see your environmental impact improve in real-time. Know exactly if an item should be recycled or composed based on smart scoring.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 hover:shadow-xl hover:bg-white hover:-translate-y-2 transition-all duration-300 group">
                                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex flex-col items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                                    <BarChart3 className="w-7 h-7" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">Waste Tracking Dashboard</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    Visualize your community's waste footprint. Interactive analytics and maps provide insight into waste distributions.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-900 py-12 text-center border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
                    <div className="flex items-center gap-2 text-white/90">
                        <Globe2 className="w-6 h-6 text-eco" />
                        <span className="text-xl font-bold">EcoSort AI</span>
                    </div>
                    <p className="text-gray-400 font-medium tracking-wide">
                        Building sustainable cities with AI
                    </p>
                    <div className="text-gray-500 text-sm mt-4">
                        &copy; {new Date().getFullYear()} EcoSort AI System. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}

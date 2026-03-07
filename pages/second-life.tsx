import React from 'react';
import Head from 'next/head';
import { Lightbulb, Wrench, Scissors, Star, ArrowRight } from 'lucide-react';

const upcycleIdeas = [
    {
        title: "Glass Jar Terrariums & Planters",
        category: "Glass",
        image: "https://images.unsplash.com/photo-1610488884950-84c4a6a0e6ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        steps: "Clean old pasta or jam jars. Add a layer of small rocks, a thin layer of activated charcoal, and potting soil. Plant small succulents or moss to create a thriving micro-ecosystem perfect for desks or windowsills.",
        difficulty: "Easy",
        time: "15 mins"
    },
    {
        title: "Plastic Bottle Self-Watering Pots",
        category: "Plastic",
        image: "https://images.unsplash.com/photo-1595856424594-550302b11d8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        steps: "Cut a 2L plastic bottle in half. Poke a hole in the cap and string a thick yarn through it. Place the top half upside down into the water-filled bottom half. The yarn pulls water up into the soil, keeping herbs perfectly hydrated!",
        difficulty: "Medium",
        time: "30 mins"
    },
    {
        title: "Cardboard Box Drawer Organizers",
        category: "Paper",
        image: "https://images.unsplash.com/photo-1601000676451-f7ea71092e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        steps: "Instead of tossing delivery boxes, cut the bottom quarters out and wrap them in decorative thrifted fabric or old map paper. Use them in your clothing or desk drawers to separate socks, cables, and stationary neatly.",
        difficulty: "Easy",
        time: "20 mins"
    },
    {
        title: "T-Shirt Produce/Tote Bags",
        category: "Textile",
        image: "https://images.unsplash.com/photo-1490641147043-34e857d47225?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        steps: "Take an old t-shirt you no longer wear. Cut off the sleeves and the neck hole. Turn it inside out and tie the bottom fringe strips together tightly in double knots. Turn it back out for a perfectly strong reusable grocery tote!",
        difficulty: "Easy",
        time: "10 mins"
    },
    {
        title: "Tin Can Pencil Holders & Lanterns",
        category: "Metal",
        image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86d2bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        steps: "Remove labels from soup cans and wash thoroughly. Use colorful spray paint or wrap with twine. For lanterns, drill small decorative holes in patterns and drop a tea light inside for a beautiful outdoor aesthetic.",
        difficulty: "Medium",
        time: "45 mins"
    }
];

export default function SecondLife() {
    return (
        <div className="pb-20 bg-gray-50 min-h-screen">
            <Head>
                <title>Second Life Ideas - Upcycle EcoSort</title>
            </Head>

            <div className="bg-white border-b border-gray-100 shadow-sm mb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-800 font-medium text-sm mb-4">
                        <Star className="w-4 h-4" /> Before you recycle... Upcycle!
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-4">
                        <Lightbulb className="w-10 h-10 text-eco" />
                        Second Life Cycle Ideas
                    </h1>
                    <p className="mt-4 text-gray-600 max-w-3xl text-lg">
                        Recycling takes energy, but upcycling breathes new life into your trash instantly. Browse our curated list of DIY creative transformations and give your waste a second life!
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {upcycleIdeas.map((idea, i) => (
                        <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
                            <div className="h-56 w-full overflow-hidden relative">
                                <img src={idea.image} alt={idea.title} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-gray-800 shadow">
                                    {idea.category}
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{idea.title}</h3>

                                <div className="flex gap-4 mb-4 text-sm font-medium text-gray-500">
                                    <div className="flex items-center gap-1.5">
                                        <Wrench className="w-4 h-4 text-gray-400" /> Difficulty: {idea.difficulty}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Scissors className="w-4 h-4 text-gray-400" /> Time: {idea.time}
                                    </div>
                                </div>

                                <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                                    {idea.steps}
                                </p>

                                <button
                                    onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(idea.title + ' DIY tutorial')}`, '_blank')}
                                    className="mt-auto w-full group py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
                                    View Full Tutorial
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Submission Card */}
                    <div className="bg-eco text-white rounded-3xl overflow-hidden shadow-sm border border-eco-dark flex flex-col items-center justify-center p-10 text-center relative overflow-hidden">
                        <Lightbulb className="absolute right-[-10%] top-[-10%] w-64 h-64 text-white opacity-10 -rotate-12" />
                        <div className="relative z-10 w-full max-w-sm">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                                <Star className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Have your own DIY Eco-Hack?</h3>
                            <p className="text-green-50 mb-8">
                                We are always looking for better ways to reuse everyday items. Share your project and earn 50 Eco-Points instantly!
                            </p>
                            <button className="w-full py-3.5 bg-white text-eco font-extrabold rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all transform hover:-translate-y-0.5">
                                Submit Upcycle Idea
                            </button>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}

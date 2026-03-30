import { MagnetIcon, Rocket } from "lucide-react";
import { Link } from "react-router-dom";


export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-pink-900 to-gray-900 text-white">
            <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-600 mb-4">
                        About Magic Thumb
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        We’re on a mission to help creators stand out with jaw-dropping, AI-generated thumbnails in seconds.
                    </p>
                </div>

                {/* Mission Card */}
                <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 mb-20 border border-white/20 shadow-xl">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                                <Rocket className="text-pink-400" /> Our Mission
                            </h2>
                            <p className="text-gray-200 text-lg leading-relaxed">
                                Thumbnails make or break your content. We built Magic Thumb to eliminate the guesswork – using cutting-edge AI to generate attention-grabbing, high-quality thumbnails that boost your CTR. No design skills needed, just your idea.
                            </p>
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="w-48 h-48 bg-gradient-to-tr from-pink-500 to-pink-500 rounded-full blur-2xl opacity-40 absolute -z-10"></div>
                            <MagnetIcon className="text-9xl text-pink-300 animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* How It Works */}
                <h2 className="text-4xl font-bold text-center mb-12">✨ How It Works</h2>
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {steps.map((step, idx) => (
                        <div key={idx} className="backdrop-blur-sm bg-black/30 rounded-xl p-6 border border-white/10 hover:border-pink-500 transition-all hover:-translate-y-2 duration-300">
                            <div className="text-4xl mb-4">{step.icon}</div>
                            <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-300">{step.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Features Grid */}
                <h2 className="text-4xl font-bold text-center mb-12">🔥 Why Creators Love Us</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-4 bg-white/5 rounded-xl p-5 hover:bg-white/10 transition">
                            <div className="text-2xl text-pink-400">{feature.icon}</div>
                            <div>
                                <h3 className="text-xl font-semibold">{feature.title}</h3>
                                <p className="text-gray-400 text-sm">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats / Fun section */}
                <div className="bg-gradient-to-r from-pink-800/30 to-pink-800/30 rounded-2xl p-8 text-center border border-white/20">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div>
                            <div className="text-4xl font-bold text-pink-300">10k+</div>
                            <div className="text-gray-300">Thumbnails Generated</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-pink-300">4.9</div>
                            <div className="text-gray-300">Avg Rating</div>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <div className="text-4xl font-bold text-pink-300">100%</div>
                            <div className="text-gray-300">AI-powered</div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-20">
                    <Link to="/generate" className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg shadow-pink-500/30">
                        <MagnetIcon /> Try Magic Thumb Now
                    </Link>
                </div>
            </div>
        </div>
    );
}

const steps = [
    { icon: "💡", title: "Describe Your Idea", desc: "Tell us your video topic, mood, or style preferences." },
    { icon: "🤖", title: "AI Generation", desc: "Our models create multiple stunning thumbnail options instantly." },
    { icon: "🎨", title: "Customize & Download", desc: "Tweak colors, text, or elements, then export in HD." }
];

const features = [
    { icon: "⚡", title: "Blazing Fast", desc: "Thumbnails ready in under 10 seconds." },
    { icon: "🎯", title: "CTR Optimized", desc: "AI trained on top-performing thumbnails." },
    { icon: "🖌️", title: "Fully Editable", desc: "Change text, filters, and overlays." },
    { icon: "📸", title: "High Resolution", desc: "1920x1080, perfect for YouTube & social." },
    { icon: "🧠", title: "Smart Recommendations", desc: "AI suggests colors & composition." },
    { icon: "💎", title: "No Watermark", desc: "Clean output, 100% yours." }
];
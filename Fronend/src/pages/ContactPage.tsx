// pages/contact.js (or app/contact/page.js)
import { AlignEndVerticalIcon, Github, Mail, MapMinusIcon, PhoneCall, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function ContactPage() {

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-pink-900 to-gray-900 text-white">
            <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500 mb-4">
                        Let's Talk
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Have a question, feedback, or partnership idea? We'd love to hear from you.
                    </p>
                </div>

                {/* 2-Column Layout */}
                {/* <div className="grid lg:grid-cols-2 gap-12"> */}
                    {/* Left side - Contact Info */}
                    <div className=" md:grid grid-cols-2 gap-3">
                        <div className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10 mb-3 md:mb-0">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><AlignEndVerticalIcon /> Get in touch</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <Mail className="text-pink-400 text-xl" />
                                    <span>mostafiz4372@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Twitter className="text-pink-400 text-xl" />
                                    <Link to={"https://x.com/mostafizdev01"}>twitter.com/mostafizdev01</Link>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Github className="text-pink-400 text-xl" />
                                    <Link to={"https://github.com/mostafizdev01"}>github.com/mostafizdev01</Link>
                                </div>
                                <div className="flex items-center gap-4">
                                    <PhoneCall className="text-pink-400 text-xl" />
                                    <span>+88-01319306973</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <MapMinusIcon className="text-pink-400 text-xl" />
                                    <span>Bangladesh / Remote</span>
                                </div>
                            </div>
                        </div>

                        <div className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10">
                            <h2 className="text-2xl font-bold mb-4">💬 Why contact us?</h2>
                            <ul className="space-y-2 text-gray-200">
                                <li>✨ Feature requests & suggestions</li>
                                <li>🐛 Bug reports</li>
                                <li>🤝 Collaborations / Sponsorships</li>
                                <li>💡 Just say hi!</li>
                            </ul>
                        </div>
{/* 
                        <div className="text-center p-4">
                            <p className="text-sm text-gray-400">Average response time: &lt; 24 hours</p>
                        </div> */}
                    </div>

                    {/* Right side - Contact Form
                    // <div className="backdrop-blur-md bg-white/5 rounded-2xl p-8 border border-white/20 shadow-2xl">
                    //     <h2 className="text-3xl font-bold mb-6 text-center">Send a Message</h2>
                    //     <form onSubmit={handleSubmit} className="space-y-5">
                    //         <div>
                    //             <label className="block text-sm font-medium mb-1">Your Name *</label>
                    //             <input
                    //                 type="text"
                    //                 name="name"
                    //                 value={formData.name}
                    //                 onChange={handleChange}
                    //                 required
                    //                 className="w-full bg-black/40 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 transition"
                    //                 placeholder="John Doe"
                    //             />
                    //         </div>
                    //         <div>
                    //             <label className="block text-sm font-medium mb-1">Email Address *</label>
                    //             <input
                    //                 type="email"
                    //                 name="email"
                    //                 value={formData.email}
                    //                 onChange={handleChange}
                    //                 required
                    //                 className="w-full bg-black/40 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 transition"
                    //                 placeholder="you@example.com"
                    //             />
                    //         </div>
                    //         <div>
                    //             <label className="block text-sm font-medium mb-1">Subject</label>
                    //             <input
                    //                 type="text"
                    //                 name="subject"
                    //                 value={formData.subject}
                    //                 onChange={handleChange}
                    //                 className="w-full bg-black/40 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 transition"
                    //                 placeholder="Feature request / Question"
                    //             />
                    //         </div>
                    //         <div>
                    //             <label className="block text-sm font-medium mb-1">Message *</label>
                    //             <textarea
                    //                 name="message"
                    //                 value={formData.message}
                    //                 onChange={handleChange}
                    //                 required
                    //                 rows={5}
                    //                 className="w-full bg-black/40 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 transition resize-none"
                    //                 placeholder="Tell us what's on your mind..."
                    //             ></textarea>
                    //         </div>
                    //         <button
                    //             type="submit"
                    //             className="w-full bg-gradient-to-r from-pink-600 to-pink-600 hover:from-pink-700 hover:to-pink-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
                    //         >
                    //             <Paperclip /> {isSent ? 'Message Sent! ✅' : 'Send Message'}
                    //         </button>
                    //         {isSent && <p className="text-green-400 text-center mt-2">Thanks! We'll get back to you soon.</p>}
                    //     </form>
                    // </div> */}
                {/* </div> */}
            </div>
        </div>
    );
}
'use client';

import { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 max-w-7xl mx-auto px-8 relative z-10">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Get In <span className="text-emerald-400">Touch</span>
        </h2>
        <p className="text-gray-400">Have a project in mind or want to collaborate? Feel free to reach out!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-md flex items-center gap-4">
            <div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Mail size={24} />
            </div>
            <div>
              <h4 className="text-sm text-gray-400">Email Me</h4>
              <p className="text-white font-medium">sheikhhamim@gmail.com</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-md flex items-center gap-4">
            <div className="p-4 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <MapPin size={24} />
            </div>
            <div>
              <h4 className="text-sm text-gray-400">Location</h4>
              <p className="text-white font-medium">Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-md">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white focus:border-emerald-400 focus:outline-none transition"
              placeholder="Sheikh Hamim"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white focus:border-emerald-400 focus:outline-none transition"
              placeholder="hamim@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white focus:border-emerald-400 focus:outline-none transition resize-none"
              placeholder="Write your message here..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold flex items-center justify-center gap-2 hover:opacity-90 transition shadow-lg shadow-emerald-500/20"
          >
            Send Message <Send size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Github, Linkedin, Mail } from "lucide-react";

export default function HomePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let currentSection = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 70; // Adjust offset for header height
        if (window.scrollY >= sectionTop) {
          currentSection = section.getAttribute('id') || '';
        }
      });

      document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('text-indigo-400', 'font-bold'); // Remove active states
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('text-indigo-400', 'font-bold');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call to set active link on page load

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          // Close mobile menu after clicking a link
          if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
          }
        }
      });
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]); // Re-run effect if mobile menu state changes

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const formData = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    };

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error'); 
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-sm">
        <nav className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
          <div className="text-2xl font-bold text-white">Your Name</div>
          {/* Desktop Navigation */}
          <ul className="md:flex space-x-6 hidden">
            <li><a href="#about" className="hover:text-indigo-400 transition-colors">About</a></li>
            <li><a href="#skills" className="hover:text-indigo-400 transition-colors">Skills</a></li>
            <li><a href="#projects" className="hover:text-indigo-400 transition-colors">Projects</a></li>
            <li><a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a></li>
          </ul>
          {/* Mobile Navigation Toggle */}
          <button 
            className="md:hidden text-white focus:outline-none" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </nav>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-800">
            <ul className="flex flex-col items-center py-4 space-y-2">
              <li><a href="#about" className="block py-2 px-4 hover:text-indigo-400 transition-colors">About</a></li>
              <li><a href="#skills" className="block py-2 px-4 hover:text-indigo-400 transition-colors">Skills</a></li>
              <li><a href="#projects" className="block py-2 px-4 hover:text-indigo-400 transition-colors">Projects</a></li>
              <li><a href="#contact" className="block py-2 px-4 hover:text-indigo-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section id="hero" className="container mx-auto flex flex-col items-center justify-center min-h-[70vh] text-center py-20 px-4 md:px-6">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-6 bg-gray-700 shadow-lg border-4 border-indigo-500">
            {/* Placeholder for profile picture */}
            <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993L21.903 19.263C20.969 18.474 19.912 18 18.779 18 17.319 18 15.939 18.846 15.088 20.208L13 22.151V24H3V4.125C3 2.453 4.481 1 6.156 1h12.688C20.519 1 22 2.453 22 4.125V10h2v10.993zM13 4.125C13 3.504 12.433 3 11.779 3H6.156C5.502 3 5 3.504 5 4.125V21h8v-1.849l-1.088-1.057C13.159 17.654 13 17.337 13 17.007V4.125zM23 10v10.993l-2.097-1.833C20.034 18.474 19.069 18 18.088 18c-.991 0-1.956.325-2.883 1.073L15 21.707V10h8z"/>
            </svg>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">Hi, I'm [Your Name]</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl text-center">Data Scientist specializing in [Your Specialization, e.g., Machine Learning, Predictive Analytics, NLP] and transforming complex data into actionable insights.</p>
          <div className="flex space-x-4">
            <Button variant="outline" size="lg" className="text-lg py-3 px-6 border-indigo-500 text-indigo-400 hover:bg-indigo-500/20">
              View Projects
            </Button>
            <Button asChild size="lg" className="text-lg py-3 px-6 bg-indigo-600 hover:bg-indigo-700">
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="bg-gray-900 py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-8 text-indigo-400">About Me</h2>
            <p className="text-lg text-gray-300 mb-6">As a dedicated Data Scientist, I am passionate about leveraging advanced analytical techniques and machine learning models to solve intricate business problems. My expertise spans the entire data lifecycle, from data collection and cleaning to building predictive models and deploying them into production. I thrive on uncovering hidden patterns and communicating insights effectively to drive data-informed decisions.</p>
            <p className="text-lg text-gray-300">My core strengths lie in [mention 2-3 key strengths, e.g., developing robust ML pipelines, optimizing algorithms for performance, and visualizing complex data trends]. I am a continuous learner and always eager to explore new technologies and methodologies in the ever-evolving field of data science.</p>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-8 text-white">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Programming Languages */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-indigo-400">Programming & Libraries</h3>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center justify-between text-gray-300">
                    <span>Python (Pandas, NumPy, Scikit-learn, TensorFlow, PyTorch)</span>
                    <span className="text-sm text-gray-400">Expert</span>
                  </li>
                  <li className="flex items-center justify-between text-gray-300">
                    <span>SQL</span>
                    <span className="text-sm text-gray-400">Advanced</span>
                  </li>
                  <li className="flex items-center justify-between text-gray-300">
                    <span>R</span>
                    <span className="text-sm text-gray-400">Intermediate</span>
                  </li>
                </ul>
              </div>
              {/* Tools & Platforms */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-indigo-400">Tools & Platforms</h3>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center justify-between text-gray-300">
                    <span>Git & GitHub</span>
                    <span className="text-sm text-gray-400">Advanced</span>
                  </li>
                  <li className="flex items-center justify-between text-gray-300">
                    <span>Docker</span>
                    <span className="text-sm text-gray-400">Intermediate</span>
                  </li>
                   <li className="flex items-center justify-between text-gray-300">
                    <span>AWS/GCP/Azure</span>
                    <span className="text-sm text-gray-400">Basic</span>
                  </li>
                  <li className="flex items-center justify-between text-gray-300">
                    <span>Jupyter Notebooks</span>
                    <span className="text-sm text-gray-400">Expert</span>
                  </li>
                </ul>
              </div>
              {/* Data Science Concepts */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-indigo-400">Data Science & ML</h3>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center justify-between text-gray-300">
                    <span>Machine Learning</span>
                    <span className="text-sm text-gray-400">Expert</span>
                  </li>
                  <li className="flex items-center justify-between text-gray-300">
                    <span>Data Visualization</span>
                    <span className="text-sm text-gray-400">Expert</span>
                  </li>
                  <li className="flex items-center justify-between text-gray-300">
                    <span>NLP</span>
                    <span className="text-sm text-gray-400">Advanced</span>
                  </li>
                  <li className="flex items-center justify-between text-gray-300">
                    <span>Deep Learning</span>
                    <span className="text-sm text-gray-400">Intermediate</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="bg-gray-900 py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-4xl font-bold mb-8 text-indigo-400">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Project Card 1 */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between">
                <div>
                  <div className="w-full h-48 bg-gray-700 rounded mb-4 flex items-center justify-center">
                    {/* Placeholder for Project Image */}
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-white">Customer Churn Prediction</h3>
                  <p className="text-gray-300 mb-4">Developed a machine learning model using Scikit-learn and Pandas to predict customer churn, achieving an AUC score of 0.85. Implemented feature engineering and hyperparameter tuning for optimal performance.</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full">Python</span>
                  <span className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full">Pandas</span>
                  <span className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full">Scikit-learn</span>
                  <span className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full">Matplotlib</span>
                </div>
                <div className="flex space-x-4">
                  <Button variant="outline" className="flex-1 border-indigo-500 text-indigo-400 hover:bg-indigo-500/20">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </Button>
                  <Button asChild variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700/50">
                    <a href="#" target="_blank" rel="noopener noreferrer">Demo</a>
                  </Button>
                </div>
              </div>
              {/* Project Card 2 */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between">
                <div>
                  <div className="w-full h-48 bg-gray-700 rounded mb-4 flex items-center justify-center">
                    {/* Placeholder for Project Image */}
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.934-1.733M17 20m0 0V4a3 3 0 01.934-2.008l-1.58.79a3 3 0 00-.615 3.406l-1.58 1.58m0 0v2.595M10 15h4m-4 0v2.595l1.58 1.58 1.58-1.58V15m-10 5.5a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"></path></svg>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-white">Sales Dashboard</h3>
                  <p className="text-gray-300 mb-4">Created an interactive sales dashboard using Plotly and Streamlit to visualize key performance indicators (KPIs), enabling stakeholders to track sales trends and identify growth opportunities.</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full">Python</span>
                  <span className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full">Plotly</span>
                  <span className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full">Streamlit</span>
                  <span className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full">Dashboards</span>
                </div>
                <div className="flex space-x-4">
                  <Button variant="outline" className="flex-1 border-indigo-500 text-indigo-400 hover:bg-indigo-500/20">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </Button>
                  <Button asChild variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700/50">
                    <a href="#" target="_blank" rel="noopener noreferrer">Demo</a>
                  </Button>
                </div>
              </div>
               {/* Project Card 3 */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between">
                <div>
                  <div className="w-full h-48 bg-gray-700 rounded mb-4 flex items-center justify-center">
                    {/* Placeholder for Project Image */}
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 0a3 3 0 100-6 3 3 0 000 6zm0 0a3 3 0 100 6 3 3 0 000-6zM3 12h6m-6 0a3 3 0 100-6 3 3 0 000 6zm0 0a3 3 0 100 6 3 3 0 000-6zM3 18h18v-2a3 3 0 00-3-3H6a3 3 0 00-3 3v2z"></path></svg>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-white">NLP Text Classifier</h3>
                  <p className="text-gray-300 mb-4">Built a Natural Language Processing model to classify text reviews as positive or negative, utilizing TF-IDF vectorization and a Logistic Regression classifier. Achieved 92% accuracy on a held-out test set.</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full">Python</span>
                  <span className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full">NLTK</span>
                  <span className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full">Scikit-learn</span>
                  <span className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full">NLP</span>
                </div>
                <div className="flex space-x-4">
                  <Button variant="outline" className="flex-1 border-indigo-500 text-indigo-400 hover:bg-indigo-500/20">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </Button>
                  <Button asChild variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700/50">
                    <a href="#" target="_blank" rel="noopener noreferrer">Demo</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold mb-8 text-indigo-400">Contact Me</h2>
            <p className="text-lg text-gray-300 mb-8">Have a question, a project idea, or just want to connect? Feel free to reach out!</p>
            <form className="space-y-6 bg-gray-800 p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-gray-300 text-left">Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Your Name" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-300 text-left">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your.email@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <Label htmlFor="subject" className="block text-sm font-medium text-gray-300 text-left">Subject</Label>
                <Input 
                  id="subject" 
                  type="text" 
                  placeholder="Subject" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-1 block w-full bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <Label htmlFor="message" className="block text-sm font-medium text-gray-300 text-left">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Your message..." 
                  rows={5} 
                  required 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 block w-full bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 text-lg disabled:opacity-50"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </Button>
              {status === 'success' && <p className="text-green-500">Message sent successfully!</p>}
              {status === 'error' && <p className="text-red-500">Failed to send message. Please try again.</p>}
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-6 bg-gray-900 text-center text-gray-400">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex space-x-4">
            <a href="#" aria-label="GitHub" className="hover:text-indigo-400 transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-indigo-400 transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Email" className="hover:text-indigo-400 transition-colors">
              <Mail className="h-6 w-6" />
            </a>
          </div>
          <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <p className="text-sm">Built with Next.js, Tailwind CSS, and Shadcn UI</p>
        </div>
      </footer>
    </div>
  );
}

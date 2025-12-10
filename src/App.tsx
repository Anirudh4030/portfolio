import React, { useState, useEffect, useRef } from 'react';
import { Mail, Instagram, Linkedin, Dribbble, ArrowRight, ExternalLink, X } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isPhotoFlipped, setIsPhotoFlipped] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showRecentWork, setShowRecentWork] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Auto-scroll gallery
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.5;
    
    const autoScroll = () => {
      scrollAmount += scrollSpeed;
      if (scrollAmount >= gallery.scrollWidth - gallery.clientWidth) {
        scrollAmount = 0;
      }
      gallery.scrollLeft = scrollAmount;
    };

    const interval = setInterval(autoScroll, 16); // ~60fps
    return () => clearInterval(interval);
  }, []);

  // Section observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.6,
      rootMargin: '-50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSocialClick = (platform: string) => {
    const urls = {
      email: 'anirudh4030@gmail.com',
      instagram: 'https://www.instagram.com/anirudh369.design/',
      linkedin: 'https://www.linkedin.com/in/anirudh-rao-427021270/',
      dribbble: 'https://www.behance.net/anirudhrao9'
    };
    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  // Project data with detailed images
  const projects = [
    {
      id: 1,
      title: 'Hey Chikitha',
      image: '/projects/hey-chikitha-title.png',
      description: 'Telugu Feature Film',
      posters: [
        '/projects/hc1.jpg',
       '/projects/hc2.jpg',
        '/projects/hc3.jpg',
         '/projects/hc4.jpg',
       '/projects/hc5.jpg',
        '/projects/hc6.png'
      ]
    },
    {
      id: 2,
      title: 'Kalavar Raja Kahani',
      image: '/projects/kalavar-raja-title.png',
      description: 'Indie Film',
      posters: [
        '/projects/krk1.jpg',
       '/projects/krk2.jpg',
        '/projects/krk3.png'
      ]
    },
    {
      id: 3,
      title: 'Hide N Seek',
      image: '/projects/hide-n-seek-title.png',
      description: 'Telugu / Tamil Feature Film',
      posters: [
       '/projects/hns1.jpg',
       '/projects/hns2.jpg',
        '/projects/hns3.jpg',
         '/projects/hns4.png',
       '/projects/hns5.jpg',
        '/projects/hns6.jpg',
        '/projects/hns7.jpg',
        '/projects/hns8.png',
        '/projects/hns9.jpg',
        '/projects/hns10.jpg',
        '/projects/hns11.jpg',
        '/projects/hns12.jpg',
      ]
    },

        {
      id: 4,
      title: 'Title Designs',
      image: 'projects/aa.jpg',
      description: 'Film title designs',
      posters: [
       '/projects/aa.jpg',
       '/projects/psr.jpg',
        '/projects/kalavar-raja-title.png',
        '/projects/agnatha-title.png',
        '/projects/kandi.png'
      ]
    },
 {
      id: 4,
      title: 'Logo Designs',
      image: '/projects/logos/logo7.png',
      description: 'Branding / Logo Design',
      posters: [
       '/projects/logos/logo7.png',
       '/projects/logos/logo2.png',
        '/projects/logos/logo3.png',
        '/projects/logos/logo8.png'
      ]
    },

  ];

  // Recent work data (posts and logos)
  const recentWork = {
    posts: [
      ' /projects/ips.png',
      '/projects/krk2.jpg',
      '/projects/krk3.jpg',
      '/projects/krk1.jpg',
      '/projects/campaign.jpg',
      '/projects/hc4.jpg'
    ],
    logos: [
       '/projects/logos/logo 6.jpg',
      '/projects/logos/logo7.png',
      '/projects/logos/logo1.jpg',
      '/projects/logos/logo2.png',
       '/projects/logos/logo3.png',
      '/projects/logos/logo4.jpg',
      '/projects/logos/logo5.jpg',
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6">
        <div className="flex justify-between items-center">
          
          {/* Social Icons */}
          <div className="flex gap-4">
            {[
              { icon: Mail, platform: 'email' },
              { icon: Instagram, platform: 'instagram' },
              { icon: Linkedin, platform: 'linkedin' },
              { icon: Dribbble, platform: 'dribbble' }
            ].map(({ icon: Icon, platform }) => (
              <button
                key={platform}
                onClick={() => handleSocialClick(platform)}
                className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <Icon size={18} className="text-gray-700" />
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="min-h-screen relative flex items-center justify-center px-6 py-20">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-16 h-16 bg-purple-200 rounded-full opacity-50 animate-float"></div>
          <div className="absolute top-32 right-20 w-8 h-8 bg-blue-200 rounded-full opacity-60 animate-float-delayed"></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-pink-200 rounded-full opacity-40 animate-float"></div>
          <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-yellow-200 rounded-full opacity-50 animate-bounce"></div>
          
          {/* 3D Astronaut Elements */}
          <div className="absolute top-1/4 left-10 transform rotate-12 opacity-70">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-300 to-purple-500 rounded-2xl flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full"></div>
            </div>
          </div>
          
          <div className="absolute top-1/3 right-10 transform -rotate-12 opacity-60">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="text-center max-w-4xl mx-auto relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            Hi, I'm <span className="italic text-purple-600">Anirudh!</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
            <span style={{ color: 'black' }}>Visuals. Stories. Systems. I create them all</span> thorugh my designs.
          </p>

          {/* Flippable Photo Card */}
          <div 
            className="relative w-80 h-96 mx-auto mb-12 perspective-1000 cursor-pointer"
            onMouseEnter={() => setIsPhotoFlipped(true)}
            onMouseLeave={() => setIsPhotoFlipped(false)}
          >
            <div className={`flip-card w-full h-full relative preserve-3d transition-transform duration-700 ${isPhotoFlipped ? 'rotate-y-180' : ''}`}>
              {/* Front */}
              <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/projects/me.jpeg"
                  alt="Anirudh"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-2xl">
                <p className="text-white text-xl font-medium text-center px-8">
                  Scroll down and know me better
                </p>
              </div>
            </div>
          </div>

          <p className="text-lg text-gray-700 mb-8">
        
          </p>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            If you're searching for a Graphic designer to transform your ideas into reality, Let's Connect! <br /> <br /> <h1>Clients, I worked With.. </h1>
          </p>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-blue-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {[
               'Kerady Studios', 'Thyview', 'RishabShetty Films', 'Chari Not Sorry', 'Pranay Varma', 'Rohit Surisetty',
              'Kabir Vlogs', 'Raju Kanneboina', 'Keen Content Studios', 'Akhil DS', 'MNOP', 'Garudavega Anji'
            ].map((client, index) => (
              <div key={index} className="text-white text-center opacity-80 hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 h-16 flex items-center justify-center">
                  <span className="font-medium text-sm">{client}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Gallery */}
      <section id="projects" ref={projectsRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">
            <span className="italic">Work</span> Gallery
          </h2>
          
          {/* Horizontal Scrolling Gallery */}
          <div className="overflow-hidden pb-6 mb-12">
            <div ref={galleryRef} className="flex gap-8 w-max auto-scroll">
              {[...projects, ...projects, ...projects].map((project, index) => (
                <div 
                  key={`${project.id}-${index}`}
                  className="w-96 bg-gray-900 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-500 shadow-xl cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }}>
                    <div className="w-full h-full bg-black/20 flex items-end p-6">
                      <div className="text-white">
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-white/80">{project.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <button 
              className="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-700 transition-colors duration-300 flex items-center gap-2 mx-auto"
              onClick={() => setShowRecentWork(true)}
            >
              Explore Recent Projects
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 italic">Services</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Film & Title Design',
                description: 'Posters, Titles & Credits for Films and Indie Projects - From striking feature film posters to elegant title cards and end credits — I craft visual narratives that match your story’s soul.',
                color: 'from-purple-100 to-purple-200'
              },
              {
                title: ' Brand & Logo Identity',
                description: 'Logos for Businesses, Channels & Creators - I design timeless logos and brand elements that speak your identity — whether it’s for a startup, YouTube channel, or personal brand.',
                color: 'from-blue-100 to-blue-200'
              },
              {
                title: ' YouTube & Social Media Design',
                description: 'Optimized visuals for content creators and brands — eye-catching thumbnails, channel banners, and social posts that boost engagement.',
                color: 'from-pink-100 to-pink-200'
              },
              {
                title: 'Pitch Decks & Portfolio',
                description: 'High-converting landing pages designed to captivate and convert. Perfect for lead generation and product launches.',
                color: 'from-green-100 to-green-200'
              },
              {
                title: 'Content & Marketing Strategy',
                description: 'Campaign Plans, Visual Hooks & Creative Direction - Beyond design — I help you shape your message, build engagement strategies, and develop impactful content plans.',
                color: 'from-yellow-100 to-yellow-200'
              },
              {
                title: 'UI & Web Development',
                description: ' Responsive Websites with Custom Domains - From layout to launch — I design and develop clean, functional websites, complete with domain integration and responsive UI.',
                color: 'from-indigo-100 to-indigo-200'
              }
            ].map((service, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br ${service.color} p-8 rounded-2xl hover:scale-105 hover:shadow-lg transition-all duration-300`}
              >
                <h3 className="text-2xl font-bold mb-4 italic">{service.title}</h3>
                <p className="text-gray-700 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="about" ref={aboutRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-4 italic">The Process -</h2>
          <h3 className="text-4xl font-light text-center mb-16 text-gray-600">Behind The Scenes</h3>
          
          <div className="relative flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12">
            {/* Connecting Lines */}
            <div className="absolute top-8 left-0 right-0 hidden lg:flex justify-between items-center px-8">
              <div className="flex-1 h-0.5 bg-gray-300 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-50"></div>
              </div>
              <div className="w-8"></div>
              <div className="flex-1 h-0.5 bg-gray-300 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 opacity-50"></div>
              </div>
              <div className="w-8"></div>
              <div className="flex-1 h-0.5 bg-gray-300 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-orange-400 opacity-50"></div>
              </div>
            </div>

            {[
              { number: 1, title: 'Sense', description: 'Understand the vision, needs, and goals.', active: true, color: 'bg-purple-600' },
              { number: 2, title: 'Ideate ', description: 'Brainstorm, sketch, and plan concepts.', active: false, color: 'bg-blue-600' },
              { number: 3, title: 'Create ', description: 'Design, develop, and bring the idea to life.', active: false, color: 'bg-green-600' },
              { number: 4, title: 'Deliver', description: 'Finalize, hand off, and support.', active: false, color: 'bg-orange-600' }
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center max-w-xs relative z-10">
                <div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 transition-all duration-500 text-white ${step.color} shadow-lg`}
                >
                  {step.number}
                </div>
                <h4 className="text-2xl font-bold mb-3">{step.title}</h4>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-4 italic">Testimonials</h2>
          <p className="text-center text-xl text-gray-600 mb-16">Designs so good, they'll compliment your taste.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Anirudh instantly understood the mood and tone I wanted for Hide N Seek. His concept posters didn't just promote the film — they elevated its identity. A true visual storyteller with a grounded creative mind.",
                author: "⭐ Basireddy Rana",
                title: "Director ",
                company: "Hide N Seek"
              },
              {
                quote: "Anirudh brought clarity and polish to my vision — from working posters to title designs and pitch decks for Hey Chikitha. His speed, creativity, and attention to cinematic detail are exceptional. A go-to creative for any filmmaker.",
                author: "⭐ Garudavega Anji",
                title: "DOP / Director / Producer",
                company: "Sundarakanda Motion Pictures"
              },
              {
                quote:"I collaborated with Anirudh on three short films for the 100 Shortfilms Project. His poster designs captured the soul of each story. Consistent, thoughtful, and visually sharp — a designer who truly respects the narrative.",
                author: "⭐ E.Sharath Goud",
                title: "Filmmaker/Founder",
                company: "Keen Content Studios"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.author}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.title}</p>
                    <p className="text-gray-500 text-sm">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 italic">Get in touch</h2>
          
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Email</h3>
                <p className="text-gray-600">anirudh4030@gmail.com</p>
                <h3 className="text-2xl font-bold mb-2">Phone No</h3>
                <p className="text-gray-600">+91 8985854030</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Location</h3>
                <p className="text-gray-600">Hyderabad, India</p>
              </div>
            </div>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-colors"
                />
                <input 
                  type="text" 
                  placeholder="Brand Name" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-colors"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  type="email" 
                  placeholder="Business Email" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-colors"
                />
                <input 
                  type="tel" 
                  placeholder="Contact" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-colors"
                />
              </div>
              <textarea 
                placeholder="Project Description" 
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-colors"
              ></textarea>
              <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-colors">
                <option>Budget Range</option>
                <option>5000INR - 10,000INR</option>
                <option>10,000INR - 20,000INR</option>
                <option>20,000+</option>
              </select>
              
              <div className="flex gap-4">
                <button 
                  type="submit"
                  className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300 flex-1"
                >
                  SEND MESSAGE
                </button>
              
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Outro Section */}
<section className="py-20 bg-gray-900 text-white text-center">
  <h2 className="text-6xl font-bold mb-8 opacity-20 italic">Still here?</h2>
  <p className="text-xl mb-12">Might as well browse some bonus content.</p>

  {/* Gola Graphic Block */}
  <a
    href="https://www.instagram.com/golagraphic"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block"
  >
    <div className="bg-amber-900 hover:bg-amber-800 transition duration-300 rounded-lg p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between">
        <div className="text-left">
          <p className="font-semibold">Building</p>
          <p className="text-sm opacity-75 underline">Gola Graphic</p>
        </div>
        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
          <div className="w-0 h-0 border-l-4 border-l-white border-t-2 border-t-transparent border-b-2 border-b-transparent ml-1"></div>
        </div>
      </div>
    </div>
  </a>

  {/* Social Icons */}
  <div className="mt-10 flex justify-center gap-6">
    {/* Instagram Icon */}
    <a href="https://www.instagram.com/anirudh369.design/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7Zm5.5-.88a1.12 1.12 0 1 1-2.24 0a1.12 1.12 0 0 1 2.24 0Z" />
      </svg>
    </a>

    {/* LinkedIn Icon */}
    <a href="https://www.linkedin.com/in/anirudh-rao-427021270/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 24V7h5v17H0zm7.5 0h5v-9.4c0-5.5 6-5.9 6 0V24h5V13.3c0-9.2-10-8.8-11.5-4.3V7h-5v17z" />
      </svg>
    </a>

    {/* Behance Icon */}
    <a href="https://www.behance.net/anirudhrao9" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.54 10.09c0-1.27-.88-1.44-1.91-1.44H3.77V11h2.8c.75 0 1.97-.05 1.97-.91zm.41 3.26c0-1.32-1.06-1.48-2.16-1.48H3.77V15.5h3.02c1.06 0 2.26-.22 2.26-1.66zM24 0v24H0V0h24zM3.02 6.25c-.08 0-.15.01-.22.01H.03v11.45h3.03c.03 0 .05.01.08.01h4.43c2.47 0 3.44-1.35 3.44-2.95 0-1.17-.73-2.06-1.84-2.35 1.03-.36 1.56-1.08 1.56-2.12 0-2.19-1.74-3.05-3.73-3.05H3.02zm14.3 3.95c-1.51 0-2.76 1.2-2.76 2.77 0 1.58 1.25 2.79 2.76 2.79 1.57 0 2.79-1.21 2.79-2.79 0-1.57-1.22-2.77-2.79-2.77zm-2.02-3.03h4.1v1.1h-4.1V7.17zm2.02 7.95c-.69 0-1.3-.43-1.51-1.03h3.01c-.18.6-.81 1.03-1.5 1.03z"/>
      </svg>
    </a>
  </div>

  {/* Copyright */}
  <p className="mt-8 text-sm text-gray-500">&copy; {new Date().getFullYear()} Anirudh — All rights reserved.</p>
</section>


      {/* Fixed Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-2xl border border-gray-200">
          <div className="flex gap-6">
            {[
              { label: 'Recent Projects', ref: projectsRef, id: 'projects' },
              { label: 'Services', ref: servicesRef, id: 'services' },
              { label: 'Contact', ref: contactRef, id: 'contact' },
              { label: 'Behind', ref: aboutRef, id: 'The Process' }
            ].map(({ label, ref, id }) => (
              <button
                key={id}
                onClick={() => scrollToSection(ref)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === id 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 z-60 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold">{selectedProject.title}</h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedProject.posters.map((poster, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={poster} 
                      alt={`${selectedProject.title} poster ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Work Modal */}
      {showRecentWork && (
        <div className="fixed inset-0 bg-black/80 z-60 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold">Recent Work</h3>
                <button
                  onClick={() => setShowRecentWork(false)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Posts Section */}
              <div className="mb-8">
                <h4 className="text-2xl font-bold mb-4">Recent Designs</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {recentWork.posts.map((post, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden">
                      <img 
                        src={post} 
                        alt={`Recent post ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Logos Section */}
              <div>
                <h4 className="text-2xl font-bold mb-4">Logo Designs</h4>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {recentWork.logos.map((logo, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <img 
                        src={logo} 
                        alt={`Logo design ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

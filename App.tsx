import React, { useState, useEffect } from 'react';
import { 
  CalculatorIcon, 
  ChartIcon, 
  UsersIcon, 
  FileTextIcon, 
  MenuIcon, 
  XIcon,
  CheckCircleIcon,
  CalendarIcon
} from './components/Icons';
import ChatWidget from './components/ChatWidget';
import { SectionId, ServiceItem } from './types';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle Scroll Effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const openBooking = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsBookingOpen(true);
    setIsMenuOpen(false);
  };

  const services: ServiceItem[] = [
    {
      id: 'tax',
      title: 'Tax Preparation',
      description: 'Comprehensive tax planning and preparation for individuals and businesses, maximizing your returns while ensuring compliance.',
      icon: <CalculatorIcon className="w-8 h-8 text-gold-500" />
    },
    {
      id: 'bookkeeping',
      title: 'Bookkeeping',
      description: 'Accurate, timely, and organized financial records to help you monitor your business health and make informed decisions.',
      icon: <FileTextIcon className="w-8 h-8 text-gold-500" />
    },
    {
      id: 'consulting',
      title: 'Financial Consulting',
      description: 'Strategic advice for business growth, cash flow management, and long-term financial stability.',
      icon: <ChartIcon className="w-8 h-8 text-gold-500" />
    },
    {
      id: 'payroll',
      title: 'Payroll Services',
      description: 'Streamlined payroll solutions ensuring your employees are paid on time and taxes are filed correctly.',
      icon: <UsersIcon className="w-8 h-8 text-gold-500" />
    }
  ];

  const navLinks = [
    { label: 'Home', href: `#${SectionId.HOME}` },
    { label: 'Services', href: `#${SectionId.SERVICES}` },
    { label: 'About', href: `#${SectionId.ABOUT}` },
    { label: 'Contact', href: `#${SectionId.CONTACT}` },
  ];

  return (
    <div className="font-sans text-slate-600 bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <a href="#" className="flex flex-col group">
            <span className={`font-serif text-2xl font-bold tracking-tight group-hover:text-gold-500 transition-colors ${scrolled ? 'text-navy-900' : 'text-navy-900 lg:text-white'}`}>HSB</span>
            <span className={`text-[10px] tracking-widest uppercase ${scrolled ? 'text-slate-500' : 'text-slate-400 lg:text-slate-200'}`}>Accounting & Finance</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className={`text-sm font-medium hover:text-gold-500 transition-colors ${scrolled ? 'text-slate-700' : 'text-slate-200'}`}
              >
                {link.label}
              </a>
            ))}
            <button onClick={openBooking} className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors shadow-lg shadow-gold-500/30 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              Free Consultation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden text-navy-900">
             {isMenuOpen ? <XIcon /> : <MenuIcon className={scrolled ? 'text-navy-900' : 'text-navy-900 lg:text-white'} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 py-4 flex flex-col items-center gap-4 md:hidden animate-fade-in-down">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-slate-800 font-medium hover:text-gold-500 py-2 w-full text-center hover:bg-slate-50"
              >
                {link.label}
              </a>
            ))}
            <button 
              onClick={openBooking}
              className="bg-gold-500 text-white px-8 py-3 rounded-full text-sm font-medium w-3/4 text-center mt-2 shadow-lg"
            >
              Free Consultation
            </button>
          </div>
        )}
      </nav>

      {/* Booking Modal Overlay */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-[60] bg-navy-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl relative overflow-hidden flex flex-col">
            <div className="p-4 bg-navy-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-gold-500" />
                <h3 className="font-serif font-bold">Schedule Your Consultation</h3>
              </div>
              <button 
                onClick={() => setIsBookingOpen(false)} 
                className="text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 w-full h-full bg-slate-50">
              {/* Embed Calendly via iframe */}
              <iframe 
                src="https://calendly.com/abdulhbwork/30min?embed_domain=localhost&embed_type=Inline" 
                width="100%" 
                height="100%" 
                frameBorder="0"
                title="Schedule Appointment"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id={SectionId.HOME} className="relative pt-32 pb-20 lg:min-h-screen flex items-center bg-navy-900 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-navy-800/50 skew-x-12 translate-x-20 z-0"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 z-0"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800 border border-navy-700 text-gold-500 text-xs font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>
              Accepting New Clients
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Clarity in <br/>
              <span className="text-gold-500">Numbers.</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-lg leading-relaxed">
              HSB Accounting & Finance helps businesses and individuals navigate complex financial landscapes with precision, integrity, and foresight.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button onClick={openBooking} className="bg-gold-500 hover:bg-gold-600 text-white text-center px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-gold-500/25 flex items-center justify-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Book an Appointment
              </button>
              <a href={`#${SectionId.SERVICES}`} className="bg-transparent border border-slate-600 text-white hover:bg-white/5 text-center px-8 py-4 rounded-full font-semibold transition-colors">
                Explore Services
              </a>
            </div>
            
            <div className="pt-8 border-t border-navy-800 flex gap-8">
              <div>
                <p className="text-3xl font-bold text-white">15+</p>
                <p className="text-sm text-slate-400">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">500+</p>
                <p className="text-sm text-slate-400">Clients Served</p>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
             {/* Professional Image */}
             <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 group">
               <img 
                 src="https://picsum.photos/800/1000?grayscale" 
                 alt="Professional Accountant" 
                 className="w-full h-auto object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent"></div>
               <div className="absolute bottom-8 left-8 text-white">
                 <p className="font-serif italic text-xl">"Trust is the currency of our business."</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id={SectionId.SERVICES} className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-4xl font-bold text-navy-900 mb-4">Our Expertise</h2>
            <p className="text-slate-600">Tailored financial solutions designed to minimize liability and maximize opportunity.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {services.map((service) => (
              <div key={service.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 border border-slate-100 group cursor-pointer">
                <div className="bg-navy-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-navy-900 transition-colors">
                  {service.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-navy-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{service.description}</p>
                <span className="text-gold-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Details <span className="text-lg">→</span>
                </span>
              </div>
            ))}
          </div>
          
          <div className="text-center">
             <p className="text-slate-500 mb-4">Not sure what you need?</p>
             <button onClick={openBooking} className="text-navy-900 font-semibold border-b-2 border-gold-500 hover:text-gold-600 transition-colors">
               Schedule a discovery call to discuss your needs
             </button>
          </div>
        </div>
      </section>

      {/* About / Why Us */}
      <section id={SectionId.ABOUT} className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold-100 rounded-full z-0"></div>
              <img 
                src="https://picsum.photos/800/600" 
                alt="Office Meeting" 
                className="relative z-10 rounded-2xl shadow-2xl w-full hover:shadow-gold-500/20 transition-shadow duration-500"
              />
              <div className="absolute -bottom-6 -right-6 bg-navy-900 text-white p-8 rounded-xl z-20 max-w-xs shadow-xl hidden md:block">
                <p className="font-serif text-lg leading-relaxed">"We look beyond the numbers to understand the story they tell about your business."</p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="font-serif text-4xl font-bold text-navy-900">Why Choose HSB?</h2>
              <p className="text-slate-600 text-lg">
                At HSB Accounting & Finance, we believe that accounting is more than just compliance—it's the foundation of your success. We combine modern technology with traditional personalized service.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Proactive Tax Planning Strategies",
                  "Cloud-Based Real-Time Reporting",
                  "Dedicated Certified Public Accountants",
                  "Transparent Pricing Structure"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircleIcon className="text-gold-500 w-6 h-6 flex-shrink-0" />
                    <span className="text-navy-800 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                 <p className="text-sm text-slate-500 italic mb-2">Powered by modern tech</p>
                 <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-default">
                    {/* Mock logos for software */}
                    <div className="h-8 w-20 bg-slate-200 rounded flex items-center justify-center text-[10px] text-slate-400 font-bold">QBooks</div>
                    <div className="h-8 w-20 bg-slate-200 rounded flex items-center justify-center text-[10px] text-slate-400 font-bold">Xero</div>
                    <div className="h-8 w-20 bg-slate-200 rounded flex items-center justify-center text-[10px] text-slate-400 font-bold">Gusto</div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id={SectionId.CONTACT} className="py-24 bg-navy-900 relative">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-5 gap-12">
            
            <div className="lg:col-span-2 space-y-8 text-white">
              <h2 className="font-serif text-4xl font-bold">Get in Touch</h2>
              <p className="text-slate-300">Ready to take control of your finances? Choose how you want to connect with us.</p>
              
              {/* Direct Booking Card */}
              <div className="bg-white/10 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                 <h4 className="font-bold text-gold-500 mb-2 flex items-center gap-2">
                   <CalendarIcon className="w-5 h-5"/> Fast Track
                 </h4>
                 <p className="text-sm text-slate-200 mb-4">Skip the back-and-forth email tag. Book a 30-minute discovery call directly on our calendar.</p>
                 <button onClick={openBooking} className="w-full bg-gold-500 hover:bg-gold-600 text-white py-2.5 rounded-lg font-semibold text-sm transition-colors">
                   Book 30-Min Call Now
                 </button>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex items-start gap-4">
                  <div className="bg-navy-800 p-3 rounded-full text-gold-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Phone</h4>
                    <p className="text-slate-400">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-navy-800 p-3 rounded-full text-gold-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email</h4>
                    <p className="text-slate-400">contact@hsbaccounting.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-navy-800 p-3 rounded-full text-gold-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Office</h4>
                    <p className="text-slate-400">123 Financial District Blvd, Suite 400<br/>New York, NY 10005</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 bg-white rounded-3xl p-8 lg:p-12 shadow-2xl">
              <div className="mb-6">
                <h3 className="text-2xl font-serif font-bold text-navy-900">Send a Message</h3>
                <p className="text-slate-500 text-sm">Prefer email? Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-navy-900">First Name</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gold-500 focus:outline-none transition-all" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-navy-900">Last Name</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gold-500 focus:outline-none transition-all" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy-900">Email Address</label>
                  <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gold-500 focus:outline-none transition-all" placeholder="john@company.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy-900">Service Needed</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gold-500 focus:outline-none transition-all">
                    <option>Tax Preparation</option>
                    <option>Bookkeeping</option>
                    <option>Financial Consulting</option>
                    <option>Payroll Services</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-navy-900">Message</label>
                  <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gold-500 focus:outline-none transition-all" placeholder="How can we help you?"></textarea>
                </div>

                <button type="button" className="w-full bg-navy-900 hover:bg-navy-800 text-white font-semibold py-4 rounded-lg transition-colors shadow-lg">
                  Submit Request
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 text-slate-400 py-12 border-t border-navy-900">
        <div className="container mx-auto px-4 md:px-8 text-center md:text-left">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <span className="font-serif text-2xl font-bold text-white tracking-tight">HSB</span>
              <p className="mt-4 max-w-sm">Providing expert financial guidance with integrity and precision for over 15 years.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href={`#${SectionId.HOME}`} className="hover:text-gold-500 transition-colors">Home</a></li>
                <li><a href={`#${SectionId.SERVICES}`} className="hover:text-gold-500 transition-colors">Services</a></li>
                <li><a href={`#${SectionId.ABOUT}`} className="hover:text-gold-500 transition-colors">About</a></li>
                <li><button onClick={openBooking} className="hover:text-gold-500 transition-colors text-left">Book Appointment</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gold-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gold-500 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-navy-900 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {new Date().getFullYear()} HSB Accounting & Finance. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Designed for Excellence.</p>
          </div>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default App;
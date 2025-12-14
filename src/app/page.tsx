// src/app/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Heart, Star, Shield, Clock, Users, Award,
  MessageCircle, ChevronDown, Send, ArrowRight, CheckCircle,
  Phone, Mail, MapPin, Menu, X, Facebook, Instagram, Youtube,
  Briefcase, Check, Quote as QuoteIcon, Plus, Minus,
  Calendar, ChevronLeft, ChevronRight, Leaf, Crown,
  Diamond, Gem, Sparkle, Droplet, Flower,
  Instagram as InstagramIcon, Facebook as FacebookIcon,
  Youtube as YoutubeIcon, MapPin as MapPinIcon,
  Clock as ClockIcon, Award as AwardIcon
} from 'lucide-react';

// Floating Elements Component
const FloatingElement = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className={className}
  >
    {children}
  </motion.div>
);

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return <span className="font-serif">{count}{suffix}</span>;
};

// Enhanced Quote Icon component
const Quote = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 32 32">
    <path d="M10 16C10 9.37258 15.3726 4 22 4V8C18.6863 8 16 10.6863 16 14V24H10V16ZM26 16C26 9.37258 31.3726 4 38 4V8C34.6863 8 32 10.6863 32 14V24H26V16Z"/>
  </svg>
);

export default function BeauteSpaCenter() {
  // State Management
  const [activeFaq, setActiveFaq] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [hoveredService, setHoveredService] = useState(null);
  const [activeTreatment, setActiveTreatment] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState('basic');
  const [isVisible, setIsVisible] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    treatment: '',
    date: '',
    time: '',
    therapist: '',
    preferences: '',
    message: ''
  });

  // Refs
  const heroRef = useRef(null);

  // Data arrays (same as before, kept for brevity)
  const services = [
    {
      icon: <Sparkle className="w-10 h-10" />,
      title: 'Soins du Visage',
      description: 'Traitements visage personnalisés pour une peau rayonnante et rajeunie.',
      features: ['Nettoyage profond', 'Hydratation intensive', 'Anti-âge', 'Luminosité'],
      color: 'from-rose-100 via-pink-50 to-white',
      accentColor: 'bg-gradient-to-r from-rose-400 to-pink-500',
      price: 'À partir de 120€',
      duration: '60 min',
      gradient: 'bg-gradient-to-br from-rose-50 via-white to-pink-50'
    },
    {
      icon: <Droplet className="w-10 h-10" />,
      title: 'Massages Relaxants',
      description: 'Massages thérapeutiques pour détendre le corps et apaiser l\'esprit.',
      features: ['Massage suédois', 'Aromathérapie', 'Points de pression', 'Détente profonde'],
      color: 'from-emerald-100 via-teal-50 to-white',
      accentColor: 'bg-gradient-to-r from-emerald-400 to-teal-500',
      price: 'À partir de 90€',
      duration: '75 min',
      gradient: 'bg-gradient-to-br from-emerald-50 via-white to-teal-50'
    },
    {
      icon: <Flower className="w-10 h-10" />,
      title: 'Thérapies Corps',
      description: 'Soins corporels complets pour un bien-être total et une régénération.',
      features: ['Enveloppements', 'Gommages', 'Modelages', 'Drainage lymphatique'],
      color: 'from-violet-100 via-purple-50 to-white',
      accentColor: 'bg-gradient-to-r from-violet-400 to-purple-500',
      price: 'À partir de 150€',
      duration: '90 min',
      gradient: 'bg-gradient-to-br from-violet-50 via-white to-purple-50'
    },
    {
      icon: <Crown className="w-10 h-10" />,
      title: 'Expériences VIP',
      description: 'Forfaits luxe exclusifs pour une journée de bien-être complète.',
      features: ['Accès privé', 'Thérapeute dédié', 'Produits premium', 'Salle privative'],
      color: 'from-amber-100 via-orange-50 to-white',
      accentColor: 'bg-gradient-to-r from-amber-400 to-orange-500',
      price: 'À partir de 300€',
      duration: '4 heures',
      gradient: 'bg-gradient-to-br from-amber-50 via-white to-orange-50'
    }
  ];

  const treatments = [
    {
      name: 'Rituel Anti-âge Or',
      description: 'Traitement signature utilisant des produits à base d\'or 24 carats et de diamants pour un éclat incomparable.',
      benefits: ['Raffermissement cutané', 'Éclat immédiat', 'Réduction rides', 'Hydratation profonde'],
      duration: '120 min',
      price: '280€',
      icon: <Diamond className="w-8 h-8" />,
      gradient: 'bg-gradient-to-br from-amber-100 via-yellow-50 to-rose-50'
    },
    {
      name: 'Massage aux Pierres Chaudes',
      description: 'Massage thérapeutique avec des pierres de basalte chauffées pour une relaxation profonde et une détoxification.',
      benefits: ['Détoxification', 'Soulagement musculaire', 'Circulation améliorée', 'Détente totale'],
      duration: '90 min',
      price: '160€',
      icon: <Gem className="w-8 h-8" />,
      gradient: 'bg-gradient-to-br from-stone-100 via-neutral-50 to-amber-50'
    },
    {
      name: 'Soin Éclat Diamant',
      description: 'Microdermabrasion au diamant combinée à des sérums vitaminés pour un teint parfait et une texture peau lissée.',
      benefits: ['Texture peau lissée', 'Taches atténuées', 'Pores resserrés', 'Éclat naturel'],
      duration: '75 min',
      price: '195€',
      icon: <Sparkles className="w-8 h-8" />,
      gradient: 'bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50'
    }
  ];

  const therapists = [
    {
      name: 'Élise Moreau',
      specialty: 'Esthéticienne Diplômée',
      experience: '12 ans d\'expérience',
      certifications: ['Diplôme d\'État', 'Aromathérapie', 'Massage Thérapeutique'],
      availability: 'Lun-Sam, 9h-20h',
      description: 'Spécialiste des soins anti-âge et des techniques de relaxation avancées.',
      specialties: ['Soins du visage', 'Massages', 'Épilation'],
      rating: 4.9,
      gradient: 'bg-gradient-to-br from-rose-50 via-pink-50 to-red-50'
    },
    {
      name: 'Sophie Dubois',
      specialty: 'Massothérapeute',
      experience: '8 ans d\'expérience',
      certifications: ['Massage Suédois', 'Réflexologie', 'Shiatsu'],
      availability: 'Mar-Dim, 10h-19h',
      description: 'Expert en techniques de massage thérapeutique et détente profonde.',
      specialties: ['Massage profond', 'Drainage lymphatique', 'Points de pression'],
      rating: 4.8,
      gradient: 'bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50'
    },
    {
      name: 'Camille Laurent',
      specialty: 'Spécialiste Bien-être',
      experience: '10 ans d\'expérience',
      certifications: ['Yoga Thérapeutique', 'Méditation', 'Nutrition'],
      availability: 'Lun-Ven, 8h-18h',
      description: 'Approche holistique combinant soins esthétiques et bien-être mental.',
      specialties: ['Thérapies corps-esprit', 'Soins détox', 'Relaxation'],
      rating: 4.9,
      gradient: 'bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50'
    }
  ];

  const testimonials = [
    {
      name: 'Claire Martin',
      role: 'Cliente VIP',
      content: "Une expérience exceptionnelle ! L'attention aux détails et le professionnalisme de l'équipe sont remarquables. Je me sens complètement régénérée après chaque visite.",
      treatment: 'Rituel Signature',
      duration: 'Cliente depuis 3 ans',
      rating: 5,
      image: 'CM',
      gradient: 'from-rose-50/80 via-pink-50/80 to-rose-100/80'
    },
    {
      name: 'Marie Dubois',
      role: 'Cliente Fidèle',
      content: "Le spa le plus luxueux que j'ai jamais visité. Les produits sont d'excellente qualité et les thérapeutes sont extrêmement compétents. Une véritable parenthèse de bonheur.",
      treatment: 'Soin du Visage Or',
      duration: 'Cliente depuis 2 ans',
      rating: 5,
      image: 'MD',
      gradient: 'from-amber-50/80 via-orange-50/80 to-amber-100/80'
    },
    {
      name: 'Sophie Bernard',
      role: 'Nouvelle Cliente',
      content: "Première visite et déjà conquise ! L'ambiance zen, les soins personnalisés... Je reviendrai certainement très vite. Un vrai moment d'évasion au cœur de Paris.",
      treatment: 'Massage Relaxant',
      duration: 'Cliente depuis 1 mois',
      rating: 5,
      image: 'SB',
      gradient: 'from-emerald-50/80 via-teal-50/80 to-emerald-100/80'
    }
  ];

  const stats = [
    { value: '98', suffix: '%', label: 'Satisfaction Clients', icon: <Heart className="w-6 h-6" />, description: 'Taux de satisfaction' },
    { value: '5200', suffix: '+', label: 'Clients Heureux', icon: <Users className="w-6 h-6" />, description: 'Depuis notre ouverture' },
    { value: '15', label: 'Experts Certifiés', icon: <Award className="w-6 h-6" />, description: 'Thérapeutes diplômés' },
    { value: '50', suffix: '+', label: 'Soins Exclusifs', icon: <Sparkles className="w-6 h-6" />, description: 'Traitements uniques' },
    { value: '100', suffix: '%', label: 'Naturel', icon: <Leaf className="w-6 h-6" />, description: 'Produits bio & naturels' },
    { value: '24/7', label: 'Réservation', icon: <Clock className="w-6 h-6" />, description: 'En ligne & immédiate' }
  ];

  const packages = [
    {
      name: 'Découverte',
      price: '190€',
      duration: '2 heures',
      features: ['Soin du visage signature', 'Massage des mains relaxant', 'Accès hammam privé', 'Thé signature & collation'],
      color: 'from-white via-gray-50 to-gray-100',
      accentColor: 'from-gray-400 to-gray-600',
      popular: false,
      gradient: 'bg-gradient-to-br from-white via-gray-50 to-gray-100'
    },
    {
      name: 'Élégance',
      price: '350€',
      duration: '3 heures',
      features: ['Soin visage premium', 'Massage complet corps', 'Enveloppement corps', 'Collation santé gourmande', 'Produts offerts'],
      color: 'from-rose-50 via-pink-50 to-rose-100',
      accentColor: 'from-rose-500 to-pink-600',
      popular: true,
      gradient: 'bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100'
    },
    {
      name: 'Prestige',
      price: '590€',
      duration: '5 heures',
      features: ['Rituel signature or', 'Massage aux pierres chaudes', 'Soin corps luxe', 'Déjeuner gastronomique', 'Salle privative', 'Coffret cadeau'],
      color: 'from-amber-50 via-orange-50 to-amber-100',
      accentColor: 'from-amber-500 to-orange-600',
      popular: false,
      gradient: 'bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100'
    }
  ];

  // Effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Functions
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ORIGINAL API METHOD - KEPT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        
        // Réinitialiser le formulaire
        setFormData({
          name: '',
          email: '',
          phone: '',
          treatment: '',
          date: '',
          time: '',
          therapist: '',
          preferences: '',
          message: ''
        });

        // Réinitialiser l'état de soumission après 5 secondes
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);

        // Scroll vers le haut du formulaire
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }

      } else {
        setSubmitStatus('error');
        console.error('Erreur lors de l\'envoi:', result.error);
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const message = `Bonjour Spa Éclat Beauté,

Je souhaite réserver un soin.
Type de soin : ${formData.treatment}
Date souhaitée : ${formData.date} ${formData.time}
Préférences : ${formData.preferences}

Pourriez-vous me recontacter pour confirmer la réservation ?
Cordialement,
${formData.name}
${formData.phone}`;
    window.open(`https://wa.me/33123456789?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 21; hour++) {
      for (const minute of ['00', '30']) {
        slots.push(`${hour.toString().padStart(2, '0')}:${minute}`);
      }
    }
    return slots;
  };

  // Add CSS animation for slow zoom effect
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes slowZoom {
        0% { transform: scale(1); }
        100% { transform: scale(1.1); }
      }
    `;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-25 via-white to-amber-25 text-gray-900 antialiased overflow-x-hidden">
      {/* Enhanced Top Banner */}
      <motion.div 
        className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white py-3 px-4 text-center relative overflow-hidden"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="flex items-center">
              <Sparkles className="w-5 h-5 mr-3 animate-pulse" />
              <span className="font-semibold tracking-wide">OFFRE EXCLUSIVE :</span>
            </div>
            <span className="font-bold text-lg">Première visite -20% sur tous les soins</span>
            <span className="hidden sm:inline mx-4 opacity-60">•</span>
            <span className="text-white/90">Valable jusqu&apos;au 30 décembre</span>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Header */}
      <motion.header 
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 shadow-2xl backdrop-blur-xl py-4' 
            : 'bg-transparent py-8'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Enhanced Logo */}
            <motion.div 
              className="flex items-center cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              onClick={() => scrollToSection('accueil')}
            >
              <div className={`w-14 h-14 rounded-2xl ${
                isScrolled 
                  ? 'bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg' 
                  : 'bg-white/20 backdrop-blur-md'
              } flex items-center justify-center mr-4 shadow-xl transition-all duration-300`}>
                <Sparkles className={`w-7 h-7 ${isScrolled ? 'text-white' : 'text-white'} animate-pulse`} />
              </div>
              <div className="transition-all duration-300">
                <div className={`text-2xl font-light tracking-wider ${isScrolled ? 'text-gray-900' : 'text-white'} font-serif`}>
                  Éclat Beauté
                </div>
                <div className={`text-base tracking-widest ${isScrolled ? 'text-pink-600' : 'text-white/90'} font-light`}>
                  SPA & WELLNESS
                </div>
              </div>
            </motion.div>

            {/* Enhanced Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-10">
              {['accueil', 'services', 'traitements', 'thérapeutes', 'témoignages', 'contact'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative transition-all duration-300 font-light tracking-wider text-sm uppercase ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-pink-600' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-300 group-hover:w-full" />
                </motion.button>
              ))}
              
              <motion.button
                onClick={() => scrollToSection('contact')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-10 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full hover:shadow-2xl transition-all duration-300 font-medium shadow-xl group overflow-hidden"
              >
                <span className="relative z-10">Réserver</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </nav>

            {/* Enhanced Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden">
              <motion.button
                onClick={() => scrollToSection('contact')}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full text-sm font-medium shadow-lg"
              >
                Réserver
              </motion.button>
              
              <motion.button
                className="p-2.5"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? (
                  <X className={`w-7 h-7 ${isScrolled ? 'text-gray-700' : 'text-white'} transition-transform duration-300`} />
                ) : (
                  <Menu className={`w-7 h-7 ${isScrolled ? 'text-gray-700' : 'text-white'} transition-transform duration-300`} />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div 
              className="fixed right-0 top-0 h-full w-80 bg-gradient-to-b from-white via-rose-50 to-white shadow-2xl z-50"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="flex flex-col h-full pt-24 px-8 space-y-2">
                {['accueil', 'services', 'traitements', 'thérapeutes', 'témoignages', 'contact'].map((item, idx) => (
                  <motion.button
                    key={item}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => {
                      scrollToSection(item);
                      setIsMobileMenuOpen(false);
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="text-lg text-gray-700 hover:text-pink-600 transition-all duration-300 py-4 text-left border-b border-gray-100 hover:pl-4 flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-3 opacity-0 group-hover:opacity-100 transition-all" />
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Enhanced Hero Section */}
      <section id="accueil" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background with Multiple Layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-900/40 via-pink-900/30 to-rose-800/20 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 z-20" />
          <div 
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
              animation: 'slowZoom 30s infinite alternate'
            }}
          />
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-rose-500/10 to-pink-500/10 blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 20}%`,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-30 pt-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-white"
            >
              <motion.div
                className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-light mb-8 border border-white/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Crown className="w-5 h-5 mr-3" />
                <span>Excellence & Bien-être depuis 2010</span>
              </motion.div>
              
              <motion.h1 
                className="text-6xl md:text-7xl lg:text-8xl font-light mb-8 leading-none tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="block font-serif italic text-white/95">
                  L&apos;Art
                </span>
                <span className="block font-light text-5xl md:text-6xl lg:text-7xl mt-4">
                  du <span className="font-serif italic">Bien-Être</span>
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed max-w-xl font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Un sanctuaire de sérénité où luxe et bien-être se rencontrent. 
                Des soins d&apos;exception pour révéler votre beauté naturelle.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-12 py-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full hover:shadow-2xl transition-all duration-300 font-medium text-lg flex items-center justify-center group shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Réserver un soin
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
                
                <motion.button
                  onClick={() => scrollToSection('services')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 font-medium text-lg group"
                >
                  <span className="flex items-center justify-center">
                    Découvrir nos soins
                    <ChevronDown className="ml-3 w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
            
            {/* Enhanced Floating Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative h-[600px]">
                {/* Main Card */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Award className="w-10 h-10 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-2">Élu meilleur spa</div>
                      <div className="text-white/80 mb-4">Paris 2023</div>
                      <div className="flex justify-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-amber-300 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating Element 1 */}
                <motion.div 
                  className="absolute -top-4 -right-4"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-emerald-500/30">
                    <div className="flex items-center">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center mr-4 shadow-lg">
                        <Leaf className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg">100% Naturel</div>
                        <div className="text-sm text-white/70">Produits certifiés bio</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating Element 2 */}
                <motion.div 
                  className="absolute -bottom-4 -left-4"
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                >
                  <div className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-violet-500/30">
                    <div className="flex items-center">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-400 flex items-center justify-center mr-4 shadow-lg">
                        <Users className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg">Équipe Experts</div>
                        <div className="text-sm text-white/70">15 thérapeutes diplômés</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="flex flex-col items-center">
            <ChevronDown className="w-6 h-6 text-white/70 mb-2" />
            <span className="text-white/50 text-sm tracking-wider">DÉCOUVRIR</span>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-b from-white via-rose-25 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-rose-100 text-pink-600 text-sm font-light mb-6 tracking-wider">
              NOTRE EXCELLENCE EN CHIFFRES
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-8 font-serif">
              Une expertise reconnue
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-100 to-pink-100 mb-6 mx-auto group-hover:from-rose-200 group-hover:to-pink-200 transition-all duration-500 shadow-lg"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <div className="text-pink-600">
                    {stat.icon}
                  </div>
                </motion.div>
                <div className="text-5xl font-light text-gray-900 mb-3 font-serif">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix || ''} />
                </div>
                <div className="font-medium text-gray-800 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section id="services" className="py-24 bg-gradient-to-b from-white to-rose-25">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 text-pink-600 text-sm font-light mb-6 tracking-wider">
              NOS UNIVERS PRIVILÉGIÉS
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8 font-serif">
              Soins d&apos;exception
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Découvrez nos rituels signature, conçus pour vous offrir une expérience sensorielle unique 
              et un moment de pure évasion.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -15 }}
                onHoverStart={() => setHoveredService(idx)}
                onHoverEnd={() => setHoveredService(null)}
                className="group relative"
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl`} />
                
                <div className={`relative ${service.gradient} rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-700 border border-white/50 group-hover:border-pink-200 overflow-hidden`}>
                  {/* Hover Effect Background */}
                  <div className={`absolute inset-0 ${service.accentColor} opacity-0 group-hover:opacity-5 transition-opacity duration-700`} />
                  
                  <div className="relative">
                    <div className={`relative w-20 h-20 rounded-3xl ${service.accentColor} flex items-center justify-center mb-8 shadow-2xl transform group-hover:scale-110 transition-transform duration-500`}>
                      <div className="text-white transform group-hover:rotate-12 transition-transform duration-500">
                        {service.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-light text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300 font-serif tracking-wide">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed font-light">
                      {service.description}
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      {service.features.map((feature, fIdx) => (
                        <motion.div
                          key={fIdx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: fIdx * 0.1 }}
                          className="flex items-center text-gray-700 group/feature"
                        >
                          <div className={`w-8 h-8 rounded-lg ${service.accentColor} flex items-center justify-center mr-4 shadow-md`}>
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="group-hover/feature:translate-x-2 transition-transform duration-300">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="pt-8 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-2xl font-light text-gray-900 font-serif">{service.price}</div>
                          <div className="text-sm text-gray-500">{service.duration}</div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => scrollToSection('contact')}
                          className={`w-12 h-12 rounded-full ${service.accentColor} text-white flex items-center justify-center hover:shadow-lg transition-all shadow-md`}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Treatments Section */}
      <section id="traitements" className="py-24 bg-gradient-to-b from-rose-25 via-white to-rose-25">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 text-pink-600 text-sm font-light mb-6 tracking-wider">
              NOS RITUELS SIGNATURE
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8 font-serif">
              L&apos;excellence à portée de main
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Des soins exclusifs conçus avec des ingrédients précieux pour une expérience sensorielle inoubliable
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <div className="flex flex-col lg:flex-row gap-12 items-stretch">
                {/* Treatments List */}
                <div className="lg:w-2/5">
                  <div className="space-y-6">
                    {treatments.map((treatment, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => setActiveTreatment(idx)}
                        whileHover={{ x: 10 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full text-left p-8 rounded-3xl transition-all duration-500 shadow-lg hover:shadow-2xl ${
                          idx === activeTreatment 
                            ? `${treatment.gradient} border-l-8 border-pink-500 transform scale-[1.02]` 
                            : 'bg-white hover:bg-gray-50 border border-gray-100'
                        }`}
                      >
                        <div className="flex items-start">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mr-6 shadow-lg ${
                            idx === activeTreatment ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {treatment.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 text-xl mb-2">{treatment.name}</div>
                            <div className="text-gray-600 mb-3">{treatment.description}</div>
                            <div className="flex items-center justify-between">
                              <div className="text-lg font-light text-gray-900 font-serif">{treatment.price}</div>
                              <div className="text-sm text-gray-500 px-3 py-1 bg-gray-100 rounded-full">
                                {treatment.duration}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                {/* Treatment Details */}
                <div className="lg:w-3/5">
                  <motion.div
                    key={activeTreatment}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative h-full"
                  >
                    <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                      <div className={`absolute inset-0 bg-gradient-to-br ${treatments[activeTreatment].gradient} z-10`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-20" />
                      <div 
                        className="absolute inset-0 bg-cover bg-center transform scale-110"
                        style={{
                          backgroundImage: 'url("https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
                          animation: 'slowZoom 20s infinite alternate'
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-12 z-30">
                        <div className="text-white">
                          <div className="text-4xl font-light mb-4 font-serif">{treatments[activeTreatment].name}</div>
                          <div className="text-xl opacity-90 mb-6">{treatments[activeTreatment].duration} • {treatments[activeTreatment].price}</div>
                          <motion.button
                            onClick={() => scrollToSection('contact')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-white text-pink-600 rounded-full font-medium hover:bg-gray-100 transition-all"
                          >
                            Réserver ce soin
                          </motion.button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Benefits Grid */}
                    <div className="mt-8 grid md:grid-cols-2 gap-6">
                      {treatments[activeTreatment].benefits.map((benefit, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className={`${treatments[activeTreatment].gradient} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300`}
                        >
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white flex items-center justify-center mr-4 shadow-md">
                              <Check className="w-6 h-6" />
                            </div>
                            <div className="font-medium text-gray-900 text-lg">{benefit}</div>
                          </div>
                          <p className="text-gray-600">
                            {treatments[activeTreatment].description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Therapists Section */}
      <section id="thérapeutes" className="py-24 bg-gradient-to-b from-white to-rose-25">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 text-pink-600 text-sm font-light mb-6 tracking-wider">
              NOTRE ÉQUIPE D&apos;EXPERTS
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8 font-serif">
              Des mains expertes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Rencontrez nos thérapeutes dédiés à votre bien-être, formés aux techniques les plus avancées 
              et toujours à l&apos;écoute de vos besoins.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {therapists.map((therapist, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className={`relative ${therapist.gradient} rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500`}>
                  {/* Therapist Image */}
                  <div className="relative h-80 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-2xl">
                        <div className="text-white text-4xl font-bold">
                          {therapist.name.charAt(0)}
                        </div>
                      </div>
                    </div>
                    {/* Rating Badge */}
                    <div className="absolute top-6 right-6 z-20">
                      <div className="flex items-center bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full shadow-lg">
                        <Star className="w-5 h-5 text-amber-400 fill-current mr-2" />
                        <span className="font-bold">{therapist.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-light text-gray-900 font-serif mb-2">{therapist.name}</h3>
                      <p className="text-pink-600 font-medium">{therapist.specialty}</p>
                    </div>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed font-light">
                      {therapist.description}
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center text-gray-500">
                        <Briefcase className="w-5 h-5 mr-3" />
                        <span>{therapist.experience}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock className="w-5 h-5 mr-3" />
                        <span>{therapist.availability}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mb-8">
                      {therapist.specialties.map((specialty, sIdx) => (
                        <span key={sIdx} className="px-4 py-2 bg-white/50 backdrop-blur-sm text-pink-600 rounded-full text-sm font-medium shadow-sm">
                          {specialty}
                        </span>
                      ))}
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection('contact')}
                      className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full hover:shadow-xl transition-all font-medium shadow-lg"
                    >
                      Réserver avec {therapist.name.split(' ')[0]}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Packages Section */}
      <section className="py-24 bg-gradient-to-b from-rose-25 via-white to-rose-25">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-amber-600 text-sm font-light mb-6 tracking-wider">
              FORFAITS PRIVILÈGE
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8 font-serif">
              Expériences complètes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Des journées de bien-être pensées pour vous offrir une évasion totale et une régénération complète
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {packages.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -15 }}
                className="relative"
              >
                {pkg.popular && (
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                  >
                    <div className="px-6 py-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-full text-sm font-bold shadow-xl">
                      LE PLUS CHOISI
                    </div>
                  </motion.div>
                )}
                
                <div className={`relative rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 ${
                  pkg.popular ? 'border-amber-300' : 'border-transparent'
                } ${pkg.gradient}`}>
                  <div className="text-center mb-10">
                    <h3 className="text-3xl font-light text-gray-900 font-serif mb-4">{pkg.name}</h3>
                    <div className="text-5xl font-light text-gray-900 mb-2 font-serif">{pkg.price}</div>
                    <div className="text-gray-600">{pkg.duration}</div>
                  </div>
                  
                  <div className="space-y-5 mb-10">
                    {pkg.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${pkg.accentColor} flex items-center justify-center mr-4 shadow-md`}>
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedPackage(pkg.name.toLowerCase());
                      scrollToSection('contact');
                    }}
                    className={`w-full py-4 rounded-full font-medium shadow-lg ${
                      pkg.popular 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-xl' 
                        : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:shadow-xl'
                    }`}
                  >
                    Choisir ce forfait
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section id="témoignages" className="py-24 bg-gradient-to-b from-white via-rose-25 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 text-pink-600 text-sm font-light mb-6 tracking-wider">
              TÉMOIGNAGES
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8 font-serif">
              Ils nous font confiance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Découvrez les expériences uniques vécues par nos clients au sein de notre sanctuaire de bien-être
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="relative"
                >
                  <div className={`bg-gradient-to-br ${testimonials[activeTestimonial].gradient} rounded-3xl p-12 md:p-16 shadow-2xl backdrop-blur-sm`}>
                    <div className="flex flex-col md:flex-row items-start mb-12">
                      <div className="flex items-center mb-8 md:mb-0 md:mr-12">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white text-3xl font-bold mr-8 shadow-xl">
                          {testimonials[activeTestimonial].image}
                        </div>
                        <div>
                          <h3 className="text-2xl font-light text-gray-900 font-serif mb-2">
                            {testimonials[activeTestimonial].name}
                          </h3>
                          <p className="text-pink-600 font-medium">{testimonials[activeTestimonial].role}</p>
                          <div className="flex items-center mt-3">
                            {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-amber-400 fill-current mr-1" />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <Quote className="w-16 h-16 text-pink-200 mb-6" />
                        <p className="text-2xl text-gray-800 italic leading-relaxed mb-8 font-light">
                          &quot;{testimonials[activeTestimonial].content}&quot;
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-12 border-t border-pink-100">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6">
                          <div className="text-sm text-gray-500 mb-2">SOIN RÉALISÉ</div>
                          <div className="font-medium text-gray-900 text-xl">{testimonials[activeTestimonial].treatment}</div>
                        </div>
                        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6">
                          <div className="text-sm text-gray-500 mb-2">RELATION CLIENT</div>
                          <div className="font-medium text-gray-900 text-xl">{testimonials[activeTestimonial].duration}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex justify-center mt-12 space-x-4">
                {testimonials.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === activeTestimonial 
                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 w-12' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              <motion.button
                onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all"
              >
                <ChevronLeft className="w-8 h-8 text-gray-700" />
              </motion.button>
              
              <motion.button
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all"
              >
                <ChevronRight className="w-8 h-8 text-gray-700" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-rose-25 via-white to-rose-25">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid lg:grid-cols-2 gap-16 items-start"
          >
            <div>
              <div className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 text-pink-600 text-sm font-light mb-8 tracking-wider">
                RÉSERVATION
              </div>
              
              <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-8 font-serif">
                Votre moment de détente
              </h2>
              
              <p className="text-xl text-gray-600 mb-12 leading-relaxed font-light">
                Réservez votre expérience bien-être et laissez-nous prendre soin de vous dans un cadre exceptionnel
              </p>
              
              <div className="space-y-8">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mr-8 shadow-lg">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg mb-2">Téléphone</h3>
                    <a href="tel:33123456789" className="text-2xl text-gray-800 hover:text-pink-600 transition-colors duration-300">
                      01 23 45 67 89
                    </a>
                    <p className="text-sm text-gray-500 mt-2">Du lundi au samedi, 9h-20h</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mr-8 shadow-lg">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg mb-2">Email</h3>
                    <a href="mailto:reservation@eclatbeaute.fr" className="text-2xl text-gray-800 hover:text-pink-600 transition-colors duration-300">
                      reservation@eclatbeaute.fr
                    </a>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mr-8 shadow-lg">
                    <MapPinIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg mb-2">Adresse</h3>
                    <p className="text-2xl text-gray-800">16 Avenue Montaigne, 75008 Paris</p>
                    <button className="text-pink-600 hover:text-pink-700 mt-3 flex items-center font-medium">
                      <MapPin className="w-5 h-5 mr-2" />
                      Voir sur la carte
                    </button>
                  </div>
                </motion.div>
              </div>
              
              <div className="mt-16 p-10 bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl shadow-xl">
                <h3 className="font-medium text-gray-900 text-xl mb-8 flex items-center">
                  <ClockIcon className="w-6 h-6 mr-3" />
                  Horaires d&apos;ouverture
                </h3>
                <div className="space-y-6">
                  {[
                    { day: 'Lundi - Vendredi', hours: '9h - 20h' },
                    { day: 'Samedi', hours: '9h - 19h' },
                    { day: 'Dimanche', hours: '10h - 18h' },
                    { day: 'Jours fériés', hours: 'Sur rendez-vous' }
                  ].map((schedule, idx) => (
                    <div key={idx} className="flex justify-between items-center py-4 border-b border-rose-100 last:border-0">
                      <span className="text-gray-600">{schedule.day}</span>
                      <span className="font-medium text-gray-900 text-lg">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-10 shadow-2xl"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">
                      Nom complet *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-rose-50 border border-rose-100 rounded-2xl focus:outline-none focus:ring-3 focus:ring-pink-500/30 focus:border-pink-500 transition-all duration-300"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-3">
                      Téléphone *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-rose-50 border border-rose-100 rounded-2xl focus:outline-none focus:ring-3 focus:ring-pink-500/30 focus:border-pink-500 transition-all duration-300"
                      placeholder="01 23 45 67 89"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-rose-50 border border-rose-100 rounded-2xl focus:outline-none focus:ring-3 focus:ring-pink-500/30 focus:border-pink-500 transition-all duration-300"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="treatment" className="block text-sm font-medium text-gray-700 mb-3">
                      Type de soin *
                    </label>
                    <select
                      id="treatment"
                      value={formData.treatment}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-rose-50 border border-rose-100 rounded-2xl focus:outline-none focus:ring-3 focus:ring-pink-500/30 focus:border-pink-500 transition-all duration-300 appearance-none"
                      required
                    >
                      <option value="">Sélectionnez un soin</option>
                      <option value="soin-visage">Soin du visage</option>
                      <option value="massage">Massage relaxant</option>
                      <option value="rituel">Rituel signature</option>
                      <option value="forfait">Forfait journée</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="therapist" className="block text-sm font-medium text-gray-700 mb-3">
                      Thérapeute (optionnel)
                    </label>
                    <select
                      id="therapist"
                      value={formData.therapist}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-rose-50 border border-rose-100 rounded-2xl focus:outline-none focus:ring-3 focus:ring-pink-500/30 focus:border-pink-500 transition-all duration-300 appearance-none"
                    >
                      <option value="">Aucune préférence</option>
                      <option value="elise">Élise Moreau</option>
                      <option value="sophie">Sophie Dubois</option>
                      <option value="camille">Camille Laurent</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-3">
                      Date souhaitée
                    </label>
                    <input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-rose-50 border border-rose-100 rounded-2xl focus:outline-none focus:ring-3 focus:ring-pink-500/30 focus:border-pink-500 transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-3">
                      Horaire souhaité
                    </label>
                    <select
                      id="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-rose-50 border border-rose-100 rounded-2xl focus:outline-none focus:ring-3 focus:ring-pink-500/30 focus:border-pink-500 transition-all duration-300 appearance-none"
                    >
                      <option value="">Sélectionnez un horaire</option>
                      {generateTimeSlots().map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="preferences" className="block text-sm font-medium text-gray-700 mb-3">
                    Vos préférences & commentaires
                  </label>
                  <textarea
                    id="preferences"
                    rows={4}
                    value={formData.preferences}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-rose-50 border border-rose-100 rounded-2xl focus:outline-none focus:ring-3 focus:ring-pink-500/30 focus:border-pink-500 transition-all duration-300 resize-none"
                    placeholder="Allergies, zones à éviter, ambiance souhaitée, occasion spéciale..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl hover:shadow-2xl transition-all font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </span>
                  ) : (
                    'Confirmer la réservation'
                  )}
                </motion.button>
              </form>
              
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-8 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl"
                >
                  <div className="flex items-center">
                    <CheckCircle className="w-8 h-8 text-emerald-600 mr-4" />
                    <div>
                      <div className="font-bold text-emerald-800 text-lg">Réservation confirmée !</div>
                      <p className="text-emerald-700 mt-1">
                        Nous vous contacterons dans les plus brefs délais pour finaliser votre réservation.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div className="mt-12 pt-12 border-t border-rose-100">
                <p className="text-sm text-gray-500 text-center mb-6">
                  Ou contactez-nous directement par WhatsApp pour une réponse immédiate
                </p>
                <motion.button
                  onClick={openWhatsApp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl hover:shadow-xl transition-all font-medium flex items-center justify-center shadow-lg"
                >
                  <MessageCircle className="w-6 h-6 mr-3" />
                  Échanger sur WhatsApp
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
            <div>
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center mr-4 shadow-2xl">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">Éclat Beauté</div>
                  <div className="text-lg font-light text-pink-300 tracking-wider">SPA & WELLNESS</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 font-light">
                Sanctuaire de bien-être où le luxe rencontre la sérénité. 
                Des soins d&apos;exception pour révéler votre beauté naturelle dans un cadre enchanteur.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-all duration-300 hover:scale-110">
                  <InstagramIcon className="w-6 h-6" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110">
                  <FacebookIcon className="w-6 h-6" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-all duration-300 hover:scale-110">
                  <YoutubeIcon className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-xl mb-8 text-white">Nos Soins</h3>
              <ul className="space-y-4 text-gray-400">
                {['Soins du visage', 'Massages relaxants', 'Thérapies corps', 'Forfaits journée', 'Soins hommes', 'Cadeaux & coffrets'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-pink-300 transition-colors duration-300 flex items-center">
                      <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-xl mb-8 text-white">Contact</h3>
              <ul className="space-y-6 text-gray-400">
                <li className="flex items-start">
                  <Phone className="w-5 h-5 mr-4 mt-1 text-pink-400" />
                  <div>
                    <div className="text-lg">01 23 45 67 89</div>
                    <div className="text-sm text-gray-500 mt-1">Réservation & informations</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mail className="w-5 h-5 mr-4 mt-1 text-pink-400" />
                  <div>reservation@eclatbeaute.fr</div>
                </li>
                <li className="flex items-start">
                  <MapPinIcon className="w-5 h-5 mr-4 mt-1 text-pink-400" />
                  <div>16 Avenue Montaigne<br />75008 Paris</div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-xl mb-8 text-white">Newsletter</h3>
              <p className="text-gray-400 text-sm mb-6 font-light">
                Recevez nos offres exclusives, conseils bien-être et actualités en avant-première
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-5 py-3 bg-gray-800 border border-gray-700 rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <button className="px-5 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-r-2xl hover:opacity-90 transition-opacity">
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-10 pt-10 border-t border-gray-800">
                <div className="text-sm text-gray-500 flex items-center">
                  <AwardIcon className="w-5 h-5 mr-3 text-emerald-400" />
                  <span>Établissement certifié 5 étoiles</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-6 md:mb-0 font-light">
                &copy; {new Date().getFullYear()} Éclat Beauté Spa & Wellness. Tous droits réservés.
              </p>
              <div className="flex space-x-8 text-sm text-gray-500">
                {['Mentions légales', 'CGV', 'Confidentialité', 'Cookies'].map((item) => (
                  <a key={item} href="#" className="hover:text-pink-300 transition-colors duration-300">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced Floating Action Buttons */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={() => scrollToSection('contact')}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 w-20 h-20 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all group"
          >
            <Calendar className="w-8 h-8 text-white" />
            <span className="absolute -top-12 right-0 bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
              Réserver un soin
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isScrolled && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 left-8 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 shadow-xl flex items-center justify-center hover:shadow-2xl transition-all"
          >
            <ChevronDown className="w-6 h-6 text-white rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Enhanced WhatsApp Button */}
      <motion.button
        onClick={openWhatsApp}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-32 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all"
      >
        <MessageCircle className="w-8 h-8 text-white" />
      </motion.button>
    </div>
  );
}
// src/app/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Heart, Star, Shield, Clock, Users, Award,
  MessageCircle, ChevronDown, Send, ArrowRight, CheckCircle,
  Phone, Mail, MapPin, Menu, X, Facebook, Instagram, Youtube,
  Briefcase, Headphones, ChevronRight, Check,
  Eye, Zap, Target, Globe, BarChart, PieChart,
  ThumbsUp, Calendar, ShieldCheck, Coffee, Flower,
  Handshake, Camera, Music, Radio, Palette, Brush, Type,
  Grid, Moon, Sun, Wind, Droplets, Sparkle,
  Activity, Thermometer, Pill, Brain, Bone,
  Tooth, AlertCircle, Microscope, UserCheck, Clipboard,
  FileText, Home, Search, Bell, PhoneCall,
  Map, Navigation, Car, Bed, Scissors, HeartPulse, Brain as BrainIcon,
  ThermometerSun, Pill as PillIcon, ArrowLeft, ArrowRight as RightArrow,
  Plus, Minus, CalendarDays, User, ShieldPlus, ActivitySquare,
  ClipboardCheck, BrainCircuit, HeartHandshake, PhoneIncoming,
  Smartphone, ShieldAlert, BadgeCheck, Clock4, MapPin as MapPinIcon,
  Droplet, Wind as WindIcon, Flame, Waves, Leaf, Mountain, Cloud,
  Gem, Crown, Diamond, Sparkles as SparklesIcon, Watch, Gift,
  ShoppingBag, Camera as CameraIcon, Smile, Eye as EyeIcon,
  Scissors as ScissorsIcon, Palette as PaletteIcon, Music as MusicIcon,
  Coffee as CoffeeIcon, Wine, Cookie, Candle, Feather, Moon as MoonIcon,
  Sun as SunIcon, Cloud as CloudIcon, TreePine, Bird, Fish,
  Waves as WavesIcon, MusicNote, Hash, Key, Lock, Unlock, Bell as BellIcon,
  Settings, Trash2, Edit, Copy, Save, Upload, Download,
  Filter, ZoomIn, ZoomOut, Maximize2, Minimize2, RotateCw,
  Play, Pause, Stop, SkipBack, SkipForward, Volume2,
  Mic, Video, Image, Film, Monitor, Tablet, Smartphone as SmartphoneIcon,
  Watch as WatchIcon, Headphones as HeadphonesIcon, Speaker,
  Battery, BatteryCharging, Wifi, Bluetooth, Radio as RadioIcon,
  Tv, Printer, Scanner, HardDrive, Server, Database,
  Cpu, MemoryStick, Motherboard, CircuitBoard, Chip,
  Cpu as CpuIcon, HardDrive as HardDriveIcon, Server as ServerIcon,
  Database as DatabaseIcon, Network, WifiOff, BluetoothOff,
  Signal, SignalHigh, SignalLow, SignalZero, BatteryLow,
  BatteryMedium, BatteryFull, BatteryWarning
} from 'lucide-react';

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

  // Data
  const services = [
    {
      icon: <Sparkle className="w-8 h-8" />,
      title: 'Soins du Visage',
      description: 'Traitements visage personnalisés pour une peau rayonnante et rajeunie.',
      features: ['Nettoyage profond', 'Hydratation intensive', 'Anti-âge', 'Luminosité'],
      color: 'from-rose-400 to-pink-500',
      price: 'À partir de 120€',
      duration: '60 min'
    },
    {
      icon: <Droplet className="w-8 h-8" />,
      title: 'Massages Relaxants',
      description: 'Massages thérapeutiques pour détendre le corps et apaiser l\'esprit.',
      features: ['Massage suédois', 'Aromathérapie', 'Points de pression', 'Détente profonde'],
      color: 'from-teal-400 to-emerald-500',
      price: 'À partir de 90€',
      duration: '75 min'
    },
    {
      icon: <Flower className="w-8 h-8" />,
      title: 'Thérapies Corps',
      description: 'Soins corporels complets pour un bien-être total et une régénération.',
      features: ['Enveloppements', 'Gommages', 'Modelages', 'Drainage lymphatique'],
      color: 'from-violet-400 to-purple-500',
      price: 'À partir de 150€',
      duration: '90 min'
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: 'Expériences VIP',
      description: 'Forfaits luxe exclusifs pour une journée de bien-être complète.',
      features: ['Accès privé', 'Thérapeute dédié', 'Produits premium', 'Salle privative'],
      color: 'from-amber-400 to-orange-500',
      price: 'À partir de 300€',
      duration: '4 heures'
    }
  ];

  const treatments = [
    {
      name: 'Rituel Anti-âge Or',
      description: 'Traitement signature utilisant des produits à base d\'or 24 carats et de diamants.',
      benefits: ['Raffermissement cutané', 'Éclat immédiat', 'Réduction rides', 'Hydratation profonde'],
      duration: '120 min',
      price: '280€',
      icon: <Diamond className="w-6 h-6" />
    },
    {
      name: 'Massage aux Pierres Chaudes',
      description: 'Massage thérapeutique avec des pierres de basalte chauffées pour une relaxation profonde.',
      benefits: ['Détoxification', 'Soulagement musculaire', 'Circulation améliorée', 'Détente totale'],
      duration: '90 min',
      price: '160€',
      icon: <Gem className="w-6 h-6" />
    },
    {
      name: 'Soin Éclat Diamant',
      description: 'Microdermabrasion au diamant combinée à des sérums vitaminés pour un teint parfait.',
      benefits: ['Texture peau lissée', 'Taches atténuées', 'Pores resserrés', 'Éclat naturel'],
      duration: '75 min',
      price: '195€',
      icon: <SparklesIcon className="w-6 h-6" />
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
      rating: 4.9
    },
    {
      name: 'Sophie Dubois',
      specialty: 'Massothérapeute',
      experience: '8 ans d\'expérience',
      certifications: ['Massage Suédois', 'Réflexologie', 'Shiatsu'],
      availability: 'Mar-Dim, 10h-19h',
      description: 'Expert en techniques de massage thérapeutique et détente profonde.',
      specialties: ['Massage profond', 'Drainage lymphatique', 'Points de pression'],
      rating: 4.8
    },
    {
      name: 'Camille Laurent',
      specialty: 'Spécialiste Bien-être',
      experience: '10 ans d\'expérience',
      certifications: ['Yoga Thérapeutique', 'Méditation', 'Nutrition'],
      availability: 'Lun-Ven, 8h-18h',
      description: 'Approche holistique combinant soins esthétiques et bien-être mental.',
      specialties: ['Thérapies corps-esprit', 'Soins détox', 'Relaxation'],
      rating: 4.9
    }
  ];

  const testimonials = [
    {
      name: 'Claire Martin',
      role: 'Cliente VIP',
      content: "Une expérience exceptionnelle ! L'attention aux détails et le professionnalisme de l'équipe sont remarquables. Je me sens complètement régénérée.",
      treatment: 'Rituel Signature',
      duration: 'Cliente depuis 3 ans',
      rating: 5,
      image: 'CM'
    },
    {
      name: 'Marie Dubois',
      role: 'Cliente Fidèle',
      content: "Le spa le plus luxueux que j'ai jamais visité. Les produits sont d'excellente qualité et les thérapeutes sont extrêmement compétents.",
      treatment: 'Soin du Visage Or',
      duration: 'Cliente depuis 2 ans',
      rating: 5,
      image: 'MD'
    },
    {
      name: 'Sophie Bernard',
      role: 'Nouvelle Cliente',
      content: "Première visite et déjà conquise ! L'ambiance zen, les soins personnalisés... Je reviendrai certainement très vite.",
      treatment: 'Massage Relaxant',
      duration: 'Cliente depuis 1 mois',
      rating: 5,
      image: 'SB'
    }
  ];

  const stats = [
    { value: '98%', label: 'Satisfaction Clients', icon: <Heart className="w-5 h-5" />, description: 'Taux de satisfaction' },
    { value: '5K+', label: 'Clients Heureux', icon: <Users className="w-5 h-5" />, description: 'Depuis notre ouverture' },
    { value: '15', label: 'Experts Certifiés', icon: <Award className="w-5 h-5" />, description: 'Thérapeutes diplômés' },
    { value: '50+', label: 'Soins Exclusifs', icon: <Sparkles className="w-5 h-5" />, description: 'Traitements uniques' },
    { value: '100%', label: 'Naturel', icon: <Leaf className="w-5 h-5" />, description: 'Produits bio' },
    { value: '24/7', label: 'Réservation', icon: <Clock className="w-5 h-5" />, description: 'En ligne' }
  ];

  const packages = [
    {
      name: 'Découverte',
      price: '190€',
      duration: '2 heures',
      features: ['Soin du visage', 'Massage des mains', 'Accès hammam', 'Thé signature'],
      color: 'from-gray-100 to-gray-50',
      popular: false
    },
    {
      name: 'Élégance',
      price: '350€',
      duration: '3 heures',
      features: ['Soin visage premium', 'Massage complet', 'Enveloppement corps', 'Collation santé'],
      color: 'from-rose-50 to-pink-50',
      popular: true
    },
    {
      name: 'Prestige',
      price: '590€',
      duration: '5 heures',
      features: ['Rituel signature', 'Massage aux pierres', 'Soin corps luxe', 'Déjeuner gastronomique', 'Salle privative'],
      color: 'from-amber-50 to-orange-50',
      popular: false
    }
  ];

  // Effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Functions
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    const message = `Bonjour Spa Beauté,

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-amber-50 text-gray-800 antialiased overflow-x-hidden">
      {/* Top Banner */}
      <motion.div 
        className="bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 text-white py-2 px-4 text-center"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
      >
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2">
          <div className="flex items-center">
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="font-semibold">OFFRE EXCLUSIVE :</span>
          </div>
          <span className="font-bold">Première visite -20% sur tous les soins</span>
          <span className="hidden sm:inline mx-2">•</span>
          <span>Valable jusqu&apos;au 30/12</span>
        </div>
      </motion.div>

      {/* Header */}
      <motion.header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 shadow-lg backdrop-blur-lg py-3' 
            : 'bg-transparent py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection('accueil')}
            >
              <div className={`w-12 h-12 rounded-2xl ${isScrolled ? 'bg-gradient-to-br from-rose-400 to-pink-500' : 'bg-white/20 backdrop-blur-sm'} flex items-center justify-center mr-3 shadow-lg`}>
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className={`text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>Éclat Beauté</div>
                <div className={`text-lg font-light ${isScrolled ? 'text-pink-600' : 'text-white/90'}`}>Spa & Wellness</div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {['accueil', 'services', 'traitements', 'thérapeutes', 'témoignages', 'contact'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`transition-colors font-light tracking-wide ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-pink-600' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </motion.button>
              ))}
              
              <motion.button
                onClick={() => scrollToSection('contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full hover:shadow-xl transition-all font-medium shadow-lg"
              >
                Réserver
              </motion.button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden">
              <motion.button
                onClick={() => scrollToSection('contact')}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full text-sm font-medium"
              >
                Réserver
              </motion.button>
              
              <motion.button
                className="p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? (
                  <X className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
                ) : (
                  <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div 
              className="fixed right-0 top-0 h-full w-64 bg-white shadow-2xl z-50"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
            >
              <div className="flex flex-col h-full pt-20 px-6 space-y-6">
                {['accueil', 'services', 'traitements', 'thérapeutes', 'témoignages', 'contact'].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => {
                      scrollToSection(item);
                      setIsMobileMenuOpen(false);
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="text-lg text-gray-700 hover:text-pink-600 transition-colors py-3 text-left border-b border-gray-100"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="accueil" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-900/30 via-pink-900/20 to-transparent z-10" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-20 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <motion.div
                className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-light mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Crown className="w-4 h-4 mr-2" />
                Luxe & Bien-être depuis 2010
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                L&apos;art du
                <span className="block font-serif italic mt-2">
                  bien-être
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Découvrez un sanctuaire de sérénité où le luxe rencontre le bien-être. 
                Des soins personnalisés pour révéler votre beauté naturelle.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full hover:shadow-2xl transition-all font-medium text-lg flex items-center justify-center group shadow-xl"
                >
                  <span>Réserver un soin</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <motion.button
                  onClick={() => scrollToSection('services')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full hover:bg-white/20 transition-all font-medium text-lg"
                >
                  Découvrir nos soins
                </motion.button>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Floating Elements */}
                <motion.div 
                  className="absolute -top-10 -right-10 bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-xl max-w-sm border border-white/20"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center mr-4">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Élu meilleur spa</div>
                      <div className="text-sm text-white/80">Paris 2023</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-10 -left-10 bg-white/10 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center mr-3">
                      <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-white">100% Naturel</div>
                      <div className="text-xs text-white/80">Produits bio</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-6 h-6 text-white/70" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-white to-rose-50">
        <div className="container mx-auto px-4">
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
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 mb-4 mx-auto group-hover:from-rose-200 group-hover:to-pink-200 transition-all">
                  <div className="text-pink-600">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-light text-gray-900 mb-2 font-serif">{stat.value}</div>
                <div className="font-medium text-gray-700 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-rose-100 text-pink-600 text-sm font-light mb-4">
              Nos Univers
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 font-serif">
              Expériences uniques
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez nos soins signature, conçus pour vous offrir une expérience sensorielle unique
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredService(idx)}
                onHoverEnd={() => setHoveredService(null)}
                className="group relative"
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-pink-100">
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <div className="text-white">
                      {service.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-light text-gray-900 mb-3 group-hover:text-pink-600 transition-colors font-serif">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center text-gray-700">
                        <Check className="w-4 h-4 text-pink-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-6 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <div className="text-2xl font-light text-gray-900 font-serif">{service.price}</div>
                        <div className="text-sm text-gray-500">{service.duration}</div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scrollToSection('contact')}
                        className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-200 transition-colors"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments Section */}
      <section id="traitements" className="py-20 bg-gradient-to-b from-rose-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-pink-100 text-pink-600 text-sm font-light mb-4">
              Nos Signatures
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 font-serif">
              Rituels d&apos;exception
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Des soins exclusifs conçus avec des ingrédients précieux pour une expérience inoubliable
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="lg:w-2/3">
                  <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-pink-500/20 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-20" />
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'
                      }}
                    />
                    <div className="absolute bottom-8 left-8 z-30 text-white">
                      <div className="text-3xl font-light font-serif">{treatments[activeTreatment].name}</div>
                      <div className="text-lg opacity-90">{treatments[activeTreatment].duration} • {treatments[activeTreatment].price}</div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-1/3">
                  <div className="space-y-4">
                    {treatments.map((treatment, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => setActiveTreatment(idx)}
                        whileHover={{ x: 5 }}
                        className={`w-full text-left p-6 rounded-2xl transition-all ${
                          idx === activeTreatment 
                            ? 'bg-gradient-to-r from-rose-50 to-pink-50 border-l-4 border-pink-500 shadow-lg' 
                            : 'bg-white hover:bg-gray-50 border border-gray-100'
                        }`}
                      >
                        <div className="flex items-start">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                            idx === activeTreatment ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {treatment.icon}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 mb-1">{treatment.name}</div>
                            <div className="text-sm text-gray-600">{treatment.duration} • {treatment.price}</div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 grid md:grid-cols-3 gap-6">
                {treatments[activeTreatment].benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center mr-3">
                        <Check className="w-4 h-4" />
                      </div>
                      <div className="font-medium text-gray-900">{benefit}</div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {treatments[activeTreatment].description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Therapists Section */}
      <section id="thérapeutes" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-rose-100 text-pink-600 text-sm font-light mb-4">
              Notre Équipe
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 font-serif">
              Des mains expertes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Rencontrez nos thérapeutes dédiés à votre bien-être, formés aux techniques les plus avancées
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {therapists.map((therapist, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white to-gray-50 shadow-lg hover:shadow-2xl transition-all duration-500">
                  {/* Image Placeholder */}
                  <div className="h-64 bg-gradient-to-br from-rose-400/20 to-pink-500/20 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
                        <User className="w-16 h-16 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-light text-gray-900 font-serif mb-1">{therapist.name}</h3>
                        <p className="text-pink-600 font-medium">{therapist.specialty}</p>
                      </div>
                      <div className="flex items-center bg-pink-50 text-pink-600 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-current mr-1" />
                        <span className="font-medium">{therapist.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">{therapist.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Briefcase className="w-4 h-4 mr-2" />
                        <span>{therapist.experience}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{therapist.availability}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {therapist.specialties.map((specialty, sIdx) => (
                        <span key={sIdx} className="px-3 py-1 bg-rose-50 text-pink-600 rounded-full text-sm">
                          {specialty}
                        </span>
                      ))}
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection('contact')}
                      className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full hover:shadow-lg transition-all font-medium"
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

      {/* Packages Section */}
      <section className="py-20 bg-gradient-to-b from-white to-rose-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-100 text-amber-600 text-sm font-light mb-4">
              Forfaits
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 font-serif">
              Expériences complètes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Des journées de bien-être pensées pour vous offrir une évasion totale
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="relative"
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="px-4 py-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-full text-sm font-medium shadow-lg">
                      Plus Populaire
                    </div>
                  </div>
                )}
                
                <div className={`relative rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  pkg.popular ? 'border-2 border-amber-200' : 'border border-gray-100'
                } bg-gradient-to-b ${pkg.color}`}>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-light text-gray-900 font-serif mb-2">{pkg.name}</h3>
                    <div className="text-4xl font-light text-gray-900 mb-2 font-serif">{pkg.price}</div>
                    <div className="text-gray-600">{pkg.duration}</div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {pkg.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center">
                        <Check className="w-5 h-5 text-emerald-500 mr-3" />
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
                    className={`w-full py-3 rounded-full font-medium ${
                      pkg.popular 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg' 
                        : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:shadow-lg'
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

      {/* Testimonials Section */}
      <section id="témoignages" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-rose-100 text-pink-600 text-sm font-light mb-4">
              Témoignages
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 font-serif">
              Leurs expériences
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez ce que nos clients disent de leur expérience au spa
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-8 md:p-12">
                  <div className="flex items-start mb-8">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-semibold text-xl mr-6">
                      {testimonials[activeTestimonial].image}
                    </div>
                    <div>
                      <h3 className="text-2xl font-light text-gray-900 font-serif">
                        {testimonials[activeTestimonial].name}
                      </h3>
                      <p className="text-pink-600">{testimonials[activeTestimonial].role}</p>
                      <div className="flex items-center mt-2">
                        {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <QuoteIcon className="w-12 h-12 text-pink-200 mb-6" />
                  
                  <p className="text-xl text-gray-700 italic mb-8 leading-relaxed">
                    &quot;{testimonials[activeTestimonial].content}&quot;
                  </p>
                  
                  <div className="pt-8 border-t border-pink-100">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="text-sm text-gray-500">Soin réalisé</div>
                        <div className="font-medium text-gray-900">{testimonials[activeTestimonial].treatment}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Relation client</div>
                        <div className="font-medium text-gray-900">{testimonials[activeTestimonial].duration}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <div className="flex justify-center mt-8 space-x-3">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === activeTestimonial 
                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              
              <button
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
              >
                <RightArrow className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-rose-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-start"
          >
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-rose-100 text-pink-600 text-sm font-light mb-4">
                Réservation
              </div>
              
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 font-serif">
                Votre moment de détente
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Réservez votre expérience bien-être et laissez-nous prendre soin de vous
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start p-6 bg-white rounded-2xl shadow-sm">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mr-6">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Téléphone</h3>
                    <a href="tel:33123456789" className="text-xl text-gray-600 hover:text-pink-600 transition-colors">
                      01 23 45 67 89
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Du lundi au samedi, 9h-20h</p>
                  </div>
                </div>
                
                <div className="flex items-start p-6 bg-white rounded-2xl shadow-sm">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mr-6">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                    <a href="mailto:reservation@eclatbeaute.fr" className="text-xl text-gray-600 hover:text-pink-600 transition-colors">
                      reservation@eclatbeaute.fr
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start p-6 bg-white rounded-2xl shadow-sm">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mr-6">
                    <MapPinIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Adresse</h3>
                    <p className="text-xl text-gray-600">16 Avenue Montaigne, 75008 Paris</p>
                    <button className="text-sm text-pink-600 hover:underline mt-1 flex items-center">
                      <Map className="w-4 h-4 mr-1" />
                      Voir sur la carte
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 p-8 bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl">
                <h3 className="font-medium text-gray-900 mb-6 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Horaires d&apos;ouverture
                </h3>
                <div className="space-y-4">
                  {[
                    { day: 'Lundi - Vendredi', hours: '9h - 20h' },
                    { day: 'Samedi', hours: '9h - 19h' },
                    { day: 'Dimanche', hours: '10h - 18h' },
                    { day: 'Jours fériés', hours: 'Sur rendez-vous' }
                  ].map((schedule, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 border-b border-rose-100 last:border-0">
                      <span className="text-gray-600">{schedule.day}</span>
                      <span className="font-medium text-gray-900">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-rose-50 border border-rose-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-rose-50 border border-rose-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      placeholder="01 23 45 67 89"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-rose-50 border border-rose-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="treatment" className="block text-sm font-medium text-gray-700 mb-2">
                      Type de soin *
                    </label>
                    <select
                      id="treatment"
                      value={formData.treatment}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-rose-50 border border-rose-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Sélectionnez</option>
                      <option value="soin-visage">Soin du visage</option>
                      <option value="massage">Massage relaxant</option>
                      <option value="rituel">Rituel signature</option>
                      <option value="forfait">Forfait journée</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="therapist" className="block text-sm font-medium text-gray-700 mb-2">
                      Thérapeute (optionnel)
                    </label>
                    <select
                      id="therapist"
                      value={formData.therapist}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-rose-50 border border-rose-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    >
                      <option value="">Aucune préférence</option>
                      <option value="elise">Élise Moreau</option>
                      <option value="sophie">Sophie Dubois</option>
                      <option value="camille">Camille Laurent</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                      Date souhaitée
                    </label>
                    <input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-rose-50 border border-rose-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                      Horaire souhaité
                    </label>
                    <select
                      id="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-rose-50 border border-rose-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    >
                      <option value="">Sélectionnez</option>
                      {generateTimeSlots().map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="preferences" className="block text-sm font-medium text-gray-700 mb-2">
                    Vos préférences
                  </label>
                  <textarea
                    id="preferences"
                    rows={3}
                    value={formData.preferences}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-rose-50 border border-rose-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
                    placeholder="Allergies, zones à éviter, ambiance souhaitée..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full hover:shadow-xl transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-6 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl"
                >
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-emerald-600 mr-3" />
                    <div>
                      <span className="font-medium text-emerald-800">Réservation confirmée !</span>
                      <p className="text-emerald-700 text-sm mt-1">
                        Nous vous contacterons dans les plus brefs délais pour finaliser votre réservation.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div className="mt-8 pt-8 border-t border-rose-100">
                <p className="text-sm text-gray-500 text-center mb-4">
                  Ou contactez-nous directement par WhatsApp
                </p>
                <motion.button
                  onClick={openWhatsApp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full hover:shadow-lg transition-all font-medium flex items-center justify-center shadow-md"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Échanger sur WhatsApp
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mr-3 shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold">Éclat Beauté</div>
                  <div className="text-lg font-light text-pink-300">Spa & Wellness</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Sanctuaire de bien-être où le luxe rencontre la sérénité. 
                Des soins d&apos;exception pour révéler votre beauté naturelle.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-6 text-white">Soins</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-pink-300 transition-colors">Soins du visage</a></li>
                <li><a href="#" className="hover:text-pink-300 transition-colors">Massages</a></li>
                <li><a href="#" className="hover:text-pink-300 transition-colors">Corps & Bien-être</a></li>
                <li><a href="#" className="hover:text-pink-300 transition-colors">Forfaits journée</a></li>
                <li><a href="#" className="hover:text-pink-300 transition-colors">Soins hommes</a></li>
                <li><a href="#" className="hover:text-pink-300 transition-colors">Cadeaux & coffrets</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-6 text-white">Contact</h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <Phone className="w-5 h-5 mr-3 mt-1 text-pink-400" />
                  <div>
                    <div>01 23 45 67 89</div>
                    <div className="text-sm text-gray-500 mt-1">Réservation</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mail className="w-5 h-5 mr-3 mt-1 text-pink-400" />
                  <div>reservation@eclatbeaute.fr</div>
                </li>
                <li className="flex items-start">
                  <MapPinIcon className="w-5 h-5 mr-3 mt-1 text-pink-400" />
                  <div>16 Avenue Montaigne<br />75008 Paris</div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-6 text-white">Newsletter</h3>
              <p className="text-gray-400 text-sm mb-4">
                Recevez nos offres exclusives et conseils bien-être
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-r-lg hover:opacity-90 transition-opacity">
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="text-sm text-gray-500">
                  <div className="flex items-center">
                    <ShieldCheck className="w-4 h-4 mr-2 text-emerald-400" />
                    <span>Paiement 100% sécurisé</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Éclat Beauté Spa & Wellness. Tous droits réservés.
              </p>
              <div className="flex space-x-6 text-sm text-gray-500">
                <a href="#" className="hover:text-pink-300 transition-colors">Mentions légales</a>
                <a href="#" className="hover:text-pink-300 transition-colors">CGV</a>
                <a href="#" className="hover:text-pink-300 transition-colors">Confidentialité</a>
                <a href="#" className="hover:text-pink-300 transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <motion.button
        onClick={() => scrollToSection('contact')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all group"
      >
        <Calendar className="w-7 h-7 text-white" />
        <span className="absolute -top-12 right-0 bg-pink-600 text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Réserver
        </span>
      </motion.button>

      <AnimatePresence>
        {isScrolled && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg flex items-center justify-center hover:shadow-xl transition-all"
          >
            <ChevronDown className="w-5 h-5 text-white rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.button
        onClick={openWhatsApp}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-28 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </motion.button>
    </div>
  );
}

// Quote icon component
const QuoteIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
  </svg>
);
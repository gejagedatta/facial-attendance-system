import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  CheckCircle2, 
  BarChart3, 
  FileSpreadsheet, 
  Users, 
  ArrowRight, 
  Menu, 
  X, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  ChevronRight, 
  Clock, 
  Building2, 
  GraduationCap, 
  CalendarDays,
  Smartphone,
  Check,
  Star,
  Lock,
  ChevronDown
} from 'lucide-react';

import {
  FaInstagram,
  FaLinkedin,
  FaFacebookF,
  FaYoutube
} from 'react-icons/fa';

// Framer Motion animation presets for rich, premium transitions
const fadeIn = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function App() {
  // Mobile navigation drawer toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Interactive Use Case Switcher (Colleges vs Corporates vs Events)
  const [activeUseCategory, setActiveUseCategory] = useState('colleges');

  // Interactive 3-Step simulator state
  const [activeSimStep, setActiveSimStep] = useState(1);

  // ROI Savings Calculator input state
  const [memberCount, setMemberCount] = useState(250);
  const [currentSystem, setCurrentSystem] = useState('manual'); // 'manual' or 'hardware'

  // Pricing toggle state (monthly vs yearly)
  const [billingCycle, setBillingCycle] = useState('yearly');

  // FAQ Accordion open/close state
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  // Use case details modeled beautifully for FaceAttend AI
  const useCaseDetails = {
    colleges: {
      title: "Automate Student Attendance on Campus",
      description: "Replace slow roll calls, physical paper registers, and proxy check-ins with an instant scan kiosk. Ensure student attendance is cleanly cataloged in less than a single second.",
      features: [
        "Anti-spoofing mechanism blocks photo or screen bypass fraud",
        "Auto-notifies parents of absent students over SMS/WhatsApp",
        "Integrates directly with Canvas, Moodle, and customized LMS",
        "Geofenced class scanning to verify physical presence inside halls"
      ],
      stats: { primary: "99.93%", label: "Accuracy Rate" }
    },
    corporates: {
      title: "Sleek Touchless Work Desk Check-Ins",
      description: "Allow your hybrid workspace teams to check in instantly using common tablets or browser-based selfies. Say goodbye to expensive, failure-prone thumb scanners.",
      features: [
        "No complex proprietary scanner hardware required",
        "Auto-generates monthly payroll XLS/CSV spreadsheets",
        "Supports flexible geofencing for off-site or field sales teams",
        "Real-time workspace active capacity dashboards"
      ],
      stats: { primary: "0.2s", label: "Match Time" }
    },
    events: {
      title: "Rapid Attendee Verification for Crowded Gates",
      description: "Ensure fast validation for massive tech summits, corporate libraries, and VIP events. Keep track of active entries with simple, smart mobile camera gates.",
      features: [
        "Enrolls thousand attendees in bulk with standard spreadsheet uploads",
        "Enables quick registration from secure browser selfie links",
        "Instant alert notifications sent to check-in operators",
        "Tracks peak traffic periods and average transit delays"
      ],
      stats: { primary: "100%", label: "Cloud Backups" }
    }
  };

  // Interactive ROI Calculator Helper Function
  const getROICalculation = () => {
    const hourlyRate = 350; // Average administrative resource cost per hour in Rupees
    const minutesSavedPerMemberPerMonth = currentSystem === 'manual' ? 120 : 60; 
    const hoursSaved = Math.round((memberCount * minutesSavedPerMemberPerMonth) / 60);
    const monetarySavings = hoursSaved * hourlyRate;
    return { hoursSaved, monetarySavings };
  };

  const { hoursSaved, monetarySavings } = getROICalculation();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased selection:bg-[#1E6091] selection:text-white">
      
      {/* ================================= */}
      {/* NAVBAR (Kwikpic-Styled Header) */}
      {/* ================================= */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-250/70 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo Group */}
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="p-2 bg-gradient-to-tr from-[#1E6091] to-[#1E6091] rounded-xl shadow-md flex items-center justify-center text-white">
                <Camera className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-[#0F172A] tracking-tight">
                  FaceAttend <span className="text-[#1E6091]">AI</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-slate-400">Smart Biometrics</span>
              </div>
            </div>

            {/* Desktop Navigation Link Menu */}
            <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
              <a href="#solutions" className="hover:text-[#1E6091] transition-colors">Solutions & Use-cases</a>
              <a href="#benefits" className="hover:text-[#1E6091] transition-colors">Our Benefits</a>
              <a href="#calculator" className="hover:text-[#1E6091] transition-colors flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" /> Savings Calculator
              </a>
              <a href="#pricing" className="hover:text-[#1E6091] transition-colors">Pricing</a>
              <a href="#faqs" className="hover:text-[#1E6091] transition-colors">FAQs</a>
            </div>

            {/* Desktop Join / Login Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={() => window.location.href="/login"}
                className="text-slate-600 hover:text-[#1E6091] font-bold text-sm transition-colors px-4 py-2"
              >
               Sign In
              </button>
              <button 
                onClick={() => window.location.href="/register"}
                className="bg-[#1E6091] hover:bg-[#15466b] text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-[#1E6091]/15 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Create Account
              </button>
            </div>

            {/* Mobile Navigation Drawer Toggle Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-[#0F172A] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Drawer Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-200 shadow-xl overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-6 text-base font-bold text-slate-600">
                <a href="#solutions" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#1E6091] transition-colors pb-2 border-b border-slate-100 font-bold">Solutions</a>
                <a href="#benefits" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#1E6091] transition-colors pb-2 border-b border-slate-100 font-bold">Benefits</a>
                <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#1E6091] transition-colors pb-2 border-b border-slate-100 flex items-center gap-1 text-[#1E6091] font-bold">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Savings Calculator
                </a>
                <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#1E6091] transition-colors pb-2 border-b border-slate-100 font-bold">Pricing</a>
                <a href="#faqs" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#1E6091] transition-colors pb-2 font-bold">FAQs</a>
                
                <div className="flex flex-col gap-3 pt-6 border-t border-slate-100">
                  <button 
                    onClick={() => { setMobileMenuOpen(false); window.location.href="/login"; }}
                    className="w-full text-center py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => { setMobileMenuOpen(false); window.location.href="/register"; }}
                    className="w-full text-center bg-[#1E6091] text-white py-3 rounded-xl font-bold hover:bg-[#15466b]"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ================================= */}
      {/* HERO SECTION */}
      {/* ================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-[#F8FAFC] py-16 md:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 bg-[#1E6091]/10 text-[#1E6091] px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide mb-6 shadow-xs">
              <Zap className="w-3.5 h-3.5 fill-[#1E6091]/20" /> Instant verification with zero hardware downloads required
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight">
              AI Powered Face Attendance. <br />
              <span className="bg-gradient-to-r from-[#1E6091] to-[#14476c] bg-clip-text text-transparent">
                Simple & Seamless.
              </span>
            </h1>

            <p className="mt-6 text-slate-600 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Automate attendance logging inside colleges, academic institutes, event hubs, and corporate workspaces. Members take a quick browser selfie to register and scan seamlessly.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button 
                onClick={() => window.location.href="/register"}
                className="group flex items-center justify-center gap-2 bg-[#1E6091] hover:bg-[#15466b] text-white px-8 py-4 rounded-2xl text-base font-bold shadow-lg shadow-[#1E6091]/20 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Create Free Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl text-base font-bold transition-all shadow-xs"
              >
                Already have an account? Sign In
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0">
              <div>
                <h3 className="text-2xl font-black text-slate-900">99.91%</h3>
                <p className="text-xs text-slate-500 font-semibold mt-1">Scanner Accuracy</p>
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#1E6091]">0.2 Sec</h3>
                <p className="text-xs text-slate-500 font-semibold mt-1">Match Speed Delay</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h3 className="text-2xl font-black text-slate-900">No Apps</h3>
                <p className="text-xs text-slate-500 font-semibold mt-1">Pure Browser Selfie</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-500 font-semibold">
  <span>✓ Trusted by 50+ Institutions</span>
  <span>✓ 10,000+ Attendance Records</span>
  <span>✓ 99.91% Accuracy</span>
</div>
            </div>
          </motion.div>

          {/* Right visual camera scanner mockup container */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-2 bg-gradient-to-r from-sky-100 to-indigo-100 rounded-[32px] blur-lg opacity-60"></div>
              
              {/* Mock camera interface card */}
              <div className="relative bg-white p-6 rounded-[30px] border border-slate-200 shadow-xl">
                
                {/* Live viewfinder simulation container */}
                <div className="relative h-64 bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center">
                  {/* Digital interface HUD outlines */}
                  <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:16px_16px] opacity-25"></div>
                  
                  {/* Laser green scanning bar line */}
                  <div className="absolute left-0 right-0 h-0.5 bg-green-400 shadow-[0_0_8px_#4ade80] animate-bounce"></div>

                  <div className="absolute top-4 left-4 bg-slate-900/80 text-white px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></span>
                    ACTIVE LIVENESS EYE GUARD
                  </div>

                  {/* Camera lens icon representation */}
                  <div className="text-center z-10 text-white">
                    <Camera className="w-12 h-12 text-[#1E6091] mx-auto animate-pulse mb-2" />
                    <p className="text-xs font-mono text-slate-400">Position Face Within Box...</p>
                  </div>
                </div>

                {/* Instant verification feed mockup list */}
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#1E6091] text-white flex items-center justify-center font-bold text-xs">
                        VK
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900">Vijay Kumar</h4>
                        <p className="text-[10px] text-slate-400">ID: #44019 • CS Dep</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                      99.91% Match • Present
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100 opacity-80">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">
                        SM
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900">Sneha Mehta</h4>
                        <p className="text-[10px] text-slate-400">ID: #44052 • Admin</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                      99.85% Match • Present
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ================================= */}
      {/* INTERACTIVE USE CASES CATEGORY */}
      {/* ================================= */}
      <section id="solutions" className="py-20 bg-white border-y border-slate-200/60 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E6091]">Versatile Solution</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Smarter Monitoring Tailored to You
            </h2>
            <p className="mt-4 text-slate-600">
              Switch categories below to interactively explore features designed for organizers, schools, shift-planners, and libraries.
            </p>

            {/* Categorization Selection Tab Row */}
            <div className="mt-8 inline-flex flex-wrap justify-center bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
              <button 
                onClick={() => setActiveUseCategory('colleges')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeUseCategory === 'colleges' 
                    ? 'bg-white text-[#1E6091] shadow-md border border-slate-100' 
                    : 'text-slate-500 hover:text-[#0F172A]'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                For Colleges & Institutes
              </button>
              <button 
                onClick={() => setActiveUseCategory('corporates')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeUseCategory === 'corporates' 
                    ? 'bg-white text-[#1E6091] shadow-md border border-slate-100' 
                    : 'text-slate-500 hover:text-[#0F172A]'
                }`}
              >
                <Building2 className="w-4 h-4" />
                For Corporate Shift Teams
              </button>
              <button 
                onClick={() => setActiveUseCategory('events')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeUseCategory === 'events' 
                    ? 'bg-white text-[#1E6091] shadow-md border border-slate-100' 
                    : 'text-slate-500 hover:text-[#0F172A]'
                }`}
              >
                <CalendarDays className="w-4 h-4" />
                For Events & Libraries
              </button>
            </div>
          </div>

          {/* Dynamic Content Panel Display */}
          <div className="bg-slate-50/50 rounded-3xl border border-slate-200 p-8 sm:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Tab left details column */}
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#1E6091] bg-[#1E6091]/10 px-3 py-1 rounded-full border border-[#1E6091]/20">
                  Targeted System Mode
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-4 leading-tight">
                  {useCaseDetails[activeUseCategory].title}
                </h3>
                <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                  {useCaseDetails[activeUseCategory].description}
                </p>

                <div className="mt-8 space-y-3.5">
                  {useCaseDetails[activeUseCategory].features.map((feat, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="mt-0.5 flex-shrink-0 bg-green-100 p-1 rounded-full text-green-700">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-slate-700 text-sm font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tab right preview dashboard illustration card */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-extrabold tracking-wide text-slate-400 uppercase">Live Metrics Sync</span>
                  <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-green-100">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Operational
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                    <h4 className="text-3xl font-black text-[#1E6091]">
                      {useCaseDetails[activeUseCategory].stats.primary}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 font-semibold">
                      {useCaseDetails[activeUseCategory].stats.label}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                    <h4 className="text-3xl font-black text-slate-900">Auto</h4>
                    <p className="text-xs text-slate-500 mt-1 font-semibold">Scheduled Alerts</p>
                  </div>
                </div>

                {/* Simulated XLS reports mockup box */}
                <div className="mt-4 bg-slate-50/60 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg">
                      <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slate-900">Daily-Registry-Sync.xlsx</h5>
                      <p className="text-[10px] text-slate-400">Ready to download • 24KB</p>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-[#1E6091] hover:underline flex items-center">
                    Export <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ================================= */}
      {/* 3-STEP PIPELINE SIMULATION */}
      {/* ================================= */}
      <section id="how-it-works" className="py-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E6091]">Interactive Preview</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            The Interactive 3-Step Setup Guide
          </h2>
          <p className="mt-4 text-slate-600">
            Click on any of the registration steps below to preview how our browser biometric ecosystem generates checks automatically.
          </p>
        </div>

        {/* Step Trigger Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <button 
            onClick={() => setActiveSimStep(1)}
            className={`text-left p-6 rounded-2xl border transition-all ${
              activeSimStep === 1 
                ? 'bg-white border-[#1E6091] shadow-lg shadow-[#1E6091]/5 ring-1 ring-[#1E6091]/15' 
                : 'bg-transparent border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`w-8 h-8 rounded-lg font-bold text-sm flex items-center justify-center ${
                activeSimStep === 1 ? 'bg-[#1E6091] text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                01
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Step One</span>
            </div>
            <h3 className="text-lg font-black text-slate-900 mt-4">Scan Unique Join QR</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Create a group on your host panel, and display your auto-generated enrollment QR at entry gates.
            </p>
          </button>

          <button 
            onClick={() => setActiveSimStep(2)}
            className={`text-left p-6 rounded-2xl border transition-all ${
              activeSimStep === 2 
                ? 'bg-white border-[#1E6091] shadow-lg shadow-[#1E6091]/5 ring-1 ring-[#1E6091]/15' 
                : 'bg-transparent border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`w-8 h-8 rounded-lg font-bold text-sm flex items-center justify-center ${
                activeSimStep === 2 ? 'bg-[#1E6091] text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                02
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Step Two</span>
            </div>
            <h3 className="text-lg font-black text-slate-900 mt-4">2-Sec Web Selfie Capture</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Members register by capturing a fast browser photo. Our AI models analyze and extract the secure biometric vectors.
            </p>
          </button>

          <button 
            onClick={() => setActiveSimStep(3)}
            className={`text-left p-6 rounded-2xl border transition-all ${
              activeSimStep === 3 
                ? 'bg-white border-[#1E6091] shadow-lg shadow-[#1E6091]/5 ring-1 ring-[#1E6091]/15' 
                : 'bg-transparent border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`w-8 h-8 rounded-lg font-bold text-sm flex items-center justify-center ${
                activeSimStep === 3 ? 'bg-[#1E6091] text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                03
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Step Three</span>
            </div>
            <h3 className="text-lg font-black text-slate-900 mt-4">Auto XLS Logs Generation</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              The camera identifies attendees within milliseconds of entering. The attendance sheets sync automatically.
            </p>
          </button>

        </div>

        {/* Dynamic Sim Window based on activeSimStep */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-slate-50 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5">
              <span className="text-[11px] font-black uppercase text-[#1E6091] tracking-widest bg-[#1E6091]/10 px-3 py-1 rounded-full border border-[#1E6091]/20">
                Simulation Feed
              </span>
              
              {activeSimStep === 1 && (
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mt-4">Print or Display Portal QR</h3>
                  <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                    Once created, each tracking group receives a customizable web portal page and a dynamic scan link. Share this with your target group members.
                  </p>
                </div>
              )}

              {activeSimStep === 2 && (
                <div>
                  <h3 className="text-2xl font-black text-[#1E6091] mt-4">Zero-App Selfie Verification</h3>
                  <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                    Users do not download bloated external programs. The face detection utilizes modern canvas technologies built into standard smartphone web browsers.
                  </p>
                </div>
              )}

              {activeSimStep === 3 && (
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mt-4">Secure Biometric Storage</h3>
                  <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                    Your direct portrait uploads are mathematically mapped into light secure vectors. These are protected securely behind server firewalls.
                  </p>
                </div>
              )}

              <div className="mt-8 flex gap-3.5">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">100% Encrypted Database</h4>
                  <p className="text-[11px] text-slate-500">Fully compliant with international biometric policies.</p>
                </div>
              </div>
            </div>

            {/* Simulated Live Interface visual column */}
            <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-10 rounded-2xl border border-slate-200">
              
              {activeSimStep === 1 && (
                <div className="text-center space-y-4">
                  <div className="bg-white p-4 inline-block rounded-xl border border-slate-200 shadow-sm">
                    {/* Simplified QR block simulation */}
                    <div className="w-24 h-24 bg-slate-900 mx-auto p-1 grid grid-cols-4 gap-1">
                      <div className="bg-white w-full h-full"></div>
                      <div className="bg-slate-900 w-full h-full"></div>
                      <div className="bg-white w-full h-full"></div>
                      <div className="bg-white w-full h-full"></div>
                      <div className="bg-white w-full h-full"></div>
                      <div className="bg-slate-900 w-full h-full"></div>
                      <div className="bg-white w-full h-full"></div>
                      <div className="bg-slate-900 w-full h-full"></div>
                      <div className="bg-slate-900 w-full h-full"></div>
                      <div className="bg-white w-full h-full"></div>
                      <div className="bg-slate-900 w-full h-full"></div>
                      <div className="bg-white w-full h-full"></div>
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-slate-950">Group-Portal-Class2026.qr</h4>
                  <p className="text-xs text-slate-400">Scan dynamically using standard iPhone or Android camera</p>
                </div>
              )}

              {activeSimStep === 2 && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-[#1E6091]/10 text-[#1E6091] border border-[#1E6091]/25 rounded-full flex items-center justify-center mx-auto animate-bounce">
                    <Smartphone className="w-8 h-8" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-950">Active Browser Snapshot Alignment</h4>
                  <p className="text-xs text-slate-400">Align nose, forehead, and cheeks to build unique coordinate map</p>
                </div>
              )}

              {activeSimStep === 3 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200">
                    <span className="text-xs font-bold text-slate-800">Grade 12 Physics Attendance</span>
                    <span className="text-xs font-black text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-100">100% Sorted</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200">
                    <span className="text-xs font-bold text-slate-800">Research Wing Entry logs</span>
                    <span className="text-xs font-black text-[#1E6091] bg-slate-50 px-2 py-0.5 rounded border border-slate-100">Synchronized</span>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>

      </section>

      {/* ================================= */}
      {/* VALUE ADVANTAGE GRID (BENEFITS) */}
      {/* ================================= */}
      <section id="benefits" className="py-20 bg-white border-y border-slate-200/60 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E6091]">Platform Edge</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Why Teams Switch to FaceAttend AI
            </h2>
            <p className="mt-4 text-slate-600">
              Empowered with lightning matching pipelines, strict security regulations, and simple bulk reporting sheets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Advantage 1 */}
            <div className="bg-slate-50 hover:bg-white p-8 rounded-3xl border border-slate-200 hover:border-[#1E6091]/30 transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#1E6091]/10 text-[#1E6091] rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">0.2s Match Speed</h3>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                Our lightweight deep networks process face-grids instantly to secure instant, real-time results.
              </p>
            </div>

            {/* Advantage 2 */}
            <div className="bg-slate-50 hover:bg-white p-8 rounded-3xl border border-slate-200 hover:border-[#1E6091]/30 transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Advanced Liveness Checks</h3>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                Smart anti-proxy triggers block attempts using standard photo printouts or video playbacks from devices.
              </p>
            </div>

            {/* Advantage 3 */}
            <div className="bg-slate-50 hover:bg-white p-8 rounded-3xl border border-slate-200 hover:border-[#1E6091]/30 transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">No Apps to Download</h3>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                Avoid memory or permission arguments on personal phones. Enrollment occurs entirely inside standard web browsers.
              </p>
            </div>

            {/* Advantage 4 */}
            <div className="bg-slate-50 hover:bg-white p-8 rounded-3xl border border-slate-200 hover:border-[#1E6091]/30 transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 bg-pink-100 text-pink-700 rounded-2xl flex items-center justify-center mb-6">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Custom Spreadsheet Sync</h3>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                Instantly export daily records in premium Excel, PDF, or raw CSV. Maintain flawless historical check-ins.
              </p>
            </div>

            {/* Advantage 5 */}
            <div className="bg-slate-50 hover:bg-white p-8 rounded-3xl border border-slate-200 hover:border-[#1E6091]/30 transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">One-Click Bulk Imports</h3>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                Have thousands of students or employees? Easily load your existing directories with standard CSV master tables.
              </p>
            </div>

            {/* Advantage 6 */}
            <div className="bg-slate-50 hover:bg-white p-8 rounded-3xl border border-slate-200 hover:border-[#1E6091]/30 transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 bg-sky-100 text-sky-700 rounded-2xl flex items-center justify-center mb-6">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Bank-Grade Encryption</h3>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                All raw imagery is converted into coordinate floats. Vector datasets are stored with AES-256 secure hash layers.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================================= */}
      {/* INTERACTIVE SAVINGS CALCULATOR */}
      {/* ================================= */}
      <section id="calculator" className="py-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#1E6091]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Interactive sliders column */}
            <div className="lg:col-span-7">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E6091] flex items-center gap-1.5 mb-2">
                <Sparkles className="w-4 h-4 text-amber-500" /> Real-time ROI Calculator
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                How Much Resource & Hours Can You Save?
              </h2>
              <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
                Calculate the hours spent manually tracking attendance or managing hardware scanner issues in your organization.
              </p>

              {/* Slider Input Block */}
              <div className="mt-10">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-slate-300 font-bold text-sm">Number of Members (Students/Employees)</label>
                  <span className="text-2xl font-black text-[#FFE600]">{memberCount} Members</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="1000" 
                  step="10"
                  value={memberCount}
                  onChange={(e) => setMemberCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#1E6091]"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-2">
                  <span>20 Members</span>
                  <span>500 Members</span>
                  <span>1,000 Members</span>
                </div>
              </div>

              {/* Method choice radio rows */}
              <div className="mt-8">
                <label className="text-slate-300 font-bold text-sm block mb-3">Your Current Tracking Method</label>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setCurrentSystem('manual')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      currentSystem === 'manual' 
                        ? 'bg-[#1E6091] text-white shadow' 
                        : 'bg-slate-800/80 text-slate-400 border border-slate-700/60'
                    }`}
                  >
                    Manual Registers / ID Sheets
                  </button>
                  <button
                    onClick={() => setCurrentSystem('hardware')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      currentSystem === 'hardware' 
                        ? 'bg-[#1E6091] text-white shadow' 
                        : 'bg-slate-800/80 text-slate-400 border border-slate-700/60'
                    }`}
                  >
                    Physical Biometric Hardware Devices
                  </button>
                </div>
              </div>
            </div>

            {/* Savings Display box */}
            <div className="lg:col-span-5 bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center lg:text-left">
              <h3 className="text-lg font-bold text-slate-300 mb-6">Your Estimated Monthly Savings</h3>
              
              <div className="space-y-6">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block">Time Saved in Scans</span>
                  <div className="flex items-baseline justify-center lg:justify-start gap-1.5 mt-1">
                    <span className="text-4xl sm:text-5xl font-black text-[#FFE600]">{hoursSaved}</span>
                    <span className="text-slate-400 font-bold text-sm">Hours / mo</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800">
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block">Estimated Resource Value Saved</span>
                  <div className="flex items-baseline justify-center lg:justify-start gap-1.5 mt-1">
                    <span className="text-4xl sm:text-5xl font-black text-green-400">₹{monetarySavings.toLocaleString('en-IN')}</span>
                    <span className="text-slate-400 font-bold text-sm">/ mo</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => window.location.href="/register"}
                className="w-full mt-8 bg-[#1E6091] hover:bg-[#15466b] text-white py-4 rounded-xl font-bold transition-all text-xs uppercase tracking-wider"
              >
                Create Free Account
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ================================= */}
      {/* PRICING MATRIX */}
      {/* ================================= */}
      <section id="pricing" className="py-20 bg-white border-y border-slate-200/60 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E6091]">Pricing Plans</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Pricing Built to Scale As You Grow
            </h2>
            <p className="mt-4 text-slate-600">
              No hidden hardware licensing setup fees. Sign up on our transparent monthly or yearly tiers.
            </p>

            {/* Interactive Yearly Billing cycle toggle */}
            <div className="mt-8 inline-flex items-center gap-2 bg-slate-100 p-1 rounded-full border border-slate-200">
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  billingCycle === 'monthly' 
                    ? 'bg-white text-[#1E6091] shadow' 
                    : 'text-slate-500 hover:text-[#0F172A]'
                }`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle('yearly')}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                  billingCycle === 'yearly' 
                    ? 'bg-white text-[#1E6091] shadow' 
                    : 'text-slate-500 hover:text-[#0F172A]'
                }`}
              >
                Yearly Saving
                <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">
                  SAVE 20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Starter Plan */}
            <div className="bg-slate-50 p-8 rounded-[30px] border border-slate-200 flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Perfect For Small Groups</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">Basic Starter</h3>
                
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-slate-950">
                    ₹{billingCycle === 'monthly' ? "999" : "799"}
                  </span>
                  <span className="text-slate-500 text-xs font-semibold">/ month</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Billed {billingCycle === 'yearly' ? 'annually' : 'monthly'}</p>

                <div className="mt-6 py-2 border-y border-slate-200 text-xs font-bold text-[#1E6091] uppercase tracking-wider">
                  Up to 100 Active Members
                </div>

                <ul className="space-y-4 mt-8">
                  <li className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Real-time Face recognition scan</span>
                  </li>
                  <li className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Daily/Monthly PDF log exports</span>
                  </li>
                  <li className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Secure vector storage database</span>
                  </li>
                  <li className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Standard anti-spoof protection</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => window.location.href="/register"}
                className="w-full mt-10 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 py-4 rounded-xl font-bold transition-all text-xs uppercase tracking-wider"
              >
                Start Free
              </button>
            </div>

            {/* Popular Pro Plan */}
            <div className="relative bg-white p-8 rounded-[30px] border-2 border-[#1E6091] flex flex-col justify-between shadow-xl ring-4 ring-[#1E6091]/5">
              
              <div className="absolute -top-4 right-8 bg-[#1E6091] text-white text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                RECOMMENDED POPULAR
              </div>

              <div>
                <span className="text-xs text-[#1E6091] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#1E6091]" /> Ultimate Setup
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">Professional Pro</h3>
                
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-slate-950">
                    ₹{billingCycle === 'monthly' ? "2,999" : "2,399"}
                  </span>
                  <span className="text-slate-500 text-xs font-semibold">/ month</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Billed {billingCycle === 'yearly' ? 'annually' : 'monthly'}</p>

                <div className="mt-6 py-2 border-y border-slate-200 text-xs font-bold text-[#1E6091] uppercase tracking-wider">
                  Unlimited Active Members
                </div>

                <ul className="space-y-4 mt-8">
                  <li className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-[#1E6091] flex-shrink-0" />
                    <span>Real-time recognition analytics</span>
                  </li>
                  <li className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-[#1E6091] flex-shrink-0" />
                    <span>Direct API sync with HRMS portals</span>
                  </li>
                  <li className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-[#1E6091] flex-shrink-0" />
                    <span>Bulk XLS & CSV dynamic exports</span>
                  </li>
                  <li className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-[#1E6091] flex-shrink-0" />
                    <span>Smart anti-photo bypass active</span>
                  </li>
                  <li className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-[#1E6091] flex-shrink-0" />
                    <span>Auto daily absenteeism email sheets</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => window.location.href="/register"}
                className="w-full mt-10 bg-[#1E6091] hover:bg-[#15466b] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#1E6091]/15 transition-all text-xs uppercase tracking-wider"
              >
                Get Started
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-slate-50 p-8 rounded-[30px] border border-slate-200 flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">For Massive Campus Clusters</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">Enterprise Custom</h3>
                
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-slate-950">Custom</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Contract Agreement Pricing</p>

                <div className="mt-6 py-2 border-y border-slate-200 text-xs font-bold text-[#1E6091] uppercase tracking-wider">
                  Limitless School & Campus setups
                </div>

                <ul className="space-y-4 mt-8">
                  <li className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Dedicated local VPC cloud network</span>
                  </li>
                  <li className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Custom ERP/LMS backend configurations</span>
                  </li>
                  <li className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Dedicated priority help desk chat channels</span>
                  </li>
                  <li className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>24/7 Priority Emergency Support SLA</span>
                  </li>
                </ul>
              </div>

              <button className="w-full mt-10 bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold transition-all text-xs uppercase tracking-wider">
                Contact Sales Team
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ================================= */}
      {/* FAQ SECTION */}
      {/* ================================= */}
      <section id="faqs" className="py-20 px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#1E6091]">Clear Answers</span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Frequently Asked Questions</h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Find immediate details regarding liveness security, setup, and device configurations.
          </p>
        </div>

        <div className="space-y-4">
          
          {/* FAQ 1 */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <button 
              onClick={() => setActiveFaqIndex(activeFaqIndex === 0 ? null : 0)}
              className="w-full text-left p-6 flex justify-between items-center text-slate-900 font-bold focus:outline-none"
            >
              <span>Do users need to install an app?</span>
              <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${activeFaqIndex === 0 ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeFaqIndex === 0 && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6 text-xs sm:text-sm text-slate-600 border-t border-slate-100 pt-4"
                >
                  No, absolutely not. Users enroll securely by submitting a fast browser portrait on our web portals directly. Only check-in camera terminals need a standard host device.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FAQ 2 */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <button 
              onClick={() => setActiveFaqIndex(activeFaqIndex === 1 ? null : 1)}
              className="w-full text-left p-6 flex justify-between items-center text-slate-900 font-bold focus:outline-none"
            >
              <span>How accurate is FaceAttend AI?</span>
              <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${activeFaqIndex === 1 ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeFaqIndex === 1 && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6 text-xs sm:text-sm text-slate-600 border-t border-slate-100 pt-4"
                >
                  Our algorithms achieve over 99.91% tracking matches. The biometric mesh system successfully adapts to facial adjustments, spectacles, and varying illumination setups.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FAQ 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <button 
              onClick={() => setActiveFaqIndex(activeFaqIndex === 2 ? null : 2)}
              className="w-full text-left p-6 flex justify-between items-center text-slate-900 font-bold focus:outline-none"
            >
              <span>Are portrait files securely protected and compliant?</span>
              <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${activeFaqIndex === 2 ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeFaqIndex === 2 && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6 text-xs sm:text-sm text-slate-600 border-t border-slate-100 pt-4"
                >
                  Completely. Raw portrait captures are converted to secure coordinate grids and processed over secure networks. Your datasets remain isolated from external search crawlers.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>
{/* FINAL CTA */}
<section className="py-20 px-6">
  <div className="max-w-5xl mx-auto bg-[#1E6091] text-white rounded-3xl p-10 text-center">

    <h2 className="text-3xl font-black">
      Ready to Transform Attendance?
    </h2>

    <p className="mt-4 text-slate-200">
      Start using FaceAttend AI today.
    </p>

    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

      <button
        onClick={() => window.location.href="/register"}
        className="bg-white text-[#1E6091] px-8 py-4 rounded-2xl font-bold"
      >
        Create Account
      </button>

      <button
        onClick={() => window.location.href="/login"}
        className="border border-white px-8 py-4 rounded-2xl font-bold"
      >
        Sign In
      </button>

    </div>

  </div>
</section>
      {/* ================================= */}
      {/* PREMIUM WHITE FOOTER (Kwikpic Replica) */}
      {/* ================================= */}
      <footer className="bg-white border-t border-slate-200 py-12 px-6 sm:px-8 lg:px-12 text-[#0F172A]">
        <div className="max-w-7xl mx-auto">
          
          {/* Top segment */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-slate-200">
            
            {/* Logo aperture signature */}
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#1E6091] rounded-xl text-white">
                <Camera className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-[#0F172A]">FaceAttend AI</span>
            </div>

            {/* Navigation links matching the layout of Kwikpic */}
            <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-xs sm:text-sm font-bold text-slate-600">
              <a href="#how-it-works" className="hover:text-[#1E6091] transition-colors">Home</a>
              <a href="#solutions" className="hover:text-[#1E6091] transition-colors">Photographer Benefits</a>
              <a href="#benefits" className="hover:text-[#1E6091] transition-colors">About Us</a>
              <a href="#calculator" className="hover:text-[#1E6091] transition-colors">Contact Us</a>
              <a href="#pricing" className="hover:text-[#1E6091] transition-colors">Pricing</a>
              <a href="#faqs" className="hover:text-[#1E6091] transition-colors">Blog</a>
              <a href="#faqs" className="hover:text-[#1E6091] transition-colors">FAQs</a>
            </div>

            {/* Social icons layout integrated with Font Awesome */}
            <div className="flex items-center gap-3">
              <button
                className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#1E6091] hover:text-white transition-all shadow-xs"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </button>

              <button
                className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#1E6091] hover:text-white transition-all shadow-xs"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </button>

              <button
                className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#1E6091] hover:text-white transition-all shadow-xs"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-4 h-4" />
              </button>

              <button
                className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#1E6091] hover:text-white transition-all shadow-xs"
                aria-label="Youtube"
              >
                <FaYoutube className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Bottom segment with copyright */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
            <p>© 2026 FaceAttend AI. All rights reserved.</p>
            <div className="flex gap-4 font-semibold">
              <span className="hover:text-[#1E6091] cursor-pointer transition-colors">Privacy policy</span>
              <span className="text-slate-300">|</span>
              <span className="hover:text-[#1E6091] cursor-pointer transition-colors">Terms & conditions</span>
              <span className="text-slate-300">|</span>
              <span className="hover:text-[#1E6091] cursor-pointer transition-colors">Refunds</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
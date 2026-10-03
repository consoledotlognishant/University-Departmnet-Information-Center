import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
  FileCheck2,
  BellRing,
  FileBarChart2,
  ArrowRight,
  BookOpen,
  Building2,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { CGULogo, cguLogoImg } from '../common/CGULogo';
import campusHero from '../../assets/images/university_campus_hero_1791001906396.jpg';

export const LandingPage: React.FC = () => {
  const { login } = useAuth();
  const { success, error } = useToast();

  const [viewMode, setViewMode] = useState<'landing' | 'login'>('landing');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'faculty' | 'student'>('admin');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      error('Please enter your username or registered institutional email.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const ok = login(username, password, selectedRole);
      setIsSubmitting(false);
      if (ok) {
        success('Authentication successful. Redirecting to your dashboard...', 'Welcome to UDIS');
      } else {
        error('Invalid credentials. You may use the one-click demo credentials below.');
      }
    }, 400);
  };

  const handleQuickDemo = (role: 'admin' | 'faculty' | 'student') => {
    if (role === 'admin') {
      setUsername('admin');
      setPassword('admin@cgu2026');
      setSelectedRole('admin');
      login('admin', 'admin@cgu2026', 'admin');
    } else if (role === 'faculty') {
      setUsername('ananya.s');
      setPassword('fac@cgu2026');
      setSelectedRole('faculty');
      login('ananya.s', 'fac@cgu2026', 'faculty');
    } else {
      setUsername('2401020374');
      setPassword('stu@cgu2026');
      setSelectedRole('student');
      login('2401020374', 'stu@cgu2026', 'student');
    }
    success(`Signed in as ${role.toUpperCase()} role.`, 'Demo Access Granted');
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      error('Please enter your university email address.');
      return;
    }
    setForgotPasswordOpen(false);
    success(
      `Password reset instructions have been dispatched to ${forgotEmail}. Please check your inbox.`,
      'Recovery Email Sent'
    );
    setForgotEmail('');
  };

  const renderLoginCard = () => (
    <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 text-slate-900 overflow-hidden">
      {/* Subtle University Logo Watermark inside Login Card */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
      >
        <img
          src={cguLogoImg}
          alt=""
          className="w-72 h-72 sm:w-80 sm:h-80 object-contain opacity-[0.06] transform scale-110"
        />
      </div>

      <div className="relative z-10">
        <div className="mb-6 flex items-center gap-3.5">
          <CGULogo className="w-12 h-12" />
          <div>
            <h3 className="text-xl font-bold text-slate-900 leading-tight">Institutional Login</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              C. V. Raman Global University Portal
            </p>
          </div>
        </div>

        {/* Role Selection Tabs */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Select Portal Role
          </label>
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setSelectedRole('admin');
                setUsername('admin');
              }}
              className={`py-1.5 text-xs font-medium rounded-md transition-all ${
                selectedRole === 'admin'
                  ? 'bg-white text-blue-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Admin / HOD
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedRole('faculty');
                setUsername('ananya.s');
              }}
              className={`py-1.5 text-xs font-medium rounded-md transition-all ${
                selectedRole === 'faculty'
                  ? 'bg-white text-blue-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Faculty
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedRole('student');
                setUsername('2401020374');
              }}
              className={`py-1.5 text-xs font-medium rounded-md transition-all ${
                selectedRole === 'student'
                  ? 'bg-white text-blue-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Student
            </button>
          </div>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Username / University Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin or 2401020374"
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700">Password</label>
              <button
                type="button"
                onClick={() => setForgotPasswordOpen(true)}
                className="text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-10 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-mono"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span className="text-xs text-slate-600">Remember credentials</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-75 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        {/* 1-Click Quick Demo Switchers */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2 text-center">
            Instant Demo Access (1-Click)
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="p-2 text-center rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-colors group"
            >
              <span className="block text-xs font-bold text-slate-800 group-hover:text-blue-700">
                HOD / Admin
              </span>
              <span className="block text-[10px] text-slate-500">Dr. Rajesh M.</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('faculty')}
              className="p-2 text-center rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-colors group"
            >
              <span className="block text-xs font-bold text-slate-800 group-hover:text-blue-700">
                Faculty
              </span>
              <span className="block text-[10px] text-slate-500">Prof. Ananya</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('student')}
              className="p-2 text-center rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-colors group"
            >
              <span className="block text-xs font-bold text-slate-800 group-hover:text-blue-700">
                Student
              </span>
              <span className="block text-[10px] text-slate-500">Ayush Das</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top University Brand Bar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CGULogo className="w-10 h-10" />
            <div>
              <span className="text-base font-bold tracking-tight text-slate-900 block leading-tight">
                UDIS
              </span>
              <span className="text-xs text-slate-500 block leading-tight">
                C. V. Raman Global University · Department Portal
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button
              onClick={() => setViewMode('landing')}
              className={`hover:text-slate-900 transition-colors ${
                viewMode === 'landing' ? 'text-blue-700 font-semibold' : ''
              }`}
            >
              Overview
            </button>
            <a href="#features" className="hover:text-slate-900 transition-colors">
              Modules
            </a>
            <a href="#roles" className="hover:text-slate-900 transition-colors">
              Role Portals
            </a>
            <a href="#departments" className="hover:text-slate-900 transition-colors">
              Departments
            </a>
            <a href="#security" className="hover:text-slate-900 transition-colors">
              Accreditation
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode('landing')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  viewMode === 'landing'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => setViewMode('login')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  viewMode === 'login'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                if (viewMode === 'landing') {
                  const el = document.getElementById('auth-section');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setViewMode('login');
                  }
                } else {
                  setViewMode('landing');
                }
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs transition-colors whitespace-nowrap hidden sm:block"
            >
              {viewMode === 'landing' ? 'Access Portal' : 'Explore UDIS'}
            </button>
          </div>
        </div>
      </header>

      {/* DEDICATED FULL-SCREEN LOGIN PAGE WITH GIANT WATERMARK BACKGROUND */}
      {viewMode === 'login' ? (
        <div className="relative flex-1 min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-slate-900 overflow-hidden">
          {/* Giant C. V. Raman Global University Logo Watermark in Background ONLY on Login Page */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
          >
            <img
              src={cguLogoImg}
              alt="C. V. Raman Global University Watermark"
              className="w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] object-contain opacity-[0.09] filter invert brightness-125"
            />
          </div>

          <div className="relative z-10 w-full max-w-md my-8">
            {renderLoginCard()}
          </div>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-slate-900 text-white py-16 md:py-24">
            {/* Background photo overlay */}
            <div className="absolute inset-0 z-0 opacity-25">
              <img
                src={campusHero}
                alt="University Campus Quadrangle"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/70" />
            </div>

            {/* University Logo Watermark behind Login Section in Hero */}
            <div
              aria-hidden="true"
              className="absolute -right-16 top-1/2 -translate-y-1/2 w-[540px] h-[540px] pointer-events-none select-none opacity-[0.08] z-0 hidden lg:flex items-center justify-center overflow-hidden"
            >
              <img
                src={cguLogoImg}
                alt="C. V. Raman Global University Watermark"
                className="w-full h-full object-contain filter invert"
              />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Hero Left Content */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/60 text-blue-300 text-xs font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>Next-Gen Academic ERP · NBA & NAAC Compliant</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  University Department <br />
                  <span className="text-blue-400">Information System</span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                  One centralized platform for managing students, faculty, courses, attendance, results,
                  and department communication with automated eligibility audits and role-governed security.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => setViewMode('login')}
                    className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md transition-colors inline-flex items-center gap-2 cursor-pointer"
                  >
                    Sign In to Portal <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="#features"
                    className="px-6 py-3 text-sm font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors"
                  >
                    Explore Modules
                  </a>
                </div>

                {/* Quick trust metrics */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-left">
                  <div>
                    <span className="block text-2xl font-bold text-white font-mono tabular-nums">480+</span>
                    <span className="text-xs text-slate-400">Department Students</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-white font-mono tabular-nums">24</span>
                    <span className="text-xs text-slate-400">Faculty Researchers</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-white font-mono tabular-nums">98.4%</span>
                    <span className="text-xs text-slate-400">Academic Audit Uptime</span>
                  </div>
                </div>
              </div>

              {/* Hero Right: Interactive Login Card */}
              <div id="auth-section" className="lg:col-span-5">
                {renderLoginCard()}
              </div>
            </div>
          </section>

      {/* Forgot Password Modal */}
      {forgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 p-6 animate-in fade-in duration-150">
            <h4 className="text-base font-bold text-slate-900 mb-2">Reset Portal Password</h4>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Enter your registered university email ID. A secure one-time password recovery link will be
              dispatched by the Department Systems Administrator.
            </p>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="e.g. 2401020374@cgu-odisha.ac.in"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                required
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setForgotPasswordOpen(false)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors shadow-2xs"
                >
                  Send Recovery Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Feature Modules Overview Section */}
      <section id="features" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 block mb-2">
              System Architecture & Core Modules
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Engineered for Complete Department Operations
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              The UDIS framework maps standard university academic protocols into an integrated digital workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-white transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Student Information</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Comprehensive profile tracking with roll numbers, contact information, guardians, semester progression, cumulative GPA, and enrolled subjects.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-white transition-all">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Faculty Management</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instructor directories, academic qualifications, research specializations, office hours, and subject teaching assignments.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-white transition-all">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Daily Attendance Audits</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Classroom roll-call verification by faculty with subject-wise percentages, automatic alerts for students under the mandatory 75% threshold.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-white transition-all">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Marks & Results Engine</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Evaluation tracking for Internal, Sessional, and External examinations with automatic 10-point letter grading and department transcripts.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-white transition-all">
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <BellRing className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Notice & Circular Board</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Targeted departmental bulletins for faculty, students, or entire departments with urgency tags, priority levels, and draft/publish workflows.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-white transition-all">
              <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center mb-4">
                <FileBarChart2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Analytical Reports</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Exportable CSV and printable PDF summaries for department statistics, accreditation audits, attendance trends, and enrollment metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role-Based Experience Section */}
      <section id="roles" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 block mb-2">
              Role-Based Access Control
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Tailored Portals for Every Stakeholder
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Each user group interacts with a dedicated interface strictly governed by institutional security protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Admin Card */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-4">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin / Head of Department</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Executive Department Governance</h3>
                <ul className="space-y-2 text-xs text-slate-600 mt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Manage all Students, Faculty, Courses & Subjects</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Department-wide attendance & grade auditing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Publish official notices & circulars</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Export institutional accreditation reports</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => handleQuickDemo('admin')}
                className="mt-6 w-full py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                Launch Admin View →
              </button>
            </div>

            {/* Faculty Card */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-4">
                  <Users className="w-4 h-4" />
                  <span>Faculty / Instructor</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Teaching & Evaluation Workspace</h3>
                <ul className="space-y-2 text-xs text-slate-600 mt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>View assigned subjects and class timetables</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Mark & update daily student attendance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Enter marks for Internal, Sessional & End-Sem</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Access student rosters and performance graphs</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => handleQuickDemo('faculty')}
                className="mt-6 w-full py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
              >
                Launch Faculty View →
              </button>
            </div>

            {/* Student Card */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md mb-4">
                  <GraduationCap className="w-4 h-4" />
                  <span>Student Portal</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Read-Only Academic Dashboard</h3>
                <ul className="space-y-2 text-xs text-slate-600 mt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Check overall & subject-wise attendance %</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Access semester grades, GPA & mark breakdown</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>View weekly class schedule & room allocations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Receive urgent departmental bulletins</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => handleQuickDemo('student')}
                className="mt-6 w-full py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
              >
                Launch Student View →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section id="departments" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 block mb-2">
              Academic Divisions
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Connected Departmental Infrastructure
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              UDIS powers interconnected academic branches with unified faculty and syllabus tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  CSE
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Computer Science & Engg.</h4>
                  <span className="text-[11px] text-slate-500">Established 2001 · HOD: Dr. Rajesh Mohanty</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Algorithms, Database Systems, Software Architecture, Machine Learning, and Cloud Systems.
              </p>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-200">
                <span>480 Students</span>
                <span>24 Faculty</span>
                <span>3 Programs</span>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  ECE
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Electronics & Comm. Engg.</h4>
                  <span className="text-[11px] text-slate-500">Established 2002 · HOD: Dr. Sunita Pattnaik</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Digital Signal Processing, Embedded Systems, VLSI Circuit Design, and Wireless Networks.
              </p>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-200">
                <span>360 Students</span>
                <span>18 Faculty</span>
                <span>2 Programs</span>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-slate-700 text-white flex items-center justify-center font-bold text-xs">
                  ME
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Mechanical Engineering</h4>
                  <span className="text-[11px] text-slate-500">Established 1999 · HOD: Dr. Debabrata Jena</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Thermal Engineering, Advanced Robotics, Additive Manufacturing, and Computational Mechanics.
              </p>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-200">
                <span>300 Students</span>
                <span>16 Faculty</span>
                <span>1 Program</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Footer */}
      <footer id="security" className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800 text-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <CGULogo className="w-8 h-8" />
                <div>
                  <span className="text-sm font-bold text-white block leading-tight">UDIS Portal</span>
                  <span className="text-[10px] text-slate-400 block leading-tight">C. V. Raman Global University</span>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed">
                University Department Information System is an institutional platform for academic governance, attendance audits, and examination administration.
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-white uppercase tracking-wider mb-3">Portal Links</h5>
              <ul className="space-y-2">
                <li>
                  <a href="#auth-section" className="hover:text-white transition-colors">
                    HOD & Admin Portal
                  </a>
                </li>
                <li>
                  <a href="#auth-section" className="hover:text-white transition-colors">
                    Faculty Workspace
                  </a>
                </li>
                <li>
                  <a href="#auth-section" className="hover:text-white transition-colors">
                    Student Academic Hub
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Examination Regulations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-white uppercase tracking-wider mb-3">Academic Guidelines</h5>
              <ul className="space-y-2">
                <li>
                  <span>Minimum 75% Attendance Requirement</span>
                </li>
                <li>
                  <span>10-Point Letter Grading Scheme (CBCS)</span>
                </li>
                <li>
                  <span>Continuous Internal Evaluation (CIE)</span>
                </li>
                <li>
                  <span>End-Semester Examination Rules</span>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-white uppercase tracking-wider mb-3">Support & IT Desk</h5>
              <p className="text-slate-400 leading-relaxed mb-2">
                For login assistance or roll number corrections, contact the Department Systems Coordinator.
              </p>
              <p className="text-slate-300 font-mono">sysadmin@cgu-odisha.ac.in</p>
              <p className="text-slate-400 mt-1">Intercom: 4012 / Tech Block 3</p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} University Department Information System (UDIS). All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span>Privacy Policy</span>
              <span>Academic Integrity</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )}
</div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { FaqSection } from './components/FaqSection';
import { DownloadAppSection } from './components/DownloadAppSection';
import { DepositCalculatorSection } from './components/DepositCalculatorSection';
import { RatesSection } from './components/RatesSection';
import { CardsAndAccountSection } from './components/CardsAndAccountSection';
import { FeedbackSection } from './components/FeedbackSection';
import { EmergencyHelpSection } from './components/EmergencyHelpSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('faq');
  const contentAreaRef = useRef<HTMLDivElement>(null);

  // Smooth transition on tab change
  useEffect(() => {
    if (contentAreaRef.current) {
      gsap.fromTo(
        contentAreaRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    // Smooth scroll down to main content area
    if (contentAreaRef.current) {
      const topOffset = contentAreaRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: Math.max(0, topOffset), behavior: 'smooth' });
    }
  };

  const handleBackToMainMenu = () => {
    setActiveTab('faq');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-[#00529C]/15 selection:text-[#00529C]">
      {/* Header bar with VietinBank logo & hotline */}
      <Header activeTab={activeTab} onSelectTab={handleSelectTab} />

      {/* Main Container */}
      <main className="flex-1">
        {/* Counter Welcome Banner & 7 Feature Touch Tabs */}
        <HeroBanner activeTab={activeTab} onSelectTab={handleSelectTab} />

        {/* Tab Content Display Area */}
        <div ref={contentAreaRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'faq' && (
            <FaqSection onBackToMainMenu={handleBackToMainMenu} />
          )}

          {activeTab === 'download_app' && (
            <DownloadAppSection />
          )}

          {activeTab === 'deposit_calc' && (
            <DepositCalculatorSection />
          )}

          {activeTab === 'rates' && (
            <RatesSection />
          )}

          {activeTab === 'open_account' && (
            <CardsAndAccountSection />
          )}

          {activeTab === 'feedback' && (
            <FeedbackSection />
          )}

          {activeTab === 'emergency' && (
            <EmergencyHelpSection />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer onSelectTab={handleSelectTab} />
    </div>
  );
}

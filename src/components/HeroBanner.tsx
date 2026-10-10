import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  HelpCircle,
  Smartphone,
  Calculator,
  TrendingUp,
  CreditCard,
  Star,
  PhoneCall,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import contentData from '../data/contentData.json';

interface HeroBannerProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ activeTab, onSelectTab }) => {
  const { brand, features } = contentData;
  const bannerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bannerRef.current && cardsRef.current) {
      gsap.fromTo(
        bannerRef.current.querySelector('.hero-text'),
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );

      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }, []);

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'HelpCircle':
        return <HelpCircle className="w-5 h-5" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5" />;
      case 'Calculator':
        return <Calculator className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      case 'CreditCard':
        return <CreditCard className="w-5 h-5" />;
      case 'Star':
        return <Star className="w-5 h-5" />;
      case 'PhoneCall':
        return <PhoneCall className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section ref={bannerRef} className="pt-6 pb-4 sm:pt-10 sm:pb-6">
      {/* Hero Welcome Message */}
      <div className="hero-text text-center space-y-3 max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#00529C] border border-blue-100 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{brand.bankName} · {brand.branchName}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Chào Mừng Quý Khách Đến Với <span className="text-[#00529C]">Quầy Giao Dịch Số</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Kiosk hỗ trợ tương tác thông minh: Giải đáp thắc mắc tài khoản, tải ứng dụng iPay, tra cứu lãi suất và nhận tư vấn trực tiếp từ chuyên viên.
        </p>
      </div>

      {/* 7 Feature Quick Access Tabs Grid */}
      <div
        ref={cardsRef}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-3.5 max-w-7xl mx-auto px-4 mt-8"
      >
        {features.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`p-3.5 sm:p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group border relative overflow-hidden ${
                isActive
                  ? 'bg-[#00529C] text-white border-[#00529C] shadow-md -translate-y-1'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-xs hover:border-[#00529C]/50'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-blue-50 text-[#00529C] group-hover:bg-[#00529C]/10'
                    }`}
                  >
                    {getFeatureIcon(item.icon)}
                  </div>
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    {item.number}
                  </span>
                </div>

                <div>
                  <h3
                    className={`font-bold text-xs sm:text-sm line-clamp-1 ${
                      isActive ? 'text-white' : 'text-slate-900 group-hover:text-[#00529C]'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-[11px] mt-1 line-clamp-2 leading-tight ${
                      isActive ? 'text-blue-100' : 'text-slate-500'
                    }`}
                  >
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <div
                className={`mt-3 pt-2 border-t text-[11px] font-semibold flex items-center justify-between ${
                  isActive
                    ? 'border-white/20 text-white'
                    : 'border-slate-100 text-[#00529C] opacity-0 group-hover:opacity-100 transition-opacity'
                }`}
              >
                <span>Xem chi tiết</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

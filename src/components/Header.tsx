import React, { useState } from 'react';
import { Phone, UserCheck, ShieldCheck } from 'lucide-react';
import contentData from '../data/contentData.json';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab }) => {
  const { brand } = contentData;
  const [logoSrc, setLogoSrc] = useState(brand.logo);

  const handleLogoError = () => {
    if (logoSrc !== brand.logoFallback) {
      setLogoSrc(brand.logoFallback);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Zone 1: Logo VietinBank ở góc bên trái, phần headbar */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectTab('faq')}
              className="flex items-center gap-3 group text-left cursor-pointer"
              title="VietinBank Kiosk"
            >
              <img
                src={logoSrc}
                alt="Logo VietinBank"
                onError={handleLogoError}
                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-102"
              />
              <div className="hidden sm:block border-l border-slate-200 pl-3">
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#00529C]">
                  {brand.branchName}
                </span>
                <span className="block text-xs text-slate-500 font-medium">
                  {brand.counterTitle}
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Fast Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {contentData.features.slice(0, 5).map((f) => {
              const isActive = activeTab === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => onSelectTab(f.id)}
                  className={`px-3 py-2 text-xs xl:text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#00529C] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#00529C] hover:bg-slate-50'
                  }`}
                >
                  {f.title}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Direct Advisor / Hotline */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={`tel:${brand.advisor.phone}`}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:border-[#00529C] hover:bg-blue-50/50 transition-colors text-xs"
              title="Gọi chuyên viên tư vấn"
            >
              <UserCheck className="w-4 h-4 text-[#00529C]" />
              <div className="text-left">
                <span className="block font-medium text-slate-900 leading-tight">
                  {brand.advisor.name}
                </span>
                <span className="block text-[11px] text-[#00529C] font-mono leading-tight">
                  {brand.advisor.phone}
                </span>
              </div>
            </a>

            <a
              href={`tel:${brand.hotline247.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#00529C] hover:bg-[#003e77] text-white font-medium text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Tổng đài 24/7:</span>
              <span className="font-mono">{brand.hotline247}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Sub-bar for mobile/tablet tab scrolling */}
      <div className="lg:hidden flex items-center gap-2 px-4 py-2 border-t border-slate-100 overflow-x-auto scrollbar-none bg-slate-50/70">
        {contentData.features.map((f) => {
          const isActive = activeTab === f.id;
          return (
            <button
              key={f.id}
              onClick={() => onSelectTab(f.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#00529C] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              {f.title}
            </button>
          );
        })}
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { Phone, ShieldCheck, MapPin, UserCheck, Heart } from 'lucide-react';
import contentData from '../data/contentData.json';

interface FooterProps {
  onSelectTab: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const { brand } = contentData;
  const [logoSrc, setLogoSrc] = useState(brand.logo);

  return (
    <footer className="mt-16 bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={logoSrc}
                alt="Logo VietinBank"
                onError={() => setLogoSrc(brand.logoFallback)}
                className="h-10 w-auto object-contain brightness-0 invert opacity-90"
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {brand.bankFullName} - {brand.slogan}. Đồng hành kiến tạo giải pháp tài chính số tin cậy cho người dân và doanh nghiệp.
            </p>
            <div className="text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#00529C]" />
                <span>{brand.branchName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#00529C]" />
                <span className="font-mono">{brand.hotline247} (24/7)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Features Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Tính năng Kiosk Quầy
            </h4>
            <ul className="space-y-2 text-xs">
              {contentData.features.slice(0, 4).map((f) => (
                <li key={f.id}>
                  <button
                    onClick={() => onSelectTab(f.id)}
                    className="hover:text-white transition-colors cursor-pointer text-slate-400"
                  >
                    {f.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Dịch vụ bổ trợ */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Dịch vụ tại phòng giao dịch
            </h4>
            <ul className="space-y-2 text-xs">
              {contentData.features.slice(4).map((f) => (
                <li key={f.id}>
                  <button
                    onClick={() => onSelectTab(f.id)}
                    className="hover:text-white transition-colors cursor-pointer text-slate-400"
                  >
                    {f.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Chuyên viên tư vấn quầy */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Hỗ trợ trực tiếp tại quầy
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-white">
                  {brand.advisor.name}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {brand.advisor.title}
              </p>
              <div className="pt-1">
                <a
                  href={`tel:${brand.advisor.phone}`}
                  className="text-xs font-mono font-bold text-blue-400 hover:text-blue-300 block"
                >
                  Hotline: {brand.advisor.phone}
                </a>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              Phục vụ từ thứ Hai đến thứ Sáu (8:00 - 17:00)
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} VietinBank. Tất cả các quyền được bảo lưu.</p>
          <div className="flex items-center gap-3">
            <span>Bảo mật chuẩn PCI-DSS & Quyết định 2345/QĐ-NHNN</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

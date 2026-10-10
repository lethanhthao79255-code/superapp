import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, Lock, AlertTriangle, Phone, Copy, Check } from 'lucide-react';
import contentData from '../data/contentData.json';

export const EmergencyHelpSection: React.FC = () => {
  const { emergencyHelp, brand } = contentData;
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const handleCopy = (phone: string) => {
    navigator.clipboard.writeText(phone.replace(/\s+/g, ''));
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  return (
    <div className="py-6 sm:py-10 max-w-5xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-red-600 font-semibold">
          An toàn bảo mật tối đa · VietinBank
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
          {emergencyHelp.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Các thao tác xử lý cấp bách khi gặp sự cố thẻ, mất điện thoại hoặc cần hỗ trợ bảo vệ tài khoản ngay lập tức.
        </p>
      </div>

      {/* Emergency Hotline Banner */}
      <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-red-100">
              Đường dây nóng hỗ trợ khẩn cấp 24/7
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight">
              {brand.hotline247}
            </h3>
            <p className="text-xs text-red-100/90">
              Phím 1: Khóa thẻ tự động khẩn cấp · Phím 2: Hỗ trợ iPay · Phím 0: Gặp tổng đài viên
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`tel:${brand.hotline247.replace(/\s+/g, '')}`}
            className="px-6 py-3 rounded-xl bg-white text-red-700 hover:bg-red-50 font-bold text-sm transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            <span>Gọi Ngay Bây Giờ</span>
          </a>
        </div>
      </div>

      {/* 3 Step Emergency Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <span>Hướng dẫn thao tác tự xử lý nhanh</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {emergencyHelp.emergencyActions.map((act, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">
                {act.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-mono bg-slate-50 p-3 rounded-xl border border-slate-100">
                {act.instruction}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Counter Advisors */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-[#00529C]" />
          <span>Danh bạ liên hệ trực tiếp tại {brand.branchName}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {emergencyHelp.hotlineList.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  {item.label}
                </span>
                <span className="text-lg font-extrabold font-mono text-[#00529C] block mt-1">
                  {item.value}
                </span>
                <span className="text-xs text-slate-500 block mt-0.5">
                  {item.sub}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <a
                  href={`tel:${item.value.replace(/\s+/g, '')}`}
                  className="flex-1 py-2 px-3 rounded-lg bg-[#00529C] hover:bg-[#003e77] text-white text-xs font-semibold text-center transition-colors cursor-pointer"
                >
                  Gọi trực tiếp
                </a>
                <button
                  onClick={() => handleCopy(item.value)}
                  className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  title="Sao chép số"
                >
                  {copiedPhone === item.value ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

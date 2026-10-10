import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  QrCode,
  Smartphone,
  ShieldCheck,
  Zap,
  Gift,
  ArrowRight,
  Download,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import contentData from '../data/contentData.json';

export const DownloadAppSection: React.FC = () => {
  const { downloadApp } = contentData;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll('.animate-item'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="py-6 sm:py-10 max-w-6xl mx-auto space-y-10">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3 animate-item">
        <span className="text-xs uppercase tracking-widest text-[#00529C] font-semibold">
          Tiện ích số quầy giao dịch · VietinBank iPay Mobile
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
          {downloadApp.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          {downloadApp.subtitle}
        </p>
      </div>

      {/* Main Split: QR Code Download Card & Key Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Interactive QR Code Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-[#002B49] to-[#00529C] text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between space-y-6 animate-item">
          <div className="space-y-2 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-medium">
              Quét Camera để tải ngay
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">Quét Mã QR Đa Năng</h3>
            <p className="text-xs text-blue-100/80">
              Tự động nhận diện thiết bị iOS (iPhone/iPad) và Android (Samsung, Xiaomi, Oppo...)
            </p>
          </div>

          {/* QR Code Container */}
          <div className="bg-white p-5 rounded-2xl shadow-lg w-fit mx-auto border-4 border-blue-400/30">
            <img
              src={downloadApp.qrUrl}
              alt="Mã QR tải ứng dụng VietinBank iPay"
              className="w-48 h-48 object-contain rounded-lg"
            />
          </div>

          {/* Direct Store Download Buttons */}
          <div className="space-y-2 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <a
                href={downloadApp.iosUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white text-xs font-semibold border border-white/15"
              >
                <Download className="w-4 h-4" />
                <span>App Store (iOS)</span>
              </a>

              <a
                href={downloadApp.androidUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white text-xs font-semibold border border-white/15"
              >
                <Download className="w-4 h-4" />
                <span>Google Play</span>
              </a>
            </div>
            <p className="text-[11px] text-center text-blue-200/70">
              Hỗ trợ iOS 12.0 trở lên & Android 8.0 trở lên
            </p>
          </div>
        </div>

        {/* Right: Key Features & Activation steps */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
          {/* Key Advantages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-item">
            {downloadApp.features.map((feat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-[#00529C] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#00529C] flex items-center justify-center mb-3">
                  {idx === 0 && <Zap className="w-5 h-5" />}
                  {idx === 1 && <Smartphone className="w-5 h-5" />}
                  {idx === 2 && <Gift className="w-5 h-5" />}
                  {idx === 3 && <ShieldCheck className="w-5 h-5" />}
                </div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  {feat.title}
                </h4>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Activation Guide in 4 Steps */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 animate-item">
            <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#00529C]" />
              <span>Quy trình kích hoạt tài khoản tại quầy</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {downloadApp.activationSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <span className="w-6 h-6 rounded-md bg-[#00529C] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

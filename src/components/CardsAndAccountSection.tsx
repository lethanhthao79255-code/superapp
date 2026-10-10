import React, { useState } from 'react';
import { CreditCard, Sparkles, Check, ArrowRight, Shield, Award, CheckCircle2 } from 'lucide-react';
import contentData from '../data/contentData.json';

export const CardsAndAccountSection: React.FC = () => {
  const { cardAndAccount } = contentData;
  const [selectedCardIdx, setSelectedCardIdx] = useState<number>(0);
  const [successNote, setSuccessNote] = useState<string | null>(null);

  const handleRegisterAccount = (typeName: string) => {
    setSuccessNote(`Quý khách đã chọn: ${typeName}. Vui lòng liên hệ Giao dịch viên tại quầy hoặc mở iPay để chọn đuôi số mong muốn ngay lập tức.`);
  };

  return (
    <div className="py-6 sm:py-10 max-w-6xl mx-auto space-y-10">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#00529C] font-semibold">
          Sản phẩm tài chính độc bản · VietinBank
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
          Mở Tài Khoản Số Đẹp & Thẻ VietinBank
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Chọn số tài khoản phong thủy như ý và sở hữu bộ thẻ ngân hàng tích hợp đa năng tiện lợi.
        </p>
      </div>

      {/* Success notification popup/banner */}
      {successNote && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="text-xs sm:text-sm text-emerald-800 font-medium">
              {successNote}
            </p>
          </div>
          <button
            onClick={() => setSuccessNote(null)}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 shrink-0 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      )}

      {/* Part 1: Tài khoản số đẹp */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00529C]" />
            <span>Chọn số tài khoản thanh toán theo ý muốn</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Khởi tạo tức thì trên VietinBank iPay
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cardAndAccount.accountTypes.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-[#00529C] transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#00529C] text-xs font-semibold">
                  {item.badge}
                </span>
                <h4 className="font-bold text-slate-900 text-lg">
                  {item.type}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <button
                onClick={() => handleRegisterAccount(item.type)}
                className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-[#00529C] hover:bg-blue-50/50 text-[#00529C] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Đăng ký chọn số này</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Các dòng thẻ nổi bật */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#00529C]" />
            <span>Bộ sưu tập thẻ thanh toán & tín dụng hàng đầu</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Tích hợp công nghệ chip Contactless an toàn
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cardAndAccount.cards.map((c, idx) => (
            <div
              key={idx}
              className={`rounded-3xl border transition-all p-6 flex flex-col justify-between space-y-6 ${
                idx === 0
                  ? 'bg-gradient-to-br from-[#002B49] to-[#00529C] text-white border-transparent shadow-md'
                  : 'bg-white text-slate-900 border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <CreditCard className={`w-8 h-8 ${idx === 0 ? 'text-amber-300' : 'text-[#00529C]'}`} />
                  <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    idx === 0 ? 'bg-white/15 text-blue-100' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {idx === 0 ? 'Sản phẩm Hot' : 'Phổ biến'}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold">
                    {c.name}
                  </h4>
                  <p className={`text-xs mt-1 ${idx === 0 ? 'text-blue-100/80' : 'text-slate-500'}`}>
                    {c.type}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  {c.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${idx === 0 ? 'text-amber-300' : 'text-[#00529C]'}`} />
                      <span className={`text-xs leading-relaxed ${idx === 0 ? 'text-blue-50' : 'text-slate-700'}`}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSuccessNote(`Quý khách đã quan tâm thẻ: ${c.name}. Chuyên viên Trần Hoàng Trung sẽ hỗ trợ hoàn tất hồ sơ cấp thẻ nhanh chóng.`)}
                className={`w-full py-3 rounded-xl font-semibold text-xs transition-colors cursor-pointer ${
                  idx === 0
                    ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                Mở thẻ ngay tại quầy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

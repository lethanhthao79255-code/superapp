import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Calculator,
  Coins,
  Calendar,
  Percent,
  AlertCircle,
  Video,
  ExternalLink,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Info
} from 'lucide-react';
import contentData from '../data/contentData.json';

export const DepositCalculatorSection: React.FC = () => {
  const { depositCalculator } = contentData;

  // Form states
  const [amountRaw, setAmountRaw] = useState<string>('50000000'); // 50 million VND default
  const [selectedTerm, setSelectedTerm] = useState<number | ''>(12); // 12 months default
  const [interestRateRaw, setInterestRateRaw] = useState<string>('5.2');

  // Error validation states
  const [amountError, setAmountError] = useState<string | null>(null);
  const [termError, setTermError] = useState<string | null>(null);
  const [rateError, setRateError] = useState<string | null>(null);

  // Result numbers
  const [calculatedInterest, setCalculatedInterest] = useState<number>(0);
  const [calculatedTotal, setCalculatedTotal] = useState<number>(0);

  const resultBoxRef = useRef<HTMLDivElement>(null);

  // Auto-sync standard interest rate when term changes
  const handleTermChange = (term: number | '') => {
    setSelectedTerm(term);
    setTermError(null);
    if (typeof term === 'number') {
      const standardRate = depositCalculator.standardRates[String(term) as keyof typeof depositCalculator.standardRates];
      if (standardRate !== undefined) {
        setInterestRateRaw(String(standardRate));
        setRateError(null);
      }
    }
  };

  // Format currency with Vietnamese grouping (e.g. 50.000.000)
  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(Math.round(num));
  };

  // Convert raw string to clean positive number
  const parseAmount = (val: string): number => {
    const cleaned = val.replace(/\D/g, '');
    return cleaned ? parseInt(cleaned, 10) : 0;
  };

  // Handle amount text change (blocking letters as required)
  const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Disallow letters, only digits
    const cleaned = value.replace(/\D/g, '');
    setAmountRaw(cleaned);

    if (!cleaned || parseInt(cleaned, 10) <= 0) {
      setAmountError(depositCalculator.rules.amount.errorMessage);
    } else if (parseInt(cleaned, 10) < depositCalculator.rules.amount.min) {
      setAmountError('Số tiền tối thiểu gửi tiết kiệm là 1.000.000 VND.');
    } else {
      setAmountError(null);
    }
  };

  // Handle quick amount buttons
  const handleQuickAmount = (val: number) => {
    setAmountRaw(String(val));
    setAmountError(null);
  };

  // Handle interest rate change
  const handleRateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInterestRateRaw(val);
    const parsed = parseFloat(val);
    if (isNaN(parsed) || parsed < 0 || parsed > depositCalculator.rules.interestRate.max) {
      setRateError(depositCalculator.rules.interestRate.errorMessage);
    } else {
      setRateError(null);
    }
  };

  // Calculation effect
  useEffect(() => {
    const numAmount = parseAmount(amountRaw);
    const numRate = parseFloat(interestRateRaw);

    let hasError = false;

    // Amount validation
    if (!amountRaw || numAmount <= 0) {
      setAmountError(depositCalculator.rules.amount.errorMessage);
      hasError = true;
    } else if (numAmount < depositCalculator.rules.amount.min) {
      setAmountError('Số tiền tối thiểu gửi tiết kiệm là 1.000.000 VND.');
      hasError = true;
    } else {
      setAmountError(null);
    }

    // Term validation
    if (selectedTerm === '' || !depositCalculator.rules.term.validTerms.includes(Number(selectedTerm))) {
      setTermError(depositCalculator.rules.term.errorMessage);
      hasError = true;
    } else {
      setTermError(null);
    }

    // Rate validation
    if (isNaN(numRate) || numRate < 0 || numRate > depositCalculator.rules.interestRate.max) {
      setRateError(depositCalculator.rules.interestRate.errorMessage);
      hasError = true;
    } else {
      setRateError(null);
    }

    if (!hasError && selectedTerm !== '') {
      // Formula: Tiền lãi = (Số tiền gửi × Lãi suất % × Kỳ hạn tháng) / 12
      const termMonths = Number(selectedTerm);
      const interest = (numAmount * (numRate / 100) * termMonths) / 12;
      const total = numAmount + interest;

      setCalculatedInterest(interest);
      setCalculatedTotal(total);

      if (resultBoxRef.current) {
        gsap.fromTo(
          resultBoxRef.current,
          { scale: 0.98, opacity: 0.8 },
          { scale: 1, opacity: 1, duration: 0.25, ease: 'power2.out' }
        );
      }
    } else {
      setCalculatedInterest(0);
      setCalculatedTotal(0);
    }
  }, [amountRaw, selectedTerm, interestRateRaw]);

  // Reset form
  const handleReset = () => {
    setAmountRaw('50000000');
    setSelectedTerm(12);
    setInterestRateRaw('5.2');
    setAmountError(null);
    setTermError(null);
    setRateError(null);
  };

  return (
    <div className="py-6 sm:py-10 max-w-5xl mx-auto space-y-8">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#00529C] font-semibold">
          Tiện ích tài chính thông minh · VietinBank
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
          {depositCalculator.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Tra cứu nhanh số tiền lãi sinh lời dự tính và tổng tiền nhận được khi đáo hạn theo từng kỳ hạn gửi.
        </p>
      </div>

      {/* Main Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#00529C]" />
              <span>Thông tin khoản tiền gửi</span>
            </h3>

            <button
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-[#00529C] inline-flex items-center gap-1 transition-colors cursor-pointer"
              title="Đặt lại về mặc định"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm mới</span>
            </button>
          </div>

          {/* 1. Số tiền gửi */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-900">
              Tiền gửi dự tính (VND) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                value={amountRaw ? formatVND(parseAmount(amountRaw)) : ''}
                onChange={handleAmountInputChange}
                placeholder="Nhập số tiền gửi (ví dụ: 100.000.000)"
                className={`w-full px-4 py-3 rounded-xl border text-base font-semibold font-mono tracking-tight transition-colors outline-hidden ${
                  amountError
                    ? 'border-red-400 bg-red-50/30 text-red-900 focus:border-red-500'
                    : 'border-slate-300 bg-white text-slate-900 focus:border-[#00529C]'
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                VND
              </span>
            </div>

            {amountError && (
              <p className="text-xs text-red-600 flex items-center gap-1.5 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{amountError}</span>
              </p>
            )}

            {/* Quick buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1.5">
              <span className="text-xs text-slate-400">Chọn nhanh:</span>
              {depositCalculator.quickAmounts.map((q) => (
                <button
                  key={q.value}
                  type="button"
                  onClick={() => handleQuickAmount(q.value)}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-[#00529C] text-slate-700 transition-colors cursor-pointer"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Kỳ hạn gửi */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-900">
              Kỳ hạn (Tháng) <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {depositCalculator.rules.term.validTerms.map((term) => {
                const isSelected = selectedTerm === term;
                return (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handleTermChange(term)}
                    className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#00529C] text-white shadow-xs'
                        : 'bg-slate-50 border border-slate-200 text-slate-700 hover:border-[#00529C]'
                    }`}
                  >
                    {term} tháng
                  </button>
                );
              })}
            </div>

            {termError && (
              <p className="text-xs text-red-600 flex items-center gap-1.5 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{termError}</span>
              </p>
            )}
          </div>

          {/* 3. Lãi suất */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-slate-900">
                Lãi suất áp dụng (%/năm) <span className="text-red-500">*</span>
              </label>
              {selectedTerm && (
                <span className="text-xs text-[#00529C] font-medium">
                  Biểu lãi suất VietinBank niêm yết
                </span>
              )}
            </div>

            <div className="relative">
              <input
                type="number"
                step="0.05"
                min="0"
                max={depositCalculator.rules.interestRate.max}
                value={interestRateRaw}
                onChange={handleRateInputChange}
                className={`w-full px-4 py-3 rounded-xl border text-base font-semibold font-mono transition-colors outline-hidden ${
                  rateError
                    ? 'border-red-400 bg-red-50/30 text-red-900 focus:border-red-500'
                    : 'border-slate-300 bg-white text-slate-900 focus:border-[#00529C]'
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                %/năm
              </span>
            </div>

            {rateError && (
              <p className="text-xs text-red-600 flex items-center gap-1.5 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{rateError}</span>
              </p>
            )}
          </div>

          <div className="pt-2 text-xs text-slate-500 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-start gap-2">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>
              Công thức trả lãi sau khi đáo hạn: <strong>Tiền lãi = (Số tiền gửi × Lãi suất × Số tháng gửi) / 12</strong>. Kết quả mang tính chất tham khảo, lãi suất thực tế áp dụng tại thời điểm giao dịch.
            </span>
          </div>
        </div>

        {/* Right: Results Box & TikTok Video Link (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Result Card */}
          <div
            ref={resultBoxRef}
            className="bg-gradient-to-br from-[#002B49] to-[#00529C] text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-6"
          >
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <span className="text-xs uppercase tracking-wider text-blue-200 font-semibold">
                Kết Quả Dự Tính Đáo Hạn
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/15 text-white font-mono">
                Kỳ hạn: {selectedTerm || 0} tháng
              </span>
            </div>

            {/* Interest Amount */}
            <div className="space-y-1">
              <span className="text-xs text-blue-200 block">
                Tiền lãi dự tính (VND)
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-amber-300">
                {formatVND(calculatedInterest)} <span className="text-lg font-sans font-normal text-white">VND</span>
              </div>
            </div>

            {/* Total Maturity Amount */}
            <div className="pt-4 border-t border-white/15 space-y-1">
              <span className="text-xs text-blue-200 block">
                Tổng tiền nhận khi đáo hạn (Gốc + Lãi)
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-white">
                {formatVND(calculatedTotal)} <span className="text-base font-sans font-normal text-blue-200">VND</span>
              </div>
            </div>

            {/* Summary bullet points */}
            <div className="pt-4 border-t border-white/15 space-y-2 text-xs text-blue-100/80">
              <div className="flex justify-between">
                <span>Tiền gửi gốc:</span>
                <span className="font-mono font-medium text-white">
                  {formatVND(parseAmount(amountRaw))} VND
                </span>
              </div>
              <div className="flex justify-between">
                <span>Lãi suất áp dụng:</span>
                <span className="font-mono font-medium text-white">
                  {interestRateRaw}%/năm
                </span>
              </div>
              <div className="flex justify-between">
                <span>Hình thức nhận lãi:</span>
                <span className="text-white font-medium">Cuối kỳ (Trả lãi sau)</span>
              </div>
            </div>
          </div>

          {/* TikTok Video Guide Box (From PDF 1 page 2) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  {depositCalculator.guideVideo.title}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Xem video TikTok hướng dẫn chi tiết cách gửi tiết kiệm sinh lời cao nhất
                </p>
              </div>
            </div>

            <a
              href={depositCalculator.guideVideo.tiktokUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Mở Video Hướng Dẫn Trên TikTok</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

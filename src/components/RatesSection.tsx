import React, { useState } from 'react';
import { TrendingUp, DollarSign, Calendar, RefreshCw } from 'lucide-react';
import contentData from '../data/contentData.json';

export const RatesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'exchange'>('deposit');
  const { interestRatesTable, exchangeRates } = contentData;

  return (
    <div className="py-6 sm:py-10 max-w-5xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#00529C] font-semibold">
          Minh bạch thông tin tài chính · VietinBank
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
          Biểu Lãi Suất & Tỷ Giá Ngoại Tệ
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Cập nhật thông tin lãi suất tiền gửi cá nhân và tỷ giá ngoại tệ niêm yết chính thức tại quầy giao dịch.
        </p>
      </div>

      {/* Segmented Filter Switch */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('deposit')}
            className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'deposit'
                ? 'bg-white text-[#00529C] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lãi Suất Tiền Gửi Tiết Kiệm
          </button>
          <button
            onClick={() => setActiveTab('exchange')}
            className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'exchange'
                ? 'bg-white text-[#00529C] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tỷ Giá Ngoại Tệ (Hối Đoái)
          </button>
        </div>
      </div>

      {/* Table 1: Deposit Rates */}
      {activeTab === 'deposit' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-5 sm:p-6 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Lãi suất tiền gửi tiết kiệm VND dành cho Khách hàng Cá nhân
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Đơn vị tính: %/năm · Lãi suất trả sau khi đáo hạn
              </p>
            </div>
            <span className="text-xs font-medium px-3 py-1 bg-blue-50 text-[#00529C] rounded-full border border-blue-100">
              Ưu đãi online +0.3% - 0.4%
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100/70 text-slate-700 text-xs uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Kỳ hạn gửi</th>
                  <th className="py-3.5 px-6 text-right">Lãi suất tại quầy (%/năm)</th>
                  <th className="py-3.5 px-6 text-right text-[#00529C]">Gửi online iPay (%/năm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono tabular-nums">
                {interestRatesTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                    <td className="py-3.5 px-6 font-sans font-medium text-slate-900">
                      {row.term}
                    </td>
                    <td className="py-3.5 px-6 text-right text-slate-700">
                      {row.counterRate}
                    </td>
                    <td className="py-3.5 px-6 text-right font-bold text-[#00529C]">
                      {row.onlineRate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Table 2: Foreign Exchange Rates */}
      {activeTab === 'exchange' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-5 sm:p-6 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Bảng tỷ giá ngoại tệ niêm yết chính thức
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Tỷ giá tham khảo quy đổi VND · Áp dụng giao dịch tiền mặt & chuyển khoản
              </p>
            </div>
            <span className="text-xs font-medium px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
              Cập nhật trực tiếp quầy PGD
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100/70 text-slate-700 text-xs uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Ngoại tệ</th>
                  <th className="py-3.5 px-6">Tên đồng tiền</th>
                  <th className="py-3.5 px-6 text-right">Mua tiền mặt</th>
                  <th className="py-3.5 px-6 text-right">Mua chuyển khoản</th>
                  <th className="py-3.5 px-6 text-right text-[#00529C]">Giá bán</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono tabular-nums">
                {exchangeRates.map((ex, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                    <td className="py-3.5 px-6 font-bold text-slate-900">
                      {ex.currency}
                    </td>
                    <td className="py-3.5 px-6 font-sans text-slate-600">
                      {ex.name}
                    </td>
                    <td className="py-3.5 px-6 text-right text-slate-700">
                      {ex.buyCash}
                    </td>
                    <td className="py-3.5 px-6 text-right text-slate-700">
                      {ex.buyTransfer}
                    </td>
                    <td className="py-3.5 px-6 text-right font-bold text-[#00529C]">
                      {ex.sell}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

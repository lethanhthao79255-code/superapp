import React, { useState } from 'react';
import { Star, CheckCircle2, HeartHandshake, Send, ThumbsUp } from 'lucide-react';
import contentData from '../data/contentData.json';

export const FeedbackSection: React.FC = () => {
  const { ratingFeedback, brand } = contentData;
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>(ratingFeedback.criteria);
  const [customerComment, setCustomerComment] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const toggleCriteria = (crit: string) => {
    if (selectedCriteria.includes(crit)) {
      setSelectedCriteria(selectedCriteria.filter((c) => c !== crit));
    } else {
      setSelectedCriteria([...selectedCriteria, crit]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setRating(5);
    setCustomerComment('');
  };

  return (
    <div className="py-6 sm:py-10 max-w-3xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#00529C] font-semibold">
          Khảo sát ý kiến khách hàng · Quầy giao dịch
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
          {ratingFeedback.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          {ratingFeedback.subtitle}
        </p>
      </div>

      {!isSubmitted ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6"
        >
          {/* Star Rating */}
          <div className="text-center space-y-3 pb-6 border-b border-slate-100">
            <span className="text-sm font-semibold text-slate-800 block">
              Mức độ hài lòng của Quý khách trong phiên giao dịch hôm nay
            </span>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform hover:scale-115 cursor-pointer focus:outline-hidden"
                  >
                    <Star
                      className={`w-9 h-9 sm:w-11 sm:h-11 transition-colors ${
                        isFilled
                          ? 'fill-amber-400 text-amber-400 drop-shadow-xs'
                          : 'fill-transparent text-slate-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <div className="text-sm font-semibold text-[#00529C]">
              {rating === 5 && 'Rất hài lòng ⭐⭐⭐⭐⭐'}
              {rating === 4 && 'Hài lòng ⭐⭐⭐⭐'}
              {rating === 3 && 'Bình thường ⭐⭐⭐'}
              {rating === 2 && 'Cần cải thiện ⭐⭐'}
              {rating === 1 && 'Chưa hài lòng ⭐'}
            </div>
          </div>

          {/* Criteria Checklist */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-900">
              Điểm Quý khách ấn tượng tại {brand.branchName}:
            </label>
            <div className="space-y-2">
              {ratingFeedback.criteria.map((crit, idx) => {
                const isChecked = selectedCriteria.includes(crit);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleCriteria(crit)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                      isChecked
                        ? 'border-[#00529C] bg-blue-50/50 text-[#00529C]'
                        : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span>{crit}</span>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                        isChecked
                          ? 'bg-[#00529C] border-[#00529C] text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comments input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-900">
              Ý kiến đóng góp hoặc phản hồi thêm (tùy chọn):
            </label>
            <textarea
              rows={3}
              value={customerComment}
              onChange={(e) => setCustomerComment(e.target.value)}
              placeholder="Quý khách có thể chia sẻ thêm cảm nhận hoặc mong muốn cải thiện..."
              className="w-full p-3.5 rounded-xl border border-slate-300 text-sm focus:border-[#00529C] outline-hidden"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#00529C] hover:bg-[#003e77] text-white font-semibold text-sm transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Gửi Đánh Giá Của Quý Khách</span>
          </button>
        </form>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs text-center space-y-6 animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <HeartHandshake className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-900">
              Trân Trọng Cảm Ơn Quý Khách!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Ý kiến đánh giá <strong>{rating} sao</strong> của Quý khách đã được ghi nhận. VietinBank {brand.branchName} cam kết luôn nỗ lực không ngừng để đem tới trải nghiệm giao dịch tuyệt vời nhất.
            </p>
          </div>

          <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl max-w-sm mx-auto text-xs text-slate-600">
            <span>Chuyên viên tiếp nhận: </span>
            <strong className="text-slate-900">{brand.advisor.name}</strong>
            <span className="block mt-0.5 text-[#00529C] font-mono">{brand.advisor.phone}</span>
          </div>

          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-xl border border-slate-200 hover:border-[#00529C] text-slate-700 hover:text-[#00529C] text-xs font-semibold transition-colors cursor-pointer"
          >
            Gửi đánh giá khác
          </button>
        </div>
      )}
    </div>
  );
};

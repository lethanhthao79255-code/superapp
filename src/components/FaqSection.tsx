import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  KeyRound,
  CreditCard,
  ScanFace,
  FileCheck2,
  ChevronRight,
  ArrowLeft,
  Youtube,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Phone,
  Sparkles,
  Maximize2,
  X
} from 'lucide-react';
import contentData from '../data/contentData.json';
import { FaqCard, StepItem } from '../types';

interface FaqSectionProps {
  onBackToMainMenu: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onBackToMainMenu }) => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [feedbackStatus, setFeedbackStatus] = useState<'none' | 'ok' | 'not_ok'>('none');
  const [isFarewellOpen, setIsFarewellOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const selectedCard = contentData.faqCards.find((c) => c.id === selectedCardId);

  // GSAP animations for smooth card entrance
  useEffect(() => {
    if (!selectedCardId && cardsGridRef.current) {
      gsap.fromTo(
        cardsGridRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power2.out',
        }
      );
    }
  }, [selectedCardId]);

  // GSAP animation when entering detail view
  useEffect(() => {
    if (selectedCardId && detailRef.current) {
      gsap.fromTo(
        detailRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
      // scroll to top smoothly
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }
  }, [selectedCardId]);

  const handleSelectCard = (cardId: string) => {
    setSelectedCardId(cardId);
    setFeedbackStatus('none');
  };

  const handleReturnToFaqList = () => {
    setSelectedCardId(null);
    setFeedbackStatus('none');
  };

  const handleEndConversation = () => {
    setIsFarewellOpen(true);
  };

  const handleCloseFarewell = () => {
    setIsFarewellOpen(false);
    setSelectedCardId(null);
    setFeedbackStatus('none');
    onBackToMainMenu();
  };

  const getCardIcon = (id: string) => {
    switch (id) {
      case 'forgot_password':
        return <KeyRound className="w-7 h-7 text-[#00529C]" />;
      case 'close_card':
        return <CreditCard className="w-7 h-7 text-[#00529C]" />;
      case 'verify_chip_id':
        return <FileCheck2 className="w-7 h-7 text-[#00529C]" />;
      case 'update_biometrics':
        return <ScanFace className="w-7 h-7 text-[#00529C]" />;
      default:
        return <HelpCircle className="w-7 h-7 text-[#00529C]" />;
    }
  };

  return (
    <div ref={containerRef} className="py-6 sm:py-10">
      {/* View 1: 4 Cards List */}
      {!selectedCard && (
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#00529C] font-semibold">
              Kiosk Hỗ Trợ Trực Tuyến · VietinBank iPay
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              {contentData.messages.question}
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Chạm chọn nội dung cần hướng dẫn bên dưới để xem các bước thao tác có hình ảnh trực quan chi tiết.
            </p>
          </div>

          <div
            ref={cardsGridRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto pt-2"
          >
            {contentData.faqCards.map((card, index) => (
              <div
                key={card.id}
                onClick={() => handleSelectCard(card.id)}
                className="group relative bg-white rounded-2xl border border-slate-200 hover:border-[#00529C] p-6 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-[#00529C]/10 transition-colors">
                      {getCardIcon(card.id)}
                    </div>
                    <span className="font-mono text-sm font-semibold text-slate-400 group-hover:text-[#00529C] transition-colors">
                      0{card.cardNumber}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#00529C] transition-colors">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {card.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-medium text-[#00529C]">
                  <span>Xem hướng dẫn chi tiết ({card.steps.length} bước)</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 2: Step-by-Step Guidance for Selected Card */}
      {selectedCard && (
        <div ref={detailRef} className="max-w-5xl mx-auto space-y-8">
          {/* Top Navigation in Detail */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <button
              onClick={handleReturnToFaqList}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#00529C] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại danh sách câu hỏi</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Chủ đề:</span>
              <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-[#00529C] rounded-md">
                0{selectedCard.cardNumber} · {selectedCard.title}
              </span>
            </div>
          </div>

          {/* Guide Title & Video Callout */}
          <div className="bg-gradient-to-r from-blue-900 to-[#00529C] text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                Hướng dẫn từng bước minh họa
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold">
                {selectedCard.title}
              </h2>
              <p className="text-sm sm:text-base text-blue-100/90 max-w-2xl">
                {selectedCard.shortDesc}
              </p>
            </div>

            {/* Video Button */}
            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setActiveVideoModal(selectedCard.youtubeEmbedId)}
                className="inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-sm transition-all shadow-sm cursor-pointer"
              >
                <Youtube className="w-5 h-5 text-white" />
                <span>Xem Video YouTube</span>
              </button>
              <a
                href={selectedCard.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
                title="Mở ứng dụng YouTube"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Mở App</span>
              </a>
            </div>
          </div>

          {/* Step-by-Step Grid */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#00529C]" />
              <span>Các bước thực hiện chi tiết (Bước 1 đến Bước {selectedCard.steps.length})</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedCard.steps.map((st: StepItem) => (
                <div
                  key={st.step}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col"
                >
                  {/* Step Header */}
                  <div className="p-4 sm:p-5 bg-slate-50/80 border-b border-slate-100 flex items-start gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#00529C] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {st.step}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">
                        Bước {st.step}: {st.title}
                      </h4>
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                        {st.description}
                      </p>
                    </div>
                  </div>

                  {/* Step Image */}
                  <div className="relative p-4 bg-slate-100/50 flex-1 flex items-center justify-center min-h-[260px] group">
                    <img
                      src={st.image}
                      alt={`Bước ${st.step} - ${st.title}`}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== st.remoteImage) {
                          target.src = st.remoteImage;
                        }
                      }}
                      className="max-h-[320px] w-auto max-w-full rounded-lg object-contain shadow-xs transition-transform duration-200 group-hover:scale-101"
                      loading="lazy"
                    />

                    {/* Magnify button */}
                    <button
                      onClick={() => setPreviewImage(st.image)}
                      className="absolute bottom-6 right-6 p-2 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                      title="Phóng to hình ảnh"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* YouTube Video Link Callout at bottom of section */}
          <div className="p-5 bg-slate-100 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <Youtube className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Video hướng dẫn trực quan trên YouTube
                </p>
                <p className="text-xs text-slate-500">
                  Xem video trọn vẹn thao tác thực tế từng giây trên ứng dụng VietinBank iPay
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveVideoModal(selectedCard.youtubeEmbedId)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Youtube className="w-4 h-4" />
                <span>Xem video tại đây</span>
              </button>
              <a
                href={selectedCard.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>Mở YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Customer Feedback Interaction Block */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 text-center shadow-xs">
            <div className="space-y-2 max-w-lg mx-auto">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {contentData.messages.feedbackQuestion}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Vui lòng xác nhận kết quả để VietinBank hỗ trợ Quý khách kịp thời.
              </p>
            </div>

            {/* If not yet chosen */}
            {feedbackStatus === 'none' && (
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => setFeedbackStatus('ok')}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{contentData.messages.btnOk}</span>
                </button>

                <button
                  onClick={() => setFeedbackStatus('not_ok')}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-medium text-sm transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
                >
                  <AlertCircle className="w-5 h-5" />
                  <span>{contentData.messages.btnNotOk}</span>
                </button>
              </div>
            )}

            {/* If user clicked 'Đã ổn' */}
            {feedbackStatus === 'ok' && (
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl max-w-xl mx-auto space-y-3">
                <div className="flex items-center justify-center gap-2 text-emerald-800 font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Cảm ơn Quý khách! Thao tác đã hoàn tất thành công.</span>
                </div>
                <p className="text-xs text-emerald-700">
                  Quý khách có thể quay lại menu chính để tra cứu thêm các dịch vụ khác của VietinBank.
                </p>
              </div>
            )}

            {/* If user clicked 'Chưa ổn' */}
            {feedbackStatus === 'not_ok' && (
              <div className="p-6 bg-blue-50/80 border border-blue-200 rounded-xl max-w-2xl mx-auto space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-[#00529C] shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-slate-800 leading-relaxed">
                    {contentData.messages.feedbackNotOkResponse}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-blue-100">
                  <div className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-900">
                      Chuyên viên: {contentData.brand.advisor.name}
                    </span>
                    <span className="mx-2">·</span>
                    <span className="font-mono text-[#00529C] font-bold">
                      {contentData.brand.advisor.phone}
                    </span>
                  </div>

                  <a
                    href={`tel:${contentData.brand.advisor.phone}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#00529C] hover:bg-[#003e77] text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Gọi tư vấn ngay</span>
                  </a>
                </div>
              </div>
            )}

            {/* Dual Action Buttons: Quay lại menu chính & Kết thúc cuộc trò chuyện */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-slate-100">
              <button
                onClick={onBackToMainMenu}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:border-[#00529C] text-slate-700 hover:text-[#00529C] bg-white font-medium text-sm transition-colors cursor-pointer"
              >
                {contentData.messages.btnBackToMenu}
              </button>

              <button
                onClick={handleEndConversation}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-medium text-sm transition-colors cursor-pointer shadow-xs"
              >
                {contentData.messages.btnEndConversation}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Farewell Modal when user clicks 'Kết thúc cuộc trò chuyện' */}
      {isFarewellOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-6 text-center shadow-xl border border-slate-100">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-[#00529C] flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900">
                VietinBank Kính Chào Quý Khách
              </h3>
              <p className="text-base text-slate-700 leading-relaxed font-medium">
                "{contentData.messages.farewell}"
              </p>
              <p className="text-xs text-slate-400">
                Rất hân hạnh được đồng hành và phục vụ Quý khách tại quầy giao dịch VietinBank Chi nhánh Bắc Phú Thọ.
              </p>
            </div>

            <button
              onClick={handleCloseFarewell}
              className="w-full py-3 rounded-xl bg-[#00529C] hover:bg-[#003e77] text-white font-semibold text-sm transition-colors cursor-pointer shadow-sm"
            >
              Về màn hình chính
            </button>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={previewImage}
              alt="Chi tiết bước hướng dẫn"
              className="max-h-[85vh] w-auto rounded-xl object-contain shadow-2xl"
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* YouTube Video Modal */}
      {activeVideoModal && (
        <div
          onClick={() => setActiveVideoModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-black rounded-2xl overflow-hidden max-w-3xl w-full aspect-video shadow-2xl relative"
          >
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-black cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideoModal}?autoplay=1`}
              title="Hướng dẫn VietinBank"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

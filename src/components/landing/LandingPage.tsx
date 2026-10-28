/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, Play, HelpCircle, Network, TrendingUp, Users, ShieldAlert, CheckCircle, Building2, ChevronLeft } from 'lucide-react';
import { sound } from '../../utils/audio';

interface LandingPageProps {
  companyName: string | null;
  onStartGame: () => void;
  onOpenHowToPlay: () => void;
  onGoToHQ: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  companyName,
  onStartGame,
  onOpenHowToPlay,
  onGoToHQ,
}) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden bg-grid-subtle">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Right Text Column (in RTL, this is primary) */}
          <div className="lg:col-span-7 text-right">
            {/* National & Educational Marker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#123B35]/10 text-[#123B35] text-xs font-semibold mb-4 border border-[#123B35]/15">
              <span className="w-2 h-2 rounded-full bg-[#1FB58A]"></span>
              <span>منصة محاكاة الإدارة والتنظيم الإداري السعودي المعاصر</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#123B35] tracking-tight leading-[1.2] mb-4">
              أنقذ شركتك
              <span className="block text-xl sm:text-2xl lg:text-3xl font-bold text-[#D5AE68] mt-2 font-['Tajawal']">
                «رتّب الهيكل، استعد السيطرة، وأنقذ شركتك!»
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mb-8">
              شركة سعودية افتراضية تمر بأزمة خانقة بسبب فوضى الصلاحيات، وتداخل خطوط التبعية، وتضارب القرارات. تولَّ مسؤولية إعادة الهيكلة: اسحب بطاقات الوظائف، ابنِ تسلسلاً هرمياً محكماً، وشاهد مؤشرات كفاءة شركتك وهي تتعافى فورياً.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              {companyName ? (
                <button
                  onClick={() => {
                    sound.playClick();
                    onGoToHQ();
                  }}
                  className="px-8 py-4 bg-[#123B35] hover:bg-[#1A4E46] text-white font-bold text-base rounded-xl shadow-lg hover:shadow-xl transition-all transform active:scale-95 flex items-center gap-3 group"
                >
                  <Building2 className="w-5 h-5 text-[#1FB58A]" />
                  <span>متابعة إدارة «{companyName}»</span>
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    sound.playClick();
                    onStartGame();
                  }}
                  className="px-8 py-4 bg-[#123B35] hover:bg-[#1A4E46] text-white font-bold text-base rounded-xl shadow-lg hover:shadow-xl transition-all transform active:scale-95 flex items-center gap-3 group"
                >
                  <Play className="w-5 h-5 fill-current text-[#1FB58A]" />
                  <span>ابدأ مغامرة الإنقاذ</span>
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </button>
              )}

              <button
                onClick={() => {
                  sound.playClick();
                  onOpenHowToPlay();
                }}
                className="px-6 py-4 bg-white hover:bg-stone-50 text-[#123B35] border border-stone-300 font-bold text-sm sm:text-base rounded-xl shadow-xs transition-colors flex items-center gap-2"
              >
                <HelpCircle className="w-4 h-4 text-[#D5AE68]" />
                <span>كيف تلعب؟</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-stone-200/80 max-w-xl text-right">
              <div>
                <div className="text-2xl font-black text-[#123B35] tabular-nums">17</div>
                <div className="text-xs text-gray-600 mt-0.5">وظيفة وإدارة قيادية</div>
              </div>
              <div>
                <div className="text-2xl font-black text-[#1FB58A] tabular-nums">4</div>
                <div className="text-xs text-gray-600 mt-0.5">مستويات هرمية إدارية</div>
              </div>
              <div>
                <div className="text-2xl font-black text-[#D5AE68] tabular-nums">100%</div>
                <div className="text-xs text-gray-600 mt-0.5">تعليم تطبيقي تفاعلي</div>
              </div>
            </div>
          </div>

          {/* Left Visual Column: Interactive Miniature Animated Org Chart Preview */}
          <div className="lg:col-span-5">
            <div className="relative bg-white/80 backdrop-blur-xs rounded-2xl border border-stone-300/80 p-6 shadow-xl overflow-hidden">
              {/* Background ambient badge */}
              <div className="text-xs font-bold text-stone-500 mb-4 flex items-center justify-between border-b border-stone-200 pb-3">
                <span className="flex items-center gap-1.5 text-[#123B35]">
                  <Network className="w-4 h-4 text-[#1FB58A]" />
                  <span>مخطط الهيكل التنظيمي المستهدف</span>
                </span>
                <span className="text-[11px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-mono">
                  نموذج الحوكمة
                </span>
              </div>

              {/* Dynamic Org Chart preview nodes */}
              <div className="flex flex-col items-center gap-4 py-2">
                {/* Level 1: CEO */}
                <div className="w-48 p-2.5 bg-[#123B35] text-white rounded-xl shadow-md text-center border border-[#D5AE68]/50 transform transition hover:scale-105">
                  <div className="text-xs font-bold">المدير التنفيذي (CEO)</div>
                  <div className="text-[10px] text-emerald-200 mt-0.5">رأس الهرم التنفيذي</div>
                </div>

                {/* Connecting branch line */}
                <div className="w-0.5 h-4 bg-emerald-600"></div>

                {/* Level 2: Directors */}
                <div className="grid grid-cols-4 gap-2 w-full">
                  <div className="p-2 bg-sky-50 border border-sky-300 rounded-lg text-center shadow-xs">
                    <div className="text-[11px] font-bold text-sky-900">مدير العمليات</div>
                    <div className="text-[9px] text-sky-700 font-mono">COO</div>
                  </div>
                  <div className="p-2 bg-amber-50 border border-amber-300 rounded-lg text-center shadow-xs">
                    <div className="text-[11px] font-bold text-amber-900">المدير المالي</div>
                    <div className="text-[9px] text-amber-700 font-mono">CFO</div>
                  </div>
                  <div className="p-2 bg-purple-50 border border-purple-300 rounded-lg text-center shadow-xs">
                    <div className="text-[11px] font-bold text-purple-900">الموارد البشرية</div>
                    <div className="text-[9px] text-purple-700 font-mono">HR</div>
                  </div>
                  <div className="p-2 bg-emerald-50 border border-emerald-300 rounded-lg text-center shadow-xs">
                    <div className="text-[11px] font-bold text-emerald-900">المدير التجاري</div>
                    <div className="text-[9px] text-emerald-700 font-mono">CCO</div>
                  </div>
                </div>

                {/* Connecting subtle line */}
                <div className="w-full flex justify-around px-8">
                  <div className="w-0.5 h-3 bg-sky-300"></div>
                  <div className="w-0.5 h-3 bg-amber-300"></div>
                  <div className="w-0.5 h-3 bg-purple-300"></div>
                  <div className="w-0.5 h-3 bg-emerald-300"></div>
                </div>

                {/* Level 3: Representative Managers */}
                <div className="grid grid-cols-4 gap-2 w-full text-center">
                  <div className="p-1.5 bg-white border border-stone-200 rounded text-[10px] text-stone-700">
                    اللوجستيات & خدمة العملاء
                  </div>
                  <div className="p-1.5 bg-white border border-stone-200 rounded text-[10px] text-stone-700">
                    المحاسب & الميزانية
                  </div>
                  <div className="p-1.5 bg-white border border-stone-200 rounded text-[10px] text-stone-700">
                    التوظيف & التدريب
                  </div>
                  <div className="p-1.5 bg-white border border-stone-200 rounded text-[10px] text-stone-700">
                    التسويق & المبيعات
                  </div>
                </div>

                {/* Level 4: Operational Teams Preview */}
                <div className="w-full bg-[#123B35]/5 p-2.5 rounded-lg border border-[#123B35]/10 mt-1 flex items-center justify-between text-xs text-stone-700">
                  <span className="font-semibold text-[#123B35]">الفرق التشغيلية الميدانية:</span>
                  <span className="text-[11px] text-stone-600">المستودع · التوصيل · المبيعات · الدعم</span>
                </div>
              </div>

              {/* Callout box */}
              <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs">
                <span className="text-gray-600">الكفاءة التشغيلية المفقودة حالياً:</span>
                <span className="font-bold text-[#E45757] font-mono tabular-nums">38% (حالة أزمة)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Pillars Strip */}
      <div className="bg-[#123B35] text-white py-10 border-t border-[#1FB58A]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
            {/* Pillar 1 */}
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 hover:border-[#1FB58A]/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#1FB58A]/20 flex items-center justify-center text-[#1FB58A] mb-3">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">
                إصلاح الهيكل بالكامل
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                اسحب بطاقات الوظائف ووزعها بين الإدارة العليا ومدراء الإدارات والأقسام التخصصية والفرق الميدانية بدقة متناهية.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 hover:border-[#1FB58A]/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#D5AE68]/20 flex items-center justify-center text-[#D5AE68] mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">
                نبض الشركة ومحاكاة المؤشرات
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                كل تصحيح في خط التبعية ينعكس فوراً على الكفاءة التشغيلية، ووضوح المسؤوليات، ورضا الموظفين والعملاء.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 hover:border-[#1FB58A]/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-300 mb-3">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">
                غرفة الأزمات التنفيذية
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                تفاعل مع بلاغات عاجلة من مجلس الإدارة والمديرين، واتخذ قرارات مصيرية توازن بين السيولة واستقرار الموظفين.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

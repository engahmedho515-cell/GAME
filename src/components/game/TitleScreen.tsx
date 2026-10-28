/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, ShieldAlert, Sparkles, Volume2, VolumeX, HelpCircle, ArrowLeft } from 'lucide-react';
import { sound } from '../../utils/audio';

interface TitleScreenProps {
  companyName: string;
  onStartGame: (companyName: string, mode: 'build' | 'repair' | 'crisis') => void;
  onOpenHowToPlay: () => void;
}

const PRESET_COMPANIES = [
  'روافد للأعمال',
  'مدار للخدمات اللوجستية',
  'نماء للتقنية',
  'أفق للاستشارات',
];

export const TitleScreen: React.FC<TitleScreenProps> = ({
  companyName: initialCompanyName,
  onStartGame,
  onOpenHowToPlay,
}) => {
  const [companyName, setCompanyName] = useState(initialCompanyName || 'روافد للأعمال');
  const [selectedMode, setSelectedMode] = useState<'build' | 'repair' | 'crisis'>('build');
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  // Keyboard shortcut: Space or Enter to start
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.code === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        sound.playSuccess();
        onStartGame(companyName.trim() || 'روافد للأعمال', selectedMode);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [companyName, selectedMode, onStartGame]);

  const toggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
    if (!next) sound.playClick();
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0D2824] text-[#F6F3EC] flex flex-col justify-between p-6 sm:p-10 select-none">
      {/* Blurred Corporate Background Image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/src/assets/images/corporate_headquarters_saudi_1793159145967.jpg"
          alt="مقر الشركة الافتراضية"
          className="w-full h-full object-cover filter blur-[6px] scale-105 opacity-35"
        />
        {/* Dark executive gradient scrim for high contrast and elegance */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D2824]/85 via-[#0D2824]/75 to-[#081815]/95" />
      </div>

      {/* Ambient background particles & grid animation */}
      <div className="absolute inset-0 bg-grid-subtle opacity-20 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#1FB58A]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#D5AE68]/15 blur-3xl pointer-events-none" />

      {/* Floating 2.5D Org cards animation in negative space */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Node 1 */}
        <div className="absolute top-[18%] left-[10%] opacity-25 transform -rotate-6 scale-90 border border-[#1FB58A]/40 bg-[#123B35] rounded-xl p-3 shadow-2xl animate-pulse">
          <div className="text-[10px] text-emerald-400 font-mono">CEO · الإدارة العليا</div>
          <div className="text-xs font-bold text-white">المدير التنفيذي</div>
        </div>
        {/* Floating Node 2 */}
        <div className="absolute bottom-[24%] left-[15%] opacity-20 transform rotate-12 scale-75 border border-[#D5AE68]/40 bg-[#123B35] rounded-xl p-3 shadow-2xl">
          <div className="text-[10px] text-amber-300 font-mono">COO · إدارة العمليات</div>
          <div className="text-xs font-bold text-white">مدير العمليات</div>
        </div>
        {/* Floating Node 3 */}
        <div className="absolute top-[28%] right-[8%] opacity-25 transform rotate-3 scale-85 border border-[#0284C7]/40 bg-[#123B35] rounded-xl p-3 shadow-2xl">
          <div className="text-[10px] text-sky-400 font-mono">CFO · الرقابة المالية</div>
          <div className="text-xs font-bold text-white">المدير المالي</div>
        </div>
      </div>

      {/* Top Corner HUD controls */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-md bg-[#1FB58A]/20 border border-[#1FB58A]/40 text-xs font-bold text-emerald-300">
            نسخة المحاكاة التنفيذية v2.0
          </div>
          <span className="text-xs text-stone-400 hidden sm:inline">سياق إداري سعودي · 100% محلي</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onOpenHowToPlay();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-stone-300 hover:text-white transition-colors border border-white/10"
            title="تعليمات اللعب"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#D5AE68]" />
            <span>كيف تلعب؟</span>
          </button>

          <button
            onClick={toggleSound}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-colors border border-white/10"
            aria-label="التحكم بالصوت"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-stone-500" /> : <Volume2 className="w-4 h-4 text-[#1FB58A]" />}
          </button>
        </div>
      </div>

      {/* Centerpiece: Bespoke inline SVG Title Lockup & Negative Space */}
      <div className="relative z-10 max-w-2xl mx-auto text-center my-auto px-4">
        {/* Bespoke inline SVG emblem */}
        <div className="inline-block mb-3">
          <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="10" width="60" height="24" rx="6" fill="#1FB58A" fillOpacity="0.2" stroke="#1FB58A" strokeWidth="2.5" />
            <text x="50" y="26" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">CEO</text>
            
            <path d="M50 34V52M25 52H75M25 52V64M75 52V64" stroke="#D5AE68" strokeWidth="2.5" strokeLinecap="round" />
            
            <rect x="10" y="64" width="30" height="22" rx="5" fill="#123B35" stroke="#1FB58A" strokeWidth="2" />
            <text x="25" y="78" textAnchor="middle" fill="#1FB58A" fontSize="9" fontWeight="bold" fontFamily="sans-serif">COO</text>

            <rect x="60" y="64" width="30" height="22" rx="5" fill="#123B35" stroke="#D5AE68" strokeWidth="2" />
            <text x="75" y="78" textAnchor="middle" fill="#D5AE68" fontSize="9" fontWeight="bold" fontFamily="sans-serif">CFO</text>
          </svg>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight mb-2">
          أنقذ شركتك
        </h1>
        <div className="text-lg sm:text-2xl font-bold text-[#D5AE68] font-['Tajawal'] tracking-wide mb-6">
          «رتّب الهيكل، استعد السيطرة، وأنقذ شركتك!»
        </div>

        {/* Company Name & Setup Controls */}
        <div className="bg-[#123B35]/90 backdrop-blur-md rounded-2xl border border-white/10 p-5 shadow-2xl mb-6 text-right max-w-lg mx-auto">
          <label className="block text-xs font-bold text-stone-300 mb-2">
            اسم شركتك الافتراضية:
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="اكتب اسم الشركة..."
              className="flex-1 px-4 py-2 text-sm bg-black/40 border border-white/20 rounded-xl text-white outline-none focus:border-[#1FB58A] focus:ring-1 focus:ring-[#1FB58A]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            <span className="text-[10px] text-stone-400">مقترحات:</span>
            {PRESET_COMPANIES.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setCompanyName(preset);
                }}
                className={`text-[11px] px-2.5 py-1 rounded-md transition-colors ${
                  companyName === preset
                    ? 'bg-[#1FB58A] text-white font-bold'
                    : 'bg-white/10 text-stone-300 hover:bg-white/20'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Mode Selector */}
          <div className="border-t border-white/10 pt-3">
            <span className="block text-xs font-bold text-stone-300 mb-2">اختر نمط التحدي:</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSelectedMode('build');
                }}
                className={`p-2 rounded-xl text-xs font-bold text-center border transition-all ${
                  selectedMode === 'build'
                    ? 'bg-[#1FB58A] text-white border-[#1FB58A] shadow-md scale-[1.02]'
                    : 'bg-black/30 text-stone-300 border-white/10 hover:bg-white/10'
                }`}
              >
                بناء من الصفر
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSelectedMode('repair');
                }}
                className={`p-2 rounded-xl text-xs font-bold text-center border transition-all ${
                  selectedMode === 'repair'
                    ? 'bg-[#D5AE68] text-[#123B35] border-[#D5AE68] shadow-md scale-[1.02]'
                    : 'bg-black/30 text-stone-300 border-white/10 hover:bg-white/10'
                }`}
              >
                إصلاح هيكل فوضوي
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSelectedMode('crisis');
                }}
                className={`p-2 rounded-xl text-xs font-bold text-center border transition-all ${
                  selectedMode === 'crisis'
                    ? 'bg-red-600 text-white border-red-500 shadow-md scale-[1.02]'
                    : 'bg-black/30 text-stone-300 border-white/10 hover:bg-white/10'
                }`}
              >
                غرفة الأزمات
              </button>
            </div>
          </div>
        </div>

        {/* Primary Start CTA Button */}
        <button
          onClick={() => {
            sound.playSuccess();
            onStartGame(companyName.trim() || 'روافد للأعمال', selectedMode);
          }}
          className="w-full max-w-lg mx-auto py-4 px-8 bg-gradient-to-r from-[#1FB58A] to-[#123B35] hover:from-[#25d3a1] hover:to-[#174840] text-white text-base sm:text-lg font-black rounded-2xl shadow-2xl hover:shadow-[#1FB58A]/30 transition-all transform active:scale-98 flex items-center justify-center gap-3 border border-emerald-400/30"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>ابدأ مهمة الإنقاذ الآن</span>
          <span className="hidden sm:inline-block text-xs bg-black/30 px-2 py-0.5 rounded font-mono font-normal">
            Enter ↵
          </span>
        </button>
      </div>

      {/* Flat Control-Hint Line at bottom */}
      <div className="relative z-10 text-center border-t border-white/10 pt-4 text-xs font-mono text-stone-400">
        <span>الفأرة / اللمس للسحب والإفلات · المسافة / Enter للبدء · Esc للإيقاف المؤقت · Z للتراجع</span>
      </div>
    </div>
  );
};

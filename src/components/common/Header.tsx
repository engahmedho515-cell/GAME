/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Volume2, VolumeX, RotateCcw, Building, ShieldAlert, Network, HelpCircle, Home } from 'lucide-react';
import { sound } from '../../utils/audio';

interface HeaderProps {
  companyName: string | null;
  currentScreen: string;
  onNavigate: (screen: 'landing' | 'setup' | 'headquarters' | 'mission_org' | 'mission_crisis') => void;
  onResetGame: () => void;
  onOpenHowToPlay: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  companyName,
  currentScreen,
  onNavigate,
  onResetGame,
  onOpenHowToPlay,
}) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const toggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
    if (!next) {
      sound.playClick();
    }
  };

  const handleResetConfirm = () => {
    setShowConfirmReset(false);
    onResetGame();
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#123B35] text-white border-b border-[#1FB58A]/20 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate(companyName ? 'headquarters' : 'landing')}
              className="flex items-center gap-2.5 text-right group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FB58A] rounded-lg p-1 transition-transform active:scale-95"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1FB58A] to-[#123B35] border border-[#D5AE68]/40 flex items-center justify-center text-white font-black text-lg shadow-inner">
                ق
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-[#1FB58A] transition-colors whitespace-nowrap">
                  أنقذ شركتك
                </span>
                <span className="hidden sm:inline-block mr-2 text-xs text-[#D5AE68] font-normal tracking-wide opacity-90 whitespace-nowrap">
                  Rescue Your Company
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
            <button
              onClick={() => onNavigate(companyName ? 'headquarters' : 'landing')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap py-1 ${
                currentScreen === 'headquarters' || currentScreen === 'landing'
                  ? 'text-[#1FB58A] font-semibold border-b-2 border-[#1FB58A]'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>{companyName ? 'مقر الشركة' : 'الرئيسية'}</span>
            </button>

            {companyName && (
              <>
                <button
                  onClick={() => onNavigate('mission_org')}
                  className={`flex items-center gap-1.5 transition-colors whitespace-nowrap py-1 ${
                    currentScreen === 'mission_org'
                      ? 'text-[#1FB58A] font-semibold border-b-2 border-[#1FB58A]'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Network className="w-4 h-4" />
                  <span>الهيكل التنظيمي</span>
                </button>

                <button
                  onClick={() => onNavigate('mission_crisis')}
                  className={`flex items-center gap-1.5 transition-colors whitespace-nowrap py-1 ${
                    currentScreen === 'mission_crisis'
                      ? 'text-[#1FB58A] font-semibold border-b-2 border-[#1FB58A]'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>غرفة الأزمات</span>
                </button>
              </>
            )}

            <button
              onClick={onOpenHowToPlay}
              className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors whitespace-nowrap py-1"
            >
              <HelpCircle className="w-4 h-4" />
              <span>كيف تلعب؟</span>
            </button>
          </nav>

          {/* Zone 3: Actions & Status */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Active Company Name Pill-less indicator */}
            {companyName && (
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs text-emerald-200 border border-emerald-500/30 rounded-md bg-emerald-950/40">
                <Building className="w-3.5 h-3.5 text-[#1FB58A]" />
                <span className="font-medium text-white truncate max-w-[140px]">{companyName}</span>
              </div>
            )}

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              aria-label={isMuted ? 'تفعيل الصوت' : 'كتم الصوت'}
              title={isMuted ? 'تفعيل الصوت' : 'كتم الصوت'}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FB58A]"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4 text-[#1FB58A]" />}
            </button>

            {/* Restart Session Option */}
            {companyName && (
              <button
                onClick={() => setShowConfirmReset(true)}
                title="بدء لعبة جديدة"
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-amber-200 hover:text-white hover:bg-amber-900/40 border border-amber-500/30 rounded-md transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">لعبة جديدة</span>
              </button>
            )}

            {/* If no company yet: Start button */}
            {!companyName && currentScreen === 'landing' && (
              <button
                onClick={() => onNavigate('setup')}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-[#1FB58A] hover:bg-[#199d77] rounded-md shadow-sm transition-colors whitespace-nowrap"
              >
                ابدأ المغامرة
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Confirmation Modal for Resetting Game */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 text-right border border-gray-200">
            <h3 className="text-lg font-bold text-[#123B35] mb-2 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-amber-600" />
              <span>تأكيد بدء لعبة جديدة</span>
            </h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              هل أنت متأكد من رغبتك في بدء جلسة جديدة؟ سيؤدي ذلك إلى مسح اسم الشركة والنتائج ومؤشرات التقدم المحفوظة محلياً والبدء من الصفر.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                إلغاء ومتابعة اللعب
              </button>
              <button
                onClick={handleResetConfirm}
                className="px-4 py-2 text-sm font-semibold text-white bg-[#E45757] hover:bg-red-700 rounded-lg shadow-sm transition-colors"
              >
                تأكيد وبدء لعبة جديدة
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

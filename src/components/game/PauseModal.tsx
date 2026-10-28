/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Play, RotateCcw, Home, Volume2, VolumeX, X } from 'lucide-react';
import { sound } from '../../utils/audio';

interface PauseModalProps {
  isOpen: boolean;
  onResume: () => void;
  onRestart: () => void;
  onExitToTitle: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  isOpen,
  onResume,
  onRestart,
  onExitToTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150 text-right select-none">
      <div className="bg-[#123B35] text-white rounded-3xl border border-white/20 shadow-2xl max-w-sm w-full p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#1FB58A] flex items-center justify-center mx-auto mb-2">
            <Play className="w-6 h-6 fill-current" />
          </div>
          <h2 className="text-2xl font-black text-white">اللعبة متوقفة مؤقتاً</h2>
          <p className="text-xs text-stone-300 mt-1 font-mono">اضغط Esc للاستئناف</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              sound.playClick();
              onResume();
            }}
            className="w-full py-3 px-4 bg-[#1FB58A] hover:bg-[#189b76] text-white text-sm font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>استئناف اللعب</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onRestart();
            }}
            className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#D5AE68]" />
            <span>إعادة التحدي من البداية</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onExitToTitle();
            }}
            className="w-full py-2.5 px-4 bg-red-950/40 hover:bg-red-900/60 text-red-200 border border-red-500/20 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>الخروج للشاشة الرئيسية</span>
          </button>
        </div>
      </div>
    </div>
  );
};

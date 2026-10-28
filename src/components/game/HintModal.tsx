/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Lightbulb, AlertTriangle, ArrowLeft } from 'lucide-react';
import { HintItem } from '../../types/game';
import { sound } from '../../utils/audio';

interface HintModalProps {
  isOpen: boolean;
  hint: HintItem | null;
  currentLevel: 1 | 2 | 3;
  hintsUsedCount: number;
  onClose: () => void;
  onRequestNextLevel: () => void;
}

export const HintModal: React.FC<HintModalProps> = ({
  isOpen,
  hint,
  currentLevel,
  hintsUsedCount,
  onClose,
  onRequestNextLevel,
}) => {
  if (!isOpen || !hint) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-right border border-amber-200">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 left-4 p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-stone-100 transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#123B35]">{hint.title}</h3>
            <span className="text-[11px] text-amber-700 font-medium">
              مستوى التلميح: {currentLevel} من 3
            </span>
          </div>
        </div>

        {/* Hint Body */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-950 leading-relaxed mb-4">
          {hint.text}
        </div>

        {/* Score impact note */}
        <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-6 bg-stone-50 p-2.5 rounded-lg border border-stone-200/60">
          <AlertTriangle className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span>
            استخدمت حتى الآن <strong>{hintsUsedCount}</strong> تلميحات (يُخصم نقطتان من معيار كفاءة التنفيذ لكل تلميح).
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-stone-100">
          {currentLevel < 3 ? (
            <button
              onClick={() => {
                sound.playClick();
                onRequestNextLevel();
              }}
              className="text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>طلب تلميح أكثر تفصيلاً (المستوى {currentLevel + 1})</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="text-xs text-stone-400">وصلت لأعلى مستوى تلميح</span>
          )}

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2 text-xs font-bold text-white bg-[#123B35] hover:bg-[#1A4E46] rounded-lg transition-colors"
          >
            حسناً، فهمت
          </button>
        </div>
      </div>
    </div>
  );
};

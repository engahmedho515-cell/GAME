/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Clock,
  Pause,
  Play,
  RotateCcw,
  Undo2,
  Lightbulb,
  CheckCircle,
  Building,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface GameToolbarProps {
  companyName: string;
  gameMode: 'build' | 'repair';
  secondsLeft: number;
  isPaused: boolean;
  placedCount: number;
  totalSlots: number;
  hintsUsedCount: number;
  canUndo: boolean;
  zoomLevel: number;
  onTogglePause: () => void;
  onUndo: () => void;
  onResetChallenge: () => void;
  onRequestHint: () => void;
  onValidate: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export const GameToolbar: React.FC<GameToolbarProps> = ({
  companyName,
  gameMode,
  secondsLeft,
  isPaused,
  placedCount,
  totalSlots,
  hintsUsedCount,
  canUndo,
  zoomLevel,
  onTogglePause,
  onUndo,
  onResetChallenge,
  onRequestHint,
  onValidate,
  onZoomIn,
  onZoomOut,
  onResetZoom,
}) => {
  // Format seconds to mm:ss
  const isOvertime = secondsLeft <= 0;
  const absSeconds = Math.abs(secondsLeft);
  const mins = Math.floor(absSeconds / 60);
  const secs = absSeconds % 60;
  const formattedTime = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  const isLowTime = secondsLeft > 0 && secondsLeft <= 30;

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-3 sm:p-4 mb-4 text-right">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Right side: Company name & Mode */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-[#123B35] font-bold">
            <Building className="w-4 h-4 text-[#1FB58A]" />
            <span>شركة {companyName}</span>
          </div>

          <span className="text-gray-300">|</span>

          <span
            className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
              gameMode === 'build'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}
          >
            {gameMode === 'build' ? 'وضع البناء من الصفر' : 'وضع إصلاح الهيكل المضطرب'}
          </span>

          <span className="text-gray-300 hidden sm:inline">|</span>

          {/* Cards Progress */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-600">
            <span>البطاقات الموضوعة:</span>
            <span className="font-mono font-bold text-stone-900 tabular-nums">
              {placedCount} / {totalSlots}
            </span>
          </div>
        </div>

        {/* Center: Timer & Controls */}
        <div className="flex items-center gap-2">
          {/* Timer pill */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-colors ${
              isOvertime
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : isLowTime
                ? 'bg-red-50 text-red-700 border-red-300 animate-pulse'
                : 'bg-stone-100 text-stone-800 border-stone-200'
            }`}
            title={isOvertime ? 'وقت إضافي (تدريب)' : 'المؤقت التنازلي'}
          >
            <Clock className={`w-3.5 h-3.5 ${isLowTime ? 'text-red-600' : 'text-stone-500'}`} />
            <span>{isOvertime ? `+${formattedTime}` : formattedTime}</span>
          </div>

          {/* Pause / Resume Button */}
          <button
            onClick={() => {
              sound.playClick();
              onTogglePause();
            }}
            className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
            title={isPaused ? 'استئناف' : 'إيقاف مؤقت'}
            aria-label={isPaused ? 'استئناف' : 'إيقاف مؤقت'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 fill-current text-[#1FB58A]" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          {/* Zoom controls */}
          <div className="hidden md:flex items-center gap-0.5 border border-stone-200 rounded-lg p-0.5">
            <button
              onClick={() => {
                sound.playClick();
                onZoomOut();
              }}
              disabled={zoomLevel <= 0.7}
              className="p-1 text-stone-500 hover:text-stone-900 disabled:opacity-30 rounded"
              title="تصغير الهيكل"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onResetZoom();
              }}
              className="px-1 text-[10px] font-mono font-bold text-stone-600 hover:text-stone-900"
              title="إعادة ضبط الحجم"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onZoomIn();
              }}
              disabled={zoomLevel >= 1.25}
              className="p-1 text-stone-500 hover:text-stone-900 disabled:opacity-30 rounded"
              title="تكبير الهيكل"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Left Actions: Hints, Undo, Reset, Submit */}
        <div className="flex items-center gap-2">
          {/* Hint Button */}
          <button
            onClick={() => {
              sound.playClick();
              onRequestHint();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
            title="طلب تلميح استرشادي"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span>تلميح</span>
            {hintsUsedCount > 0 && (
              <span className="text-[10px] bg-amber-200/80 px-1 rounded font-mono">
                {hintsUsedCount}
              </span>
            )}
          </button>

          {/* Undo Button */}
          <button
            onClick={() => {
              sound.playClick();
              onUndo();
            }}
            disabled={!canUndo}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-stone-600 hover:text-stone-900 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors disabled:opacity-40 disabled:pointer-events-none"
            title="تراجع عن آخر حركة"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">تراجع</span>
          </button>

          {/* Reset Challenge */}
          <button
            onClick={() => {
              sound.playClick();
              onResetChallenge();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-stone-600 hover:text-stone-900 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
            title="إعادة ترتيب التحدي من البداية"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">إعادة</span>
          </button>

          {/* Primary Submit Button */}
          <button
            onClick={() => {
              sound.playClick();
              onValidate();
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white rounded-lg shadow-sm transition-all transform active:scale-95 ${
              placedCount === totalSlots
                ? 'bg-[#1FB58A] hover:bg-[#189b76] ring-2 ring-[#1FB58A]/40 animate-pulse'
                : 'bg-[#123B35] hover:bg-[#1A4E46]'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>تحقق من الهيكل</span>
          </button>
        </div>
      </div>
    </div>
  );
};

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
  Volume2,
  VolumeX,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ArrowRight,
  Home,
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface PerimeterHUDProps {
  companyName: string;
  gameMode: 'build' | 'repair';
  secondsLeft: number;
  placedCount: number;
  totalSlots: number;
  hintsUsedCount: number;
  canUndo: boolean;
  zoomLevel: number;
  isMuted: boolean;
  onExitToTitle: () => void;
  onTogglePause: () => void;
  onUndo: () => void;
  onResetChallenge: () => void;
  onRequestHint: () => void;
  onValidate: () => void;
  onToggleSound: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export const PerimeterHUD: React.FC<PerimeterHUDProps> = ({
  companyName,
  gameMode,
  secondsLeft,
  placedCount,
  totalSlots,
  hintsUsedCount,
  canUndo,
  zoomLevel,
  isMuted,
  onExitToTitle,
  onTogglePause,
  onUndo,
  onResetChallenge,
  onRequestHint,
  onValidate,
  onToggleSound,
  onZoomIn,
  onZoomOut,
  onResetZoom,
}) => {
  const isOvertime = secondsLeft <= 0;
  const absSeconds = Math.abs(secondsLeft);
  const mins = Math.floor(absSeconds / 60);
  const secs = absSeconds % 60;
  const formattedTime = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  const isLowTime = secondsLeft > 0 && secondsLeft <= 30;

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-3 sm:p-5 select-none">
      {/* Top Perimeter HUD Cluster */}
      <div className="flex items-center justify-between gap-3 w-full">
        {/* Right Corner: Return to Title & Company Badge */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              onExitToTitle();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#123B35]/90 hover:bg-[#1A4E46] text-white rounded-xl border border-white/15 shadow-lg text-xs font-bold transition-all transform active:scale-95"
            title="العودة للشاشة الرئيسية"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">العودة للرئيسية</span>
          </button>

          <div className="flex items-center gap-2 bg-[#123B35]/90 text-white px-3 py-1.5 rounded-xl border border-white/15 shadow-lg backdrop-blur-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1FB58A] animate-ping" />
            <span className="text-xs font-bold text-white max-w-[120px] truncate">{companyName}</span>
            <span className="text-white/30 text-xs">/</span>
            <span className="text-[11px] text-[#D5AE68] font-medium">
              {gameMode === 'build' ? 'بناء الهيكل' : 'إصلاح الهيكل'}
            </span>
          </div>
        </div>

        {/* Center Cluster: Tabular-nums Timer & Progress */}
        <div className="pointer-events-auto flex items-center gap-2 bg-[#123B35]/90 text-white px-3.5 py-1.5 rounded-xl border border-white/15 shadow-lg">
          {/* Timer */}
          <div
            className={`flex items-center gap-1.5 text-xs font-mono font-bold tabular-nums ${
              isOvertime
                ? 'text-amber-400'
                : isLowTime
                ? 'text-red-400 animate-pulse'
                : 'text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{isOvertime ? `+${formattedTime}` : formattedTime}</span>
          </div>

          <span className="text-white/20">|</span>

          {/* Cards Placed Status */}
          <div className="flex items-center gap-1 text-xs text-stone-300">
            <span className="hidden sm:inline">البطاقات:</span>
            <span className="font-mono font-bold text-[#1FB58A] tabular-nums">
              {placedCount}/{totalSlots}
            </span>
          </div>

          <span className="text-white/20">|</span>

          {/* Pause Button */}
          <button
            onClick={() => {
              sound.playClick();
              onTogglePause();
            }}
            className="p-1 text-stone-300 hover:text-white transition-colors"
            title="إيقاف مؤقت (Esc)"
          >
            <Pause className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Left Corner: Actions & Sound */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-0.5 bg-[#123B35]/90 text-white px-1.5 py-1 rounded-xl border border-white/15 shadow-lg">
            <button
              onClick={() => {
                sound.playClick();
                onZoomOut();
              }}
              disabled={zoomLevel <= 0.7}
              className="p-1 text-stone-300 hover:text-white disabled:opacity-30"
              title="تصغير"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onResetZoom();
              }}
              className="px-1 text-[10px] font-mono font-bold text-stone-200"
              title="إعادة ضبط"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onZoomIn();
              }}
              disabled={zoomLevel >= 1.25}
              className="p-1 text-stone-300 hover:text-white disabled:opacity-30"
              title="تكبير"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>

          {/* Hint button */}
          <button
            onClick={() => {
              sound.playClick();
              onRequestHint();
            }}
            className="flex items-center gap-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 px-3 py-1.5 rounded-xl border border-amber-500/30 text-xs font-bold transition-colors shadow-lg"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>تلميح</span>
            {hintsUsedCount > 0 && (
              <span className="text-[10px] bg-amber-400/30 px-1 rounded font-mono">
                {hintsUsedCount}
              </span>
            )}
          </button>

          {/* Undo */}
          <button
            onClick={() => {
              sound.playClick();
              onUndo();
            }}
            disabled={!canUndo}
            className="p-2 bg-[#123B35]/90 text-stone-300 hover:text-white rounded-xl border border-white/15 shadow-lg transition-colors disabled:opacity-30"
            title="تراجع (Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>

          {/* Sound toggle */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleSound();
            }}
            className="p-2 bg-[#123B35]/90 text-stone-300 hover:text-white rounded-xl border border-white/15 shadow-lg transition-colors"
            title={isMuted ? 'تفعيل الصوت' : 'كتم الصوت'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-stone-500" /> : <Volume2 className="w-3.5 h-3.5 text-[#1FB58A]" />}
          </button>

          {/* Submit / Validate Organization CTA */}
          <button
            onClick={() => {
              sound.playClick();
              onValidate();
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-black text-white rounded-xl shadow-xl transition-all transform active:scale-95 ${
              placedCount === totalSlots
                ? 'bg-[#1FB58A] hover:bg-[#21cb9b] ring-2 ring-[#1FB58A]/50 animate-pulse'
                : 'bg-[#123B35] hover:bg-[#1A4E46] border border-white/20'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>تحقق من الهيكل</span>
          </button>
        </div>
      </div>

      {/* Bottom Control Hint / Status Footer (Minimal low-occlusion) */}
      <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 px-2">
        <span className="hidden md:inline">Z: تراجع · Esc: إيقاف · انقر أو اسحب لنقل البطاقة</span>
        <span className="mr-auto text-[10px] bg-black/20 text-stone-400 px-2 py-0.5 rounded">
          المساحة الحرة: &gt; 85%
        </span>
      </div>
    </div>
  );
};

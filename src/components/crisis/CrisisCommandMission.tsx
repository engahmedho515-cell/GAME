/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShieldAlert,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Building2,
  TrendingUp,
  Award,
  Users,
} from 'lucide-react';
import { CRISIS_EVENTS } from '../../data/crisisData';
import { CrisisOption, KPIState } from '../../types/game';
import { sound } from '../../utils/audio';

interface CrisisCommandMissionProps {
  companyName: string;
  initialKPIs: KPIState;
  onMissionCompleted: (updatedKPIs: KPIState) => void;
  onBackToHQ: () => void;
}

export const CrisisCommandMission: React.FC<CrisisCommandMissionProps> = ({
  companyName,
  initialKPIs,
  onMissionCompleted,
  onBackToHQ,
}) => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<CrisisOption | null>(null);
  const [decisionHistory, setDecisionHistory] = useState<Array<{ eventTitle: string; option: CrisisOption }>>([]);
  const [currentKPIs, setCurrentKPIs] = useState<KPIState>({ ...initialKPIs });
  const [isFinished, setIsFinished] = useState(false);

  const currentEvent = CRISIS_EVENTS[currentEventIndex];

  const handleSelectOption = (opt: CrisisOption) => {
    setSelectedOption(opt);
    sound.playClick();
  };

  const handleConfirmDecision = () => {
    if (!selectedOption) return;

    sound.playSuccess();

    // Update KPIs
    const updated: KPIState = {
      operationalEfficiency: Math.min(100, Math.max(10, currentKPIs.operationalEfficiency + (selectedOption.kpiImpact.operationalEfficiency || 0))),
      clarityOfRoles: Math.min(100, Math.max(10, currentKPIs.clarityOfRoles + (selectedOption.kpiImpact.clarityOfRoles || 0))),
      employeeSatisfaction: Math.min(100, Math.max(10, currentKPIs.employeeSatisfaction + (selectedOption.kpiImpact.employeeSatisfaction || 0))),
      customerSatisfaction: Math.min(100, Math.max(10, currentKPIs.customerSatisfaction + (selectedOption.kpiImpact.customerSatisfaction || 0))),
      liquidity: Math.max(50000, currentKPIs.liquidity + (selectedOption.kpiImpact.liquidity || 0)),
    };

    setCurrentKPIs(updated);

    const newHistory = [
      ...decisionHistory,
      { eventTitle: currentEvent.title, option: selectedOption },
    ];
    setDecisionHistory(newHistory);

    if (currentEventIndex < CRISIS_EVENTS.length - 1) {
      setCurrentEventIndex(currentEventIndex + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
      onMissionCompleted(updated);
    }
  };

  const handleRestart = () => {
    setCurrentEventIndex(0);
    setSelectedOption(null);
    setDecisionHistory([]);
    setCurrentKPIs({ ...initialKPIs });
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-right bg-grid-subtle">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl p-6 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8 text-[#1FB58A]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#123B35]">
              اكتملت محاكاة غرفة الأزمات بنجاح!
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              تم تسجيل قراراتك القيادية وتحديث مؤشرات شركة «{companyName}»
            </p>
          </div>

          {/* Decision Summary */}
          <div className="space-y-4 mb-8">
            <h3 className="text-sm font-bold text-gray-800 mb-2">
              سجل قراراتك في الأزمات الثلاث:
            </h3>
            {decisionHistory.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#FAF8F5] rounded-xl border border-stone-200 text-xs text-gray-700"
              >
                <div className="font-bold text-[#123B35] mb-1">
                  الأزمة {idx + 1}: {item.eventTitle}
                </div>
                <div className="text-emerald-800 font-medium mb-1">
                  قرارك المعتمد: {item.option.text}
                </div>
                <div className="text-stone-500 text-[11px]">
                  التقييم الإداري: {item.option.feedback}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-stone-200">
            <button
              onClick={() => {
                sound.playClick();
                handleRestart();
              }}
              className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-gray-800 text-xs sm:text-sm font-bold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة المحاكاة بخيارات بديلة</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onBackToHQ();
              }}
              className="px-6 py-2.5 bg-[#123B35] hover:bg-[#1A4E46] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-colors flex items-center gap-2"
            >
              <span>العودة للشاشة الرئيسية</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-right bg-grid-subtle">
      {/* Top Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm mb-6 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-800 bg-red-50 px-3 py-1 rounded-md mb-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
            <span>غرفة العمليات والأزمات التنفيذية</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123B35]">
            شركة «{companyName}» · الأزمة {currentEventIndex + 1} من {CRISIS_EVENTS.length}
          </h1>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onBackToHQ();
          }}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-white bg-stone-100 hover:bg-[#123B35] border border-stone-300 px-3.5 py-2 rounded-xl transition-all shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
          <span>العودة للشاشة الرئيسية</span>
        </button>
      </div>

      {/* Main Crisis Event Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-md p-6 sm:p-8 mb-6">
        {/* Reporter info */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-stone-100">
          <div className="w-10 h-10 rounded-full bg-[#123B35] text-[#1FB58A] flex items-center justify-center font-bold text-xs shadow-inner">
            {currentEvent.reporter.avatarInitials}
          </div>
          <div>
            <div className="text-xs font-bold text-gray-900">
              بلاغ عاجل من: {currentEvent.reporter.name}
            </div>
            <div className="text-[11px] text-gray-500">{currentEvent.reporter.role}</div>
          </div>
          <span className="mr-auto text-[11px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded">
            حالة طارئة
          </span>
        </div>

        {/* Narrative */}
        <h2 className="text-lg sm:text-xl font-bold text-[#123B35] mb-2">
          {currentEvent.title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed bg-[#FAF8F5] p-4 rounded-xl border border-stone-200/70 mb-6">
          {currentEvent.narrative}
        </p>

        {/* Decision Options */}
        <div className="space-y-3 mb-6">
          <h3 className="text-xs font-bold text-stone-700 mb-2">
            اختر التوجيه التنفيذي المعتمد:
          </h3>

          {currentEvent.options.map((opt) => {
            const isSelected = selectedOption?.id === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => handleSelectOption(opt)}
                className={`p-4 rounded-xl border text-right cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#1FB58A] bg-emerald-50/70 ring-2 ring-[#1FB58A]/30 shadow-xs'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm font-bold text-gray-900 mb-1.5">
                      {opt.text}
                    </div>
                    <div className="text-[11px] text-stone-600 bg-stone-100/70 p-2 rounded-lg font-medium">
                      💡 {opt.executiveOpinion}
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? 'border-[#1FB58A] bg-[#1FB58A] text-white'
                        : 'border-gray-300'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Option Consequence preview & confirmation */}
        {selectedOption && (
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200/80 mb-6 text-xs text-emerald-950 animate-in fade-in duration-200">
            <div className="font-bold mb-1">النتيجة المتوقعة والتفسير الإداري:</div>
            <div className="leading-relaxed">{selectedOption.consequences}</div>
          </div>
        )}

        {/* Confirmation Button */}
        <div className="flex justify-end">
          <button
            onClick={handleConfirmDecision}
            disabled={!selectedOption}
            className="px-6 py-3 bg-[#123B35] hover:bg-[#1A4E46] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center gap-2"
          >
            <span>اعتماد القرار ومتابعة التقرير</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

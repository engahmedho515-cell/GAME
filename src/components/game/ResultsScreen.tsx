/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  RotateCcw,
  Building,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Clock,
  Lightbulb,
  ShieldAlert,
  TrendingUp,
} from 'lucide-react';
import { ValidationResult, KPIState } from '../../types/game';
import { INITIAL_KPIS } from '../../data/organizationData';
import { sound } from '../../utils/audio';

interface ResultsScreenProps {
  companyName: string;
  result: ValidationResult;
  timeSpentSeconds: number;
  hintsUsedCount: number;
  gameMode: 'build' | 'repair';
  onRetry: () => void;
  onGoToCrisis: () => void;
  onGoToHQ: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  companyName,
  result,
  timeSpentSeconds,
  hintsUsedCount,
  gameMode,
  onRetry,
  onGoToCrisis,
  onGoToHQ,
}) => {
  useEffect(() => {
    if (result.score >= 70) {
      sound.playVictory();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#123B35', '#1FB58A', '#D5AE68', '#FAF8F5'],
      });
    } else {
      sound.playWarning();
    }
  }, [result.score]);

  const mins = Math.floor(timeSpentSeconds / 60);
  const secs = timeSpentSeconds % 60;
  const timeFormatted = `${mins} دقيقة و ${secs} ثانية`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-right bg-grid-subtle">
      {/* Result Card */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl p-6 sm:p-10 overflow-hidden relative">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#123B35] bg-[#E8F1EE] px-3 py-1 rounded-md mb-2">
              <Building className="w-3.5 h-3.5 text-[#1FB58A]" />
              <span>تقرير تقييم الأداء التنظيمي · {companyName}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B35]">
              نتائج مهمة إعادة الهيكلة التنظيمية
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {gameMode === 'build' ? 'وضع البناء من الصفر' : 'وضع إصلاح الهيكل المضطرب'}
            </p>
          </div>

          {/* Rank Badge */}
          <div
            className={`px-4 py-3 rounded-2xl border text-center self-stretch sm:self-auto ${
              result.score >= 90
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : result.score >= 60
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-red-50 border-red-300 text-red-900'
            }`}
          >
            <div className="text-xs font-bold text-stone-500">المرتبة الإدارية المحققة</div>
            <div className="text-base sm:text-lg font-black mt-0.5">{result.rank}</div>
          </div>
        </div>

        {/* Score Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-8 items-center">
          {/* Big Circular Score - 4 cols */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-[#FAF8F5] rounded-2xl border border-stone-200/80">
            <div className="text-xs font-bold text-stone-500 mb-1">التقييم الإجمالي</div>
            <div className="text-5xl sm:text-6xl font-black text-[#123B35] font-mono tabular-nums">
              {result.score}
              <span className="text-xl text-stone-400 font-sans font-medium">/100</span>
            </div>
            <div className="text-xs text-stone-600 mt-2 text-center font-medium">
              {result.isFullyCorrect
                ? 'الهيكل المرجعي كامل وصحيح بنسبة 100%'
                : result.score >= 70
                ? 'أداء قيادي كفء مع ملاحظات طفيفة'
                : 'يتطلب مراجعة التسلسل الإداري'}
            </div>
          </div>

          {/* Score 4-Part Breakdown - 8 cols */}
          <div className="md:col-span-8 space-y-3">
            {/* 1. Hierarchy */}
            <div>
              <div className="flex justify-between text-xs font-bold text-gray-800 mb-1">
                <span>صحة التبعية الهرمية (المدير المباشر)</span>
                <span className="font-mono text-[#123B35]">
                  {result.scoreBreakdown.hierarchyScore} / 40 نقطة
                </span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#123B35] h-2 rounded-full"
                  style={{ width: `${(result.scoreBreakdown.hierarchyScore / 40) * 100}%` }}
                />
              </div>
            </div>

            {/* 2. Department */}
            <div>
              <div className="flex justify-between text-xs font-bold text-gray-800 mb-1">
                <span>توزيع الوظائف على الإدارات الصحيحة</span>
                <span className="font-mono text-[#1FB58A]">
                  {result.scoreBreakdown.departmentScore} / 30 نقطة
                </span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#1FB58A] h-2 rounded-full"
                  style={{ width: `${(result.scoreBreakdown.departmentScore / 30) * 100}%` }}
                />
              </div>
            </div>

            {/* 3. Completeness */}
            <div>
              <div className="flex justify-between text-xs font-bold text-gray-800 mb-1">
                <span>اكتمال الهيكل التنظيمي ووضوحه</span>
                <span className="font-mono text-[#0284C7]">
                  {result.scoreBreakdown.completenessScore} / 20 نقطة
                </span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#0284C7] h-2 rounded-full"
                  style={{ width: `${(result.scoreBreakdown.completenessScore / 20) * 100}%` }}
                />
              </div>
            </div>

            {/* 4. Efficiency & Hints */}
            <div>
              <div className="flex justify-between text-xs font-bold text-gray-800 mb-1">
                <span>كفاءة التنفيذ والوقت (التلميحات والسرعة)</span>
                <span className="font-mono text-[#D5AE68]">
                  {result.scoreBreakdown.efficiencyScore} / 10 نقاط
                </span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#D5AE68] h-2 rounded-full"
                  style={{ width: `${(result.scoreBreakdown.efficiencyScore / 10) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-200/60 mb-8 text-center">
          <div>
            <div className="text-[11px] text-gray-500">الوظائف الصحيحة</div>
            <div className="text-base font-bold text-gray-900 font-mono mt-0.5">
              {result.correctPositionsCount} / {result.totalSlots}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-gray-500">خطوط التبعية الصحيحة</div>
            <div className="text-base font-bold text-emerald-700 font-mono mt-0.5">
              {result.correctSupervisorCount} / {result.totalSlots}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-gray-500">التلميحات المستخدمة</div>
            <div className="text-base font-bold text-amber-700 font-mono mt-0.5">
              {hintsUsedCount}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-gray-500">الوقت المستغرق</div>
            <div className="text-base font-bold text-stone-800 font-mono mt-0.5">
              {timeFormatted}
            </div>
          </div>
        </div>

        {/* Simulation Impact: Before & After KPIs */}
        <div className="mb-8 p-5 bg-[#FAF8F5] rounded-2xl border border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#123B35] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#1FB58A]" />
              <span>أثر التنظيم على مؤشرات «نبض الشركة» (قبل التحدي مقابل بعده)</span>
            </h3>
            <span className="text-[11px] text-stone-500">محاكاة إدارية</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Operational Efficiency */}
            <div className="bg-white p-3 rounded-xl border border-stone-200">
              <div className="flex justify-between font-semibold text-gray-700 mb-1">
                <span>الكفاءة التشغيلية</span>
                <span className="font-mono">
                  {INITIAL_KPIS.operationalEfficiency}% ←{' '}
                  <strong className="text-emerald-700">{result.newKPIs.operationalEfficiency}%</strong>
                </span>
              </div>
              <div className="text-[11px] text-gray-500">
                تحسن بنسبة +{result.newKPIs.operationalEfficiency - INITIAL_KPIS.operationalEfficiency}% بفضل وضوح خطوط الإمداد
              </div>
            </div>

            {/* Clarity of Roles */}
            <div className="bg-white p-3 rounded-xl border border-stone-200">
              <div className="flex justify-between font-semibold text-gray-700 mb-1">
                <span>وضوح المسؤوليات والصلاحيات</span>
                <span className="font-mono">
                  {INITIAL_KPIS.clarityOfRoles}% ←{' '}
                  <strong className="text-blue-700">{result.newKPIs.clarityOfRoles}%</strong>
                </span>
              </div>
              <div className="text-[11px] text-gray-500">
                تحسن بنسبة +{result.newKPIs.clarityOfRoles - INITIAL_KPIS.clarityOfRoles}% نتيجة ضبط التبعية المباشرة
              </div>
            </div>

            {/* Employee Satisfaction */}
            <div className="bg-white p-3 rounded-xl border border-stone-200">
              <div className="flex justify-between font-semibold text-gray-700 mb-1">
                <span>رضا الموظفين واستقرارهم</span>
                <span className="font-mono">
                  {INITIAL_KPIS.employeeSatisfaction}% ←{' '}
                  <strong className="text-purple-700">{result.newKPIs.employeeSatisfaction}%</strong>
                </span>
              </div>
              <div className="text-[11px] text-gray-500">
                انخفضت الشكاوى بعد إيقاف التوجيهات المزدوجة المتناقضة
              </div>
            </div>

            {/* Customer Satisfaction */}
            <div className="bg-white p-3 rounded-xl border border-stone-200">
              <div className="flex justify-between font-semibold text-gray-700 mb-1">
                <span>رضا العملاء والمستهلكين</span>
                <span className="font-mono">
                  {INITIAL_KPIS.customerSatisfaction}% ←{' '}
                  <strong className="text-amber-700">{result.newKPIs.customerSatisfaction}%</strong>
                </span>
              </div>
              <div className="text-[11px] text-gray-500">
                انتعشت سرعة الاستجابة لطلبات وشكاوى السوق
              </div>
            </div>
          </div>
        </div>

        {/* Mistakes & Educational Feedback */}
        {result.errors.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-bold text-amber-900 mb-3 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>مواضع بحاجة إلى مراجعة وتصحيح ({result.errors.length}):</span>
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {result.errors.map((err, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/70 text-xs text-amber-950 flex items-start gap-2"
                >
                  <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-[10px] shrink-0 font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{err.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-6 border-t border-stone-200">
          <button
            onClick={() => {
              sound.playClick();
              onGoToHQ();
            }}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-stone-100 hover:bg-[#123B35] hover:text-white text-gray-800 text-xs sm:text-sm font-bold rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4 rotate-180" />
            <span>العودة للشاشة الرئيسية</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onRetry();
            }}
            className="px-5 py-2.5 bg-white hover:bg-stone-50 text-[#123B35] border border-stone-300 text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>إعادة التحدي لتحسين النتيجة</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onGoToCrisis();
            }}
            className="px-6 py-2.5 bg-[#123B35] hover:bg-[#1A4E46] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <ShieldAlert className="w-4 h-4 text-[#1FB58A]" />
            <span>المتابعة إلى «غرفة الأزمات»</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

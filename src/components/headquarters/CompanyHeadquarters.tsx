/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Building2,
  Network,
  ShieldAlert,
  Coins,
  Users,
  Truck,
  Award,
  ChevronLeft,
  ArrowLeft,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
} from 'lucide-react';
import { KPIState, Mission1Stats } from '../../types/game';
import { sound } from '../../utils/audio';

interface CompanyHeadquartersProps {
  companyName: string;
  kpis: KPIState;
  completedMissions: string[];
  mission1HighScore: number | null;
  mission1Stats: Mission1Stats | null;
  onStartMission1: (mode: 'build' | 'repair') => void;
  onStartMission2: () => void;
}

export const CompanyHeadquarters: React.FC<CompanyHeadquartersProps> = ({
  companyName,
  kpis,
  completedMissions,
  mission1HighScore,
  mission1Stats,
  onStartMission1,
  onStartMission2,
}) => {
  const isMission1Completed = completedMissions.includes('mission_org');
  const isMission2Completed = completedMissions.includes('mission_crisis');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-right bg-grid-subtle min-h-[calc(100vh-4rem)]">
      {/* HQ Welcome Header */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#123B35] bg-[#E8F1EE] px-3 py-1 rounded-md mb-2">
            <Building2 className="w-3.5 h-3.5 text-[#1FB58A]" />
            <span>المقر الرئيسي للمجموعة</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B35]">
            مقر شركة «{companyName}» الافتراضية
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl">
            مرحباً بك في غرفة القيادة التنفيذية. تظهر أدناه مؤشرات أداء الشركة الحالية وخريطة المهمات المطلوبة لإصلاح الخلل التنظيمي وحماية الاستقرار المالي.
          </p>
        </div>

        {/* Quick overall status badge */}
        <div className="flex items-center gap-3 bg-[#FAF8F5] p-3 rounded-xl border border-stone-200 self-stretch md:self-auto justify-between md:justify-start">
          <div className="text-right">
            <div className="text-xs text-stone-500">حالة الشركة العامة</div>
            <div className="text-sm font-bold text-[#123B35]">
              {isMission1Completed ? 'في مرحلة التعافي والاستقرار' : 'أزمة تنظيمية نشطة'}
            </div>
          </div>
          <div className={`w-3 h-3 rounded-full ${isMission1Completed ? 'bg-emerald-500' : 'bg-amber-500'}`} />
        </div>
      </div>

      {/* Grid: KPIs & Crisis Briefing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Company Pulse KPIs (نبض الشركة) - 7 cols */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200/90 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
            <h2 className="text-base font-bold text-[#123B35] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1FB58A]" />
              <span>لوحة «نبض الشركة» — مؤشرات الأداء الحالية</span>
            </h2>
            <span className="text-[11px] text-stone-500">بيانات محاكاة تعليمية</span>
          </div>

          <div className="space-y-4">
            {/* KPI 1: Operational Efficiency */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-gray-800">الكفاءة التشغيلية</span>
                <span className="font-mono font-bold text-gray-900 tabular-nums">
                  {kpis.operationalEfficiency}%
                </span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-[#1FB58A] h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(5, kpis.operationalEfficiency))}%` }}
                />
              </div>
            </div>

            {/* KPI 2: Clarity of Roles */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-gray-800">وضوح المسؤوليات وخطوط التبعية</span>
                <span className="font-mono font-bold text-gray-900 tabular-nums">
                  {kpis.clarityOfRoles}%
                </span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-[#0284C7] h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(5, kpis.clarityOfRoles))}%` }}
                />
              </div>
            </div>

            {/* KPI 3: Employee Satisfaction */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-gray-800">رضا الموظفين واستقرار الكفاءات</span>
                <span className="font-mono font-bold text-gray-900 tabular-nums">
                  {kpis.employeeSatisfaction}%
                </span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-[#7C3AED] h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(5, kpis.employeeSatisfaction))}%` }}
                />
              </div>
            </div>

            {/* KPI 4: Customer Satisfaction */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-gray-800">رضا العملاء وثقة السوق</span>
                <span className="font-mono font-bold text-gray-900 tabular-nums">
                  {kpis.customerSatisfaction}%
                </span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-[#D5AE68] h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(5, kpis.customerSatisfaction))}%` }}
                />
              </div>
            </div>

            {/* Financial Liquidity in SAR */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-[#D5AE68]" />
                <span className="text-xs font-bold text-gray-800">السيولة النقدية الافتراضية:</span>
              </div>
              <div className="text-sm font-black text-[#123B35] font-mono tabular-nums">
                {kpis.liquidity.toLocaleString('ar-SA')} ر.س
              </div>
            </div>
          </div>
        </div>

        {/* Crisis Briefing - 5 cols */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#123B35] to-[#1A4E46] text-white rounded-2xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-400/20 text-amber-300 text-xs font-semibold mb-3">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>موجز أزمة الشركة</span>
            </div>
            <h3 className="text-lg font-bold mb-2">تقرير مجلس الإدارة العاجل</h3>
            <p className="text-xs text-stone-200 leading-relaxed mb-4">
              «تزايدت شكاوى الموظفين والعملاء نتيجة تضارب الأوامر الإدارية وغياب التسلسل الإشرافي. أبلغ المشرفون عن صدور توجيهات متناقضة من عدة مدراء في الوقت نفسه. كُلّفت بإعادة هيكلة المنظمة فورا لإيقاف النزيف التشغيلي.»
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-300">
            <span>المهمة ذات الأولوية القصوى:</span>
            <span className="font-bold text-[#1FB58A]">إعادة بناء الهيكل الوظيفي</span>
          </div>
        </div>
      </div>

      {/* Interactive Missions Hub (خريطة المقر والمهمات) */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-[#123B35]">
              خريطة مهمات مقر الشركة
            </h2>
            <p className="text-xs text-gray-600">
              اختر المهمة المطلوبة للبدء في معالجة الخلل واستعادة كفاءة الإدارات
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mission 1: The Org Chart (CORE PLAYABLE) */}
          <div className="bg-white rounded-2xl border-2 border-[#1FB58A]/50 p-6 shadow-md relative overflow-hidden flex flex-col justify-between group hover:border-[#1FB58A] transition-all">
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-[#1FB58A]" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                  المهمة الأولى · جاهزة للعب
                </span>
                {mission1HighScore !== null && (
                  <span className="text-xs font-mono font-bold text-[#123B35] bg-stone-100 px-2 py-0.5 rounded">
                    أعلى تقييم: {mission1HighScore}/100
                  </span>
                )}
              </div>

              <div className="w-12 h-12 rounded-xl bg-[#123B35] text-[#1FB58A] flex items-center justify-center mb-3">
                <Network className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-[#123B35] mb-1.5">
                إعادة بناء الهيكل التنظيمي
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                وزّع 17 وظيفة وقيادة إدارية في مواقعها الصحيحة ضمن 4 مستويات هرمية، واضبط خطوط التبعية المباشرة لمنع تداخل الصلاحيات.
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-stone-100">
              <button
                onClick={() => {
                  sound.playClick();
                  onStartMission1('build');
                }}
                className="w-full py-2.5 px-4 bg-[#123B35] hover:bg-[#1A4E46] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 text-[#1FB58A] fill-current" />
                <span>دخول «وضع البناء من الصفر»</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onStartMission1('repair');
                }}
                className="w-full py-2 px-4 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
                <span>دخول «وضع إصلاح الهيكل الفوضوي»</span>
              </button>
            </div>
          </div>

          {/* Mission 2: Crisis Command (PLAYABLE) */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between hover:border-[#123B35]/40 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-red-800 bg-red-50 px-2.5 py-1 rounded-md">
                  المهمة الثانية · جاهزة للعب
                </span>
                {isMission2Completed && (
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>مكتملة</span>
                  </span>
                )}
              </div>

              <div className="w-12 h-12 rounded-xl bg-red-900/10 text-red-700 flex items-center justify-center mb-3">
                <ShieldAlert className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-[#123B35] mb-1.5">
                غرفة الأزمات — اتخاذ القرار
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                تفاعل مع بلاغات عاجلة من مجلس المديرين التنفيذيين (نورة، فيصل، سارة، خالد) واتخذ قرارات حاسمة تؤثر على العمليات والموظفين.
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <button
                onClick={() => {
                  sound.playClick();
                  onStartMission2();
                }}
                className="w-full py-2.5 px-4 bg-[#123B35] hover:bg-[#1A4E46] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 text-[#1FB58A] fill-current" />
                <span>دخول غرفة الأزمات</span>
              </button>
            </div>
          </div>

          {/* Mission 3: Cashflow Control (LOCKED / PREVIEW) */}
          <div className="bg-stone-50/70 rounded-2xl border border-stone-200/80 p-6 shadow-xs flex flex-col justify-between opacity-80">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-stone-500 bg-stone-200 px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>قريباً · التوسعة القادمة</span>
                </span>
              </div>

              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center mb-3">
                <Coins className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-stone-800 mb-1.5">
                آخر 30 يوماً — إدارة السيولة النقدية
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed mb-4">
                وزّع الميزانية بين الرواتب ومستحقات الموردين وحملات التسويق، مع تفادي الوقوع في عجز نقدي حاد.
              </p>
            </div>

            <div className="pt-4 border-t border-stone-200 text-xs text-stone-400 flex items-center gap-1">
              <span>تُفتح بعد إتقان الهيكل التنظيمي</span>
            </div>
          </div>

          {/* Mission 4: Talent & Culture (LOCKED / PREVIEW) */}
          <div className="bg-stone-50/70 rounded-2xl border border-stone-200/80 p-6 shadow-xs flex flex-col justify-between opacity-80">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-stone-500 bg-stone-200 px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>قريباً</span>
                </span>
              </div>

              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-700 flex items-center justify-center mb-3">
                <Users className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-stone-800 mb-1.5">
                فريقك يصنع الفرق — رأس المال البشري
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed mb-4">
                استقطب الكفاءات الملائمة للوظائف الشاغرة ووازن بين التوظيف الخارجي وتطوير الكوادر الحالية.
              </p>
            </div>

            <div className="pt-4 border-t border-stone-200 text-xs text-stone-400">
              <span>تتطلب إتمام مهمة الأزمات</span>
            </div>
          </div>

          {/* Mission 5: Supply Chain Rush (LOCKED / PREVIEW) */}
          <div className="bg-stone-50/70 rounded-2xl border border-stone-200/80 p-6 shadow-xs flex flex-col justify-between opacity-80">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-stone-500 bg-stone-200 px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>قريباً</span>
                </span>
              </div>

              <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-700 flex items-center justify-center mb-3">
                <Truck className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-stone-800 mb-1.5">
                شبكة الإمداد السريعة
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed mb-4">
                نسّق حركة البضائع بين المستودعات وأسطول التوصيل لتقليل زمن التسليم وخفض تكاليف التخزين.
              </p>
            </div>

            <div className="pt-4 border-t border-stone-200 text-xs text-stone-400">
              <span>مرحلة لوجستية متقدمة</span>
            </div>
          </div>
        </div>
      </div>

      {/* Badges & Achievements Bar */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-sm">
        <h3 className="text-base font-bold text-[#123B35] mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-[#D5AE68]" />
          <span>سجل الإنجارات والأوسمة الإدارية</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className={`p-4 rounded-xl border ${isMission1Completed ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-stone-50 border-stone-200 text-stone-400'}`}>
            <div className="text-2xl mb-1">🏗️</div>
            <div className="text-xs font-bold">مهندس التنظيم</div>
            <div className="text-[10px] text-stone-500 mt-0.5">
              {isMission1Completed ? 'تم إنجازه بنجاح' : 'أكمل تنظيم الهيكل'}
            </div>
          </div>

          <div className={`p-4 rounded-xl border ${isMission2Completed ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-stone-50 border-stone-200 text-stone-400'}`}>
            <div className="text-2xl mb-1">⚖️</div>
            <div className="text-xs font-bold">صاحب القرار المتزن</div>
            <div className="text-[10px] text-stone-500 mt-0.5">
              {isMission2Completed ? 'تم إنجازه بنجاح' : 'حل أزمات القيادة'}
            </div>
          </div>

          <div className={`p-4 rounded-xl border ${(mission1HighScore ?? 0) >= 90 ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-stone-50 border-stone-200 text-stone-400'}`}>
            <div className="text-2xl mb-1">🏆</div>
            <div className="text-xs font-bold">خبير التنظيم الإداري</div>
            <div className="text-[10px] text-stone-500 mt-0.5">
              {(mission1HighScore ?? 0) >= 90 ? 'حققت 90+ نقطة' : 'احصل على 90+ في التقييم'}
            </div>
          </div>

          <div className={`p-4 rounded-xl border ${kpis.clarityOfRoles >= 80 ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-stone-50 border-stone-200 text-stone-400'}`}>
            <div className="text-2xl mb-1">🛡️</div>
            <div className="text-xs font-bold">حارس الحوكمة</div>
            <div className="text-[10px] text-stone-500 mt-0.5">
              {kpis.clarityOfRoles >= 80 ? 'وضوح الصلاحيات عالٍ' : 'ارفع وضوح الأدوار لـ 80%'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

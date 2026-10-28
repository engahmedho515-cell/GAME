/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Network, Move, Lightbulb, Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { sound } from '../../utils/audio';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative bg-[#FDFBF7] rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 text-right border border-[#D5AE68]/30 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 left-5 p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FB58A]"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 border-b border-gray-200 pb-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#123B35] bg-[#E8F1EE] px-3 py-1 rounded-md mb-2">
            <ShieldCheck className="w-4 h-4 text-[#1FB58A]" />
            <span>دليل القائد التنظيمي</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#123B35]">
            كيف تلعب «أنقذ شركتك» وتستعيد السيطرة؟
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            دليلك السريع لفهم الهيكل التنظيمي الهرمي ومبادئ الإدارة والحوكمة
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          {/* Step 1 */}
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-[#123B35] text-white flex items-center justify-center shrink-0 font-bold text-sm">
              1
            </div>
            <div>
              <h4 className="font-bold text-[#123B35] text-base mb-1">
                افهم مستويات الهيكل التنظيمي الهرمي
              </h4>
              <p className="text-gray-600">
                يقسم الهيكل الإداري الناجح المؤسسة إلى مستويات واضحة لتفادي تضارب الصلاحيات:
              </p>
              <ul className="mt-2 space-y-1 text-xs text-gray-600 list-disc list-inside bg-gray-50 p-3 rounded-lg border border-gray-200">
                <li><strong className="text-gray-900">المستوى الأول (الإدارة العليا):</strong> المدير التنفيذي (CEO) يقود الرؤية العامة.</li>
                <li><strong className="text-gray-900">المستوى الثاني (مدراء الإدارات):</strong> العمليات (COO)، المالية (CFO)، الموارد البشرية (CHRO)، والتجاري (CCO).</li>
                <li><strong className="text-gray-900">المستوى الثالث (الوحدات التخصصية):</strong> مديرو الأقسام مثل المحاسب، مسؤول التوظيف، ومدير التسويق.</li>
                <li><strong className="text-gray-900">المستوى الرابع (الفرق التشغيلية):</strong> الموظفون الميدانيون كمشرف المستودع، وخدمة العملاء، وممثلي المبيعات.</li>
              </ul>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-[#1FB58A] text-white flex items-center justify-center shrink-0 font-bold text-sm">
              2
            </div>
            <div>
              <h4 className="font-bold text-[#123B35] text-base mb-1 flex items-center gap-1.5">
                <Move className="w-4 h-4 text-[#1FB58A]" />
                <span>طريقة سحب البطاقات وتثبيتها</span>
              </h4>
              <p className="text-gray-600">
                يمكنك سحب بطاقة الوظيفة من «بنك البطاقات» وإفلاتها مباشرة في الموضع الشاغر المناسب.
              </p>
              <p className="text-xs text-gray-500 mt-1 bg-amber-50 p-2.5 rounded-md border border-amber-200/60">
                <strong>💡 بديل النقر (للجوال ولوحة المفاتيح):</strong> يمكنك النقر على البطاقة في البنك لتحديدها، ثم النقر على أي موضع في الهيكل لتثبيتها فوراً دون سحب!
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-[#D5AE68] text-white flex items-center justify-center shrink-0 font-bold text-sm">
              3
            </div>
            <div>
              <h4 className="font-bold text-[#123B35] text-base mb-1 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#D5AE68]" />
                <span>معايير التقييم والنقاط (من 100)</span>
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs mt-2">
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100">
                  <div className="font-bold text-emerald-900">صحة التبعية الهرمية</div>
                  <div className="text-emerald-700">40 نقطة (المدير المباشر)</div>
                </div>
                <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-100">
                  <div className="font-bold text-blue-900">توزيع الوظائف على الإدارات</div>
                  <div className="text-blue-700">30 نقطة (القسم الصحيح)</div>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-100">
                  <div className="font-bold text-amber-900">اكتمال الهيكل التنظيمي</div>
                  <div className="text-amber-700">20 نقطة (كل الوظائف)</div>
                </div>
                <div className="p-2.5 rounded-lg bg-purple-50 border border-purple-100">
                  <div className="font-bold text-purple-900">كفاءة الوقت والتلميحات</div>
                  <div className="text-purple-700">10 نقاط (السرعة والدقة)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-gray-700 text-white flex items-center justify-center shrink-0 font-bold text-sm">
              4
            </div>
            <div>
              <h4 className="font-bold text-[#123B35] text-base mb-1 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>نظام التلميحات الذكي</span>
              </h4>
              <p className="text-gray-600">
                إذا تعثرت في تحديد موضع وظيفة معينة، يمكنك استخدام زر «اطلب تلميحاً» للحصول على مساعدة تدرجية (تلميح خفيف للقسم، تلميح للمسؤوليات، وتلميح مباشر لخط التبعية).
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-6 py-2.5 text-sm font-bold text-white bg-[#123B35] hover:bg-[#1A4E46] rounded-lg shadow-sm transition-colors"
          >
            فهمت، لنبدأ التحدي!
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Building2, ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';
import { sound } from '../../utils/audio';

interface CompanySetupProps {
  onCompanyCreated: (companyName: string) => void;
  onBackToLanding: () => void;
}

const PRESET_SUGGESTIONS = [
  'روافد للأعمال والحلول',
  'مدار للخدمات اللوجستية',
  'نماء للتقنية والتجارة',
  'أفق للاستشارات المتكاملة',
  'أوتاد للخدمات التشغيلية',
];

export const CompanySetup: React.FC<CompanySetupProps> = ({ onCompanyCreated, onBackToLanding }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      setError('يرجى إدخال اسم لشركتك للبدء في إدارة وتصحيح هيكلها التنظيمي.');
      sound.playError();
      return;
    }
    if (cleanName.length < 2) {
      setError('يجب أن يتكون اسم الشركة من حرفين على الأقل.');
      sound.playError();
      return;
    }
    sound.playSuccess();
    onCompanyCreated(cleanName);
  };

  const selectSuggestion = (suggestion: string) => {
    setName(suggestion);
    setError('');
    sound.playClick();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-grid-subtle">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-stone-200/80 p-6 sm:p-10 text-right">
        {/* Top return */}
        <button
          onClick={() => {
            sound.playClick();
            onBackToLanding();
          }}
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#123B35] transition-colors mb-6 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
          <span>العودة للشاشة الرئيسية</span>
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#123B35]/5 border border-[#123B35]/10 rounded-md text-[#123B35] text-xs font-semibold mb-3">
          <Building2 className="w-3.5 h-3.5 text-[#1FB58A]" />
          <span>تأسيس الجلسة المحلية الفورية</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B35] tracking-tight mb-2">
          سجّل اسم شركتك الافتراضية
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          لا تتطلب اللعبة أي بريد إلكتروني أو كلمة مرور أو بيانات شخصية. أدخل اسم شركتك لتوليد مجلس الإدارة وبدء عملية الإنقاذ التنظيمي فوراً.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="company-name" className="block text-sm font-bold text-gray-800 mb-2">
              اسم شركتك:
            </label>
            <div className="relative">
              <input
                id="company-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="اكتب اسم شركتك هنا... (مثلاً: روافد للأعمال)"
                className="w-full px-4 py-3.5 text-base rounded-xl border border-gray-300 focus:border-[#1FB58A] focus:ring-2 focus:ring-[#1FB58A]/30 outline-none transition-all bg-[#FAF8F5] text-gray-900 placeholder-gray-400 font-medium"
                autoFocus
                maxLength={45}
              />
              <Building2 className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {error && (
              <p className="text-xs text-red-600 mt-2 font-medium flex items-center gap-1">
                <span>⚠️</span>
                <span>{error}</span>
              </p>
            )}
          </div>

          {/* Quick suggestions */}
          <div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#D5AE68]" />
              <span>أو اختر من المقترحات السعودية السريعة:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESET_SUGGESTIONS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => selectSuggestion(preset)}
                  className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-[#123B35] hover:text-white rounded-lg transition-colors border border-stone-200"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs text-emerald-800 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#1FB58A] shrink-0 mt-0.5" />
            <div>
              <strong>خصوصية تامة:</strong> بياناتك وتقدمك في اللعبة يتم حفظها محلياً في متصفحك (LocalStorage) دون إرسال أي بيانات لخوادم خارجية.
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 bg-[#123B35] hover:bg-[#1A4E46] text-white text-base font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <span>إنشاء الشركة والبدء في الإنقاذ</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, CheckCircle2, Shield, Layers, Award } from 'lucide-react';
import { JobCardData } from '../../types/game';
import { DEPARTMENT_METADATA } from '../../data/organizationData';
import { sound } from '../../utils/audio';

interface JobDetailModalProps {
  job: JobCardData | null;
  onClose: () => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, onClose }) => {
  if (!job) return null;

  const deptMeta = DEPARTMENT_METADATA[job.department];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 text-right border border-stone-200">
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

        {/* Header with Avatar */}
        <div className="mb-4 pb-4 border-b border-stone-100 flex items-start gap-3.5">
          {job.avatarUrl ? (
            <img
              src={job.avatarUrl}
              alt={job.title}
              className="w-16 h-16 rounded-2xl object-cover border-2 shadow-md shrink-0"
              style={{ borderColor: deptMeta.accentColor }}
            />
          ) : (
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border"
              style={{ backgroundColor: deptMeta.lightBg, color: deptMeta.textColor, borderColor: deptMeta.borderColor }}
            >
              <Award className="w-8 h-8" />
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span
                className="text-[11px] font-bold px-2 py-0.5 rounded shadow-xs"
                style={{ backgroundColor: deptMeta.lightBg, color: deptMeta.textColor }}
              >
                {deptMeta.label}
              </span>
              {job.acronym && (
                <span className="text-[11px] font-mono font-bold bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                  {job.acronym}
                </span>
              )}
              <span className="text-[11px] text-stone-400">المستوى الهرمي: {job.targetLevel}</span>
            </div>

            <h3 className="text-xl font-bold text-[#123B35]">{job.title}</h3>
            <p className="text-xs text-stone-500 font-sans mt-0.5">{job.titleEn}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-5">
          <h4 className="text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#1FB58A]" />
            <span>نطاق الدور والمسؤولية:</span>
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-stone-200/60">
            {job.description}
          </p>
        </div>

        {/* Key Responsibilities */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-stone-700 mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#D5AE68]" />
            <span>أبرز المهام والصلاحيات التنظيمية:</span>
          </h4>
          <ul className="space-y-2">
            {job.keyResponsibilities.map((resp, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-stone-700 bg-stone-50 p-2.5 rounded-lg border border-stone-200/50"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1FB58A] shrink-0 mt-0.5" />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2 text-xs font-bold text-white bg-[#123B35] hover:bg-[#1A4E46] rounded-lg transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

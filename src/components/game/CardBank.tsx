/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Layers, Search, CheckCircle2 } from 'lucide-react';
import { JobCardData, Department } from '../../types/game';
import { DEPARTMENT_METADATA } from '../../data/organizationData';
import { JobCard } from './JobCard';

interface CardBankProps {
  unplacedJobs: JobCardData[];
  selectedJobId: string | null;
  onSelectJob: (jobId: string) => void;
  onOpenDetails: (job: JobCardData) => void;
}

export const CardBank: React.FC<CardBankProps> = ({
  unplacedJobs,
  selectedJobId,
  onSelectJob,
  onOpenDetails,
}) => {
  const [filterDept, setFilterDept] = useState<Department | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = unplacedJobs.filter((job) => {
    const matchesDept = filterDept === 'all' || job.department === filterDept;
    const matchesSearch =
      !searchQuery.trim() ||
      job.title.includes(searchQuery) ||
      job.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.acronym && job.acronym.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-4 text-right flex flex-col h-full">
      {/* Bank Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#123B35] text-white flex items-center justify-center">
            <Layers className="w-4 h-4 text-[#1FB58A]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#123B35]">بنك بطاقات الوظائف</h3>
            <p className="text-[11px] text-gray-500">
              {unplacedJobs.length > 0
                ? `${unplacedJobs.length} وظيفة متبقية للتوزيع`
                : 'تم توزيع كافة الوظائف'}
            </p>
          </div>
        </div>

        {selectedJobId && (
          <span className="text-xs bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded animate-pulse">
            بطاقة محددة (انقر موضعاً لتثبيتها)
          </span>
        )}
      </div>

      {/* Search Input */}
      <div className="relative mb-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="بحث عن مسمى وظيفي أو اختصار..."
          className="w-full pr-8 pl-3 py-1.5 text-xs rounded-lg border border-stone-200 focus:border-[#1FB58A] focus:ring-1 focus:ring-[#1FB58A] outline-none text-gray-800 placeholder-gray-400 bg-stone-50/50"
        />
        <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-3 text-xs scrollbar-none">
        <button
          type="button"
          onClick={() => setFilterDept('all')}
          className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
            filterDept === 'all'
              ? 'bg-[#123B35] text-white shadow-xs'
              : 'text-gray-600 bg-stone-100 hover:bg-stone-200'
          }`}
        >
          الكل ({unplacedJobs.length})
        </button>

        {Object.entries(DEPARTMENT_METADATA).map(([key, meta]) => {
          const count = unplacedJobs.filter((j) => j.department === key).length;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setFilterDept(key as Department)}
              className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                filterDept === key
                  ? 'bg-[#123B35] text-white shadow-xs'
                  : 'text-gray-600 bg-stone-100 hover:bg-stone-200'
              }`}
            >
              {meta.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Cards List Grid */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-0.5 max-h-[580px] min-h-[160px]">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSelected={selectedJobId === job.id}
              onSelect={onSelectJob}
              onOpenDetails={onOpenDetails}
            />
          ))
        ) : unplacedJobs.length === 0 ? (
          <div className="h-44 flex flex-col items-center justify-center text-center p-4 text-emerald-800 bg-emerald-50/50 rounded-xl border border-emerald-100">
            <CheckCircle2 className="w-8 h-8 text-[#1FB58A] mb-2" />
            <div className="text-xs font-bold">أحسنت! وزعت جميع البطاقات</div>
            <div className="text-[11px] text-gray-600 mt-1">
              اضغط الآن على زر «تحقق من الهيكل» في الشريط العلوي لمعرفة نتيجة التقييم.
            </div>
          </div>
        ) : (
          <div className="h-32 flex flex-col items-center justify-center text-center text-xs text-gray-400">
            لا توجد وظائف مطابقة للبحث
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { X, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { OrgNodeSlotDef, JobCardData } from '../../types/game';
import { DEPARTMENT_METADATA } from '../../data/organizationData';
import { JobCard } from './JobCard';
import { sound } from '../../utils/audio';

interface OrganizationNodeSlotProps {
  slot: OrgNodeSlotDef;
  placedJob: JobCardData | null;
  isLocked?: boolean;
  selectedJobId: string | null;
  validationStatus?: 'correct' | 'wrong' | null;
  errorMessage?: string;
  onSlotClick: (slotId: string) => void;
  onRemoveJob: (slotId: string) => void;
  onOpenDetails: (job: JobCardData) => void;
}

export const OrganizationNodeSlot: React.FC<OrganizationNodeSlotProps> = ({
  slot,
  placedJob,
  isLocked = false,
  selectedJobId,
  validationStatus = null,
  errorMessage,
  onSlotClick,
  onRemoveJob,
  onOpenDetails,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `slot-${slot.slotId}`,
    data: { slotId: slot.slotId, slot },
    disabled: isLocked,
  });

  const deptMeta = DEPARTMENT_METADATA[slot.department];

  const handleClick = () => {
    onSlotClick(slot.slotId);
  };

  // Border & styling based on validation status
  let borderStyle = 'border-stone-200 border-dashed';
  let bgStyle = 'bg-stone-50/70';

  if (isOver && !isLocked) {
    borderStyle = 'border-[#1FB58A] border-solid ring-2 ring-[#1FB58A]/30 scale-[1.02]';
    bgStyle = 'bg-emerald-50/70';
  } else if (validationStatus === 'correct') {
    borderStyle = 'border-emerald-500 border-solid ring-2 ring-emerald-500/20';
    bgStyle = 'bg-emerald-50/30';
  } else if (validationStatus === 'wrong') {
    borderStyle = 'border-amber-500 border-solid ring-2 ring-amber-500/20';
    bgStyle = 'bg-amber-50/40';
  } else if (placedJob) {
    borderStyle = 'border-stone-300 border-solid';
    bgStyle = 'bg-white';
  } else if (selectedJobId && !isLocked) {
    borderStyle = 'border-[#1FB58A]/60 border-dashed hover:border-[#1FB58A] animate-pulse';
    bgStyle = 'bg-emerald-50/20';
  }

  return (
    <div
      ref={setNodeRef}
      id={slot.slotId}
      onClick={handleClick}
      className={`relative w-44 sm:w-48 h-24 rounded-xl border text-right transition-all duration-150 flex flex-col justify-between p-2 select-none shadow-xs group ${borderStyle} ${bgStyle} ${
        !isLocked ? 'cursor-pointer' : 'cursor-default'
      }`}
    >
      {/* Top Tag & Status */}
      <div className="flex items-center justify-between gap-1 text-[10px] pb-1 border-b border-stone-200/60">
        <span
          className="font-bold truncate max-w-[110px]"
          style={{ color: deptMeta.textColor }}
        >
          {slot.label}
        </span>

        <div className="flex items-center gap-1">
          {validationStatus === 'correct' && (
            <span title="صحيح: الموقع وخط التبعية مطابق">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </span>
          )}
          {validationStatus === 'wrong' && (
            <span title={errorMessage || 'خطأ: الموقع أو التبعية بحاجة لمراجعة'}>
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            </span>
          )}
          {isLocked && (
            <span title="مثبت كرأس الهرم التنفيذي">
              <Lock className="w-3 h-3 text-stone-400" />
            </span>
          )}
          {placedJob && !isLocked && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                sound.playClick();
                onRemoveJob(slot.slotId);
              }}
              className="p-0.5 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="إعادة البطاقة للبنك"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Center Body */}
      {placedJob ? (
        <div className="flex-1 mt-1">
          <JobCard
            job={placedJob}
            isCompact={true}
            onOpenDetails={onOpenDetails}
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-1">
          <span className="text-[11px] text-gray-400 font-medium">
            {selectedJobId ? 'انقر لتثبيت البطاقة هنا' : 'موضع شاغر'}
          </span>
          <span className="text-[9px] text-gray-400 font-mono mt-0.5">
            المستوى {slot.level}
          </span>
        </div>
      )}

      {/* Error tooltip indicator */}
      {errorMessage && (
        <div className="absolute -bottom-7 right-0 left-0 text-center z-10 pointer-events-none">
          <span className="inline-block px-2 py-0.5 text-[9px] font-medium bg-amber-900 text-white rounded shadow-sm truncate max-w-[180px]">
            {errorMessage}
          </span>
        </div>
      )}
    </div>
  );
};

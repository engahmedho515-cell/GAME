/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import {
  Building2,
  Cpu,
  Coins,
  Users,
  TrendingUp,
  Truck,
  Headphones,
  FileSpreadsheet,
  Calculator,
  UserPlus,
  GraduationCap,
  Megaphone,
  Target,
  Boxes,
  Compass,
  PhoneCall,
  Briefcase,
  Info,
} from 'lucide-react';
import { JobCardData } from '../../types/game';
import { DEPARTMENT_METADATA } from '../../data/organizationData';
import { sound } from '../../utils/audio';

interface JobCardProps {
  job: JobCardData;
  isSelected?: boolean;
  isCompact?: boolean;
  onSelect?: (jobId: string) => void;
  onOpenDetails?: (job: JobCardData) => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Cpu,
  Coins,
  Users,
  TrendingUp,
  Truck,
  Headphones,
  FileSpreadsheet,
  Calculator,
  UserPlus,
  GraduationCap,
  Megaphone,
  Target,
  Boxes,
  Compass,
  PhoneCall,
  Briefcase,
};

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isSelected = false,
  isCompact = false,
  onSelect,
  onOpenDetails,
}) => {
  const [imgError, setImgError] = useState(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `job-${job.id}`,
    data: { jobId: job.id, job },
  });

  const deptMeta = DEPARTMENT_METADATA[job.department];
  const IconComponent = ICON_MAP[job.iconName] || Briefcase;

  const style: React.CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    zIndex: isDragging ? 999 : undefined,
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.info-trigger')) {
      return;
    }
    if (onSelect) {
      sound.playClick();
      onSelect(job.id);
    }
  };

  if (isCompact) {
    // Compact version displayed inside an org tree slot
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        onClick={handleCardClick}
        className={`w-full h-full p-2 rounded-xl text-right flex flex-col justify-between cursor-grab active:cursor-grabbing transition-all select-none ${
          isDragging
            ? 'opacity-40 scale-105 shadow-2xl ring-2 ring-[#1FB58A]'
            : 'bg-white hover:shadow-md'
        } ${isSelected ? 'ring-2 ring-[#1FB58A] bg-emerald-50/60' : 'border border-stone-200'}`}
      >
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1.5 truncate">
            {/* Person Avatar or Fallback Icon */}
            {job.avatarUrl && !imgError ? (
              <img
                src={job.avatarUrl}
                alt={job.title}
                onError={() => setImgError(true)}
                className="w-6 h-6 rounded-full object-cover shrink-0 border border-stone-200 ring-1"
                style={{ outlineColor: deptMeta.accentColor }}
              />
            ) : (
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 border"
                style={{ backgroundColor: deptMeta.lightBg, color: deptMeta.textColor, borderColor: deptMeta.borderColor }}
              >
                <IconComponent className="w-3.5 h-3.5" />
              </div>
            )}
            <span className="text-xs font-bold text-gray-900 truncate">{job.title}</span>
          </div>

          {job.acronym && (
            <span
              className="text-[10px] font-mono font-bold px-1 py-0.5 rounded shrink-0"
              style={{ backgroundColor: deptMeta.lightBg, color: deptMeta.textColor }}
            >
              {job.acronym}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-[10px] text-gray-500 mt-1">
          <span className="truncate">{deptMeta.label}</span>
          {onOpenDetails && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                sound.playClick();
                onOpenDetails(job);
              }}
              className="info-trigger p-1 text-gray-400 hover:text-gray-700 transition-colors"
              title="عرض بطاقة المسؤوليات"
            >
              <Info className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Full Card version displayed in the Card Bank / Drawer
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleCardClick}
      className={`group relative p-3 rounded-xl bg-white text-right border transition-all duration-150 select-none cursor-grab active:cursor-grabbing ${
        isDragging
          ? 'opacity-30 scale-95 shadow-2xl border-[#1FB58A]'
          : 'hover:-translate-y-0.5 hover:shadow-md border-stone-200'
      } ${
        isSelected
          ? 'ring-2 ring-[#1FB58A] bg-emerald-50/70 border-[#1FB58A]'
          : ''
      }`}
    >
      {/* Top row with Avatar */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2.5">
          {/* Executive Person Avatar */}
          {job.avatarUrl && !imgError ? (
            <div className="relative shrink-0">
              <img
                src={job.avatarUrl}
                alt={job.title}
                onError={() => setImgError(true)}
                className="w-9 h-9 rounded-full object-cover border-2 shadow-xs"
                style={{ borderColor: deptMeta.accentColor }}
              />
              <div
                className="w-2.5 h-2.5 rounded-full absolute -bottom-0.5 -right-0.5 border border-white"
                style={{ backgroundColor: deptMeta.accentColor }}
              />
            </div>
          ) : (
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-xs border"
              style={{ backgroundColor: deptMeta.lightBg, color: deptMeta.textColor, borderColor: deptMeta.borderColor }}
            >
              <IconComponent className="w-4 h-4" />
            </div>
          )}

          <div>
            <div className="text-xs font-bold text-gray-900 group-hover:text-[#123B35]">
              {job.title}
            </div>
            <div className="text-[10px] text-gray-500">{job.titleEn}</div>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {job.acronym && (
            <span
              className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shadow-xs"
              style={{ backgroundColor: deptMeta.lightBg, color: deptMeta.textColor }}
            >
              {job.acronym}
            </span>
          )}
          {onOpenDetails && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                sound.playClick();
                onOpenDetails(job);
              }}
              className="info-trigger p-1 rounded-md text-gray-400 hover:text-gray-800 hover:bg-stone-100 transition-colors"
              title="عرض بطاقة المسؤوليات"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed mb-2">
        {job.description}
      </p>

      {/* Bottom info */}
      <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-stone-100 text-gray-500">
        <span
          className="font-medium"
          style={{ color: deptMeta.textColor }}
        >
          {deptMeta.label}
        </span>
        <span className="text-stone-400">المستوى {job.targetLevel}</span>
      </div>
    </div>
  );
};

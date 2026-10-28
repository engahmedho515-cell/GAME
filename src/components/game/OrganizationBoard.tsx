/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BoardPlacements, JobCardData, OrgNodeSlotDef, ValidationErrorItem } from '../../types/game';
import { ORG_TREE_SLOTS, MASTER_JOBS } from '../../data/organizationData';
import { OrganizationNodeSlot } from './OrganizationNodeSlot';

interface OrganizationBoardProps {
  placements: BoardPlacements;
  selectedJobId: string | null;
  validationErrors: ValidationErrorItem[];
  hasValidated: boolean;
  gameMode: 'build' | 'repair';
  zoomLevel: number;
  onSlotClick: (slotId: string) => void;
  onRemoveJob: (slotId: string) => void;
  onOpenDetails: (job: JobCardData) => void;
}

export const OrganizationBoard: React.FC<OrganizationBoardProps> = ({
  placements,
  selectedJobId,
  validationErrors,
  hasValidated,
  gameMode,
  zoomLevel,
  onSlotClick,
  onRemoveJob,
  onOpenDetails,
}) => {
  const jobMap = new Map(MASTER_JOBS.map((j) => [j.id, j]));
  const slotMap = new Map(ORG_TREE_SLOTS.map((s) => [s.slotId, s]));

  // Helper to get slot status
  const getSlotStatus = (slotId: string) => {
    if (!hasValidated) return { status: null as 'correct' | 'wrong' | null, message: undefined };
    const err = validationErrors.find((e) => e.slotId === slotId);
    if (err) {
      return { status: 'wrong' as const, message: err.message };
    }
    const placed = placements[slotId];
    if (placed) {
      return { status: 'correct' as const, message: undefined };
    }
    return { status: null as 'correct' | 'wrong' | null, message: undefined };
  };

  const renderSlot = (slotId: string, isLocked: boolean = false) => {
    const slotDef = slotMap.get(slotId);
    if (!slotDef) return null;

    const placedJobId = placements[slotId];
    const placedJob = placedJobId ? jobMap.get(placedJobId) || null : null;
    const { status, message } = getSlotStatus(slotId);

    return (
      <OrganizationNodeSlot
        key={slotId}
        slot={slotDef}
        placedJob={placedJob}
        isLocked={isLocked}
        selectedJobId={selectedJobId}
        validationStatus={status}
        errorMessage={message}
        onSlotClick={onSlotClick}
        onRemoveJob={onRemoveJob}
        onOpenDetails={onOpenDetails}
      />
    );
  };

  return (
    <div className="bg-white/80 rounded-2xl border border-stone-200/90 shadow-sm p-4 sm:p-6 text-center overflow-x-auto min-h-[620px] flex flex-col items-center justify-start bg-dot-subtle">
      {/* Zoom Container */}
      <div
        className="transition-transform duration-200 origin-top flex flex-col items-center min-w-[920px] py-4"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        {/* ========================================================= */}
        {/* LEVEL 1: CEO (Executive) */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center">
          <div className="text-[11px] font-bold text-[#123B35] bg-[#E8F1EE] px-3 py-1 rounded-full mb-2">
            المستوى الأول · الإدارة العليا
          </div>

          {/* CEO Slot (Locked in build mode) */}
          <div className="relative">
            {renderSlot('slot_ceo', gameMode === 'build')}
          </div>

          {/* Vertical Trunk Line down from CEO */}
          <div className="w-0.5 h-6 bg-emerald-600/80"></div>
        </div>

        {/* Level 2 Horizontal Distribution Bus */}
        <div className="relative w-[860px] flex justify-between items-center mb-0">
          <div className="absolute top-0 right-[100px] left-[100px] h-0.5 bg-emerald-600/60"></div>
        </div>

        {/* ========================================================= */}
        {/* LEVEL 2, 3, 4: Department Columns */}
        {/* ========================================================= */}
        <div className="w-[960px] grid grid-cols-4 gap-4 mt-2">
          {/* ------------------------------------------------------- */}
          {/* COLUMN 1: OPERATIONS */}
          {/* ------------------------------------------------------- */}
          <div className="flex flex-col items-center">
            {/* L2 Director */}
            <div className="w-0.5 h-4 bg-sky-500/70 mb-1"></div>
            {renderSlot('slot_coo')}

            {/* L3 Branches from COO */}
            <div className="w-0.5 h-5 bg-sky-500/50"></div>
            <div className="w-36 h-0.5 bg-sky-400/40"></div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-3 bg-sky-300"></div>
                {renderSlot('slot_logistics_mgr')}

                {/* L4 Under Logistics */}
                <div className="w-0.5 h-4 bg-sky-300"></div>
                <div className="w-24 h-0.5 bg-sky-200"></div>
                <div className="flex flex-col gap-2 mt-2">
                  {renderSlot('slot_warehouse_sup')}
                  {renderSlot('slot_delivery_coord')}
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-0.5 h-3 bg-sky-300"></div>
                {renderSlot('slot_cs_mgr')}

                {/* L4 Under CS */}
                <div className="w-0.5 h-4 bg-sky-300"></div>
                <div className="mt-2">
                  {renderSlot('slot_cs_team')}
                </div>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* COLUMN 2: FINANCE */}
          {/* ------------------------------------------------------- */}
          <div className="flex flex-col items-center">
            {/* L2 Director */}
            <div className="w-0.5 h-4 bg-amber-500/70 mb-1"></div>
            {renderSlot('slot_cfo')}

            {/* L3 Branches from CFO */}
            <div className="w-0.5 h-5 bg-amber-500/50"></div>
            <div className="w-36 h-0.5 bg-amber-400/40"></div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-3 bg-amber-300"></div>
                {renderSlot('slot_accountant')}
              </div>

              <div className="flex flex-col items-center">
                <div className="w-0.5 h-3 bg-amber-300"></div>
                {renderSlot('slot_budget_officer')}
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* COLUMN 3: HUMAN RESOURCES */}
          {/* ------------------------------------------------------- */}
          <div className="flex flex-col items-center">
            {/* L2 Director */}
            <div className="w-0.5 h-4 bg-purple-500/70 mb-1"></div>
            {renderSlot('slot_hr_dir')}

            {/* L3 Branches from HR */}
            <div className="w-0.5 h-5 bg-purple-500/50"></div>
            <div className="w-36 h-0.5 bg-purple-400/40"></div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-3 bg-purple-300"></div>
                {renderSlot('slot_recruiter')}
              </div>

              <div className="flex flex-col items-center">
                <div className="w-0.5 h-3 bg-purple-300"></div>
                {renderSlot('slot_training_officer')}
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* COLUMN 4: COMMERCIAL & SALES */}
          {/* ------------------------------------------------------- */}
          <div className="flex flex-col items-center">
            {/* L2 Director */}
            <div className="w-0.5 h-4 bg-emerald-500/70 mb-1"></div>
            {renderSlot('slot_commercial_dir')}

            {/* L3 Branches from Commercial */}
            <div className="w-0.5 h-5 bg-emerald-500/50"></div>
            <div className="w-36 h-0.5 bg-emerald-400/40"></div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-3 bg-emerald-300"></div>
                {renderSlot('slot_marketing_mgr')}
              </div>

              <div className="flex flex-col items-center">
                <div className="w-0.5 h-3 bg-emerald-300"></div>
                {renderSlot('slot_sales_mgr')}

                {/* L4 Under Sales */}
                <div className="w-0.5 h-4 bg-emerald-300"></div>
                <div className="mt-2">
                  {renderSlot('slot_sales_team')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

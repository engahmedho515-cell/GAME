/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BoardPlacements, ValidationResult, ValidationErrorItem, KPIState } from '../types/game';
import { MASTER_JOBS, ORG_TREE_SLOTS, INITIAL_KPIS } from '../data/organizationData';

export function validateOrganization(
  placements: BoardPlacements,
  hintsUsedCount: number = 0,
  secondsElapsed: number = 0
): ValidationResult {
  const totalSlots = ORG_TREE_SLOTS.length;
  let placedCount = 0;
  let correctPositionsCount = 0;
  let correctSupervisorCount = 0;
  let correctDepartmentCount = 0;

  const errors: ValidationErrorItem[] = [];
  const jobMap = new Map(MASTER_JOBS.map((j) => [j.id, j]));
  const slotMap = new Map(ORG_TREE_SLOTS.map((s) => [s.slotId, s]));

  // Check for duplicate assignments
  const seenJobIds = new Map<string, string[]>(); // jobId -> slotIds
  Object.entries(placements).forEach(([slotId, jobId]) => {
    if (jobId) {
      placedCount++;
      const current = seenJobIds.get(jobId) || [];
      current.push(slotId);
      seenJobIds.set(jobId, current);
    }
  });

  // Evaluate each slot
  for (const slot of ORG_TREE_SLOTS) {
    const placedJobId = placements[slot.slotId];

    if (!placedJobId) {
      errors.push({
        slotId: slot.slotId,
        jobId: '',
        jobTitle: slot.label,
        issueType: 'missing',
        message: `الموقع «${slot.label}» فارغ، يتطلب تعيين الوظيفة المسؤولة عنه.`,
      });
      continue;
    }

    const job = jobMap.get(placedJobId);
    if (!job) continue;

    // Check duplicate
    const duplicates = seenJobIds.get(placedJobId) || [];
    if (duplicates.length > 1) {
      errors.push({
        slotId: slot.slotId,
        jobId: job.id,
        jobTitle: job.title,
        issueType: 'wrong_level',
        message: `تم تكرار بطاقة «${job.title}» في أكثر من موقع (${duplicates.length} مرات). يجب أن تظهر الوظيفة في موضع واحد فقط.`,
      });
    }

    // 1. Department match
    if (job.department === slot.department) {
      correctDepartmentCount++;
    } else {
      errors.push({
        slotId: slot.slotId,
        jobId: job.id,
        jobTitle: job.title,
        issueType: 'wrong_department',
        message: `وظيفة «${job.title}» موضوعة في إدارة غير ملائمة؛ تتبع لقسم آخر.`,
      });
    }

    // 2. Hierarchy Level match
    const isLevelCorrect = job.targetLevel === slot.level;
    if (isLevelCorrect) {
      correctPositionsCount++;
    } else {
      errors.push({
        slotId: slot.slotId,
        jobId: job.id,
        jobTitle: job.title,
        issueType: 'wrong_level',
        message: `المستوى الإداري لوظيفة «${job.title}» غير صحيح (المستوى الحالي: ${slot.level} بينما المستوى المتوقع: ${job.targetLevel}).`,
      });
    }

    // 3. Supervisor relationship match
    if (slot.parentSlotId === null) {
      // Top level (CEO)
      if (job.targetParentId === null) {
        correctSupervisorCount++;
      } else {
        errors.push({
          slotId: slot.slotId,
          jobId: job.id,
          jobTitle: job.title,
          issueType: 'wrong_supervisor',
          message: `وظيفة «${job.title}» ليست في قمة الهيكل، بل تتبع مديراً تنفيذياً.`,
        });
      }
    } else {
      const parentJobId = placements[slot.parentSlotId];
      if (!parentJobId) {
        errors.push({
          slotId: slot.slotId,
          jobId: job.id,
          jobTitle: job.title,
          issueType: 'wrong_supervisor',
          message: `وظيفة «${job.title}» ترفع تقاريرها لموقع إشرافي شاغر حالياً.`,
        });
      } else if (parentJobId === job.targetParentId) {
        correctSupervisorCount++;
      } else {
        const actualParentJob = jobMap.get(parentJobId);
        errors.push({
          slotId: slot.slotId,
          jobId: job.id,
          jobTitle: job.title,
          issueType: 'wrong_supervisor',
          message: `خط التبعية غير صحيح: «${job.title}» موضوعة تحت إشراف «${actualParentJob?.title || 'غير معروف'}» بدلاً من مديرها المباشر الصحيح.`,
        });
      }
    }
  }

  // Calculate score breakdown
  // 1. Hierarchy & Supervisor: max 40
  const hierarchyScore = Math.round((correctSupervisorCount / totalSlots) * 40);

  // 2. Department distribution: max 30
  const departmentScore = Math.round((correctDepartmentCount / totalSlots) * 30);

  // 3. Completeness: max 20
  const completenessRatio = placedCount / totalSlots;
  const positionsRatio = correctPositionsCount / totalSlots;
  const completenessScore = Math.round(((completenessRatio + positionsRatio) / 2) * 20);

  // 4. Efficiency & hints: max 10
  let efficiencyScore = 10;
  // Deduct 2 pts per hint used
  efficiencyScore -= hintsUsedCount * 2;
  // Slight deduction if over 180 seconds (3 mins)
  if (secondsElapsed > 180) {
    efficiencyScore -= 2;
  }
  efficiencyScore = Math.max(0, Math.min(10, efficiencyScore));

  const totalScore = Math.max(0, Math.min(100, hierarchyScore + departmentScore + completenessScore + efficiencyScore));

  // Determine Rank
  let rank: ValidationResult['rank'] = 'متدرّب إداري';
  if (totalScore >= 90) {
    rank = 'خبير التنظيم الإداري';
  } else if (totalScore >= 60) {
    rank = 'منظّم كفء';
  }

  const isFullyCorrect = correctSupervisorCount === totalSlots && correctPositionsCount === totalSlots && placedCount === totalSlots;

  // General feedback
  let generalFeedback = '';
  if (isFullyCorrect) {
    generalFeedback = 'إنجاز استثنائي! لقد أعدت بناء الهيكل التنظيمي للشركة بأعلى معايير الحوكمة الإدارية. جميع خطوط التبعية والمسؤوليات واضحة الآن.';
  } else if (totalScore >= 75) {
    generalFeedback = 'عمل رائع ومتقدم! معظم الإدارات وخطوط الإشراف صحيحة، يتبقى فقط مراجعة بعض التبعيات الفرعية لتكتمل السيطرة.';
  } else if (placedCount < totalSlots) {
    generalFeedback = `لا تزال هناك ${totalSlots - placedCount} وظيفة لم تُوضع بعد في الهيكل. أكمل تعيين كافة المواقع قبل الإرسال النهائي.`;
  } else {
    generalFeedback = 'هناك تداخل في بعض الصلاحيات ومستويات الإشراف. راجع تبعية الوظائف لمديرها المباشر في كل إدارة.';
  }

  // Calculate simulated KPI updates
  const factor = totalScore / 100;
  const newKPIs: KPIState = {
    operationalEfficiency: Math.min(96, Math.round(INITIAL_KPIS.operationalEfficiency + factor * 50)),
    clarityOfRoles: Math.min(98, Math.round(INITIAL_KPIS.clarityOfRoles + factor * 65)),
    employeeSatisfaction: Math.min(90, Math.round(INITIAL_KPIS.employeeSatisfaction + factor * 42)),
    customerSatisfaction: Math.min(92, Math.round(INITIAL_KPIS.customerSatisfaction + factor * 40)),
    liquidity: Math.round(INITIAL_KPIS.liquidity + (isFullyCorrect ? 75000 : factor * 30000)),
  };

  return {
    isFullyCorrect,
    placedCount,
    totalSlots,
    correctPositionsCount,
    correctSupervisorCount,
    score: totalScore,
    rank,
    errors,
    generalFeedback,
    scoreBreakdown: {
      hierarchyScore,
      departmentScore,
      completenessScore,
      efficiencyScore,
    },
    newKPIs,
  };
}

// Generate smart contextual hints based on current board state
export function getSmartHint(placements: BoardPlacements, hintLevel: 1 | 2 | 3) {
  const slotMap = new Map(ORG_TREE_SLOTS.map((s) => [s.slotId, s]));
  const jobMap = new Map(MASTER_JOBS.map((j) => [j.id, j]));

  // Find first misplaced or empty slot
  for (const slot of ORG_TREE_SLOTS) {
    const placedJobId = placements[slot.slotId];
    if (placedJobId !== slot.expectedJobId) {
      const expectedJob = jobMap.get(slot.expectedJobId);
      if (!expectedJob) continue;

      if (hintLevel === 1) {
        return {
          level: 1 as const,
          title: 'تلميح خفيف: تحديد الإدارة',
          text: `انتبه لقسم «${slot.label}»؛ هناك عدم اتساق في الوظيفة المسؤولة عن هذا الموضع حالياً.`,
        };
      } else if (hintLevel === 2) {
        return {
          level: 2 as const,
          title: 'تلميح متوسط: المسؤوليات الإدارية',
          text: `الموقع المطلوب يتطلب شخصاً مسؤولاً عن: «${expectedJob.keyResponsibilities[0]}». ابحث عن البطاقة المطابقة لهذه المهام.`,
        };
      } else {
        // Level 3
        const parentSlot = slot.parentSlotId ? slotMap.get(slot.parentSlotId) : null;
        const parentJob = parentSlot ? jobMap.get(parentSlot.expectedJobId) : null;
        return {
          level: 3 as const,
          title: 'تلميح متقدم: التبعية المباشرة',
          text: `الوظيفة المناسبة لهذا الموضع هي «${expectedJob.title}» (${expectedJob.acronym || expectedJob.titleEn}) وترفع تقاريرها مباشرة إلى «${parentJob?.title || 'الإدارة العليا'}».`,
        };
      }
    }
  }

  return {
    level: hintLevel,
    title: 'تلميح إداري عام',
    text: 'الهيكل التنظيمي يبدو متكاملاً ومطابقاً للهيكل المرجعي! اضغط على «تحقق من الهيكل» لاعتماد النتيجة.',
  };
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Department = 'executive' | 'operations' | 'finance' | 'hr' | 'commercial';

export type HierarchyLevel = 1 | 2 | 3 | 4;

export interface JobCardData {
  id: string;
  title: string;
  titleEn: string;
  acronym?: string;
  department: Department;
  targetLevel: HierarchyLevel;
  targetParentId: string | null;
  description: string;
  keyResponsibilities: string[];
  iconName: string;
  avatarUrl?: string;
}

export interface OrgNodeSlotDef {
  slotId: string;
  level: HierarchyLevel;
  parentSlotId: string | null;
  expectedJobId: string;
  department: Department;
  label: string;
}

export type BoardPlacements = Record<string, string | null>;

export interface KPIState {
  operationalEfficiency: number;
  clarityOfRoles: number;
  employeeSatisfaction: number;
  customerSatisfaction: number;
  liquidity: number; // in SAR
}

export interface ValidationErrorItem {
  slotId: string;
  jobId: string;
  jobTitle: string;
  issueType: 'wrong_level' | 'wrong_supervisor' | 'wrong_department' | 'missing';
  message: string;
}

export interface ValidationResult {
  isFullyCorrect: boolean;
  placedCount: number;
  totalSlots: number;
  correctPositionsCount: number;
  correctSupervisorCount: number;
  score: number;
  rank: 'متدرّب إداري' | 'منظّم كفء' | 'خبير التنظيم الإداري';
  errors: ValidationErrorItem[];
  generalFeedback: string;
  scoreBreakdown: {
    hierarchyScore: number;     // max 40
    departmentScore: number;    // max 30
    completenessScore: number;  // max 20
    efficiencyScore: number;    // max 10
  };
  newKPIs: KPIState;
}

export interface Mission1Stats {
  score: number;
  timeSpentSeconds: number;
  hintsUsedCount: number;
  attemptsCount: number;
  completedAt: string;
  mode: 'build' | 'repair';
}

export interface PlayerSession {
  companyName: string;
  createdAt: string;
  kpis: KPIState;
  completedMissions: string[];
  badges: string[];
  mission1HighScore: number | null;
  mission1Stats: Mission1Stats | null;
  soundEnabled: boolean;
}

export interface HintItem {
  level: 1 | 2 | 3;
  title: string;
  text: string;
}

// Crisis Command Mission Types
export interface CrisisOption {
  id: string;
  text: string;
  executiveOpinion: string;
  consequences: string;
  kpiImpact: {
    operationalEfficiency?: number;
    clarityOfRoles?: number;
    employeeSatisfaction?: number;
    customerSatisfaction?: number;
    liquidity?: number;
  };
  feedback: string;
}

export interface CrisisEvent {
  id: string;
  title: string;
  urgency: 'high' | 'critical' | 'medium';
  narrative: string;
  reporter: {
    name: string;
    role: string;
    avatarInitials: string;
  };
  options: CrisisOption[];
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlayerSession } from '../types/game';
import { INITIAL_KPIS } from '../data/organizationData';

const STORAGE_KEY = 'rescue_your_company_session_v1';

export function createDefaultSession(companyName: string): PlayerSession {
  return {
    companyName: companyName.trim() || 'روافد للأعمال',
    createdAt: new Date().toISOString(),
    kpis: { ...INITIAL_KPIS },
    completedMissions: [],
    badges: [],
    mission1HighScore: null,
    mission1Stats: null,
    soundEnabled: true,
  };
}

export function loadSession(): PlayerSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.companyName === 'string') {
      return parsed as PlayerSession;
    }
  } catch (err) {
    console.error('Error loading session:', err);
  }
  return null;
}

export function saveSession(session: PlayerSession): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch (err) {
    console.error('Error saving session:', err);
  }
}

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Error clearing session:', err);
  }
}

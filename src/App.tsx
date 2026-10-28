/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { TitleScreen } from './components/game/TitleScreen';
import { PerimeterHUD } from './components/game/PerimeterHUD';
import { PauseModal } from './components/game/PauseModal';
import { OrganizationBoard } from './components/game/OrganizationBoard';
import { CardBank } from './components/game/CardBank';
import { HintModal } from './components/game/HintModal';
import { JobDetailModal } from './components/game/JobDetailModal';
import { ResultsScreen } from './components/game/ResultsScreen';
import { CrisisCommandMission } from './components/crisis/CrisisCommandMission';
import { HowToPlayModal } from './components/landing/HowToPlayModal';

import {
  JobCardData,
  BoardPlacements,
  ValidationResult,
  PlayerSession,
  HintItem,
  KPIState,
} from './types/game';
import {
  MASTER_JOBS,
  ORG_TREE_SLOTS,
  INITIAL_BUILD_PLACEMENTS,
  INITIAL_REPAIR_PLACEMENTS,
} from './data/organizationData';
import { validateOrganization, getSmartHint } from './utils/validation';
import {
  loadSession,
  saveSession,
  clearSession,
  createDefaultSession,
} from './utils/storage';
import { sound } from './utils/audio';
import { triggerCameraShake, triggerScreenFlash } from './utils/gameFeel';

type GameState = 'TITLE_SCREEN' | 'PLAYING' | 'PAUSED' | 'VICTORY' | 'CRISIS_ENCOUNTER' | 'GAME_OVER';

export default function App() {
  // Session & Game State Machine
  const [session, setSession] = useState<PlayerSession | null>(null);
  const [gameState, setGameState] = useState<GameState>('TITLE_SCREEN');
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  // Mission 1 State
  const [gameMode, setGameMode] = useState<'build' | 'repair'>('build');
  const [placements, setPlacements] = useState<BoardPlacements>({ ...INITIAL_BUILD_PLACEMENTS });
  const [history, setHistory] = useState<BoardPlacements[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [activeJobDetail, setActiveJobDetail] = useState<JobCardData | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Timer & Loop
  const [secondsLeft, setSecondsLeft] = useState<number>(180);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Validation & Hints
  const [hasValidated, setHasValidated] = useState<boolean>(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [hintsUsedCount, setHintsUsedCount] = useState<number>(0);
  const [currentHintLevel, setCurrentHintLevel] = useState<1 | 2 | 3>(1);
  const [currentHint, setCurrentHint] = useState<HintItem | null>(null);
  const [isHintModalOpen, setIsHintModalOpen] = useState<boolean>(false);

  // DnD Sensors
  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 5 } });
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } });
  const sensors = useSensors(pointerSensor, touchSensor);

  // Load session upon mount
  useEffect(() => {
    const saved = loadSession();
    if (saved) {
      setSession(saved);
    }
  }, []);

  // Global Keyboard shortcuts (Escape for pause, Z for undo)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      if (e.key === 'Escape') {
        if (gameState === 'PLAYING') {
          setGameState('PAUSED');
          sound.playClick();
        } else if (gameState === 'PAUSED') {
          setGameState('PLAYING');
          sound.playClick();
        }
      } else if ((e.key === 'z' || e.key === 'Z') && !e.ctrlKey && !e.metaKey) {
        if (gameState === 'PLAYING' && history.length > 0) {
          handleUndo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, history]);

  // Timer countdown during PLAYING state
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState]);

  // Start game from Title Screen
  const handleStartGame = (companyName: string, mode: 'build' | 'repair' | 'crisis') => {
    const currentSession = session && session.companyName === companyName
      ? session
      : createDefaultSession(companyName);
    
    setSession(currentSession);
    saveSession(currentSession);

    if (mode === 'crisis') {
      setGameState('CRISIS_ENCOUNTER');
      return;
    }

    setGameMode(mode);
    const initial = mode === 'build' ? { ...INITIAL_BUILD_PLACEMENTS } : { ...INITIAL_REPAIR_PLACEMENTS };
    setPlacements(initial);
    setHistory([]);
    setSelectedJobId(null);
    setSecondsLeft(180);
    setElapsedSeconds(0);
    setHasValidated(false);
    setValidationResult(null);
    setHintsUsedCount(0);
    setCurrentHintLevel(1);
    setCurrentHint(null);
    setZoomLevel(1);
    setGameState('PLAYING');
  };

  // Restart current mission
  const handleRestartMission = () => {
    const initial = gameMode === 'build' ? { ...INITIAL_BUILD_PLACEMENTS } : { ...INITIAL_REPAIR_PLACEMENTS };
    setPlacements(initial);
    setHistory([]);
    setSelectedJobId(null);
    setSecondsLeft(180);
    setElapsedSeconds(0);
    setHasValidated(false);
    setValidationResult(null);
    setHintsUsedCount(0);
    setGameState('PLAYING');
  };

  // Drag handlers
  const handleDragStart = (event: DragStartEvent) => {
    sound.playCardPick();
    const activeData = event.active.data.current;
    if (activeData?.jobId) {
      setSelectedJobId(activeData.jobId);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeJobId = active.data.current?.jobId as string | undefined;

    if (!activeJobId || !over) return;

    const overSlotId = (over.data.current?.slotId as string) || (over.id as string).replace('slot-', '');
    if (!overSlotId) return;

    if (gameMode === 'build' && overSlotId === 'slot_ceo') {
      sound.playWarning();
      return;
    }

    setHistory((prev) => [...prev, { ...placements }]);

    const currentSlotOfJob = Object.entries(placements).find(([_, jId]) => jId === activeJobId)?.[0];
    const occupantOfTargetSlot = placements[overSlotId];

    const nextPlacements = { ...placements };
    if (currentSlotOfJob && currentSlotOfJob !== overSlotId) {
      nextPlacements[currentSlotOfJob] = occupantOfTargetSlot || null;
    }
    nextPlacements[overSlotId] = activeJobId;

    setPlacements(nextPlacements);
    setSelectedJobId(null);
    sound.playCardDrop();

    if (hasValidated) setHasValidated(false);
  };

  // Click-to-place fallback
  const handleSlotClick = (slotId: string) => {
    if (gameMode === 'build' && slotId === 'slot_ceo') {
      sound.playClick();
      return;
    }

    const currentOccupant = placements[slotId];

    if (selectedJobId) {
      setHistory((prev) => [...prev, { ...placements }]);

      const prevSlot = Object.entries(placements).find(([_, jId]) => jId === selectedJobId)?.[0];
      const next = { ...placements };

      if (prevSlot && prevSlot !== slotId) {
        next[prevSlot] = currentOccupant || null;
      }
      next[slotId] = selectedJobId;

      setPlacements(next);
      setSelectedJobId(null);
      sound.playCardDrop();

      if (hasValidated) setHasValidated(false);
    } else if (currentOccupant) {
      setSelectedJobId(currentOccupant);
      sound.playClick();
    }
  };

  const handleRemoveJobFromSlot = (slotId: string) => {
    if (gameMode === 'build' && slotId === 'slot_ceo') return;

    setHistory((prev) => [...prev, { ...placements }]);
    setPlacements((prev) => ({ ...prev, [slotId]: null }));
    sound.playCardDrop();

    if (hasValidated) setHasValidated(false);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setHistory((prev) => prev.slice(0, prev.length - 1));
    setPlacements(last);
    sound.playClick();
  };

  const handleRequestHint = () => {
    const hint = getSmartHint(placements, currentHintLevel);
    setCurrentHint(hint);
    setIsHintModalOpen(true);
    setHintsUsedCount((prev) => prev + 1);
    sound.playClick();
  };

  const handleRequestNextHintLevel = () => {
    const nextLevel = Math.min(3, currentHintLevel + 1) as 1 | 2 | 3;
    setCurrentHintLevel(nextLevel);
    const hint = getSmartHint(placements, nextLevel);
    setCurrentHint(hint);
    setHintsUsedCount((prev) => prev + 1);
  };

  // Validate Organization
  const handleValidate = () => {
    const result = validateOrganization(placements, hintsUsedCount, elapsedSeconds);
    setValidationResult(result);
    setHasValidated(true);

    if (result.isFullyCorrect || result.score >= 60) {
      triggerScreenFlash('rgba(31, 181, 138, 0.25)', 250);

      if (session) {
        const completedMissions = session.completedMissions.includes('mission_org')
          ? session.completedMissions
          : [...session.completedMissions, 'mission_org'];

        const badges = [...session.badges];
        if (result.score >= 90 && !badges.includes('org_expert')) badges.push('org_expert');
        if (result.isFullyCorrect && !badges.includes('org_master')) badges.push('org_master');

        const updatedSession: PlayerSession = {
          ...session,
          kpis: result.newKPIs,
          completedMissions,
          badges,
          mission1HighScore: Math.max(session.mission1HighScore || 0, result.score),
          mission1Stats: {
            score: result.score,
            timeSpentSeconds: elapsedSeconds,
            hintsUsedCount,
            attemptsCount: (session.mission1Stats?.attemptsCount || 0) + 1,
            completedAt: new Date().toISOString(),
            mode: gameMode,
          },
        };
        setSession(updatedSession);
        saveSession(updatedSession);
      }
      setGameState('VICTORY');
    } else {
      triggerCameraShake(10, 300);
      triggerScreenFlash('rgba(239, 68, 68, 0.25)', 200);
      sound.playError();
    }
  };

  // Sound toggle
  const handleToggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
    if (!next) sound.playClick();
  };

  const placedJobIds = new Set(Object.values(placements).filter(Boolean) as string[]);
  const unplacedJobs = MASTER_JOBS.filter((job) => !placedJobIds.has(job.id));
  const placedCount = placedJobIds.size;
  const totalSlots = ORG_TREE_SLOTS.length;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#F6F3EC] text-[#202B2A] select-none">
      {/* Screen Flash Overlay */}
      <div
        id="screen-flash-overlay"
        className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-150 opacity-0"
      />

      {/* Camera Shake Viewport Container */}
      <div id="game-viewport-container" className="w-full h-full relative transition-transform">
        {/* State 1: TITLE SCREEN */}
        {gameState === 'TITLE_SCREEN' && (
          <TitleScreen
            companyName={session?.companyName || 'روافد للأعمال'}
            onStartGame={handleStartGame}
            onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
          />
        )}

        {/* State 2: PLAYING (The Org Chart Playfield) */}
        {gameState === 'PLAYING' && (
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {/* Low-occlusion perimeter HUD */}
            <PerimeterHUD
              companyName={session?.companyName || 'روافد للأعمال'}
              gameMode={gameMode}
              secondsLeft={secondsLeft}
              placedCount={placedCount}
              totalSlots={totalSlots}
              hintsUsedCount={hintsUsedCount}
              canUndo={history.length > 0}
              zoomLevel={zoomLevel}
              isMuted={isMuted}
              onExitToTitle={() => setGameState('TITLE_SCREEN')}
              onTogglePause={() => setGameState('PAUSED')}
              onUndo={handleUndo}
              onResetChallenge={handleRestartMission}
              onRequestHint={handleRequestHint}
              onValidate={handleValidate}
              onToggleSound={handleToggleSound}
              onZoomIn={() => setZoomLevel((z) => Math.min(1.25, z + 0.1))}
              onZoomOut={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
              onResetZoom={() => setZoomLevel(1)}
            />

            {/* Playfield Area: Centered Canvas with Side Dock */}
            <div className="w-full h-full pt-16 pb-4 px-4 sm:px-6 flex flex-col lg:flex-row gap-4 items-stretch justify-center overflow-hidden">
              {/* Main Org Tree Playfield (> 80% width) */}
              <div className="flex-1 overflow-auto rounded-2xl bg-white border border-stone-200/90 shadow-inner flex items-center justify-center p-4">
                <OrganizationBoard
                  placements={placements}
                  selectedJobId={selectedJobId}
                  validationErrors={validationResult?.errors || []}
                  hasValidated={hasValidated}
                  gameMode={gameMode}
                  zoomLevel={zoomLevel}
                  onSlotClick={handleSlotClick}
                  onRemoveJob={handleRemoveJobFromSlot}
                  onOpenDetails={(job) => setActiveJobDetail(job)}
                />
              </div>

              {/* Card Bank Deck (Low-occlusion side dock) */}
              <div className="w-full lg:w-80 shrink-0 h-48 lg:h-full overflow-hidden">
                <CardBank
                  unplacedJobs={unplacedJobs}
                  selectedJobId={selectedJobId}
                  onSelectJob={(id) => setSelectedJobId(selectedJobId === id ? null : id)}
                  onOpenDetails={(job) => setActiveJobDetail(job)}
                />
              </div>
            </div>
          </DndContext>
        )}

        {/* State 3: PAUSED */}
        <PauseModal
          isOpen={gameState === 'PAUSED'}
          onResume={() => setGameState('PLAYING')}
          onRestart={handleRestartMission}
          onExitToTitle={() => setGameState('TITLE_SCREEN')}
        />

        {/* State 4: VICTORY / RESULTS */}
        {gameState === 'VICTORY' && validationResult && (
          <div className="w-full h-full overflow-y-auto py-8">
            <ResultsScreen
              companyName={session?.companyName || 'روافد للأعمال'}
              result={validationResult}
              timeSpentSeconds={elapsedSeconds}
              hintsUsedCount={hintsUsedCount}
              gameMode={gameMode}
              onRetry={handleRestartMission}
              onGoToCrisis={() => setGameState('CRISIS_ENCOUNTER')}
              onGoToHQ={() => setGameState('TITLE_SCREEN')}
            />
          </div>
        )}

        {/* State 5: CRISIS ENCOUNTER */}
        {gameState === 'CRISIS_ENCOUNTER' && (
          <div className="w-full h-full overflow-y-auto py-8">
            <CrisisCommandMission
              companyName={session?.companyName || 'روافد للأعمال'}
              initialKPIs={session?.kpis || {
                operationalEfficiency: 38,
                clarityOfRoles: 30,
                employeeSatisfaction: 42,
                customerSatisfaction: 47,
                liquidity: 450000,
              }}
              onMissionCompleted={(updatedKPIs) => {
                if (session) {
                  const completedMissions = session.completedMissions.includes('mission_crisis')
                    ? session.completedMissions
                    : [...session.completedMissions, 'mission_crisis'];
                  const updated: PlayerSession = { ...session, kpis: updatedKPIs, completedMissions };
                  setSession(updated);
                  saveSession(updated);
                }
              }}
              onBackToHQ={() => setGameState('TITLE_SCREEN')}
            />
          </div>
        )}
      </div>

      {/* Global Modals */}
      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
      />

      <HintModal
        isOpen={isHintModalOpen}
        hint={currentHint}
        currentLevel={currentHintLevel}
        hintsUsedCount={hintsUsedCount}
        onClose={() => setIsHintModalOpen(false)}
        onRequestNextLevel={handleRequestNextHintLevel}
      />

      <JobDetailModal
        job={activeJobDetail}
        onClose={() => setActiveJobDetail(null)}
      />
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function triggerCameraShake(intensity: number = 8, durationMs: number = 300) {
  const container = document.getElementById('game-viewport-container');
  if (!container) return;

  const startTime = performance.now();
  const originalTransform = container.style.transform;

  function shake(currentTime: number) {
    const elapsed = currentTime - startTime;
    if (elapsed < durationMs) {
      const progress = 1 - elapsed / durationMs;
      const x = (Math.random() - 0.5) * intensity * progress;
      const y = (Math.random() - 0.5) * intensity * progress;
      container!.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(shake);
    } else {
      container!.style.transform = originalTransform || '';
    }
  }

  requestAnimationFrame(shake);
}

export function triggerScreenFlash(color: string = 'rgba(239, 68, 68, 0.25)', durationMs: number = 180) {
  const flashEl = document.getElementById('screen-flash-overlay');
  if (!flashEl) return;

  flashEl.style.backgroundColor = color;
  flashEl.style.opacity = '1';

  setTimeout(() => {
    flashEl.style.opacity = '0';
  }, durationMs);
}

export function triggerHitstop(durationMs: number = 50): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, durationMs));
}

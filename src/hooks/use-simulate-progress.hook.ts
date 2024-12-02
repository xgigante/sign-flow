import { useState, useCallback } from "react";
import { interval } from "rxjs";
import { map, take, finalize } from "rxjs/operators";

/**
 * Custom hook to simulate progress over a specified duration.
 *
 * @param {number} duration - The total duration for the progress simulation in milliseconds.
 * @returns {object} An object containing:
 * - `progress` (number): The current progress value (0 to 100).
 * - `isRunning` (boolean): A flag indicating whether the progress simulation is currently running.
 * - `startProgress` (function): A function to start the progress simulation. It accepts an optional callback `onComplete` that will be called when the progress reaches 100.
 */
export const useSimulateProgress = (duration: number) => {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startProgress = useCallback(
    (onComplete?: () => void) => {
      if (isRunning) return;
      setIsRunning(true);
      setProgress(0);

      const subscription = interval(duration / 100)
        .pipe(
          take(101), // 0 a 100 inclusive
          map((value) => value), // Emitir el progreso
          finalize(() => {
            setIsRunning(false);
            if (onComplete) onComplete();
          })
        )
        .subscribe(setProgress);

      return () => subscription.unsubscribe();
    },
    [duration, isRunning]
  );

  return { progress, isRunning, startProgress };
};

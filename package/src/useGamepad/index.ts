import { useCallback } from 'react';
import { useAnimationFrame, useEventListener } from '..';

export type GamepadHandler = (gamepad: Gamepad) => any;

export const useGamepad = (index: number, handler: GamepadHandler) => {
  const handleGamepadState = useCallback(() => {
    const gamepad = navigator.getGamepads()[index];
    if (gamepad) handler(gamepad);
  }, [index, handler]);

  const frame = useAnimationFrame(handleGamepadState, { startOnMount: false });

  const handleGamepadConnection = useCallback(
    (event: GamepadEvent) => {
      if (!navigator.getGamepads) return;
      if (event.gamepad.index !== index) return;
      if (event.type === 'gamepadconnected') return frame.start();
      frame.cancel();
    },
    [index, frame]
  );

  useEventListener(['gamepadconnected', 'gamepaddisconnected'], handleGamepadConnection, {
    target: () => window
  });
};

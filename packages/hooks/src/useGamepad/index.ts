import { useCallback, useEffect, useState } from 'react';
import { useAnimationFrame } from '../useAnimationFrame';
import { useEventListener } from '../useEventListener';

export type GamepadHandler = (gamepad: Gamepad) => any;

export const useGamepad = (index: number, handler: GamepadHandler) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const handleGamepadState = useCallback(() => {
    const gamepad = navigator.getGamepads()[index];
    if (gamepad) handler(gamepad);
  }, [index, handler]);

  const frame = useAnimationFrame(handleGamepadState, { startOnMount: false });

  const handleGamepadConnection = useCallback(() => {
    if (!navigator.getGamepads) return;

    const gamepad = navigator.getGamepads()[index];

    setIsConnected(!!gamepad);
    gamepad ? frame.start() : frame.cancel();
  }, [index, frame]);

  useEffect(() => {
    handleGamepadConnection();
  }, [index]);

  useEventListener(['gamepadconnected', 'gamepaddisconnected'], handleGamepadConnection, {
    target: () => window
  });

  return isConnected;
};

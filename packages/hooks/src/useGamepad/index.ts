import { useCallback, useEffect, useState } from 'react';
import { useAnimationFrame } from '../useAnimationFrame';
import { useEventListener } from '../useEventListener';

export type GamepadHandler = (gamepad: Gamepad) => any;

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useGamepad | useGamepad} hook.
 */
export const useGamepad = (args: { handler: GamepadHandler; index?: number }) => {
  const index = args.index ?? 0;
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const handleGamepadState = useCallback(() => {
    const gamepad = navigator.getGamepads()[index];
    if (gamepad) args.handler(gamepad);
  }, [index, args.handler]);

  const frame = useAnimationFrame({ callback: handleGamepadState, startOnMount: false });

  const handleGamepadConnection = useCallback(() => {
    if (!navigator.getGamepads) return;

    const gamepad = navigator.getGamepads()[index];

    setIsConnected(!!gamepad);
    gamepad ? frame.start() : frame.cancel();
  }, [index, frame]);

  useEffect(() => {
    handleGamepadConnection();
  }, [index]);

  useEventListener({
    event: ['gamepadconnected', 'gamepaddisconnected'],
    handler: handleGamepadConnection,
    target: () => window
  });

  return isConnected;
};

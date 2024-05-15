import { useCallback, useEffect, useState } from 'react';
import { useAnimationFrame } from '../useAnimationFrame';
import { useEventListener } from '../useEventListener';

const getGamepadState = (gamepad: Gamepad) => {
  return {
    isConnected: gamepad.connected,
    A: gamepad.buttons[0],
    B: gamepad.buttons[1],
    X: gamepad.buttons[2],
    Y: gamepad.buttons[3],
    LB: gamepad.buttons[4],
    RB: gamepad.buttons[5],
    LT: gamepad.buttons[6],
    RT: gamepad.buttons[7],
    SELECT: gamepad.buttons[8],
    START: gamepad.buttons[9],
    UP: gamepad.buttons[12],
    DOWN: gamepad.buttons[13],
    LEFT: gamepad.buttons[14],
    RIGHT: gamepad.buttons[15],
    leftStick: { button: gamepad.buttons[10], x: gamepad.axes[0], y: gamepad.axes[1] },
    rightStick: { button: gamepad.buttons[11], x: gamepad.axes[2], y: gamepad.axes[3] }
  };
};

export type GamepadState = ReturnType<typeof getGamepadState>;
export type GamepadHandler = (gamepad: GamepadState) => any;

/**
 * @see {@link https://malkiii.github.io/react-pre-hooks/docs/hooks/useGamepad | useGamepad} hook.
 */
export const useGamepad = (args: { handler: GamepadHandler; index?: number }) => {
  const index = args.index ?? 0;
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const handleGamepadState = useCallback(() => {
    const gamepad = navigator.getGamepads()[index];
    if (!gamepad) return;

    args.handler(getGamepadState(gamepad));
  }, [index, args.handler]);

  const frame = useAnimationFrame({ callback: handleGamepadState, startOnMount: false });

  const handleGamepadConnection = useCallback(() => {
    if (!navigator.getGamepads) return;

    const gamepad = navigator.getGamepads()[index];

    setIsConnected(!!gamepad?.connected);
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

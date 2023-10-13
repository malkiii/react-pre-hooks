import { CSSProperties, RefObject, SetStateAction, useCallback, useRef, useState } from 'react';

export type TransitionProps = Omit<KeyframeAnimationOptions, 'easing'> & {
  easing: CSSProperties['transitionTimingFunction'];
};

export type AnimatePresenceKeyframes = Record<
  keyof CSSProperties,
  PropertyIndexedKeyframes[keyof PropertyIndexedKeyframes]
> &
  Pick<PropertyIndexedKeyframes, 'composite' | 'offset' | 'easing'>;

export type AnimatePresenceOptions<T extends HTMLElement = HTMLElement> = {
  ref?: RefObject<T> | null;
  initialMount?: boolean;
  keyframes?: AnimatePresenceKeyframes;
  transition?: TransitionProps;
  onEnter?: (element: T) => any;
  onExit?: (element: T) => any;
};

export const useAnimatePresence = <T extends HTMLElement = HTMLDivElement>(
  options: AnimatePresenceOptions<T> = {}
) => {
  const { initialMount = false, keyframes = {}, onEnter, onExit } = options;

  const targetRef = options.ref ?? useRef<T>(null);
  const animationRef = useRef<Animation>();
  const isAnimating = useRef<boolean>(false);
  const isToggled = useRef<boolean>(initialMount);
  const [isMounted, setIsMounted] = useState<boolean>(initialMount);

  const startAnimation = useCallback(
    (reverse: boolean = false) => {
      const transition = options.transition ?? ({} as TransitionProps);
      if (!transition.easing) transition.easing = 'ease';
      if (!transition.duration) transition.duration = 300;
      transition.direction = reverse ? 'reverse' : 'normal';
      transition.fill = 'both';

      if (isAnimating.current && animationRef.current) animationRef.current.reverse();
      else animationRef.current = targetRef.current?.animate(keyframes, transition);

      isAnimating.current = true;
    },
    [options]
  );

  // mounting animation
  const mount = useCallback(() => {
    isToggled.current = true;
    if (!isAnimating.current && isMounted) return;

    setTimeout(() => {
      setIsMounted(true);
      setTimeout(() => {
        if (!targetRef.current) return setIsMounted(false);

        startAnimation();

        animationRef.current!.onfinish = () => {
          isAnimating.current = false;
          onEnter && onEnter(targetRef.current!);
        };
      }, 0);
    }, 0);
  }, [isMounted]);

  // unmounting animation
  const unmount = useCallback(() => {
    isToggled.current = false;
    if (!targetRef.current || (!isAnimating.current && !isMounted)) return;

    startAnimation(true);

    animationRef.current!.onfinish = () => {
      isAnimating.current = false;
      setIsMounted(false);
      if (onExit) onExit(targetRef.current!);
    };
  }, [isMounted]);

  const toggle = useCallback(
    (value?: SetStateAction<boolean>) => {
      const resolvedValue = value instanceof Function ? value(isToggled.current) : value;
      const shouldToggle = resolvedValue ?? !isToggled.current;
      shouldToggle ? mount() : unmount();
    },
    [mount, unmount]
  );

  return { ref: targetRef, isMounted, toggle };
};

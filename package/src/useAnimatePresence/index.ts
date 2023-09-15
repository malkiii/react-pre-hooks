import { CSSProperties, RefObject, SetStateAction, useCallback, useRef, useState } from 'react';

export type TransitionProps = Omit<KeyframeAnimationOptions, 'easing'> & {
  easing: CSSProperties['transitionTimingFunction'];
};

export type AnimatePresenceOptions<T extends HTMLElement = HTMLElement> = Partial<{
  ref: RefObject<T>;
  initialMount: boolean;
  keyframes: PropertyIndexedKeyframes;
  transition: TransitionProps;
  onEnter: (element: T) => any;
  onExit: (element: T) => any;
}>;

export const useAnimatePresence = <T extends HTMLElement = HTMLDivElement>(
  options: AnimatePresenceOptions<T> = {}
) => {
  const { initialMount = false, keyframes = {}, onEnter, onExit } = options;

  const ref = options.ref || useRef<T>(null);
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
      else animationRef.current = ref.current?.animate(keyframes, transition);

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
        if (!ref.current) return setIsMounted(false);

        startAnimation();

        animationRef.current!.onfinish = () => {
          isAnimating.current = false;
          onEnter && onEnter(ref.current!);
        };
      }, 0);
    }, 0);
  }, [isMounted]);

  // unmounting animation
  const unmount = useCallback(() => {
    isToggled.current = false;
    if (!ref.current || (!isAnimating.current && !isMounted)) return;

    startAnimation(true);

    animationRef.current!.onfinish = () => {
      isAnimating.current = false;
      setIsMounted(false);
      if (onExit) onExit(ref.current!);
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

  return { ref, isMounted, toggle };
};

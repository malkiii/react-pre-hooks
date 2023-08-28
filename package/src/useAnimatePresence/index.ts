import { CSSProperties, RefObject, SetStateAction, useCallback, useRef, useState } from 'react';

export type TransitionProps = Partial<{
  ease: CSSProperties['transitionTimingFunction'];
  duration: number;
  delay: number;
}>;

export type TransformProps = Partial<{
  opacity: string;
  translate: string;
  scale: string;
  rotate: string;
}>;

export type AnimationProps = TransformProps & {
  transition?: TransitionProps;
};

export type AnimatePresenceOptions<T extends HTMLElement = HTMLElement> = Partial<{
  ref: RefObject<T>;
  initialMount: boolean;
  animate: AnimationProps;
  exit: AnimationProps;
  onEnter: (element: T) => any;
  onExit: (element: T) => any;
  transition: TransitionProps;
}>;

export const useAnimatePresence = <T extends HTMLElement = HTMLDivElement>(
  options: AnimatePresenceOptions<T> = {}
) => {
  const { initialMount = false, animate, exit, transition, onEnter, onExit } = options;

  const ref = options.ref || useRef<T>(null);
  const isToggled = useRef<boolean>(initialMount);
  const durationTimeout = useRef<ReturnType<typeof setTimeout>>();
  const [isMounted, setIsMounted] = useState<boolean>(initialMount);

  const getEase = (props?: TransitionProps) => props?.ease ?? transition?.ease ?? 'ease';
  const getDuration = (props?: TransitionProps) => props?.duration ?? transition?.duration ?? 300;
  const getDelay = (props?: TransitionProps) => props?.delay ?? transition?.delay ?? 0;

  const setProperties = useCallback((animation: AnimationProps = {}) => {
    const { transition: _, ...props } = animation;
    Object.entries(props).forEach(pv => ref.current!.style.setProperty(...pv));
  }, []);

  const removeProperties = useCallback((animation: AnimationProps = {}) => {
    const { transition: _, ...props } = animation;
    Object.entries(props).forEach(([p, _]) => ref.current!.style.removeProperty(p));
  }, []);

  const setTransition = useCallback((animation: AnimationProps = {}) => {
    const { transition: _, ...props } = animation;

    const transitionProperty = Object.keys(props)
      .filter(prop => !!props[prop as keyof typeof props])
      .join(',');

    ref.current!.style.transitionProperty = transitionProperty;
    ref.current!.style.transitionDuration = getDuration(animation?.transition) + 'ms';
    ref.current!.style.transitionTimingFunction = getEase(animation?.transition);
  }, []);

  const renderAnimationBetween = useCallback(
    (initial?: AnimationProps, animation?: AnimationProps) => {
      setTimeout(() => {
        setTransition(animation ?? initial);
        animation ? setProperties(animation) : removeProperties(initial);
      }, 0);
    },
    [setTransition, setProperties, removeProperties]
  );

  // mounting animation
  const mount = useCallback(() => {
    isToggled.current = true;
    if (durationTimeout.current) clearTimeout(durationTimeout.current);
    else if (isMounted) return;

    const resolvedTransition = animate?.transition ?? exit?.transition;
    durationTimeout.current = setTimeout(() => {
      setIsMounted(true);

      setTimeout(() => {
        if (!ref.current) return setIsMounted(false);
        setProperties(exit);
        renderAnimationBetween(exit, animate);

        durationTimeout.current = setTimeout(() => {
          if (onEnter) onEnter(ref.current!);
        }, getDuration(resolvedTransition));
      }, 0);
    }, getDelay(resolvedTransition));
  }, [renderAnimationBetween]);

  // unmounting animation
  const unmount = useCallback(() => {
    isToggled.current = false;
    if (durationTimeout.current) clearTimeout(durationTimeout.current);
    else if (!isMounted) return;
    if (!ref.current) return;

    const resolvedTransition = exit?.transition ?? animate?.transition;
    durationTimeout.current = setTimeout(() => {
      renderAnimationBetween(animate, exit);

      durationTimeout.current = setTimeout(() => {
        setIsMounted(false);
        if (onExit) onExit(ref.current!);
      }, getDuration(resolvedTransition));
    }, getDelay(resolvedTransition));
  }, [renderAnimationBetween]);

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

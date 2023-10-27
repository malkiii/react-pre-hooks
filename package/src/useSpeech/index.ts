import { SetStateAction, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

export type SpeechOptions = Partial<
  Pick<SpeechSynthesisUtterance, 'lang' | 'voice' | 'rate' | 'pitch' | 'volume'>
>;

export const useSpeech = (options: SpeechOptions = {}) => {
  const { lang, voice = null, rate = 1, pitch = 1, volume = 1 } = options;

  const charIndex = useRef<number>(0);
  const speechRef = useRef(new SpeechSynthesisUtterance());
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [state, setState] = useState({
    lang,
    voice,
    rate,
    pitch,
    volume,
    text: '',
    isSpeaking: false,
    isPaused: false,
    isEnded: false
  });

  const controls = useMemo(
    () => ({
      speak(text: string) {
        startSpeech(text);
        setState(s => ({ ...s, text: '' }));
      },
      togglePlayState(play?: boolean) {
        const shouldPlay = play ?? speechSynthesis.paused;
        shouldPlay ? this.resume() : this.pause();
      },
      resume() {
        speechSynthesis.resume();
      },
      pause() {
        speechSynthesis.pause();
      },
      cancel() {
        this.resume();
        speechSynthesis.cancel();
      },
      setLang(lang: SetStateAction<string | undefined>) {
        setResolvedValue('lang', lang);
      },
      setVoice(voice: SetStateAction<SpeechSynthesisVoice | null>) {
        setResolvedValue('voice', voice);
      },
      setRate(rate: SetStateAction<number>) {
        setResolvedValue('rate', rate);
      },
      setPitch(pitch: SetStateAction<number>) {
        setResolvedValue('pitch', pitch);
      },
      setVolume(volume: SetStateAction<number>) {
        setResolvedValue('volume', volume);
      },
      setCharIndex(index: number) {
        if (!speechRef.current || !speechSynthesis.speaking) return;
        startSpeech(speechRef.current.text.substring(index));
      }
    }),
    [speechRef]
  );

  const setResolvedValue = useCallback(
    <K extends keyof SpeechOptions>(prop: K, value: SetStateAction<(typeof state)[K]>) => {
      if (!speechRef.current) return;
      setState(state => {
        speechRef.current![prop] = value instanceof Function ? value(state[prop]) : (value as any);
        controls.setCharIndex(charIndex.current);
        return { ...state, [prop]: speechRef.current![prop] };
      });
    },
    [controls]
  );

  const startSpeech = useCallback(
    (text: string) => {
      if (!speechRef.current.voice) return;
      const isPaused = speechSynthesis.paused;
      controls.cancel();

      speechRef.current.text = text;
      speechSynthesis.speak(speechRef.current);
      if (isPaused) speechSynthesis.pause();
    },
    [controls]
  );

  useLayoutEffect(() => {
    const speech = speechRef.current;
    if (lang) speech.lang = lang;
    speech.rate = rate;
    speech.pitch = pitch;
    speech.volume = volume;

    speech.onstart = () => setState(s => ({ ...s, isSpeaking: true, isEnded: false }));
    speech.onend = () => setState(s => ({ ...s, isSpeaking: false, isEnded: true }));
    speech.onpause = () => setState(s => ({ ...s, isSpeaking: false, isPaused: true }));
    speech.onresume = () => setState(s => ({ ...s, isSpeaking: true, isPaused: false }));
    speech.onboundary = e =>
      setState(s => {
        charIndex.current = e.charIndex;
        const nextWord = speechRef.current.text.substring(e.charIndex).split(/\s+/g).shift() ?? '';
        const text = s.text + (s.text.endsWith(nextWord) ? '' : ' ' + nextWord);

        return { ...s, text: text.trim() };
      });

    speechSynthesis.onvoiceschanged = () => {
      const voices = speechSynthesis.getVoices().filter(v => v.localService);
      speechRef.current.voice = options.voice ?? voices.find(v => v.default) ?? null;
      setVoices(voices);
    };

    return () => controls.cancel();
  }, []);

  return { ...controls, ...state, voices };
};

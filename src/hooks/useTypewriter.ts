'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * =======================================================================
 * KONFIGURASI KECEPATAN EFEK MENGETIK (dalam milidetik / ms)
 * Ubah nilai di bawah ini untuk mengatur tempo pengetikan teks
 * =======================================================================
 */
export const TYPEWRITER_SPEED_CONFIG = {
  /** Kecepatan per karakter untuk judul (default: 45 ms) */
  titleCharSpeed: 45,

  /** Kecepatan per karakter untuk paragraf/konten (default: 28 ms) */
  contentCharSpeed: 28,

  /** Jeda setelah tanda koma ',' (default: 180 ms) */
  commaPause: 180,

  /** Jeda setelah tanda titik '.' (default: 320 ms) */
  periodPause: 320,

  /** Jeda setelah judul selesai sebelum paragraf mulai diketik (default: 300 ms) */
  titleToContentDelay: 300,

  /** Jeda awal saat halaman kejutan terbuka sebelum mulai mengetik (default: 400 ms) */
  initialDelay: 400,

  /** Durasi kursor tetap ada sebelum memudar setelah semua teks selesai (default: 1500 ms) */
  cursorFadeDelay: 1500,
};

export type TypewriterCursorLocation = 'title' | 'content' | null;

interface UseTypewriterOptions {
  title: string;
  content: string;
  config?: Partial<typeof TYPEWRITER_SPEED_CONFIG>;
}

/**
 * Helper memecah string menjadi array grapheme cluster utuh.
 * Mencegah pemotongan karakter multi-byte yang merusak emoji seperti 🖤.
 */
export function toGraphemes(text: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter('id', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

export function useTypewriter({ title, content, config }: UseTypewriterOptions) {
  const mergedConfig = { ...TYPEWRITER_SPEED_CONFIG, ...config };

  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedContent, setDisplayedContent] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [cursorLocation, setCursorLocation] = useState<TypewriterCursorLocation>(null);
  const [cursorFading, setCursorFading] = useState(false);

  const timersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const isCancelledRef = useRef(false);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
  }, []);

  const addTimer = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  // Fungsi skip untuk langsung menampilkan seluruh teks saat kartu diklik
  const skip = useCallback(() => {
    if (isCompleted) return;
    clearAllTimers();
    setDisplayedTitle(title);
    setDisplayedContent(content);
    setIsCompleted(true);
    setCursorLocation('content');

    // Kursor memudar setelah jeda singkat saat diskip
    addTimer(() => {
      setCursorFading(true);
      addTimer(() => {
        setShowCursor(false);
        setCursorFading(false);
        setCursorLocation(null);
      }, 400);
    }, 600);
  }, [clearAllTimers, addTimer, isCompleted, title, content]);

  useEffect(() => {
    isCancelledRef.current = false;
    clearAllTimers();

    // 1. Hormati prefers-reduced-motion: tampilkan teks penuh langsung tanpa mengetik dan tanpa kursor
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayedTitle(title);
      setDisplayedContent(content);
      setIsCompleted(true);
      setShowCursor(false);
      setCursorLocation(null);
      return;
    }

    // Reset state saat komponen dimount / dibuka kembali
    setDisplayedTitle('');
    setDisplayedContent('');
    setIsCompleted(false);
    setShowCursor(false);
    setCursorLocation(null);
    setCursorFading(false);

    const titleGraphemes = toGraphemes(title);
    const contentGraphemes = toGraphemes(content);

    // Callback ketika seluruh teks (judul + konten) telah selesai diketik
    const handleTypingFinished = () => {
      if (isCancelledRef.current) return;
      setIsCompleted(true);
      setCursorLocation('content');
      setShowCursor(true);

      // Kursor berkedip selama jeda cursorFadeDelay (±1500 ms) lalu memudar dan hilang
      addTimer(() => {
        if (isCancelledRef.current) return;
        setCursorFading(true);
        addTimer(() => {
          if (isCancelledRef.current) return;
          setShowCursor(false);
          setCursorFading(false);
          setCursorLocation(null);
        }, 400);
      }, mergedConfig.cursorFadeDelay);
    };

    // Alur mengetik isi paragraf surat
    const startContentTyping = () => {
      if (isCancelledRef.current) return;
      setCursorLocation('content');
      setShowCursor(true);

      let contentIndex = 0;

      const typeNextContentChar = () => {
        if (isCancelledRef.current) return;

        if (contentIndex < contentGraphemes.length) {
          const char = contentGraphemes[contentIndex];
          contentIndex++;
          setDisplayedContent(contentGraphemes.slice(0, contentIndex).join(''));

          // Kecepatan mengetik dengan jeda khusus tanda baca koma dan titik
          let delay = mergedConfig.contentCharSpeed;
          if (char === ',') {
            delay = mergedConfig.commaPause;
          } else if (char === '.') {
            delay = mergedConfig.periodPause;
          }

          addTimer(typeNextContentChar, delay);
        } else {
          handleTypingFinished();
        }
      };

      typeNextContentChar();
    };

    // Alur mengetik judul terlebih dahulu
    const startTitleTyping = () => {
      if (isCancelledRef.current) return;
      setCursorLocation('title');
      setShowCursor(true);

      let titleIndex = 0;

      const typeNextTitleChar = () => {
        if (isCancelledRef.current) return;

        if (titleIndex < titleGraphemes.length) {
          titleIndex++;
          setDisplayedTitle(titleGraphemes.slice(0, titleIndex).join(''));
          addTimer(typeNextTitleChar, mergedConfig.titleCharSpeed);
        } else {
          // Judul selesai, beri jeda ±300 ms sebelum paragraf mulai diketik
          addTimer(() => {
            if (isCancelledRef.current) return;
            startContentTyping();
          }, mergedConfig.titleToContentDelay);
        }
      };

      typeNextTitleChar();
    };

    // Mulai mengetik hanya setelah animasi masuk selesai (jeda ±400 ms)
    addTimer(startTitleTyping, mergedConfig.initialDelay);

    // Cleanup semua timer ketika komponen di-unmount (mencegah memory leak)
    return () => {
      isCancelledRef.current = true;
      clearAllTimers();
    };
  }, [title, content, clearAllTimers, addTimer]);

  return {
    displayedTitle,
    displayedContent,
    isCompleted,
    showCursor,
    cursorLocation,
    cursorFading,
    skip,
  };
}

"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SliderProps = {
  /** Describes the slider to screen readers, e.g. "Customer reviews". */
  label: string;
  /** Each child becomes one slide. */
  children: React.ReactNode;
};

/** Slide width + gap, and how many slides fit at once. */
function measure(track: HTMLElement) {
  const first = track.firstElementChild as HTMLElement | null;
  if (!first) return null;

  const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
  const step = first.getBoundingClientRect().width + gap;
  const visible = Math.max(1, Math.round((track.clientWidth + gap) / step));
  return { step, visible };
}

/**
 * Swipeable slider built on native CSS scroll-snap — no library.
 * Touch / trackpad swipe and keyboard arrows work by default; this component
 * adds the prev / next buttons and the dots. Slides per view comes from CSS
 * (.slider-item): 1 on mobile, 2 on tablet, 3 on desktop.
 */
export default function Slider({ label, children }: SliderProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const slides = Children.toArray(children);
  const count = slides.length;

  const [index, setIndex] = useState(0);
  const [pages, setPages] = useState(count);

  const update = useCallback(() => {
    const track = trackRef.current;
    const m = track && measure(track);
    if (!track || !m) return;

    const totalPages = Math.max(1, count - m.visible + 1);
    setPages(totalPages);
    setIndex(Math.min(totalPages - 1, Math.round(track.scrollLeft / m.step)));
  }, [count]);

  // Recalculate when the slider is first shown and whenever it is resized.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => observer.disconnect();
  }, [update]);

  const goTo = (target: number) => {
    const track = trackRef.current;
    const m = track && measure(track);
    if (!track || !m) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamped = Math.max(0, Math.min(pages - 1, target));
    track.scrollTo({ left: clamped * m.step, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <ul ref={trackRef} onScroll={update} tabIndex={0} className="slider-track focus-ring">
        {slides.map((slide, i) => (
          <li
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            className="slider-item"
          >
            {slide}
          </li>
        ))}
      </ul>

      {pages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous slide"
            className="slider-btn"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>

          <div className="flex items-center">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className="slider-dot"
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index === pages - 1}
            aria-label="Next slide"
            className="slider-btn"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}

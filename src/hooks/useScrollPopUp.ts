import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollPopUpOptions {
  start?: string;
  end?: string;
  scaleFrom?: number;
  scaleTo?: number;
  opacityFrom?: number;
  opacityTo?: number;
  scrub?: boolean | number;
  trigger?: HTMLElement | null;
}

export function useScrollPopUp(
  ref: React.RefObject<HTMLElement>,
  options: UseScrollPopUpOptions = {}
) {
  useEffect(() => {
    if (!ref.current) return;
    const {
      start = 'top 80%',
      end = 'bottom 60%',
      scaleFrom = 0.8,
      scaleTo = 1,
      opacityFrom = 0.5,
      opacityTo = 1,
      scrub = 1,
      trigger = ref.current,
    } = options;

    const anim = gsap.fromTo(
      ref.current,
      { scale: scaleFrom, opacity: opacityFrom },
      {
        scale: scaleTo,
        opacity: opacityTo,
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub,
          toggleActions: 'play reverse play reverse',
        },
        ease: 'power2.out',
        duration: 1,
      }
    );
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [ref, options]);
} 
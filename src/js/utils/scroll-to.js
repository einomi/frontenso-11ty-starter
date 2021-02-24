// @ts-ignore
import gsap from 'gsap';
// @ts-ignore
import ScrollToPlugin from 'gsap/ScrollToPlugin';

// eslint-disable-next-line
const preserve = [ScrollToPlugin]; // prevent tree shaking

/**
 * Animated scroll function
 *
 * @param {HTMLElement | number} to
 * @param {object} [options]
 * @param {number} [options.duration]
 * @param {boolean} [options.autoKill]
 * @param {Window | HTMLElement} [options.element]
 * @param {number} [options.offsetY]
 * @return {void}
 */
export function customScrollTo(
  to,
  { duration = 1, autoKill = false, element = window, offsetY = 100 } = {}
) {
  gsap.to(element, {
    scrollTo: { y: to, autoKill, offsetY, duration },
  });
}

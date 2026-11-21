import { css } from 'lit';

/**
 * Base hide/show styles for the elements managed by DileScrollRevealMixin.
 *
 * They only act on elements that have a `data-reveal-state` attribute, which the mixin sets
 * when the effect is enabled. Without JavaScript, or when the effect is disabled, no state is
 * set and the elements are simply visible. `data-reveal="trigger"` elements are never hidden.
 * The transition lives in the revealed state, so pending elements are hidden instantly and
 * only the pending -> revealed change is animated.
 */
export const revealStyles = css`
  [data-reveal][data-reveal-state="revealed"]:not([data-reveal="trigger"]) {
    transition:
      opacity var(--dile-reveal-duration, 0.7s) ease var(--dile-reveal-delay, 0ms),
      transform var(--dile-reveal-duration, 0.7s) var(--dile-reveal-easing, cubic-bezier(0.22, 1, 0.36, 1)) var(--dile-reveal-delay, 0ms);
  }

  [data-reveal][data-reveal-state="pending"]:not([data-reveal="trigger"]) {
    opacity: 0;
    transform: translateY(var(--dile-reveal-distance, 1.75rem));
  }

  /* Same specificity as the base pending rule (3 attribute selectors) so the direction wins. */
  [data-reveal][data-reveal="from-right"][data-reveal-state="pending"] {
    transform: translateX(var(--dile-reveal-distance-x, 2.5rem));
  }

  [data-reveal][data-reveal="from-left"][data-reveal-state="pending"] {
    transform: translateX(calc(-1 * var(--dile-reveal-distance-x, 2.5rem)));
  }
`;

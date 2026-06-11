import { createElement, type CSSProperties, type ReactElement } from 'react';

export interface CursorProps {
  /** Whether the cursor is currently shown. Toggling this drives the blink. */
  visible: boolean;
  /** The character to render. Default: `'|'`. */
  char?: string;
  /** Optional className applied to the cursor element. */
  className?: string;
  /** Optional inline styles merged on top of the visibility style. */
  style?: CSSProperties;
}

/**
 * Presentational blinking cursor. Pair it with `useTypewriter` when you want to
 * render the typed text yourself but keep the realistic cursor. It is purely
 * visual — `aria-hidden` so screen readers never announce it.
 */
export function Cursor({
  visible,
  char = '|',
  className,
  style,
}: CursorProps): ReactElement {
  return createElement(
    'span',
    {
      'aria-hidden': 'true',
      className,
      'data-typewriter-cursor': '',
      style: { opacity: visible ? 1 : 0, ...style },
    },
    char,
  );
}

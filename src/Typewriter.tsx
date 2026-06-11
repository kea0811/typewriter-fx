import {
  createElement,
  type CSSProperties,
  type ElementType,
  type ReactElement,
} from 'react';
import { useTypewriter } from './useTypewriter';
import { Cursor } from './Cursor';
import type { TypewriterOptions } from './types';

// Visually hidden, but readable by assistive tech. The animated text itself is
// `aria-hidden`, so screen readers read this stable full label exactly once.
const SR_ONLY: CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
  border: 0,
};

export interface TypewriterProps extends TypewriterOptions {
  /** Cursor character. Default: `'|'`. */
  cursor?: string;
  /** Whether to render the cursor at all. Default: `true`. */
  showCursor?: boolean;
  /** Element or tag to render as the wrapper. Default: `'span'`. */
  as?: ElementType;
  /**
   * The text announced to screen readers. Defaults to every word joined with a
   * space, so the full message is available even though the visible text is
   * mid-animation.
   */
  label?: string;
  /** Optional className applied to the wrapper. */
  className?: string;
  /** Optional inline styles applied to the wrapper. */
  style?: CSSProperties;
}

/**
 * `<Typewriter>` — drop-in typewriter text with a realistic blinking cursor.
 *
 * Pass a single string or an array of strings via `words`; tune `typeSpeed`,
 * `deleteSpeed`, `pauseFor`, `loop`, and `humanize` to taste. The animated text
 * is hidden from assistive tech and a stable `label` is exposed in its place.
 */
export function Typewriter({
  words,
  typeSpeed,
  deleteSpeed,
  pauseFor,
  startDelay,
  loop,
  humanize,
  cursorBlinkSpeed,
  smartCursor,
  disabled,
  onLoop,
  cursor = '|',
  showCursor = true,
  as,
  label,
  className,
  style,
}: TypewriterProps): ReactElement {
  const { text, cursorVisible, isTyping, isDone } = useTypewriter({
    words,
    typeSpeed,
    deleteSpeed,
    pauseFor,
    startDelay,
    loop,
    humanize,
    cursorBlinkSpeed,
    smartCursor,
    disabled,
    onLoop,
  });

  const Tag: ElementType = as ?? 'span';
  const accessibleText = label ?? (Array.isArray(words) ? words.join(' ') : words);
  const state = isDone ? 'done' : isTyping ? 'typing' : 'idle';

  return createElement(
    Tag,
    { className, style, 'data-typewriter': '', 'data-state': state },
    createElement('span', { 'aria-hidden': 'true', 'data-typewriter-text': '' }, text),
    showCursor
      ? createElement(Cursor, { visible: cursorVisible, char: cursor })
      : null,
    createElement('span', { style: SR_ONLY, 'data-typewriter-label': '' }, accessibleText),
  );
}

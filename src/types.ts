/** A single string, or a list of strings, for the typewriter to type. */
export type TypewriterWords = string | string[];

export interface TypewriterOptions {
  /** The string (or strings) to type out. */
  words: TypewriterWords;
  /** Milliseconds per character while typing. Default: `65`. */
  typeSpeed?: number;
  /** Milliseconds per character while deleting. Default: `35`. */
  deleteSpeed?: number;
  /** How long to hold a fully-typed word before deleting it, in ms. Default: `1600`. */
  pauseFor?: number;
  /** Delay before the very first character is typed, in ms. Default: `0`. */
  startDelay?: number;
  /**
   * Cycle through the words forever. When omitted, loops automatically if more
   * than one word was provided, and types once for a single word.
   */
  loop?: boolean;
  /**
   * Add natural variance to the per-character timing so it feels typed by a
   * human rather than a metronome. `true` uses a sensible default; a number
   * (0–1) sets the intensity. Default: `false`.
   */
  humanize?: boolean | number;
  /** Cursor blink interval (one on/off half-cycle), in ms. Default: `530`. */
  cursorBlinkSpeed?: number;
  /**
   * Keep the cursor solid while characters are being typed or deleted, and let
   * it blink only when idle — exactly like a real terminal. Default: `true`.
   */
  smartCursor?: boolean;
  /**
   * Skip the animation and show the first word instantly. Defaults to the
   * user's `prefers-reduced-motion` setting.
   */
  disabled?: boolean;
  /** Called once every time a full loop through all the words completes. */
  onLoop?: () => void;
}

export interface TypewriterState {
  /** The text currently visible (a prefix of the active word). */
  text: string;
  /** Whether the cursor should be rendered right now (drives the blink). */
  cursorVisible: boolean;
  /** Whether characters are actively being typed or deleted at this moment. */
  isTyping: boolean;
  /** `true` once a non-looping run has finished typing its final word. */
  isDone: boolean;
  /** Index of the word currently being typed. */
  wordIndex: number;
}

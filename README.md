# typewriter-fx

![tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)
![coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)
![license](https://img.shields.io/badge/license-MIT-blue.svg)

**🌐 [Live demo →](https://typewriter-fx.vercel.app)**

> Typewriter text animation for React with a realistic blinking cursor. One component, one hook, zero dependencies.

Most typewriter components blink the cursor on a dumb timer — it keeps flashing even while it's "typing", which no real terminal or editor ever does. `typewriter-fx` gets the detail right: the cursor stays **solid while characters are landing** and blinks **only when the typing rests**. It also types and deletes through a list of phrases, can add human-like timing jitter, and is accessible by default.

## Install

```bash
pnpm add typewriter-fx
```

> _Bleeding edge or before the first npm release: `pnpm add github:kea0811/typewriter-fx`._

Using npm or yarn? `npm install typewriter-fx` / `yarn add typewriter-fx` work too. Requires React 18 or 19.

## Quick example

```tsx
import { Typewriter } from 'typewriter-fx';

export function Hero() {
  return (
    <h1>
      I build <Typewriter words={['React libraries', 'tiny tools', 'side projects']} />
    </h1>
  );
}
```

Pass a single string for a one-shot effect, or an array to type → pause → delete → repeat. That's the whole API for most cases.

Need full control of the markup? Use the hook and drop in the standalone cursor:

```tsx
import { useTypewriter, Cursor } from 'typewriter-fx';

function Headline() {
  const { text, cursorVisible } = useTypewriter({ words: 'Hello, world.' });
  return (
    <span>
      {text}
      <Cursor visible={cursorVisible} char="▋" />
    </span>
  );
}
```

## API

### `<Typewriter>` component

```tsx
<Typewriter
  words={['First', 'Second']}  // string | string[]
  typeSpeed={65}               // ms per character typed
  deleteSpeed={35}             // ms per character deleted
  pauseFor={1600}              // ms to hold a full word before deleting
  startDelay={0}               // ms before the first character
  loop                         // cycle forever (defaults to true for >1 word)
  humanize                     // natural timing jitter (boolean | number 0–1)
  cursor="|"                   // cursor character
  showCursor                   // render the cursor at all (default true)
  cursorBlinkSpeed={530}       // ms per blink half-cycle
  smartCursor                  // solid while typing, blink when idle (default true)
  disabled={false}            // show full text instantly (auto-on for reduced motion)
  onLoop={() => {}}            // fires each time a full cycle completes
  as="span"                    // wrapper tag or component
  label="..."                  // accessible text (defaults to all words joined)
  className="..."
  style={{}}
/>
```

### `useTypewriter(options)` hook

Takes the same animation options as the component and returns the live state:

```ts
const {
  text,          // the visible substring right now
  cursorVisible, // whether to show the cursor (already accounts for the blink)
  isTyping,      // are characters actively landing/leaving this instant?
  isDone,        // finished a non-looping run?
  wordIndex,     // index of the active word
} = useTypewriter({ words: ['one', 'two'] });
```

### `<Cursor>` component

A purely presentational, `aria-hidden` blinking cursor. Give it `visible`, an optional `char` (default `'|'`), and your own `className` / `style`.

## Accessibility

The animated text is hidden from assistive technology (it would otherwise be announced one stuttering letter at a time). In its place, the full message is exposed as a stable, visually-hidden label — so screen readers read the complete sentence once. Pass `label` to customize it, and the cursor is always `aria-hidden`. If the user prefers reduced motion, the animation is skipped entirely and the text appears at once.

## How it works (in a sentence)

A single self-scheduling `setTimeout` chain drives the typing, and a separate interval drives the blink — both contained entirely inside `useEffect`, so the hook is safe under React 18 + 19 StrictMode's simulated unmount/remount cycle. The "realistic" part is just keeping the cursor solid whenever `isTyping` is true.

## Contributing

PRs welcome — especially new cursor ideas and reduced-motion edge cases. Run:

```bash
pnpm install
pnpm test
pnpm build
```

The demo lives in `/demo`. `pnpm demo:dev` runs it locally.

## License

MIT © [kea0811](https://github.com/kea0811)

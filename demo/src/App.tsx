import { useState } from 'react';
import { Typewriter, useTypewriter, Cursor } from 'typewriter-fx';

const GITHUB = 'https://github.com/kea0811/typewriter-fx';

function CodeBlock({ children }: { children: string }) {
  return <pre className="code">{children}</pre>;
}

/** Demonstrates the headless hook + presentational Cursor working together. */
function HeadlessExample() {
  const { text, cursorVisible } = useTypewriter({
    words: ['const ship = () => "🚀";', 'render(<Typewriter />);'],
    typeSpeed: 55,
    deleteSpeed: 28,
    pauseFor: 1400,
  });
  return (
    <code className="byo-line">
      <span className="byo-text">{text}</span>
      <Cursor visible={cursorVisible} char="▋" />
    </code>
  );
}

const CURSORS: { char: string; name: string }[] = [
  { char: '|', name: 'bar' },
  { char: '▋', name: 'block' },
  { char: '_', name: 'underscore' },
  { char: '▌', name: 'thick' },
  { char: '█', name: 'full' },
  { char: '●', name: 'dot' },
];

const SPEEDS: { label: string; speed: number; note: string }[] = [
  { label: '30ms', speed: 30, note: 'caffeinated' },
  { label: '65ms', speed: 65, note: 'default' },
  { label: '110ms', speed: 110, note: 'thoughtful' },
  { label: '180ms', speed: 180, note: 'dramatic' },
];

export function App() {
  const [reduced, setReduced] = useState(false);

  return (
    <>
      <header className="hero">
        <span className="hero-eyebrow">typewriter-fx · v0.1.0</span>
        <h1 className="hero-title">Typewriter text, done right.</h1>
        <p className="hero-sub">
          One component. One hook. A cursor that stays solid while it types and
          blinks only when it rests — exactly like the real thing. Zero
          dependencies, fully accessible.
        </p>

        <div className="install-pill">
          <span className="install-prompt">$</span>
          <span className="install-cmd">pnpm add typewriter-fx</span>
        </div>

        <div className="hero-cta">
          <a className="btn btn-primary" href={GITHUB} target="_blank" rel="noreferrer">
            ★ GitHub
          </a>
          <a className="btn btn-secondary" href="#showcase">
            See it type ↓
          </a>
        </div>

        <div className="terminal" aria-hidden="true">
          <div className="terminal-bar">
            <span className="dot dot-r" />
            <span className="dot dot-y" />
            <span className="dot dot-g" />
            <span className="terminal-name">~/typewriter-fx</span>
          </div>
          <div className="terminal-body">
            <span className="term-prompt">›</span>
            <Typewriter
              className="term-line"
              words={[
                'whoami → a tiny typing animation',
                'features: loop, delete, humanize',
                'a11y: built in, not bolted on',
              ]}
              typeSpeed={52}
              deleteSpeed={26}
              pauseFor={1500}
              cursor="▋"
            />
          </div>
        </div>
      </header>

      <main>
        <section id="showcase">
          <div className="container">
            <div className="section-head">
              <h2 className="section-title">Drop it in, watch it type.</h2>
              <p className="section-sub">
                The <code>&lt;Typewriter&gt;</code> component takes a string or a
                list of strings. That is the whole API for 90% of cases.
              </p>
            </div>
            <div className="showcase-card">
              <Typewriter
                className="showcase-text"
                words={[
                  'Hello, world.',
                  'Type anything you like.',
                  'Then watch it disappear…',
                ]}
                typeSpeed={60}
                deleteSpeed={30}
                pauseFor={1600}
              />
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="section-head">
              <h2 className="section-title">A cursor that feels real.</h2>
              <p className="section-sub">
                Pick any character for the cursor. Each one stays solid mid-keystroke
                and blinks when idle — the detail your eyes expect.
              </p>
            </div>
            <div className="grid grid-cursors">
              {CURSORS.map(({ char, name }) => (
                <div className="tile" key={name}>
                  <Typewriter
                    className="tile-type"
                    words={['typing…', 'idle.']}
                    typeSpeed={70}
                    deleteSpeed={40}
                    pauseFor={1300}
                    cursor={char}
                  />
                  <span className="tile-label">cursor="{char}"</span>
                  <span className="tile-sub">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="section-head">
              <h2 className="section-title">Loop through a whole list.</h2>
              <p className="section-sub">
                Hand it an array and it types, holds, deletes, and moves on —
                forever, or once with <code>loop={'{false}'}</code>.
              </p>
            </div>
            <div className="loop-card">
              <span className="loop-pre">I build </span>
              <Typewriter
                className="loop-type"
                words={['design systems', 'React libraries', 'tiny tools', 'side projects']}
                typeSpeed={70}
                deleteSpeed={35}
                pauseFor={1400}
                cursor="_"
              />
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="section-head">
              <h2 className="section-title">Dial in the speed.</h2>
              <p className="section-sub">
                <code>typeSpeed</code> and <code>deleteSpeed</code> are plain
                millisecond-per-character numbers. Go snappy or go cinematic.
              </p>
            </div>
            <div className="grid grid-speeds">
              {SPEEDS.map(({ label, speed, note }) => (
                <div className="tile tile-speed" key={label}>
                  <span className="speed-num">{label}</span>
                  <Typewriter
                    className="speed-type"
                    words={['the quick brown fox', 'jumps over it']}
                    typeSpeed={speed}
                    deleteSpeed={Math.round(speed / 2)}
                    pauseFor={1200}
                  />
                  <span className="tile-sub">{note}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="section-head">
              <h2 className="section-title">Types like a human.</h2>
              <p className="section-sub">
                Flip on <code>humanize</code> and each keystroke gets a little
                natural variance — no more robotic metronome.
              </p>
            </div>
            <div className="grid grid-two">
              <div className="tile">
                <Typewriter
                  className="tile-type"
                  words={['steady. even. exact.', 'tick — tick — tick']}
                  typeSpeed={75}
                  deleteSpeed={40}
                  pauseFor={1300}
                />
                <span className="tile-label">humanize: off</span>
                <span className="tile-sub">perfectly metronomic</span>
              </div>
              <div className="tile">
                <Typewriter
                  className="tile-type"
                  words={['loose, lively, alive', 'feels hand-typed']}
                  typeSpeed={75}
                  deleteSpeed={40}
                  pauseFor={1300}
                  humanize
                />
                <span className="tile-label">humanize</span>
                <span className="tile-sub">natural rhythm</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="section-head">
              <h2 className="section-title">Bring your own render.</h2>
              <p className="section-sub">
                Want full control of the markup? Drive everything with the{' '}
                <code>useTypewriter</code> hook and drop in the standalone{' '}
                <code>&lt;Cursor&gt;</code>.
              </p>
            </div>
            <div className="byo-card">
              <HeadlessExample />
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="section-head">
              <h2 className="section-title">Respects reduced motion.</h2>
              <p className="section-sub">
                Set <code>disabled</code>, or let it auto-detect{' '}
                <code>prefers-reduced-motion</code>: the full text shows instantly,
                with a calm, solid cursor.
              </p>
            </div>
            <div className="toggle-row">
              <button
                type="button"
                className="toggle"
                onClick={() => setReduced(false)}
                aria-pressed={!reduced}
              >
                animate
              </button>
              <button
                type="button"
                className="toggle"
                onClick={() => setReduced(true)}
                aria-pressed={reduced}
              >
                disabled (instant)
              </button>
            </div>
            <div className="showcase-card">
              <Typewriter
                key={String(reduced)}
                className="showcase-text"
                words={['No flash. No motion. No fuss.']}
                typeSpeed={55}
                disabled={reduced}
              />
            </div>
            <p className="note">
              <strong className="note-strong">Built in:</strong> the animated text
              is hidden from screen readers and the complete sentence is exposed as
              a stable label — so assistive tech reads it once, in full.
            </p>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="section-head">
              <h2 className="section-title">The 5-second integration.</h2>
              <p className="section-sub">
                The component for almost everything, the hook when you need the
                reins.
              </p>
            </div>
            <div className="grid grid-two">
              <CodeBlock>{`// The component
import { Typewriter } from 'typewriter-fx';

<Typewriter
  words={['Hello', 'world']}
  typeSpeed={65}
  loop
/>`}</CodeBlock>
              <CodeBlock>{`// The hook
import { useTypewriter, Cursor }
  from 'typewriter-fx';

const { text, cursorVisible } =
  useTypewriter({ words: 'Hi there' });

<span>{text}<Cursor visible={cursorVisible} /></span>`}</CodeBlock>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="footer-text">
          MIT licensed · built by{' '}
          <a className="footer-link" href="https://github.com/kea0811" target="_blank" rel="noreferrer">
            kea0811
          </a>
        </p>
      </footer>
    </>
  );
}

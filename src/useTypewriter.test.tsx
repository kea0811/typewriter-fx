import { describe, it, expect, vi, afterEach } from 'vitest';
import { StrictMode } from 'react';
import { act, render, screen } from '@testing-library/react';
import { useTypewriter } from './useTypewriter';
import type { TypewriterOptions } from './types';

function Probe(props: TypewriterOptions) {
  const { text, cursorVisible, isTyping, isDone, wordIndex } = useTypewriter(props);
  return (
    <div>
      <span data-testid="text">{text}</span>
      <span data-testid="cursor">{cursorVisible ? 'on' : 'off'}</span>
      <span data-testid="typing">{isTyping ? 'y' : 'n'}</span>
      <span data-testid="done">{isDone ? 'y' : 'n'}</span>
      <span data-testid="wi">{wordIndex}</span>
    </div>
  );
}

const text = () => screen.getByTestId('text');
const cursor = () => screen.getByTestId('cursor');
const typing = () => screen.getByTestId('typing');
const done = () => screen.getByTestId('done');
const wi = () => screen.getByTestId('wi');

describe('useTypewriter', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('types a single word out one character at a time, then finishes', () => {
    vi.useFakeTimers();
    render(<Probe words="Hi" typeSpeed={50} />);

    // Nothing typed yet, and the cursor blinks while idle.
    expect(text()).toHaveTextContent('');
    expect(done()).toHaveTextContent('n');

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(text()).toHaveTextContent('H');
    expect(typing()).toHaveTextContent('y');

    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(text()).toHaveTextContent('Hi');
    expect(done()).toHaveTextContent('y');
    expect(typing()).toHaveTextContent('n');
  });

  it('keeps the cursor solid while characters are being typed', () => {
    vi.useFakeTimers();
    render(<Probe words="abcdef" typeSpeed={1000} cursorBlinkSpeed={50} />);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(typing()).toHaveTextContent('y');

    // Well past several blink intervals, yet still solid because it is typing.
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(cursor()).toHaveTextContent('on');
  });

  it('blinks the cursor once the typing goes idle', () => {
    vi.useFakeTimers();
    render(<Probe words="A" typeSpeed={1} cursorBlinkSpeed={100} />);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(done()).toHaveTextContent('y');
    expect(cursor()).toHaveTextContent('on');

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(cursor()).toHaveTextContent('off');

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(cursor()).toHaveTextContent('on');
  });

  it('loops through words, deleting between them and calling onLoop each cycle', () => {
    vi.useFakeTimers();
    const onLoop = vi.fn();
    render(
      <Probe
        words={['ab', 'cd']}
        typeSpeed={10}
        deleteSpeed={5}
        pauseFor={50}
        onLoop={onLoop}
      />,
    );

    act(() => {
      vi.advanceTimersByTime(10);
    });
    expect(text()).toHaveTextContent('ab');
    expect(typing()).toHaveTextContent('n'); // paused on a full word

    act(() => {
      vi.advanceTimersByTime(70);
    });
    expect(text()).toHaveTextContent('c');
    expect(wi()).toHaveTextContent('1');

    act(() => {
      vi.advanceTimersByTime(10);
    });
    expect(text()).toHaveTextContent('cd');

    act(() => {
      vi.advanceTimersByTime(60);
    });
    expect(onLoop).toHaveBeenCalledTimes(1);
    expect(wi()).toHaveTextContent('0');
  });

  it('loops without throwing when no onLoop callback is provided', () => {
    vi.useFakeTimers();
    render(<Probe words={['x', 'y']} typeSpeed={5} deleteSpeed={5} pauseFor={10} />);
    act(() => {
      vi.advanceTimersByTime(200);
    });
    // Survived several full cycles (which pass wordIndex back through 0 with no
    // onLoop callback) and keeps looping — a looping run is never "done".
    expect(done()).toHaveTextContent('n');
  });

  it('types each word once and stops when loop is false', () => {
    vi.useFakeTimers();
    render(
      <Probe
        words={['ab', 'cd']}
        typeSpeed={5}
        deleteSpeed={5}
        pauseFor={10}
        loop={false}
      />,
    );
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(text()).toHaveTextContent('cd');
    expect(done()).toHaveTextContent('y');
  });

  it('shows the first word instantly when disabled', () => {
    render(<Probe words={['hello', 'world']} disabled />);
    expect(text()).toHaveTextContent('hello');
    expect(done()).toHaveTextContent('y');
    expect(typing()).toHaveTextContent('n');
    expect(cursor()).toHaveTextContent('on'); // solid, no blink
  });

  it('respects prefers-reduced-motion when disabled is not set', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as unknown as MediaQueryList);
    render(<Probe words="instant" />);
    expect(text()).toHaveTextContent('instant');
    expect(done()).toHaveTextContent('y');
  });

  it('blinks while typing when smartCursor is turned off', () => {
    vi.useFakeTimers();
    render(
      <Probe words="abcdefgh" typeSpeed={1000} cursorBlinkSpeed={50} smartCursor={false} />,
    );
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(typing()).toHaveTextContent('y');
    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(cursor()).toHaveTextContent('off'); // blinks even mid-word
  });

  it('applies humanized timing when humanize is true', () => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(0.5); // factor === 1, so timing is stable
    render(<Probe words="hey" typeSpeed={40} humanize />);
    act(() => {
      vi.advanceTimersByTime(120);
    });
    expect(text()).toHaveTextContent('hey');
  });

  it('accepts a numeric humanize amount', () => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    render(<Probe words="ok" typeSpeed={30} humanize={0.6} />);
    act(() => {
      vi.advanceTimersByTime(60);
    });
    expect(text()).toHaveTextContent('ok');
  });

  it('handles an empty words array gracefully', () => {
    vi.useFakeTimers();
    render(<Probe words={[]} />);
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(text()).toHaveTextContent('');
    expect(done()).toHaveTextContent('y');
  });

  it('types correctly under StrictMode (no dangling timers)', () => {
    vi.useFakeTimers();
    render(
      <StrictMode>
        <Probe words="Hi" typeSpeed={20} />
      </StrictMode>,
    );
    act(() => {
      vi.advanceTimersByTime(60);
    });
    expect(text()).toHaveTextContent('Hi');
  });
});

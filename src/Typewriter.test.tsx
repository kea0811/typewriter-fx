import { describe, it, expect, vi, afterEach } from 'vitest';
import { act, render } from '@testing-library/react';
import { Typewriter } from './Typewriter';

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

const q = (c: HTMLElement, sel: string) => c.querySelector(sel) as HTMLElement;

describe('Typewriter', () => {
  it('types a single string, renders a cursor, and exposes an accessible label', () => {
    vi.useFakeTimers();
    const { container } = render(<Typewriter words="Hello" typeSpeed={10} />);

    // Before any character is typed it is idle.
    expect(q(container, '[data-typewriter]')).toHaveAttribute('data-state', 'idle');

    act(() => {
      vi.advanceTimersByTime(60);
    });

    expect(q(container, '[data-typewriter-text]')).toHaveTextContent('Hello');
    expect(q(container, '[data-typewriter-cursor]')).toBeInTheDocument();
    expect(q(container, '[data-typewriter-label]')).toHaveTextContent('Hello');
    expect(q(container, '[data-typewriter]')).toHaveAttribute('data-state', 'done');
  });

  it('joins an array of words for the accessible label and reflects the typing state', () => {
    vi.useFakeTimers();
    const { container } = render(<Typewriter words={['one', 'two']} typeSpeed={10} />);

    act(() => {
      vi.advanceTimersByTime(10);
    });

    expect(q(container, '[data-typewriter-label]')).toHaveTextContent('one two');
    expect(q(container, '[data-typewriter]')).toHaveAttribute('data-state', 'typing');
  });

  it('honors a custom label, a custom tag, and a hidden cursor', () => {
    const { container } = render(
      <Typewriter
        words={['a', 'b']}
        disabled
        label="A complete sentence."
        as="h1"
        showCursor={false}
      />,
    );

    const root = q(container, '[data-typewriter]');
    expect(root.tagName).toBe('H1');
    expect(q(container, '[data-typewriter-label]')).toHaveTextContent('A complete sentence.');
    expect(container.querySelector('[data-typewriter-cursor]')).toBeNull();
    expect(root).toHaveAttribute('data-state', 'done');
  });

  it('passes className and style through to the wrapper', () => {
    const { container } = render(
      <Typewriter words="x" disabled className="tw" style={{ color: 'tomato' }} />,
    );
    const root = q(container, '[data-typewriter]');
    expect(root).toHaveClass('tw');
    expect(root.style.color).toBe('tomato');
  });
});

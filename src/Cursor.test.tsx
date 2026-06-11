import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Cursor } from './Cursor';

const find = (container: HTMLElement) =>
  container.querySelector('[data-typewriter-cursor]') as HTMLElement;

describe('Cursor', () => {
  it('renders the default character, fully opaque, and hidden from a11y tree', () => {
    const { container } = render(<Cursor visible />);
    const el = find(container);
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent('|');
    expect(el.style.opacity).toBe('1');
    expect(el).toHaveAttribute('aria-hidden', 'true');
  });

  it('drops to zero opacity when not visible and accepts a custom char, class, and style', () => {
    const { container } = render(
      <Cursor visible={false} char="▋" className="my-cursor" style={{ color: 'red' }} />,
    );
    const el = find(container);
    expect(el).toHaveTextContent('▋');
    expect(el.style.opacity).toBe('0');
    expect(el).toHaveClass('my-cursor');
    expect(el.style.color).toBe('red');
  });
});

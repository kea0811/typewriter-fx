import { describe, it, expect } from 'vitest';
import { version } from './index';

describe('typewriter-fx scaffold', () => {
  it('exposes a version string', () => {
    expect(version).toBe('0.1.0');
  });
});

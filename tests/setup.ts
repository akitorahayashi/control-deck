import React from 'react';
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Make React available globally for all tests
(global as any).React = React;

// Mock ResizeObserver for JSDOM
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

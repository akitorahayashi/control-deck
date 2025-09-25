import { describe, it, expect } from 'vitest';
import { truncateText, isValidUrl, getJsonMarkdown } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('truncateText', () => {
    it('should return the text if it is shorter than the limit', () => {
      const text = 'Short text';
      const limit = 20;
      expect(truncateText(text, limit)).toBe('Short text');
    });

    it('should truncate the text and add ".." if it exceeds the limit', () => {
      const text = 'This is a very long text that should be truncated';
      const limit = 20;
      expect(truncateText(text, limit)).toBe('This is a very long ..');
    });

    it('should return an empty string if text is falsy', () => {
      expect(truncateText('', 10)).toBe('');
      expect(truncateText(null as any, 10)).toBe('');
      expect(truncateText(undefined as any, 10)).toBe('');
    });
  });

  describe('isValidUrl', () => {
    it('should return true for valid URLs', () => {
      expect(isValidUrl('https://www.example.com')).toBe(true);
      expect(isValidUrl('http://example.com')).toBe(true);
      expect(isValidUrl('https://example.com/path')).toBe(true);
      expect(isValidUrl('http://localhost:3000')).toBe(true);
      expect(isValidUrl('https://example.com?query=value')).toBe(true);
      expect(isValidUrl('https://example.com#fragment')).toBe(true);
    });

    it('should return false for invalid URLs', () => {
      expect(isValidUrl('')).toBe(false);
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('ftp://example.com')).toBe(false);
      expect(isValidUrl('https://')).toBe(false);
      expect(isValidUrl('://example.com')).toBe(false);
    });

    it('should handle URLs with spaces', () => {
      expect(isValidUrl('https://example.com with space')).toBe(false);
    });
  });

  describe('getJsonMarkdown', () => {
    it('should return a markdown code block with JSON content', () => {
      const content = { key: 'value', number: 42 };
      const result = getJsonMarkdown(content);
      expect(result).toContain('```json');
      expect(result).toContain('"key": "value"');
      expect(result).toContain('"number": 42');
      expect(result).toContain('```');
    });

    it('should handle empty objects', () => {
      const result = getJsonMarkdown({});
      expect(result).toContain('```json');
      expect(result).toContain('{}');
      expect(result).toContain('```');
    });

    it('should handle non-object content gracefully', () => {
      const result = getJsonMarkdown('string content' as any);
      expect(result).toContain('```');
      expect(result).toContain('string content');
      expect(result).toContain('```');
    });
  });
});

import { describe, it, expect } from 'vitest';
import { getAgentById, getAgentName } from '@/lib/agentUtils';

describe('Agent Utility Functions', () => {
  describe('getAgentById', () => {
    it('should return the correct agent for a valid ID', () => {
      const agent = getAgentById('agent-001');
      expect(agent).toBeDefined();
      expect(agent?.id).toBe('agent-001');
      expect(agent?.name).toBe('Research Pro');
    });

    it('should return null for an invalid ID', () => {
      const agent = getAgentById('invalid-id');
      expect(agent).toBeNull();
    });

    it('should return null for an empty string', () => {
      const agent = getAgentById('');
      expect(agent).toBeNull();
    });
  });

  describe('getAgentName', () => {
    it('should return the correct name for a valid ID', () => {
      const name = getAgentName('agent-001');
      expect(name).toBe('Research Pro');
    });

    it('should return "Unknown Agent" for an invalid ID', () => {
      const name = getAgentName('invalid-id');
      expect(name).toBe('Unknown Agent');
    });

    it('should return "Unknown Agent" for an empty string', () => {
      const name = getAgentName('');
      expect(name).toBe('Unknown Agent');
    });
  });
});

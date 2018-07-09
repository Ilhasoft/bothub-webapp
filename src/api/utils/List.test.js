/* eslint-env node, jest */
/* eslint-disable no-console, import/first */
jest.mock('../request');

import List from './List';

describe('API List', () => {
  let list;
  const initial = '/repositories/';
  beforeEach(() => {
    list = new List(initial);
  });

  describe('next', () => {
    beforeEach(async () => {
      await list.next();
    });

    test('has items', () => {
      expect(list.items).toHaveLength(20);
    });

    test('has next', () => {
      expect(list.hasNext).toBeTruthy();
    });

    describe('reset', () => {
      beforeEach(() => {
        list.reset();
      });

      test('nextEntryPoint is initial', () => {
        expect(list.nextEntryPoint).toBe(initial);
      });

      test('empty items', () => {
        expect(list.items).toHaveLength(0);
      });

      test('empty deletions', () => {
        expect(list.deletions).toHaveLength(0);
      });
    });
  });
});

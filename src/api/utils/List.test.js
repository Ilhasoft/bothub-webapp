/* eslint-env node, jest */
/* eslint-disable no-console, import/first */
jest.mock('../request');

import List from './List';

describe('API List', () => {
  test('repositories test', async () => {
    const list = new List('/repositories/');
    await list.next();
    expect(list.items).toHaveLength(20);
    expect(list.hasNext).toBeTruthy();
  });
});

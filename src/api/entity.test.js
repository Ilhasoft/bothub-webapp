/* eslint-env node, jest */
/* eslint-disable no-console, import/first */
jest.mock('./request');

import entity from './entity';

describe('api/entity', () => {
  test('search', async () => {
    const list = entity.search('8511fd26-a3bc-4f74-9af1-176abca5401d');
    await list.next();
    expect(list.items).toHaveLength(1);
  });
});

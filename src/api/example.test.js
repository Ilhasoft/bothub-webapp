/* eslint-env node, jest */
/* eslint-disable no-console, import/first */
jest.mock('./request');

import example from './example';

describe('api/example', () => {
  test('new', async () => {
    const response = await example.new(
      '8511fd26-a3bc-4f74-9af1-176abca5401d',
      'my name is douglas',
      'en',
      [
        {
          start: 11,
          end: 18,
          entity: 'name',
        },
      ],
      'greet',
    );
    expect(response.status).toBe(201);
  });

  test('all', async () => {
    const list = example.all('8511fd26-a3bc-4f74-9af1-176abca5401d');
    await list.next();
    expect(list.items).toHaveLength(1);
  });

  test('delete', async () => {
    const response = await example.delete(1);
    expect(response.status).toBe(204);
  });

  test('search', async () => {
    const list = example.search('8511fd26-a3bc-4f74-9af1-176abca5401d');
    await list.next();
    expect(list.items).toHaveLength(1);
  });

  test('get', async () => {
    const response = await example.get(1);
    expect(response.status).toBe(200);
  });
});

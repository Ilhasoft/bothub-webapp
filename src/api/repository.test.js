/* eslint-env node, jest */
/* eslint-disable no-console, import/first */
jest.mock('./request');

import repository from './repository';

describe('api/repository', () => {
  test('getNewSchema', async () => {
    const response = await repository.getNewSchema();
    expect(typeof response).toBe('object');
  });

  test('new', async () => {
    const response = await repository.new(
      'Repository One',
      'repository1',
      'en',
      [1],
      '',
      true,
    );
    expect(response.data.uuid).toBe('8511fd26-a3bc-4f74-9af1-176abca5401d');
  });

  test('getAll', async () => {
    const list = repository.getAll();
    await list.next();
    expect(list.items).toHaveLength(1);
  });
});

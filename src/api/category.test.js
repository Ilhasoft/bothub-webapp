/* eslint-env node, jest */
/* eslint-disable no-console, import/first */
jest.mock('./request');

import category from './category';

describe('api/category.js', () => {
  test('getAll', async () => {
    const response = await category.getAll();
    expect(typeof response).toBe('object');
    expect(typeof response.data).toBe('object');
  });
});

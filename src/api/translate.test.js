/* eslint-env node, jest */
/* eslint-disable no-console, import/first */
jest.mock('./request');

import translate from './translate';


describe('api/translate', () => {
  test('new', async () => {
    const response = await translate.new(
      1,
      'pt',
      'meu nome é douglas',
      [
        {
          start: 12,
          end: 19,
          entity: 'name',
        },
      ]);
    expect(response.status).toBe(201);
  });
});

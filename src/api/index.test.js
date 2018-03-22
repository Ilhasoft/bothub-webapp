/* eslint-env node, jest */
import api from './';

test('API has auth', () => {
  expect(api.auth).toBeDefined();
});

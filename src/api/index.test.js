/* eslint-env node, jest */
import api from './';

test('API has auth', () => {
  expect(api.auth).toBeDefined();
});

test('API has repository', () => {
  expect(api.repository).toBeDefined();
});

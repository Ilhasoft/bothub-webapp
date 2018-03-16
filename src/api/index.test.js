/* eslint-env node, jest */
/* eslint-disable no-console */
import api from './';

test('API has auth', () => {
  expect(api.auth).toBeDefined();
});

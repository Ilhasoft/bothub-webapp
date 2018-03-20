/* eslint-env node, jest */
/* eslint-disable no-console, import/first */
jest.mock('./request');

import auth from './auth';

test('login', async () => {
  const response = await auth.login('fake@user.com', '123456');
  expect(response.data.token).toBe('1f5e7e21d331536b58448595f69eb50a6b5e49b8');
});

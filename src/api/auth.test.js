/* eslint-env node, jest */
/* eslint-disable no-console, import/first */
jest.mock('./request');

import auth from './auth';

test('login', async () => {
  const response = await auth.login('fake@user.com', '123456');
  expect(response.data.token).toBe('1f5e7e21d331536b58448595f69eb50a6b5e49b8');
});

test('forgotPassword', async () => {
  const response = await auth.forgotPassword('fake@user.com');
  expect(Object.keys(response.data).length).toBe(0);
});

test('resetPassword', async () => {
  const response = await auth.resetPassword('fake', 'token1', 'n123456');
  expect(Object.keys(response.data).length).toBe(0);
});

test('register', async () => {
  const response = await auth.register('new@user.com', 'New', 'new', 'n123456');
  expect(response.status).toBe(200);
});

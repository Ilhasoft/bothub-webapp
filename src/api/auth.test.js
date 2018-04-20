/* eslint-env node, jest */
/* eslint-disable no-console, import/first */
jest.mock('./request');

import auth from './auth';

describe('api/auth.js', () => {
  test('getLoginSchema', async () => {
    const response = await auth.getLoginSchema();
    expect(typeof response).toBe('object');
  });

  test('login', async () => {
    const response = await auth.login('fake@user.com', '123456');
    expect(response.data.token).toBe('1f5e7e21d331536b58448595f69eb50a6b5e49b8');
  });

  test('getForgotPasswordSchema', async () => {
    const response = await auth.getForgotPasswordSchema();
    expect(typeof response).toBe('object');
  });

  test('forgotPassword', async () => {
    const response = await auth.forgotPassword('fake@user.com');
    expect(Object.keys(response.data).length).toBe(0);
  });

  test('getResetPasswordSchema', async () => {
    const response = await auth.getResetPasswordSchema('fake');
    expect(typeof response).toBe('object');
  });

  test('resetPassword', async () => {
    const response = await auth.resetPassword('fake', 'token1', 'n123456');
    expect(Object.keys(response.data).length).toBe(0);
  });

  test('getRegisterSchema', async () => {
    const response = await auth.getRegisterSchema();
    expect(response).toBeDefined();
  });

  test('register', async () => {
    const response = await auth.register('new@user.com', 'New', 'new', 'n123456');
    expect(response.status).toBe(200);
  });

  test('profile', async () => {
    const response = await auth.profile('fake');
    expect(response.status).toBe(200);
    expect(response.data.nickname).toBe('fake');
  });

  test('myProfile', async () => {
    const response = await auth.myProfile();
    expect(response.status).toBe(200);
    expect(response.data.nickname).toBe('fake');
  });
});

/* eslint-env node, jest */
/* eslint-disable no-console, import/first */
jest.mock('./request');

import user from './user';


describe('api/user.js', () => {
  test('profile', async () => {
    const response = await user.profile('fake');
    expect(response.status).toBe(200);
    expect(response.data.nickname).toBe('fake');
  });

  test('myProfile', async () => {
    const response = await user.myProfile();
    expect(response.status).toBe(200);
    expect(response.data.nickname).toBe('fake');
  });

  test('myRepositories', async () => {
    const list = user.myRepositories();
    await list.next();
    expect(list.items.length).toBe(1);
  });
});

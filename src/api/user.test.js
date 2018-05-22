/* eslint-env node, jest */
/* eslint-disable no-console, import/first */
jest.mock('./request');

import user from './user';

import store from '@/store';
import TYPES from '@/store/types';


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

  test('getMyProfileSchema', async () => {
    const response = user.getMyProfileSchema();
    expect(typeof response).toBe('object');
  });

  test('updateMyProfile', async () => {
    store.commit(TYPES.SET_TOKEN, '1f5e7e21d331536b58448595f69eb50a6b5e49b8');

    const newName = 'New Name';
    const response = user.updateMyProfile('fake', 'fake@user.com', newName, '');
    expect(response.status).toBe(200);
    expect(response.data.name).toBe(newName);
  });
});

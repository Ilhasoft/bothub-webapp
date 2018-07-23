/* eslint-env node, jest */
/* eslint-disable no-console, import/first */
jest.mock('./request');

import repository from './repository';

import store from '@/store';
import TYPES from '@/store/types';
import { ROLE_CONTRIBUTOR } from '@/utils';


describe('api/repository', () => {
  test('getNewSchema', async () => {
    const response = await repository.getNewSchema();
    expect(typeof response).toBe('object');
  });

  test('new', async () => {
    const response = await repository.new(
      'Repository One',
      'repository1',
      'en',
      [1],
      '',
      true,
    );
    expect(response.data.uuid).toBe('8511fd26-a3bc-4f74-9af1-176abca5401d');
  });

  test('getAll', async () => {
    const list = repository.getAll();
    await list.next();
    expect(list.items).toHaveLength(20);
  });

  test('search categories', async () => {
    const list = repository.search({ categories: [1] });
    await list.next();
    expect(list.items).toHaveLength(15);
    list.items.forEach((item) => {
      expect(item.data.categories.includes(1)).toBeTruthy();
    });
  });

  test('get', async () => {
    const response = await repository.get('douglas', 'repo1');
    expect(response.data).toBeDefined();
    expect(response.data.slug).toBe('repo1');
  });

  test('train', async () => {
    const response = await repository.train('douglas', 'repo1');
    expect(response.data).toBeDefined();
  });

  test('analyze', async () => {
    const response = await repository.analyze('douglas', 'repo1', 'en', 'My name is Douglas');
    expect(response.data).toBeDefined();
  });

  test('getEditSchema', async () => {
    const response = await repository.getEditSchema('fake', 'repo1');
    expect(typeof response).toBe('object');
  });

  test('edit', async () => {
    store.commit(TYPES.SET_TOKEN, '1f5e7e21d331536b58448595f69eb50a6b5e49b8');

    const response = await repository.edit(
      'fake',
      'repo1',
      'Repository',
      'repo1',
      'en',
      [1],
      'New description',
      false,
    );
    expect(response.status).toBe(200);

    store.commit(TYPES.SET_TOKEN, null);
  });

  test('getLanguagesStatus', async () => {
    const response = await repository.getLanguagesStatus('douglas', 'repo1');
    expect(response.status).toBe(200);
  });

  test('vote', async () => {
    store.commit(TYPES.SET_TOKEN, '1f5e7e21d331536b58448595f69eb50a6b5e49b8');

    const response = await repository.vote('douglas', 'repo1', 1);
    expect(response.status).toBe(201);

    store.commit(TYPES.SET_TOKEN, null);
  });

  test('voteUp', async () => {
    store.commit(TYPES.SET_TOKEN, '1f5e7e21d331536b58448595f69eb50a6b5e49b8');

    const response = await repository.voteUp('douglas', 'repo1');
    expect(response.status).toBe(201);

    store.commit(TYPES.SET_TOKEN, null);
  });

  test('voteUp', async () => {
    store.commit(TYPES.SET_TOKEN, '1f5e7e21d331536b58448595f69eb50a6b5e49b8');

    const response = await repository.voteDown('douglas', 'repo1');
    expect(response.status).toBe(201);

    store.commit(TYPES.SET_TOKEN, null);
  });

  test('updateAuthorizationRole', async () => {
    store.commit(TYPES.SET_TOKEN, '1f5e7e21d331536b58448595f69eb50a6b5e49b8');

    const response = await repository.updateAuthorizationRole(
      '8511fd26-a3bc-4f74-9af1-176abca5401d',
      'douglas',
      ROLE_CONTRIBUTOR,
    );
    expect(response.status).toBe(200);
    expect(response.data.role).toBe(ROLE_CONTRIBUTOR);

    store.commit(TYPES.SET_TOKEN, null);
  });

  test('getAuthorizationList', async () => {
    store.commit(TYPES.SET_TOKEN, '1f5e7e21d331536b58448595f69eb50a6b5e49b8');

    const list = repository.getAuthorizationList('8511fd26-a3bc-4f74-9af1-176abca5401d');
    await list.next();
    expect(list.items).toHaveLength(1);

    store.commit(TYPES.SET_TOKEN, null);
  });

  test('getRequestAuthorizationSchema', async () => {
    const response = await repository.getRequestAuthorizationSchema();
    expect(typeof response).toBe('object');
  });

  test('requestAuthorization', async () => {
    store.commit(TYPES.SET_TOKEN, '1f5e7e21d331536b58448595f69eb50a6b5e49b8');

    const repositoryUuid = '8511fd26-a3bc-4f74-9af1-176abca5401d';
    const response = await repository.requestAuthorization(
      repositoryUuid,
      'I can contribute',
    );
    expect(response.data.repository).toBe(repositoryUuid);

    store.commit(TYPES.SET_TOKEN, null);
  });

  test('getAuthorizationRequestsList', async () => {
    store.commit(TYPES.SET_TOKEN, '1f5e7e21d331536b58448595f69eb50a6b5e49b8');

    const list = repository.getAuthorizationRequestsList('8511fd26-a3bc-4f74-9af1-176abca5401d');
    await list.next();
    expect(list.items).toHaveLength(1);

    store.commit(TYPES.SET_TOKEN, null);
  });

  test('approveRequestAuthorization', async () => {
    store.commit(TYPES.SET_TOKEN, '1f5e7e21d331536b58448595f69eb50a6b5e49b8');

    const response = await repository.approveRequestAuthorization(1);
    expect(response.status).toBe(200);

    store.commit(TYPES.SET_TOKEN, null);
  });

  test('rejectRequestAuthorization', async () => {
    store.commit(TYPES.SET_TOKEN, '1f5e7e21d331536b58448595f69eb50a6b5e49b8');

    const response = await repository.rejectRequestAuthorization(1);
    expect(response.status).toBe(204);

    store.commit(TYPES.SET_TOKEN, null);
  });
});

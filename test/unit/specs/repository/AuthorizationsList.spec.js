/* eslint-disable import/first */
jest.mock('@/api/request');

import Vuex from 'vuex';
import { shallow, createLocalVue } from '@vue/test-utils';

import store from '@/store';

import AuthorizationsList from '@/components/repository/AuthorizationsList';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('AuthorizationsList.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      Auth: {
        token: '1f5e7e21d331536b58448595f69eb50a6b5e49b8',
      },
    });
    wrapper = shallow(AuthorizationsList, {
      localVue,
      propsData: {
        repositoryUuid: '8511fd26-a3bc-4f74-9af1-176abca5401d',
      },
      store,
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  describe('update list', () => {
    beforeEach(async () => {
      await wrapper.vm.updateAuthorizations();
    });

    test('have items', () => {
      expect(wrapper.vm.authorizationsList.items.length).toBeGreaterThan(0);
    });
  });

  describe('on edit', () => {
    const value = { userProfile: {}, role: 0 };
    beforeEach(() => {
      wrapper.vm.onEdit(value);
    });

    test('emit edit', () => {
      expect(wrapper.emitted('edit')).toBeDefined();
      expect(wrapper.emitted('edit')[0][0]).toMatchObject(value);
    });
  });
});

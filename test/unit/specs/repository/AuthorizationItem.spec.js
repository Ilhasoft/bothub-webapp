/* eslint-disable import/first */
jest.mock('@/api/request');

import Vuex from 'vuex';
import Buefy from 'buefy';
import { shallow, createLocalVue } from '@vue/test-utils';

import store from '@/store';
import TYPES from '@/store/types';
import applyFilters from '@/utils/filters';

import AuthorizationItem from '@/components/repository/AuthorizationItem';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Buefy);
applyFilters(localVue);

describe('AuthorizationItem.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      Auth: {},
      User: { profiles: {} },
    });
    store.commit(TYPES.SET_TOKEN, '1f5e7e21d331536b58448595f69eb50a6b5e49b8');
    wrapper = shallow(AuthorizationItem, {
      localVue,
      propsData: {
        uuid: 'de6e3f36-833f-4ef8-a3da-c576ea606139',
        user__nickname: 'douglas',
        repository: '8511fd26-a3bc-4f74-9af1-176abca5401d',
        role: 3,
        can_read: true,
        can_contribute: true,
        can_write: true,
      },
      store,
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  describe('click on edit', () => {
    beforeEach(() => {
      const edit = wrapper.find({ ref: 'editBtn' });
      edit.trigger('click');
    });

    test('emit dispatchEvent', () => {
      expect(wrapper.emitted('dispatchEvent')).toBeDefined();
    });
  });

  describe('click on remove', () => {
    beforeEach(() => {
      const remove = wrapper.find({ ref: 'removeBtn' });
      remove.trigger('click');
    });

    test('emit deleted', () => {
      expect(wrapper.emitted('deleted')).toBeDefined();
    });
  });
});

/* eslint-disable import/first */
jest.mock('@/api/request');

import Vuex from 'vuex';
import Buefy from 'buefy';
import { shallow, createLocalVue } from '@vue/test-utils';

import store from '@/store';

import AuthorizationItem from '@/components/repository/AuthorizationItem';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Buefy);

describe('AuthorizationItem.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      Auth: {},
      User: { profiles: {} },
    });
    wrapper = shallow(AuthorizationItem, {
      localVue,
      propsData: {
        uuid: 'de6e3f36-833f-4ef8-a3da-c576ea606139',
        user__nickname: 'douglas',
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
});

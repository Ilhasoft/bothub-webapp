/* eslint-disable import/first */
jest.mock('@/api/request');

import Vuex from 'vuex';
import Router from 'vue-router';
import { shallow, createLocalVue } from '@vue/test-utils';

import store from '@/store';
import Layout from '@/components/shared/Layout';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Router);

describe('Layout.vue', () => {
  describe('authenticated', () => {
    let wrapper;
    beforeEach(() => {
      store.replaceState({
        Auth: {
          token: '1f5e7e21d331536b58448595f69eb50a6b5e49b8',
        },
        User: {
          profiles: {},
        },
      });
      wrapper = shallow(Layout, { store, localVue, router });
    });

    test('show logout', () => {
      expect(wrapper.find({ ref: 'logout' }).exists())
        .toBeTruthy();
    });
  });

  describe('not authenticated', () => {
    let wrapper;
    beforeEach(() => {
      store.replaceState({
        Auth: {},
        User: {
          profiles: {},
        },
      });
      wrapper = shallow(Layout, { store, localVue, router });
    });

    test('show login', () => {
      expect(wrapper.find({ ref: 'login' }).exists())
        .toBeTruthy();
    });
  });

  describe('do logout', () => {
    let wrapper;
    beforeEach(async () => {
      store.replaceState({
        Auth: {
          token: '1f5e7e21d331536b58448595f69eb50a6b5e49b8',
        },
        User: {
          profiles: {},
        },
      });
      wrapper = shallow(Layout, { store, localVue, router });
      await wrapper.vm.logout();
    });

    test('no auth token', () => {
      expect(store.getters.authToken).toBeNull();
    });
  });
});

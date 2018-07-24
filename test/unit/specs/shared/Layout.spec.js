/* eslint-disable import/first */
jest.mock('@/api/request');

import Buefy from 'buefy';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import store from '@/store';
import router from '@/router';
import Layout from '@/components/shared/Layout';

const localVue = createLocalVue();
localVue.use(Buefy);

describe('Layout.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      Auth: {},
      User: {
        profiles: {},
      },
    });
    wrapper = shallowMount(Layout, { store, localVue, router });
  });

  describe('authenticated', () => {
    beforeEach(() => {
      store.replaceState({
        Auth: {
          token: '1f5e7e21d331536b58448595f69eb50a6b5e49b8',
        },
        User: {
          profiles: {},
        },
      });
    });

    test('show authenticated', () => {
      expect(wrapper.find({ ref: 'authenticated' }).exists())
        .toBeTruthy();
    });
  });

  describe('not authenticated', () => {
    test('show not authenticated', () => {
      expect(wrapper.find({ ref: 'notAuthenticated' }).exists())
        .toBeTruthy();
    });

    describe('do logout', () => {
      beforeEach(async () => {
        await wrapper.vm.logout();
      });

      test('no auth token', () => {
        expect(store.getters.authToken).toBeNull();
      });
    });
  });
});

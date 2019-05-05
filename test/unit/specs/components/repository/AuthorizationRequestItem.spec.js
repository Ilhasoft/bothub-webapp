/* eslint-disable import/first */
jest.mock('@/api/request');

import Buefy from 'buefy';
import BH from 'bh';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import store from '@/store';
import AuthorizationRequestItem from '@/components/repository/AuthorizationRequestItem';


const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(Vuex);
localVue.use(BH);

describe('AuthorizationRequestItem.vue', () => {
  let wrapper;
  const mountComponent = (options = {}) => shallowMount(AuthorizationRequestItem, {
    localVue,
    store,
    propsData: {
      id: 1,
      user__nickname: 'fake',
      text: 'I can contribute',
    },
    ...options,
  });
  beforeEach(() => {
    store.replaceState({
      Auth: {
        token: '1f5e7e21d331536b58448595f69eb50a6b5e49b8',
      },
      User: {
        profiles: {},
      },
    });
    wrapper = mountComponent();
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  describe('approve', () => {
    test('deleted emitted', async () => {
      wrapper.setMethods({
        approveRequestAuthorization() {
          return new Promise((resolve) => {
            resolve();
          });
        },
      });
      Promise.resolve(wrapper.vm.approve());
      await localVue.nextTick();
      expect(wrapper.emitted('deleted')).toBeDefined();
    });
  });

  describe('reject', () => {
    test('deleted emitted', async () => {
      wrapper = mountComponent({
        mocks: {
          $dialog: {
            confirm(options) {
              Promise.resolve(options.onConfirm());
            },
          },
        },
      });
      wrapper.setMethods({
        rejectRequestAuthorization() {
          return new Promise((resolve) => {
            resolve();
          });
        },
      });
      Promise.resolve(wrapper.vm.reject());
      await localVue.nextTick();
      expect(wrapper.emitted('deleted')).toBeDefined();
    });
  });
});

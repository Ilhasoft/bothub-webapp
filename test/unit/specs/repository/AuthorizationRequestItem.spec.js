/* eslint-disable import/first */
jest.mock('@/api/request');

import Buefy from 'buefy';
import Vuex from 'vuex';

import { shallow, createLocalVue } from '@vue/test-utils';
import AuthorizationRequestItem from '@/components/repository/AuthorizationRequestItem';

import store from '@/store';


const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(Vuex);

describe('RepositoryAvatar.vue', () => {
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
    wrapper = shallow(AuthorizationRequestItem, {
      localVue,
      store,
      propsData: {
        id: 1,
        user__nickname: 'fake',
        text: 'I can contribute',
      },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  describe('approve', () => {
    beforeEach(async () => {
      const approveBtn = wrapper.find({ ref: 'approveBtn' });
      approveBtn.trigger('click');
      await localVue.nextTick();
    });

    test('deleted emitted', () => {
      expect(wrapper.emitted('deleted')).toBeDefined();
    });
  });

  describe('reject', () => {
    beforeEach(async () => {
      const rejectBtn = wrapper.find({ ref: 'rejectBtn' });
      rejectBtn.trigger('click');
      await localVue.nextTick();
      wrapper.vm.rejectDialog.confirm();
      await wrapper.vm.rejectDialog;
    });

    test('deleted emitted', () => {
      expect(wrapper.emitted('deleted')).toBeDefined();
    });
  });
});

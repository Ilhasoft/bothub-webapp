/* eslint-disable import/first */
jest.mock('@/api/request');

import Vuex from 'vuex';
import { shallow, createLocalVue } from '@vue/test-utils';

import store from '@/store';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ResetPasswordForm.vue', () => {
  describe('valid', () => {
    const wrapper = shallow(
      ResetPasswordForm,
      {
        store,
        localVue,
        propsData: {
          nickname: 'fake',
          token: 'token1',
        },
      });
    wrapper.vm.data.password = 'n123456';

    it('response', async () => {
      const response = await wrapper.vm.onSubmit();
      expect(response).toBeTruthy();
    });
  });

  describe('invalid', () => {
    const wrapper = shallow(
      ResetPasswordForm,
      {
        store,
        localVue,
        propsData: {
          nickname: 'fake',
          token: 'invalid_token',
        },
      });
    wrapper.vm.data.password = 'n123456';

    it('response', async () => {
      const response = await wrapper.vm.onSubmit();
      expect(response).toBeFalsy();
    });
  });
});

/* eslint-disable import/first */
jest.mock('@/api/request');

import Vuex from 'vuex';
import { shallow, createLocalVue } from '@vue/test-utils';

import store from '@/store';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ResetPasswordForm.vue', () => {
  describe('submit form', () => {
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

      it('return true', async () => {
        const response = await wrapper.vm.onSubmit();
        expect(response).toBeTruthy();
      });
    });

    describe('invalid token', () => {
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

      it('return false', async () => {
        const response = await wrapper.vm.onSubmit();
        expect(response).toBeFalsy();
      });

      it('show error', async () => {
        await wrapper.vm.onSubmit();
        expect(wrapper.vm.msgs.filter(msg => (msg.class === 'error')).length).toBe(1);
      });
    });

    describe('invalid password', () => {
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
      wrapper.vm.data.password = '';

      it('return false', async () => {
        const response = await wrapper.vm.onSubmit();
        expect(response).toBeFalsy();
      });

      describe('clean field errors', () => {
        it('before clean: has errors', async () => {
          await wrapper.vm.onSubmit();
          expect(wrapper.vm.errors.password.length).toBeGreaterThanOrEqual(1);
        });

        it('after clean: no errors', async () => {
          await wrapper.vm.onSubmit();
          wrapper.vm.cleanFieldErrors('password');
          expect(wrapper.vm.errors.password.length).toBe(0);
        });
      });
    });
  });
});

/* eslint-disable import/first */
jest.mock('@/api/request');

import Vuex from 'vuex';
import Buefy from 'buefy';
import { shallow, createLocalVue } from '@vue/test-utils';

import store from '@/store';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Buefy);

describe('ForgotPasswordForm.vue', () => {
  describe('submit form', () => {
    describe('valid email', () => {
      let wrapper;
      beforeEach(() => {
        store.replaceState({
          Auth: {},
        });
        wrapper = shallow(ForgotPasswordForm, { store, localVue });
        wrapper.vm.data.email = 'fake@user.com';
      });

      test('return true', async () => {
        const r = await wrapper.vm.onSubmit();
        expect(r).toBeTruthy();
      });

      test('success msg', async () => {
        await wrapper.vm.onSubmit();
        expect(wrapper.vm.success_msgs.filter(msg => (msg.class === 'success')).length).toBe(1);
      });
    });

    describe('invalid email', () => {
      let wrapper;
      beforeEach(() => {
        store.replaceState({
          Auth: {},
        });
        wrapper = shallow(ForgotPasswordForm, { store, localVue });
        wrapper.vm.data.email = 'no@user.com';
      });

      test('return false', async () => {
        const r = await wrapper.vm.onSubmit();
        expect(r).toBeFalsy();
      });
    });
  });
});

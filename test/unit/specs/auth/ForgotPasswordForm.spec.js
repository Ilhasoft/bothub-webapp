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
      const wrapper = shallow(ForgotPasswordForm, { store, localVue });
      wrapper.vm.data.email = 'fake@user.com';
      it('return true', async () => {
        const r = await wrapper.vm.onSubmit();
        expect(r).toBeTruthy();
      });

      it('success msg', async () => {
        await wrapper.vm.onSubmit();
        expect(wrapper.vm.msgs.filter(msg => (msg.class === 'success')).length).toBe(1);
      });
    });

    describe('invalid email', () => {
      const wrapper = shallow(ForgotPasswordForm, { store, localVue });
      wrapper.vm.data.email = 'no@user.com';
      it('return false', async () => {
        const r = await wrapper.vm.onSubmit();
        expect(r).toBeFalsy();
      });

      describe('clean field errors', () => {
        it('before clean: has errors', async () => {
          await wrapper.vm.onSubmit();
          expect(wrapper.vm.errors.email.length).toBeGreaterThanOrEqual(1);
        });

        it('after clean: no errors', async () => {
          await wrapper.vm.onSubmit();
          wrapper.vm.cleanFieldErrors('email');
          expect(wrapper.vm.errors.email).toBeNull();
        });
      });
    });
  });
});

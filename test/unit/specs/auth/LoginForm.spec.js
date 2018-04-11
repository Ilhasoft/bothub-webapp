/* eslint-disable import/first */
jest.mock('@/api/request');

import Vuex from 'vuex';
import Buefy from 'buefy';
import { shallow, createLocalVue } from '@vue/test-utils';

import store from '@/store';
import LoginForm from '@/components/auth/LoginForm';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Buefy);

const getWrapper = () => {
  store.replaceState({ Auth: {} });
  return shallow(LoginForm, { store, localVue });
};

describe('LoginForm.vue', () => {
  describe('do login', () => {
    it('valid login', async (done) => {
      const wrapper = getWrapper();
      wrapper.vm.data.username = 'fake@user.com';
      wrapper.vm.data.password = '123456';
      await wrapper.vm.onSubmit();
      expect(wrapper.vm.$store.getters.authenticated)
        .toBeTruthy();
      done();
    });

    it('invalid login', async (done) => {
      const wrapper = getWrapper();
      wrapper.vm.data.username = 'fake@user.com';
      wrapper.vm.data.password = '123';
      await wrapper.vm.onSubmit();
      expect(wrapper.vm.$store.getters.authenticated)
        .toBeFalsy();
      done();
    });
  });

  describe('fields', () => {
    it('clean errors', () => {
      const wrapper = getWrapper();
      const field = 'username';
      wrapper.vm.cleanFieldErrors(field);
      expect(wrapper.vm.errors[field])
        .toBeNull();
    });
  });

  describe('emit events', () => {
    it('forgotPasswordClick', () => {
      const wrapper = getWrapper();
      const fp = wrapper.find({ ref: 'forgotPassword' });
      fp.trigger('click');
      expect(wrapper.emitted('forgotPasswordClick').length)
        .toBeGreaterThan(0);
    });
  });
});

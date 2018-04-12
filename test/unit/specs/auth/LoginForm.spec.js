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

describe('LoginForm.vue', () => {
  describe('do login', () => {
    describe('valid login', () => {
      let wrapper;
      beforeEach(() => {
        store.replaceState({
          User: {},
          Auth: {},
        });
        wrapper = shallow(LoginForm, { store, localVue });
        wrapper.vm.data.username = 'fake@user.com';
        wrapper.vm.data.password = '123456';
      });

      test('authenticated', async (done) => {
        await wrapper.vm.onSubmit();
        expect(wrapper.vm.$store.getters.authenticated)
          .toBeTruthy();
        done();
      });

      test('emit event', async (done) => {
        await wrapper.vm.onSubmit();
        expect(wrapper.emitted('authenticated').length)
          .toBe(1);
        done();
      });
    });

    describe('invalid login', () => {
      let wrapper;
      beforeEach(() => {
        store.replaceState({ Auth: {} });
        wrapper = shallow(LoginForm, { store, localVue });
        wrapper.vm.data.username = 'fake@user.com';
        wrapper.vm.data.password = '123';
      });

      test('not authenticated', async (done) => {
        await wrapper.vm.onSubmit();
        expect(wrapper.vm.$store.getters.authenticated)
          .toBeFalsy();
        done();
      });
    });
  });

  describe('fields', () => {
    describe('clean username errors', () => {
      let wrapper;
      beforeEach(() => {
        store.replaceState({});
        wrapper = shallow(LoginForm, { store, localVue });
        wrapper.vm.errors = { username: ['error'] };
      });

      test('errors to be null', () => {
        const field = 'username';
        wrapper.vm.cleanFieldErrors(field);
        expect(wrapper.vm.errors[field])
          .toBeNull();
      });
    });
  });

  describe('emit events', () => {
    describe('forgotPasswordClick', () => {
      let wrapper;
      beforeEach(() => {
        store.replaceState({});
        wrapper = shallow(LoginForm, { store, localVue });
      });

      test('emit when click on forgot password link', () => {
        const fp = wrapper.find({ ref: 'forgotPassword' });
        fp.trigger('click');
        expect(wrapper.emitted('forgotPasswordClick').length)
          .toBeGreaterThan(0);
      });
    });
  });
});

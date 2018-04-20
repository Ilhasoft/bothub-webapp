/* eslint-disable import/first */
jest.mock('@/api/request');

import Vuex from 'vuex';
import Buefy from 'buefy';
import { shallow, createLocalVue } from '@vue/test-utils';

import store from '@/store';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Buefy);

describe('ResetPasswordForm.vue', () => {
  describe('submit form', () => {
    describe('valid', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = shallow(
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
      });

      test('return true', async () => {
        const response = await wrapper.vm.onSubmit();
        expect(response).toBeTruthy();
      });

      test('show success msg', async () => {
        await wrapper.vm.onSubmit();
        expect(wrapper.vm.msgs.filter(msg => (msg.class === 'success')).length).toBe(1);
      });

      test('emitted reseted', async () => {
        await wrapper.vm.onSubmit();
        expect(wrapper.emitted('reseted').length).toBe(1);
      });
    });

    describe('invalid token', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = shallow(
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
      });

      test('return false', async () => {
        const response = await wrapper.vm.onSubmit();
        expect(response).toBeFalsy();
      });

      test('show error', async () => {
        await wrapper.vm.onSubmit();
        expect(wrapper.vm.msgs.filter(msg => (msg.class === 'error')).length).toBe(1);
      });
    });

    describe('invalid password', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = shallow(
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
      });

      test('return false', async () => {
        const response = await wrapper.vm.onSubmit();
        expect(response).toBeFalsy();
      });
    });
  });
});

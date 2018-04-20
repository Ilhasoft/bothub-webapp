/* eslint-disable import/first */
jest.mock('@/api/request');

import Vuex from 'vuex';
import Buefy from 'buefy';
import { shallow, createLocalVue } from '@vue/test-utils';

import store from '@/store';
import RegisterForm from '@/components/auth/RegisterForm';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Buefy);

describe('RegisterForm.spec.js', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(RegisterForm, { store, localVue });
  });

  describe('register', () => {
    describe('valid', () => {
      beforeEach(() => {
        wrapper.vm.data.email = 'new@user.com';
        wrapper.vm.data.name = 'New';
        wrapper.vm.data.nickname = 'new';
        wrapper.vm.data.password = 'n123456';
      });

      test('return true', async (done) => {
        const r = await wrapper.vm.onSubmit();
        expect(r).toBeTruthy();
        done();
      });

      test('emit registered event', async (done) => {
        await wrapper.vm.onSubmit();
        expect(wrapper.emitted('registered').length)
          .toBe(1);
        done();
      });
    });

    describe('invalid: user with email exists', () => {
      beforeEach(() => {
        wrapper.vm.data.email = 'fake@user.com';
        wrapper.vm.data.name = 'Fake';
        wrapper.vm.data.nickname = 'fake';
        wrapper.vm.data.password = '123456';
      });

      test('return false', async (done) => {
        const r = await wrapper.vm.onSubmit();
        expect(r).toBeFalsy();
        done();
      });

      test('print error', async (done) => {
        await wrapper.vm.onSubmit();
        expect(wrapper.vm.errors.email.length).toBe(1);
        done();
      });
    });
  });
});

/* eslint-disable import/first */
jest.mock('@/api/request');

import store from '@/store';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import LoginForm from '@/components/auth/LoginForm';


const localVue = createLocalVue();

describe('LoginForm.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      Auth: { token: null },
      User: {},
    });
    wrapper = shallowMount(LoginForm, { store, localVue });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('fill form with valid data', () => {
    beforeEach(() => {
      wrapper.vm.data.username = 'fake@user.com';
      wrapper.vm.data.password = '123456';
    });

    describe('submit', () => {
      let r;
      beforeEach(async () => {
        r = await wrapper.vm.onSubmit();
      });

      test('return true', () => {
        expect(r).toBeTruthy();
      });

      test('user is authenticated', () => {
        expect(wrapper.vm.$store.getters.authenticated)
          .toBeTruthy();
      });

      test('emit authenticated event', () => {
        expect(wrapper.emitted('authenticated')).toBeDefined();
      });
    });
  });

  describe('fill form with invalid data', () => {
    beforeEach(() => {
      wrapper.vm.data.username = 'fake@user.com';
      wrapper.vm.data.password = '123';
    });

    describe('submit', () => {
      let r;
      beforeEach(async () => {
        r = await wrapper.vm.onSubmit();
      });

      test('return false', () => {
        expect(r).toBeFalsy();
      });

      test('user is not authenticated', () => {
        expect(wrapper.vm.$store.getters.authenticated).toBeFalsy();
      });
    });
  });

  describe('click on forgot password button', () => {
    beforeEach(() => {
      const forgotPassword = wrapper.find({ ref: 'forgotPassword' });
      forgotPassword.trigger('click');
    });

    test('emit forgotPasswordClick event', () => {
      expect(wrapper.emitted('forgotPasswordClick')).toBeDefined();
    });
  });
});

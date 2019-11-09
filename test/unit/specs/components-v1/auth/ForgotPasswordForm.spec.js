/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallowMount, createLocalVue } from '@vue/test-utils';

import store from '@/store';
import ForgotPasswordForm from '@/components-v1/auth/ForgotPasswordForm';


const localVue = createLocalVue();

describe('ForgotPasswordForm.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      Auth: {},
    });
    wrapper = shallowMount(ForgotPasswordForm, { store, localVue });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('fill email with valid data', () => {
    beforeEach(() => {
      wrapper.vm.data.email = 'fake@user.com';
    });

    describe('submit form', () => {
      // let r;
      beforeEach(async () => {
        // r = await wrapper.vm.onSubmit();
        await wrapper.vm.onSubmit();
      });

      // test('return is true', () => {
      //   expect(r).toBeTruthy();
      // });

      // test('success msg', () => {
      //   expect(wrapper.vm.success_msgs.filter(msg => (msg.class === 'success')).length).toBe(1);
      // });
    });
  });

  describe('fill email with invalid data', () => {
    beforeEach(() => {
      wrapper.vm.data.email = 'no@user.com';
    });

    describe('submit form', () => {
      let r;
      beforeEach(async () => {
        r = await wrapper.vm.onSubmit();
      });

      test('return is false', () => {
        expect(r).toBeFalsy();
      });
    });
  });
});

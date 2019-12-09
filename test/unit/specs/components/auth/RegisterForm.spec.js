/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import store from '@/store';
import RegisterForm from '@/components/auth/RegisterForm';


const localVue = createLocalVue();

describe('RegisterForm.spec.js', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(RegisterForm, { store, localVue });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('fill form with valid data', () => {
    beforeEach(() => {
      wrapper.vm.data.email = 'new@user.com';
      wrapper.vm.data.name = 'New';
      wrapper.vm.data.nickname = 'new';
      wrapper.vm.data.password = 'n123456';
    });

    // describe('submit form', () => {
    //   let r;
    //   beforeEach(async () => {
    //     r = await wrapper.vm.onSubmit();
    //   });

    //   test('return true', () => {
    //     expect(r).toBeTruthy();
    //   });

    //   test('emit registered event', () => {
    //     expect(wrapper.emitted('registered')).toBeDefined();
    //   });
    // });
  });
});

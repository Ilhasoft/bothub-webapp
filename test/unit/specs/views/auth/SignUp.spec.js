/* eslint-disable import/first */
jest.mock('@/api/request');

import store from '@/store';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import BH from 'bh';
import SignUp from '@/views/auth/SignUp';
import router from '@/router';


const localVue = createLocalVue();
localVue.use(BH);

describe('LoginForm.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      Auth: { token: null },
      User: {},
    });
    wrapper = shallowMount(SignUp, {
      store,
      mocks: {
        $t: () => 'some specific text',
      },
      localVue,
      router,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  // describe('fill form with valid data', () => {
  //   beforeEach(() => {
  //     wrapper.vm.data.email = 'new@user.com';
  //     wrapper.vm.data.name = 'New';
  //     wrapper.vm.data.nickname = 'new';
  //     wrapper.vm.data.password = 'n123456';
  //   });

  //   describe('submit form', () => {
  //     let r;
  //     beforeEach(async () => {
  //       r = await wrapper.vm.onSubmit();
  //     });

  //     test('return true', () => {
  //       expect(r).toBeTruthy();
  //     });
  //   });
  // });

  // describe('fill login after register', () => {
  //   beforeEach(() => {
  //     wrapper.vm.data.email = 'fake@user.com';
  //     wrapper.vm.data.password = '123456';
  //   });

  //   describe('test login method', () => {
  //     let r;
  //     beforeEach(async () => {
  //       r = await wrapper.vm.loginUser();
  //     });

  //     test('return true', () => {
  //       expect(r).toBeTruthy();
  //     });

  //     test('user is authenticated', () => {
  //       expect(wrapper.vm.$store.getters.authenticated).toBeTruthy();
  //     });

  //     test('path is "/home" after user registered and logged successfully', () => {
  //       expect(router.history.current.path).toBe('/home');
  //     });

  //     test('emit authenticated event', () => {
  //       expect(wrapper.emitted('authenticated')).toBeDefined();
  //     });
  //   });
  // });
});

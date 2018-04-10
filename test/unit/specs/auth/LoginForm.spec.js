/* eslint-disable import/first */
jest.mock('@/api/request');

import Vuex from 'vuex';
import { shallow, createLocalVue } from '@vue/test-utils';

import store from '@/store';
import LoginForm from '@/components/auth/LoginForm';

const localVue = createLocalVue();
localVue.use(Vuex);

const getWrapper = () => {
  store.replaceState({ Auth: {} });
  return shallow(LoginForm, { store, localVue });
};

describe('LoginForm.vue', () => {
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

  it('clean field errors', () => {
    const wrapper = getWrapper();
    const field = 'username';
    wrapper.vm.cleanFieldErrors(field);
    expect(wrapper.vm.errors[field])
      .toHaveLength(0);
  });
});

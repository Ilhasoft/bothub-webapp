/* eslint-disable import/first */
jest.mock('@/api/request');

import Vuex from 'vuex';
import { shallow, createLocalVue } from '@vue/test-utils';

import store from '@/store';
import AuthStatus from '@/components/auth/AuthStatus';

const localVue = createLocalVue();
localVue.use(Vuex);


describe('AuthStatus.vue', () => {
  it('not authenticated', () => {
    const wrapper = shallow(AuthStatus, { store, localVue });
    const span = wrapper.find('span');
    expect(span.element.textContent).toBe('You not authenticated');
  });
  it('authenticated', async () => {
    await store.dispatch('login', {
      username: 'fake@user.com',
      password: '123456',
    });
    const wrapper = shallow(AuthStatus, { store, localVue });
    const span = wrapper.find('span');
    expect(span.element.textContent).toBe('You are authenticated');
  });
});

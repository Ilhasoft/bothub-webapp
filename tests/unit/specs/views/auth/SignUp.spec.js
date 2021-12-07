/* eslint-disable import/first */
jest.mock('@/api/request');

import store from '@/store';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import SignUp from '@/views/auth/SignUp';
import router from '@/router';
import Buefy from 'buefy';


const localVue = createLocalVue();
localVue.use(Buefy);


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
});

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

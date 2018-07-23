/* eslint-disable import/first */
jest.mock('@/api/request');

import Vuex from 'vuex';
import { shallow, createLocalVue } from '@vue/test-utils';

import store from '@/store';
import TYPES from '@/store/types';

import ChangePasswordForm from '@/components/user/ChangePasswordForm';


const localVue = createLocalVue();
localVue.use(Vuex);

describe('ChangePasswordForm.spec.js', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(ChangePasswordForm, {
      store,
      localVue,
    });
    store.commit(TYPES.SET_TOKEN, '1f5e7e21d331536b58448595f69eb50a6b5e49b8');
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  test('has formSchema', () => {
    expect(wrapper.vm.formSchema).toBeDefined();
  });

  describe('fill with valid data', () => {
    beforeEach(() => {
      wrapper.vm.data = {
        current_password: 'n123456',
        password: 'd123456',
      };
    });

    test('has data', () => {
      expect(Object.keys(wrapper.vm.data)).toEqual(
        expect.arrayContaining([
          'current_password',
          'password',
        ]),
      );
    });

    describe('submit', () => {
      let r;
      beforeEach(async () => {
        r = await wrapper.vm.onSubmit();
      });

      test('no errors', () => {
        expect(Object.keys(wrapper.vm.errors)).toHaveLength(0);
      });

      test('return true', () => {
        expect(r).toBeTruthy();
      });

      test('emit edited', () => {
        expect(wrapper.emitted('changed')).toHaveLength(1);
      });
    });
  });

  describe('fill with invalid data', () => {
    beforeEach(() => {
      wrapper.vm.data = {
        current_password: 'n12345',
        password: 'd123456',
      };
    });

    test('has data', () => {
      expect(Object.keys(wrapper.vm.data)).toEqual(
        expect.arrayContaining([
          'current_password',
          'password',
        ]),
      );
    });

    describe('submit', () => {
      let r;
      beforeEach(async () => {
        r = await wrapper.vm.onSubmit();
      });

      test('error on nickname field', () => {
        expect(wrapper.vm.errors.current_password).toBeDefined();
      });

      test('return false', () => {
        expect(r).toBeFalsy();
      });
    });
  });
});

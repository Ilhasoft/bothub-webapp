/* eslint-disable import/first */
jest.mock('@/api/request');

import Vuex from 'vuex';
// import Buefy from 'buefy';
import { shallow, createLocalVue } from '@vue/test-utils';

import store from '@/store';
import TYPES from '@/store/types';

import EditProfileForm from '@/components/user/EditProfileForm';


const localVue = createLocalVue();
localVue.use(Vuex);
// localVue.use(Buefy);

describe('EditProfileForm.spec.js', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(EditProfileForm, {
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
        nickname: 'fake',
        email: 'fake@user.com',
        name: 'New Name',
        locale: '',
      };
    });

    test('has data', () => {
      expect(Object.keys(wrapper.vm.data)).toEqual(
        expect.arrayContaining([
          'nickname',
          'email',
          'name',
          'locale',
        ]));
    });

    describe('submit', () => {
      let r;
      beforeEach(async () => {
        r = await wrapper.vm.onSubmit();
      });

      test('no errors', () => {
        expect(Object.keys(wrapper.vm.errors).length).toBe(0);
      });

      test('return true', () => {
        expect(r).toBeTruthy();
      });
    });
  });

  describe('fill with invalid data', () => {
    beforeEach(() => {
      wrapper.vm.data = {
        nickname: '',
        email: 'fake@user.com',
        name: 'New Name',
        locale: '',
      };
    });

    test('has data', () => {
      expect(Object.keys(wrapper.vm.data)).toEqual(
        expect.arrayContaining([
          'nickname',
          'email',
          'name',
          'locale',
        ]));
    });

    describe('submit', () => {
      let r;
      beforeEach(async () => {
        r = await wrapper.vm.onSubmit();
      });

      test('error on nickname field', () => {
        expect(wrapper.vm.errors.nickname).toBeDefined();
      });

      test('return false', () => {
        expect(r).toBeFalsy();
      });
    });
  });
});

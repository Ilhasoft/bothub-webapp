/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import store from '@/store';
import EditProfileForm from '@/components-v1/user/EditProfileForm';


const localVue = createLocalVue();

describe('EditProfileForm.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      Auth: {
        token: '1f5e7e21d331536b58448595f69eb50a6b5e49b8',
      },
      User: {
        profiles: {},
      },
    });
    wrapper = shallowMount(EditProfileForm, {
      store,
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('has formSchema', () => {
    expect(wrapper.vm.formSchema).toBeDefined();
  });

  describe('fill with valid data', () => {
    beforeEach(() => {
      wrapper.setData({
        data: {
          nickname: 'fake',
          email: 'fake@user.com',
          name: 'New Name',
          locale: '',
        },
      });
    });

    test('has data', () => {
      expect(Object.keys(wrapper.vm.data)).toEqual(
        expect.arrayContaining([
          'nickname',
          'email',
          'name',
          'locale',
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
        expect(wrapper.emitted('edited')).toHaveLength(1);
      });
    });
  });

  describe('fill with invalid data', () => {
    beforeEach(() => {
      wrapper.setData({
        data: {
          nickname: '',
          email: 'fake@user.com',
          name: 'New Name',
          locale: '',
        },
      });
    });

    test('has data', () => {
      expect(Object.keys(wrapper.vm.data)).toEqual(
        expect.arrayContaining([
          'nickname',
          'email',
          'name',
          'locale',
        ]),
      );
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

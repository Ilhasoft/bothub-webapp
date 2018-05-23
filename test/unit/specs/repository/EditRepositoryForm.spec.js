/* eslint-disable import/first */
jest.mock('@/api/request');

import Vuex from 'vuex';
import { shallow, createLocalVue } from '@vue/test-utils';

import store from '@/store';
import TYPES from '@/store/types';
import EditRepositoryForm from '@/components/repository/EditRepositoryForm';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('EditRepositoryForm.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      Auth: {},
    });
    store.commit(TYPES.SET_TOKEN, '1f5e7e21d331536b58448595f69eb50a6b5e49b8');
    wrapper = shallow(EditRepositoryForm, {
      localVue,
      store,
      propsData: {
        ownerNickname: 'fake',
        slug: 'repo1',
      },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  describe('valid data', () => {
    beforeEach(() => {
      wrapper.vm.data = {
        name: 'Repository',
        slug: 'repo1',
        language: 'en',
        categories: [1],
        description: 'New description',
        is_private: false,
      };
    });

    describe('on submit', () => {
      let r;
      beforeEach(async () => {
        r = await wrapper.vm.onSubmit();
      });

      test('return true', () => {
        expect(r).toBeTruthy();
      });

      test('no errors', () => {
        expect(wrapper.vm.errors).toMatchObject({});
      });

      test('emit edited', () => {
        expect(wrapper.emitted('edited')).toBeDefined();
      });
    });
  });

  describe('invalid data', () => {
    beforeEach(() => {
      wrapper.vm.data = {
        name: 'Repository',
        slug: 'repo1',
        language: 'en',
        categories: [],
        description: 'New description',
        is_private: false,
      };
    });

    describe('on submit', () => {
      beforeEach(() => {
        wrapper.find('form').trigger('submit');
      });

      test('show categories error', () => {
        expect(wrapper.vm.errors.categories).toBeDefined();
      });

      test('not emit edited', () => {
        expect(wrapper.emitted('edited')).toBeUndefined();
      });
    });
  });
});

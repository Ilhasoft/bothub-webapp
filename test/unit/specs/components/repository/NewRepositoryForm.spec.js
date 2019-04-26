/* eslint-disable import/first */
jest.mock('@/api/request');

import Buefy from 'buefy';
import BH from 'bh';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import store from '@/store';
import NewRepositoryForm from '@/components/repository/NewRepositoryForm';

const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(BH);

describe('NewRepositoryForm.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      Auth: {},
      Repository: {},
    });
    wrapper = shallowMount(NewRepositoryForm, { localVue, store });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  describe('valid data', () => {
    beforeEach(() => {
      wrapper.vm.data = {
        name: 'Repository One',
        slug: 'repository1',
        language: 'en',
        categories: [1],
        description: '',
        is_private: true,
        use_language_model_featurizer: true,
        use_competing_intents: false,
      };
    });

    describe('on submit', () => {
      beforeEach(() => {
        wrapper.find('form').trigger('submit');
      });

      test('no errors', () => {
        expect(wrapper.vm.errors).toMatchObject({});
      });

      // test('emit created', () => {
      // > Find a way to get model definition with unit test
      //   expect(wrapper.emitted('created')).toBeDefined();
      // });
    });
  });

  describe('invalid data', () => {
    beforeEach(() => {
      wrapper.vm.data = {
        name: 'Repository',
        slug: 'repository1',
        language: 'en',
        categories: [],
        description: '',
        is_private: false,
        use_language_model_featurizer: false,
        use_competing_intents: false,
      };
    });

    describe('on submit', () => {
      beforeEach(() => {
        wrapper.find('form').trigger('submit');
      });

      test('emit created', () => {
        expect(wrapper.emitted('created')).toBeUndefined();
      });
    });
  });
});

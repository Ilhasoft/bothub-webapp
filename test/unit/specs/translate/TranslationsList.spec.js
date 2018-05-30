/* eslint-disable import/first */
jest.mock('@/api/request');

import Vuex from 'vuex';
import { shallow, createLocalVue } from '@vue/test-utils';
import TranslationsList from '@/components/translate/TranslationsList';
import applyFilters from '@/utils/filters';
import store from '@/store';

const localVue = createLocalVue();
localVue.use(Vuex);
applyFilters(localVue);

describe('TranslationsList.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(TranslationsList, {
      localVue,
      store,
      propsData: {
        repository: {
          uuid: '8511fd26-a3bc-4f74-9af1-176abca5401d',
        },
      },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  describe('update translations', () => {
    beforeEach(async () => {
      await wrapper.vm.updateTranslations();
      await wrapper.vm.translationsList.next();
    });

    test('has translations list', () => {
      expect(wrapper.vm.translationsList).not.toBe(null);
    });

    test('translationsList has one items', () => {
      expect(wrapper.vm.translationsList.items).toHaveLength(1);
    });
  });

  describe('set toLanguage prop', () => {
    beforeEach(async () => {
      wrapper.setProps({ toLanguage: 'pt' });
      await localVue.nextTick();
    });

    test('translationsList has zero items', () => {
      expect(wrapper.vm.translationsList.items).toHaveLength(0);
    });
  });
});

/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import applyFilters from '@/utils/filters';
import store from '@/store';
import TranslationsList from '@/components/translate/TranslationsList';


const localVue = createLocalVue();
applyFilters(localVue);

describe('TranslationsList.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(TranslationsList, {
      localVue,
      store,
      mocks: {
        $t: () => 'some specific text',
      },
      propsData: {
        repository: {
          uuid: '8511fd26-a3bc-4f74-9af1-176abca5401d',
        },
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  // describe('update translations', () => {
  //   beforeEach(async () => {
  //     await wrapper.vm.updateTranslations();
  //     await wrapper.vm.translationsList.next();
  //   });

  //   test('has translations list', () => {
  //     expect(wrapper.vm.translationsList).not.toBe(null);
  //   });

  //   test('translationsList has one items', () => {
  //     expect(wrapper.vm.translationsList.items).toHaveLength(1);
  //   });
  // });

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

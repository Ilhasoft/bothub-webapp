/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import TranslationsStatus from '@/components/translate/NewTranslationsStatus';
import applyFilters from '@/utils/filters';

import store from '@/store';

const localVue = createLocalVue();
applyFilters(localVue);

describe('TranslationsStatus.vue', () => {
  let wrapper;
  beforeEach(async () => {
    wrapper = shallowMount(TranslationsStatus, {
      localVue,
      store,
      mocks: {
        $t: () => 'some specific text',
      },
      propsData: {
        ownerNickname: 'douglas',
        repositorySlug: 'repo1',
      },
    });
    await wrapper.vm.updateTranslationsStatus();
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  // describe('click on DE status', () => {
  //   beforeEach(() => {
  //     // const statusDe = wrapper.find({ ref: 'status-de' });
  //     // statusDe.trigger('click');
  //   });

  //   test('emit input', () => {
  //     expect(wrapper.vm.filteredLanguagesStatus).toBe('de');
  //   });
  // });

  describe('update ownerNickname and repositorySlug to invalid repository', () => {
    beforeEach(async () => {
      wrapper.setProps({
        ownerNickname: 'fake',
        repositorySlug: 'repo2',
      });
      await wrapper.vm.updateTranslationsStatus();
    });

    test('empty filteredLanguagesStatus', () => {
      expect(wrapper.vm.filteredLanguagesStatus).toHaveLength(0);
    });
  });
});

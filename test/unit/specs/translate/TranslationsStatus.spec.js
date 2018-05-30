/* eslint-disable import/first */
jest.mock('@/api/request');

import Vuex from 'vuex';
import { shallow, createLocalVue } from '@vue/test-utils';
import TranslationsStatus from '@/components/translate/TranslationsStatus';
import applyFilters from '@/utils/filters';

import store from '@/store';

const localVue = createLocalVue();
localVue.use(Vuex);
applyFilters(localVue);

describe('TranslationsStatus.vue', () => {
  let wrapper;
  beforeEach(async () => {
    wrapper = shallow(TranslationsStatus, {
      localVue,
      store,
      propsData: {
        ownerNickname: 'douglas',
        repositorySlug: 'repo1',
      },
    });
    await wrapper.vm.updateTranslationsStatus();
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  describe('click on DE status', () => {
    beforeEach(() => {
      const statusDe = wrapper.find({ ref: 'status-de' });
      statusDe.trigger('click');
    });

    test('emit input', () => {
      const event = wrapper.emitted('input')[0];
      expect(event[0]).toBe('de');
    });
  });

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

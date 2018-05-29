/* eslint-disable import/first */
jest.mock('@/api/request');

import Vuex from 'vuex';
import VueMoment from 'vue-moment';
import Buefy from 'buefy';
import { shallow, createLocalVue } from '@vue/test-utils';
import TranslationItem from '@/components/translate/TranslationItem';
import applyFilters from '@/utils/filters';
import store from '@/store';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueMoment);
localVue.use(Buefy);
applyFilters(localVue);

describe('TranslationItem.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(TranslationItem, {
      localVue,
      store,
      propsData: {
        id: 1,
        original_example: 1,
        text: 'oi',
        entities: [],
        from_language: 'en',
        language: 'pt',
        created_at: '2018-05-29T13:37:53.853592Z',
      },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  describe('click to show original', () => {
    beforeEach(async () => {
      const showOriginal = wrapper.find({ ref: 'showOriginal' });
      showOriginal.trigger('click');
      await localVue.nextTick();
    });

    test('has original data', () => {
      expect(wrapper.vm.original).not.toBe(null);
    });

    test('showing original', () => {
      expect(wrapper.vm.showingOriginal).toBe(true);
    });
  });

  describe('delete', () => {
    beforeEach(async () => {
      const deletePromise = wrapper.vm.deleteThisTranslation();
      await localVue.nextTick();
      wrapper.vm.deleteDialog.confirm();
      await deletePromise;
    });

    test('emit deleted', () => {
      expect(wrapper.emitted('deleted')).toHaveLength(1);
    });
  });
});

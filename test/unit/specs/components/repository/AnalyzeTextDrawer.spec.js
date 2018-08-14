/* eslint-disable import/first */
jest.mock('@/api/request');

import Buefy from 'buefy';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import store from '@/store';
import applyFilters from '@/utils/filters';
import AnalyzeTextDrawer from '@/components/repository/AnalyzeTextDrawer';

const localVue = createLocalVue();
localVue.use(Buefy);
applyFilters(localVue);


describe('AnalyzeTextDrawer.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      Auth: {},
    });

    wrapper = shallowMount(AnalyzeTextDrawer, {
      localVue,
      propsData: {
        ownerNickname: 'douglas',
        slug: 'repo1',
        availableLanguages: ['en'],
      },
      store,
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  describe('fill valid data', () => {
    beforeEach(() => {
      wrapper.vm.data = {
        language: 'en',
        text: 'My name is Douglas',
        availableLanguages: ['en','pt']
      };
    });

    test('check data', () => {
      expect(wrapper.vm.data.language).toBe('en');
      expect(wrapper.vm.data.text).toBe('My name is Douglas');
      expect(wrapper.vm.data.availableLanguages).toEqual(['en','pt']);
    });

    describe('submit', () => {
      let r;
      beforeEach(async () => {
        r = await wrapper.vm.onSubmit();
      });

      test('return be true', () => {
        expect(r).toBeTruthy();
      });
    });
  });

  describe('fill invalid data', () => {
    beforeEach(() => {
      wrapper.vm.data = {
        language: 'en',
        text: '',
      };
    });

    test('check data', () => {
      expect(wrapper.vm.data.language).toBe('en');
      expect(wrapper.vm.data.text).toBe('');
    });

    describe('submit', () => {
      let r;
      beforeEach(async () => {
        r = await wrapper.vm.onSubmit();
      });

      test('return be false', () => {
        expect(r).toBeFalsy();
      });

      test('field errors', () => {
        expect(wrapper.vm.errors).toBeDefined();
        expect(wrapper.vm.errors.text).toBeDefined();
      });
    });
  });
});

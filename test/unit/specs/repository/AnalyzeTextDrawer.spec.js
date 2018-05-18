/* eslint-disable import/first */
jest.mock('@/api/request');

import Vuex from 'vuex';
import Buefy from 'buefy';

import { shallow, createLocalVue } from '@vue/test-utils';
import AnalyzeTextDrawer from '@/components/repository/AnalyzeTextDrawer';

import store from '@/store';
import applyFilters from '@/utils/filters';

const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(Vuex);
applyFilters(localVue);


describe('AnalyzeTextDrawer.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      Auth: {},
    });

    wrapper = shallow(AnalyzeTextDrawer, {
      localVue,
      propsData: {
        ownerNickname: 'douglas',
        slug: 'repo1',
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
      };
    });

    test('check data', () => {
      expect(wrapper.vm.data.language).toBe('en');
      expect(wrapper.vm.data.text).toBe('My name is Douglas');
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

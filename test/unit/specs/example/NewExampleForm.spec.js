/* eslint-disable import/first */
jest.mock('@/api/request');

import Buefy from 'buefy';
import Vuex from 'vuex';
import { shallow, createLocalVue } from '@vue/test-utils';

import store from '@/store';

import NewExampleForm from '@/components/example/NewExampleForm';

const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(Vuex);

describe('NewExampleForm.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      Auth: {},
    });
    wrapper = shallow(NewExampleForm, {
      localVue,
      propsData: {
        repository: '8511fd26-a3bc-4f74-9af1-176abca5401d',
      },
      store,
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  describe('fill with valid data', () => {
    const text = 'my name is douglas';
    beforeEach(() => {
      wrapper.vm.data = {
        text,
        entities: [
          {
            start: 11,
            end: 18,
            entity: 'name',
          },
        ],
        intent: 'greet',
      };
    });

    describe('submit', () => {
      let response;
      beforeEach(async () => {
        response = await wrapper.vm.onSubmit();
        await localVue.nextTick();
      });

      test('return true', () => {
        expect(response).toBeTruthy();
      });

      test('data cleaned', () => {
        expect(wrapper.vm.data.text).toBe('');
        expect(wrapper.vm.data.entities.length).toBe(0);
        expect(wrapper.vm.data.intent).toBe('');
      });

      test('don\'t have errrors', () => {
        expect(Object.keys(wrapper.vm.errors).length).toBe(0);
      });
    });
  });

  describe('fill with invalid data', () => {
    const text = '';
    beforeEach(() => {
      wrapper.vm.data = {
        text,
        entities: [],
        intent: '',
      };
    });

    describe('submit', () => {
      let response;
      beforeEach(async () => {
        response = await wrapper.vm.onSubmit();
        await localVue.nextTick();
      });

      test('return false', () => {
        expect(response).toBeFalsy();
      });

      test('have errrors', () => {
        expect(Object.keys(wrapper.vm.errors).length).toBeGreaterThan(0);
      });
    });
  });
});

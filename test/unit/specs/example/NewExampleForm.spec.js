/* eslint-disable import/first */
jest.mock('@/api/request');

import Buefy from 'buefy';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import store from '@/store';
import NewExampleForm from '@/components/example/NewExampleForm';


const localVue = createLocalVue();
localVue.use(Buefy);

describe('NewExampleForm.vue', () => {
  let wrapper;
  beforeEach(() => {
    store.replaceState({
      Auth: {},
    });
    wrapper = shallowMount(NewExampleForm, {
      localVue,
      propsData: {
        repository: '8511fd26-a3bc-4f74-9af1-176abca5401d',
      },
      store,
    });
  });

  test('mounted', () => {
    expect(wrapper.vm).toBeDefined();
  });

  describe('fill with valid data', () => {
    const text = 'my name is douglas';
    beforeEach(() => {
      wrapper.vm.data = {
        textAndEntities: {
          text,
          entities: [
            {
              start: 11,
              end: 18,
              entity: 'name',
            },
          ],
        },
        intent: 'greet',
      };
    });

    describe('submit', () => {
      let r;
      beforeEach(async () => {
        r = await wrapper.vm.onSubmit();
      });

      test('return true', () => {
        expect(r).toBeTruthy();
      });

      test('data cleaned', () => {
        expect(wrapper.vm.data.text).toBe('');
        expect(wrapper.vm.data.entities).toHaveLength(0);
        expect(wrapper.vm.data.intent).toBe('');
      });

      test('don\'t have errrors', () => {
        expect(Object.keys(wrapper.vm.errors)).toHaveLength(0);
      });

      test('emit created event', () => {
        expect(wrapper.emitted('created')).toBeDefined();
      });
    });
  });

  describe('fill with invalid data', () => {
    const text = '';
    beforeEach(() => {
      wrapper.vm.data = {
        textAndEntities: {
          text,
          entities: [],
        },
        intent: '',
      };
    });

    describe('submit', () => {
      let r;
      beforeEach(async () => {
        r = await wrapper.vm.onSubmit();
      });

      test('return false', () => {
        expect(r).toBeFalsy();
      });

      test('have errrors', () => {
        expect(Object.keys(wrapper.vm.errors)).not.toHaveLength(0);
      });
    });
  });
});

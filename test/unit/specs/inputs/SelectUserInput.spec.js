/* eslint-disable import/first */
jest.mock('@/api/request');

import Buefy from 'buefy';
import Vuex from 'vuex';

import store from '@/store';
import { shallow, createLocalVue } from '@vue/test-utils';
import SelectUserInput from '@/components/inputs/SelectUserInput';
import { wrap } from 'module';

const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(Vuex);

describe('SelectUserInput.vue', () => {
  let wrapper;
  const debounceTime = 50;
  beforeEach(() => {
    wrapper = shallow(SelectUserInput, {
      localVue,
      store,
      propsData: {
        debounceTime,
      },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  describe('fill query', () => {
    beforeEach(async () => {
      wrapper.vm.query = 'd';

      await new Promise((resolve) => {
        setTimeout(resolve, debounceTime + 200);
      });
    });

    test('has data', () => {
      expect(wrapper.vm.data).not.toBeNull();
    });

    describe('select first', () => {
      beforeEach(() => {
        wrapper.vm.onSelected(wrapper.vm.data[0]);
      });

      test('has selected', () => {
        expect(wrapper.vm.selected).not.toBeNull();
      });

      describe('remove selected', () => {
        beforeEach(() => {
          wrapper.vm.removeSelected();
        });

        test('selected is null', () => {
          expect(wrapper.vm.selected).toBeNull();
        });

        test('query is empty', () => {
          expect(wrapper.vm.query).toBe('');
        });
      });
    });
  });
});

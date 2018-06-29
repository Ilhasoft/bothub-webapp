/* eslint-disable import/first */
jest.mock('@/api/request');

import Buefy from 'buefy';
import Vuex from 'vuex';

import store from '@/store';
import { shallow, createLocalVue } from '@vue/test-utils';
import SelectUsersInput from '@/components/inputs/SelectUsersInput';

const localVue = createLocalVue();
localVue.use(Buefy);
localVue.use(Vuex);

describe('SelectUsersInput.vue', () => {
  let wrapper;
  const debounceTime = 50;
  beforeEach(() => {
    wrapper = shallow(SelectUsersInput, {
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

  describe('search', () => {
    let taginput;
    beforeEach(async () => {
      taginput = wrapper.find({ ref: 'taginput' });
      taginput.vm.newTag = 'd';

      await new Promise((resolve) => {
        setTimeout(resolve, debounceTime + 200);
      });
    });

    test('has data', () => {
      expect(wrapper.vm.data).not.toBeNull();
    });

    describe('add first', () => {
      beforeEach(() => {
        taginput.vm.addTag(wrapper.vm.data[0]);
      });

      test('emit input', () => {
        expect(wrapper.emitted('input')).toBeDefined();
      });
    });
  });
});

/* eslint-disable import/first */
jest.mock('@/api/request');

import Vue from 'vue';
import Buefy from 'buefy';
import store from '@/store';
import { mount, createLocalVue } from '@vue/test-utils';
import SelectUsersInput from '@/components/inputs/SelectUsersInput';


Vue.config.silent = true;
const localVue = createLocalVue();
localVue.use(Buefy);

describe('SelectUsersInput.vue', () => {
  let wrapper;
  const debounceTime = 50;
  beforeEach(() => {
    wrapper = mount(SelectUsersInput, {
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
      taginput.setData({ newTag: 'd' });

      await new Promise((resolve) => {
        setTimeout(resolve, debounceTime + 200);
      });
    });

    // test('has data', () => {
    //   expect(wrapper.vm.data).not.toBeNull();
    //   expect(wrapper.vm.data).not.toHaveLength(0);
    // });

    describe('add first', () => {
      beforeEach(() => {
        taginput.vm.addTag(wrapper.vm.data[0]);
      });

      // test('emit input', () => {
      //   expect(wrapper.emitted('input')).toBeDefined();
      // });
    });
  });
});

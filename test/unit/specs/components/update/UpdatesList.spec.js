/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import store from '@/store';
import UpdateList from '@/components/update/UpdatesList';


const localVue = createLocalVue();

describe('UpdateList.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(UpdateList, {
      localVue,
      store,
      propsData: {
        repository: {
          uuid: '8511fd26-a3bc-4f74-9af1-176abca5401d',
        },
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('update updates', () => {
    beforeEach(async () => {
      await wrapper.vm.updateUpdates(true);
    });

    test('has updates list', () => {
      expect(wrapper.vm.updatesList).not.toBe(null);
    });

    test('updates has one items', () => {
      expect(wrapper.vm.updatesList.items).toHaveLength(1);
    });
  });
});

/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import applyFilters from '@/utils/filters';
import PaginatedList from '@/components/shared/PaginatedList';
import utils from '@/api/utils';


const localVue = createLocalVue();
localVue.use(applyFilters);

const Foo = localVue.component('foo', { render: () => ('<div />') });

describe('PaginatedList.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(PaginatedList, {
      localVue,
      propsData: {
        itemComponent: Foo,
        list: new utils.Page('/repository/repositories/', 20),
        perPage: 20,
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('fetch', () => {
    beforeEach(async () => {
      await wrapper.vm.fetch();
    });

    test('has no errors', () => {
      expect(wrapper.vm.error).toBeNull();
    });

    test('has items', () => {
      expect(wrapper.vm.list.items.length).toBeGreaterThan(0);
    });
  });
  
  describe('on dispatch event', () => {
    describe('without value', () => {
      const event = 'event';
      beforeEach(() => {
        wrapper.vm.onDispatchEvent(event);
      });

      test('emit event', () => {
        expect(wrapper.emitted(event)).toBeDefined();
      });
    });

    describe('with value', () => {
      const event = 'event';
      const value = { ok: true };
      beforeEach(() => {
        wrapper.vm.onDispatchEvent({ event, value });
      });

      test('emit event', () => {
        expect(wrapper.emitted(event)).toBeDefined();
        expect(wrapper.emitted(event)[0][0]).toMatchObject(value);
      });
    });
  });
});

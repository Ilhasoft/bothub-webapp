/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import repository from '@/api/repository';
import Pagination from '@/components/shared/Pagination';


const localVue = createLocalVue();

const Foo = localVue.component('foo', { render: () => ('<div />') });

describe('Pagination.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Pagination, {
      localVue,
      propsData: {
        itemComponent: Foo,
        list: repository.getAll(),
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('item deleted', () => {
    beforeEach(() => {
      wrapper.vm.onItemDeleted(0);
    });

    test('item filtered', () => {
      wrapper.vm.list.items.forEach((item) => {
        expect(item.id).not.toBe(0);
      });
    });
  });

  describe('reset list', () => {
    beforeEach(() => {
      wrapper.vm.list.reset();
    });

    test('no items', () => {
      expect(wrapper.vm.list.items.length).toBe(0);
    });

    describe('next', () => {
      beforeEach(async () => {
        await wrapper.vm.next();
      });

      test('has items', () => {
        expect(wrapper.vm.list.items.length).toBeGreaterThan(0);
      });
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

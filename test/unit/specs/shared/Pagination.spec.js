/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallow, createLocalVue } from '@vue/test-utils';
import Pagination from '@/components/shared/Pagination';
import repository from '@/api/repository';

const localVue = createLocalVue();

const Foo = localVue.component('foo', { render: () => ('<div />') });

describe('Pagination.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(Pagination, {
      localVue,
      propsData: {
        itemComponent: Foo,
        list: repository.getAll(),
      },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });

  describe('item deleted', () => {
    beforeEach(() => {
      wrapper.vm.onItemDeleted(0);
    });

    test('index on deletions', () => {
      expect(wrapper.vm.deletions).toContain(0);
    });

    test('item filtered', () => {
      wrapper.vm.items.forEach((item) => {
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
        console.log(wrapper.vm.items.length);
      });
    });
  });
});

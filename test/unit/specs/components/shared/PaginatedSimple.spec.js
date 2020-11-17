/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import applyFilters from '@/utils/filters';
import PaginatedSimple from '@/components/shared/PaginatedSimple';
import utils from '@/api/utils';

const localVue = createLocalVue();
localVue.use(applyFilters);

const Foo = localVue.component('foo', { render: () => ('<div />') });

describe('PaginatedSimple.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(PaginatedSimple, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
        $tc: () => 'some specific text with paramaters',
      },
      propsData: {
        itemComponent: Foo,
        list: new utils.List('/repository/repositories/'),
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
  });

  describe('on dispatch event', () => {
    describe('dispatch save', () => {
      const event = 'itemSave';
      beforeEach(() => {
        wrapper.vm.onSaveUpdate(event);
      });

      test('emit event', () => {
        expect(wrapper.emitted(event)).toBeDefined();
      });
    });

    describe('dispatch delete', () => {
      const event = 'itemDeleted';
      const value = { event: 'itemDeleted', value: { ok: true } };
      beforeEach(() => {
        wrapper.vm.onItemDeleted({ event, value });
      });

      test('emit event', () => {
        expect(wrapper.emitted(event)).toBeDefined();
        expect(wrapper.emitted(event)[0][0].value).toMatchObject(value);
      });
    });
  });
});

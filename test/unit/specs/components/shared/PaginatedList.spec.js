/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import applyFilters from '@/utils/filters';
import repository from '@/api/repository';
import PaginatedList from '@/components/shared/PaginatedList';


const localVue = createLocalVue();
localVue.use(applyFilters);

const Foo = localVue.component('foo', { render: () => ('<div />') });

describe('Pagination.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(PaginatedList, {
      localVue,
      propsData: {
        itemComponent: Foo,
        list: repository.getAll(),
        perPage: 5,
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

    test('has items', () => {
      expect(wrapper.vm.list.items.length).toBeGreaterThan(0);
    });
  });
});

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
});

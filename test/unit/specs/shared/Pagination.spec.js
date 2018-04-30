/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallow } from '@vue/test-utils';
import Pagination from '@/components/shared/Pagination';
import RepositoryCard from '@/components/repository/RepositoryCard';
import repository from '@/api/repository';


describe('Pagination.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(Pagination, {
      propsData: {
        itemComponent: RepositoryCard,
        list: repository.getAll(),
      },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});

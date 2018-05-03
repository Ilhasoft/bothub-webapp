/* eslint-disable import/first */
jest.mock('@/api/request');

import Vuex from 'vuex';
import Buefy from 'buefy';
import { shallow, createLocalVue } from '@vue/test-utils';
import Pagination from '@/components/shared/Pagination';
import RepositoryCard from '@/components/repository/RepositoryCard';
import repository from '@/api/repository';

import store from '@/store';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Buefy);

describe('Pagination.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(Pagination, {
      localVue,
      store,
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

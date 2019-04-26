/* eslint-disable import/first */
jest.mock('@/api/request');

import BH from 'bh';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import store from '@/store';
import Router from 'vue-router';
import RepositoryCard from '@/components/repository/RepositoryCard';


const localVue = createLocalVue();
localVue.use(BH);
localVue.use(Router);

describe('RepositoryCard.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(RepositoryCard, {
      localVue,
      store,
      propsData: {
        uuid: 'dbe1539c-88ba-43e0-bed5-54729218cec9',
        owner: 1,
        owner__nickname: 'fake',
        name: 'Repository',
        slug: 'repository',
        language: 'en',
        available_languages: ['en', 'pt'],
        categories: [1, 2],
        categories_list: [
          { id: 1, name: 'Business' },
          { id: 2, name: 'Technology' },
        ],
        description: '',
        is_private: false,
        created_at: '2018-04-20T17:05:42.035514Z',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import BH from 'bh';
import store from '@/store';
import router from '@/router';
import RepositoryInfo from '@/components/repository/RepositoryInfo';


const localVue = createLocalVue();
localVue.use(BH);

describe('RepositoryCard.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(RepositoryInfo, {
      localVue,
      store,
      router,
      propsData: {
        repository: {
          uuid: 'dbe1539c-88ba-43e0-bed5-54729218cec9',
          categories: [1, 2, 3],
          categories_list: [
            { id: 1, name: 'Business' },
            { id: 2, name: 'Technology' },
            { id: 3, name: 'Health' },
          ],
        },
        // owner: 1,
        // owner__nickname: 'fake',
        // name: 'Repository',
        // slug: 'repository',
        // language: 'en',
        // available_languages: ['en', 'pt'],
        // description: '',
        // is_private: false,
        // created_at: '2018-04-20T17:05:42.035514Z',
      },
    });
  });


  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Computed Prop be a object', () => {
    expect(wrapper.vm.repositoryCategoryRouterParams).toMatchObject({});
  });
});

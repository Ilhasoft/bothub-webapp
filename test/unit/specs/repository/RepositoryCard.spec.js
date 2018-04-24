/* eslint-disable import/first */
jest.mock('@/api/request');

import Vuex from 'vuex';
import Buefy from 'buefy';
import { shallow, createLocalVue } from '@vue/test-utils';
import RepositoryCard from '@/components/repository/RepositoryCard';

import store from '@/store';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Buefy);


describe('RepositoryCard.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(RepositoryCard, {
      localVue,
      store,
      propsData: {
        repository: {
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
      },
    });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});

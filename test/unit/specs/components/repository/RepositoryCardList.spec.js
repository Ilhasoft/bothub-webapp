/* eslint-disable import/first */
jest.mock('@/api/request');

import BH from 'bh';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import store from '@/store';
import Router from 'vue-router';
import RepositoryCardList from '@/components/repository/RepositoryCardList';


const localVue = createLocalVue();
localVue.use(BH);
localVue.use(Router);

describe('RepositoryCardList.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(RepositoryCardList, {
      localVue,
      store,
      mocks: {
        $t: () => 'some specific text',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

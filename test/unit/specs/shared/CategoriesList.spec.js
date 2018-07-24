/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import store from '@/store';
import CategoriesList from '@/components/shared/CategoriesList';


const localVue = createLocalVue();

describe('CategoriesList.vue', () => {
  let wrapper;
  beforeEach(async () => {
    wrapper = shallowMount(CategoriesList, { localVue, store });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

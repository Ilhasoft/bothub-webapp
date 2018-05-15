/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallow, createLocalVue } from '@vue/test-utils';
import CategoriesList from '@/components/shared/CategoriesList';
import store from '@/store';

const localVue = createLocalVue();


describe('CategoriesList.vue', () => {
  let wrapper;
  beforeEach(async () => {
    wrapper = shallow(CategoriesList, { localVue, store });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});

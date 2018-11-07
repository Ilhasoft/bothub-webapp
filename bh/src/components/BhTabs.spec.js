/* eslint-env jest */
import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from '..';
import BhTabs from './BhTabs';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhLoading.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhTabs, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

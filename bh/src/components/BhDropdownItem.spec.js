import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from '..';
import BhDropdownItem from './BhDropdownItem';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhDropdownItem.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhDropdownItem, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

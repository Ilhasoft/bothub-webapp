import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from 'bh';
import BhDropdownItem from 'bh/components/BhDropdownItem';


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

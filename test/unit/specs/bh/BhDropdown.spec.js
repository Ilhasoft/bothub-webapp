import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from 'bh';
import BhDropdown from 'bh/components/BhDropdown';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhDropdown.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhDropdown, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from 'bh';
import BhTooltip from 'bh/components/BhTooltip';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhTooltip.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhTooltip, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

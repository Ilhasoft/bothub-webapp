import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from 'bh';
import BhBadge from 'bh/components/BhBadge';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhBadge.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhBadge, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

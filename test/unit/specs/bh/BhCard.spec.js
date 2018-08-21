import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from 'bh';
import BhCard from 'bh/components/BhCard';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhBadge.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhCard, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from 'bh';
import BhText from 'bh/components/BhText';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhText.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhText, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

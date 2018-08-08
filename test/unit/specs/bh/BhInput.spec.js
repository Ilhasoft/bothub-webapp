import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from 'bh';
import BhInput from 'bh/components/BhInput';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhInput.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhInput, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

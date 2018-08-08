import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from 'bh';
import BhButton from 'bh/components/BhButton';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhButton.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhButton, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

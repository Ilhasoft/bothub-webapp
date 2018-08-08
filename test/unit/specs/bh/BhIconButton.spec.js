import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from 'bh';
import BhIconButton from 'bh/components/BhIconButton';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhIconButton.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhIconButton, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

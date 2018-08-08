import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from 'bh';
import BhField from 'bh/components/BhField';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhField.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhField, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

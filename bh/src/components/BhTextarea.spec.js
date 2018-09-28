import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from 'bh';
import BhTextarea from 'bh/components/BhTextarea';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhTextarea.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhTextarea, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from 'bh';
import BhLoading from 'bh/components/BhLoading';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhLoading.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhLoading, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

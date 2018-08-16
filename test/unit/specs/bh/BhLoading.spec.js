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

  describe('when size string is not blank', () => {
    beforeEach(() => {
      wrapper.setProps({
        size: 'small',
      });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});

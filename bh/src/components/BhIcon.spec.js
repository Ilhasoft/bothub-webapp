import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from '..';
import BhIcon from './BhIcon';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhIcon.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhIcon, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

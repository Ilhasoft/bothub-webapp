/* eslint-env jest */
import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from '..';
import BhTooltipHover from './BhTooltipHover';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhTooltipHover.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhTooltipHover, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

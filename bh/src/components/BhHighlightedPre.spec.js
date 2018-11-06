/* eslint-env jest */
import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from '..';
import BhHighlightedPre from './BhHighlightedPre';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhHighlightedPre.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhHighlightedPre, {
      localVue,
      props: {
        code: '<div />',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

/* eslint-env jest */
import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from '..';
import BhTextarea from './BhTextarea';


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

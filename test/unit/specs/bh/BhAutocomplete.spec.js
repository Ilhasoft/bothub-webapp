import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from 'bh';
import BhAutocomplete from 'bh/components/BhAutocomplete';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhAutocomplete.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhAutocomplete, {
      localVue,
      propsData: {
        data: [
          'a',
          'b',
          'c',
        ],
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

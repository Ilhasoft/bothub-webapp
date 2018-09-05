import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from 'bh';
import BhTable from 'bh/components/BhTable';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhTable.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BhTable, {
      localVue,
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

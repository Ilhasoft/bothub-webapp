import Buefy from 'buefy';

import { shallow, createLocalVue } from '@vue/test-utils';
import SearchBar from '@/components/shared/SearchBar';

const localVue = createLocalVue();
localVue.use(Buefy);


describe('SearchBar.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(SearchBar, { localVue });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});

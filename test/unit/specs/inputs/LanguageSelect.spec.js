import Buefy from 'buefy';

import { shallow, createLocalVue } from '@vue/test-utils';
import LanguageSelect from '@/components/inputs/LanguageSelect';


const localVue = createLocalVue();
localVue.use(Buefy);

describe('LanguageSelect.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(LanguageSelect, { localVue });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});

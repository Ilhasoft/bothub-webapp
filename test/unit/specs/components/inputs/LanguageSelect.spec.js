import Buefy from 'buefy';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import LanguageSelect from '@/components/inputs/LanguageSelect';


const localVue = createLocalVue();
localVue.use(Buefy);

describe('LanguageSelect.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(LanguageSelect, { localVue });
  });

  test('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});

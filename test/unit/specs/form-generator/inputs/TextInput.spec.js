import Buefy from 'buefy';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import TextInput from '@/components/form-generator/inputs/TextInput';


const localVue = createLocalVue();
localVue.use(Buefy);

describe('TextInput.vue', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallowMount(TextInput, { localVue });
  });

  it('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});

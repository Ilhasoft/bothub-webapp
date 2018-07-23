import Buefy from 'buefy';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import StringInput from '@/components/form-generator/inputs/StringInput';


const localVue = createLocalVue();
localVue.use(Buefy);

describe('StringInput.vue', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallowMount(StringInput, { localVue });
  });

  it('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});

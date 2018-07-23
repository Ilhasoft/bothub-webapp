import Buefy from 'buefy';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import PasswordInput from '@/components/form-generator/inputs/PasswordInput';


const localVue = createLocalVue();
localVue.use(Buefy);

describe('PasswordInput.vue', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallowMount(PasswordInput, { localVue });
  });

  it('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});

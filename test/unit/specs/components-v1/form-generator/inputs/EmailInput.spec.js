import Buefy from 'buefy';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import EmailInput from '@/components-v1/form-generator/inputs/EmailInput';


const localVue = createLocalVue();
localVue.use(Buefy);

describe('EmailInput.vue', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallowMount(EmailInput, { localVue });
  });

  it('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});

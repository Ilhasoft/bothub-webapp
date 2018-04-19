import Buefy from 'buefy';
import { shallow, createLocalVue } from '@vue/test-utils';

import TextInput from '@/components/form-generator/inputs/TextInput';

const localVue = createLocalVue();
localVue.use(Buefy);

describe('TextInput.vue', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(TextInput, { localVue });
  });

  it('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});

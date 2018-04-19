import Buefy from 'buefy';
import { shallow, createLocalVue } from '@vue/test-utils';

import PasswordInput from '@/components/form-generator/inputs/PasswordInput';

const localVue = createLocalVue();
localVue.use(Buefy);

describe('PasswordInput.vue', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(PasswordInput, { localVue });
  });

  it('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});

import Buefy from 'buefy';
import { shallow, createLocalVue } from '@vue/test-utils';

import EmailInput from '@/components/form-generator/inputs/EmailInput';

const localVue = createLocalVue();
localVue.use(Buefy);

describe('EmailInput.vue', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(EmailInput, { localVue });
  });

  it('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});

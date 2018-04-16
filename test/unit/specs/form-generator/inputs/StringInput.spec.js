import Buefy from 'buefy';
import { shallow, createLocalVue } from '@vue/test-utils';

import StringInput from '@/components/form-generator/inputs/StringInput';

const localVue = createLocalVue();
localVue.use(Buefy);

describe('StringInput.vue', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(StringInput, { localVue });
  });

  it('mount', () => {
    expect(wrapper.vm).toBeDefined();
  });
});

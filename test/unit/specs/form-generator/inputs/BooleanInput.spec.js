import Buefy from 'buefy';
import { shallow, createLocalVue } from '@vue/test-utils';

import BooleanInput from '@/components/form-generator/inputs/BooleanInput';

const localVue = createLocalVue();
localVue.use(Buefy);

describe('BooleanInput.vue', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(BooleanInput, { localVue });
  });

  describe('when value true', () => {
    it('show Yes', () => {
      wrapper.vm.value = true;
      expect(wrapper.vm.verboseValue).toBe('Yes');
    });
  });

  describe('when value false', () => {
    it('show No', () => {
      wrapper.vm.value = false;
      expect(wrapper.vm.verboseValue).toBe('No');
    });
  });
});

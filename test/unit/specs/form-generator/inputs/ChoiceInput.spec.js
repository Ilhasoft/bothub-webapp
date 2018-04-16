import Buefy from 'buefy';
import { shallow, createLocalVue } from '@vue/test-utils';

import ChoiceInput from '@/components/form-generator/inputs/ChoiceInput';

const localVue = createLocalVue();
localVue.use(Buefy);

describe('ChoiceInput.vue', () => {
  describe('valid', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallow(ChoiceInput, {
        localVue,
        propsData: {
          choices: [
            { value: 1, display_name: 'One' },
            { value: 2, display_name: 'Two' },
          ],
        },
      });
    });

    it('mount', () => {
      expect(wrapper.vm).toBeDefined();
    });
  });
});

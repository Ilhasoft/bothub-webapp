import Buefy from 'buefy';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import MultipleChoice from '@/components/form-generator/inputs/MultipleChoice';


const localVue = createLocalVue();
localVue.use(Buefy);

describe('MultipleChoice.vue', () => {
  describe('valid', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallowMount(MultipleChoice, {
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

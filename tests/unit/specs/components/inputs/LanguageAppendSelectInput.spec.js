import { shallowMount, createLocalVue } from '@vue/test-utils';
import LanguageAppendSelectInput from '@/components/inputs/LanguageAppendSelectInput';

import Buefy from 'buefy';

const localVue = createLocalVue();
localVue.use(Buefy);


describe('LanguageAppendSelectInput.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(LanguageAppendSelectInput, {
      localVue,
      mocks: {
        $t: () => 'some specific text',
      },
    });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('click in en language', () => {
    beforeEach(() => {
      wrapper.vm.setVal('en');
    });

    test('input event emitted', () => {
      expect(wrapper.emitted('input')).toBeDefined();
    });
  });

  describe('value prop change to pt', () => {
    beforeEach(() => {
      wrapper.setProps({ value: 'pt' });
    });

    test('val is pt', () => {
      expect(wrapper.vm.val).toBe('pt');
    });
  });
});

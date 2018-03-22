import { shallow } from '@vue/test-utils';
import TextInput from '@/components/shared/form/inputs/TextInput';

const getWrapper = (propsData = {}) => shallow(
  TextInput,
  {
    propsData,
  },
);

describe('TextInput.vue', () => {
  it('simple', () => {
    const wrapper = getWrapper();
    expect(wrapper.contains('input'))
      .toBe(true);
  });

  describe('validate', () => {
    it('isRequired', () => {
      const wrapper = getWrapper({ isRequired: true });
      const input = wrapper.find('input');
      input.element.value = 'a';
      input.trigger('input');
      expect(wrapper.emitted().validate.pop()[0])
        .toBe(false);
      input.element.value = '';
      input.trigger('input');
      expect(wrapper.emitted().validate.pop()[0])
        .toBe(TextInput.ERROR_MSGS.REQUIRED);
    });

    it('maxLength', () => {
      const maxLength = 2;
      const wrapper = getWrapper({ maxLength });
      const input = wrapper.find('input');
      input.element.value = '1';
      input.trigger('input');
      expect(wrapper.emitted().validate.pop()[0])
        .toBe(false);
      input.element.value = '123';
      input.trigger('input');
      expect(wrapper.emitted().validate.pop()[0])
        .toBe(TextInput.ERROR_MSGS.EXCEEDS_CHARS(maxLength));
    });
  });
});

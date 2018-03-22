import { shallow } from '@vue/test-utils';
import EmailInput from '@/components/shared/form/inputs/EmailInput';
import InputMixin from '@/components/shared/form/inputs/InputMixin';

const getWrapper = (propsData = {}) => shallow(
  EmailInput,
  {
    propsData,
  },
);

describe('EmailInput.vue', () => {
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
        .toBe(EmailInput.ERROR_MSGS.REQUIRED);
    });

    it('is e-mail', () => {
      const wrapper = getWrapper({ isRequired: true });
      const input = wrapper.find('input');
      input.element.value = 'fake@user.com';
      input.trigger('change');
      expect(wrapper.emitted().validate.pop()[0])
        .toBe(false);
      input.element.value = 'fake';
      input.trigger('change');
      expect(wrapper.emitted().validate.pop()[0])
        .toBe(EmailInput.ERROR_MSGS.INVALID_EMAIL);
    });

    it('throttle', (done) => {
      const wrapper = getWrapper({ isRequired: true });
      const input = wrapper.find('input');
      input.element.value = 'fake';
      input.trigger('input');
      setTimeout(() => {
        expect(wrapper.emitted().validate.pop()[0])
          .toBe(EmailInput.ERROR_MSGS.INVALID_EMAIL);
        done();
      }, InputMixin.VALIDATE_THROTTLE_DELAY + 500);
    });
  });
});

import Vue from 'vue';
import { shallow } from '@vue/test-utils';
import Field from '@/components/shared/form/Field';
import TextInput from '@/components/shared/form/inputs/TextInput';

const getWrapper = (propsData, slots = {}) => (shallow(Field, { propsData, slots }));

describe('Field.vue', () => {
  const label = 'LABEL_!!';
  const helpText = 'HELP_!!TEXT';

  describe('empty', () => {
    const wrapper = getWrapper({ label, helpText });

    it('correct label', () => {
      const labelElem = wrapper.find('.field label').element;
      expect(labelElem.textContent)
        .toBe(`${label}:`);
    });

    it('correct help text', () => {
      const helpTextElem = wrapper.find('.field .help-text').element;
      expect(helpTextElem.textContent)
        .toBe(helpText);
    });

    it('show error', (done) => {
      const errorMsg = 'ERROR!!_';
      wrapper.vm.validateError = errorMsg;
      Vue.nextTick(() => {
        const validateErrorElem = wrapper.find('.field .errors-list .item').element;
        expect(validateErrorElem.textContent)
          .toBe(errorMsg);
        done();
      });
    });
  });

  describe('with input', () => {
    const wrapper = getWrapper(
      { label, helpText },
      {
        default: TextInput,
      },
    );

    it('contains input', () => {
      expect(wrapper.contains('input'))
        .toBe(true);
    });

    it('on validate', () => {
      const validateValue = false;
      const textInput = wrapper.vm.$slots.default[0].componentInstance;
      textInput.$emit('validate', validateValue);
    });
  });

  it('with prop errors', () => {
    const wrapper = getWrapper(
      {
        label,
        helpText,
        errors: ['hi'],
      },
    );
    expect(wrapper.findAll('.errors-list .item').length)
      .toBe(1);
  });
});

<template>
  <input
    type="email"
    v-bind:class="{ invalid: !isValid }"
    @input="onInput($event.target.value)"
    @change="onChange($event.target.value)"
    v-bind="$attrs"
  />
</template>

<script>
import InputMixin from '@/components/shared/form/inputs/InputMixin';

const ERROR_MSGS = {
  REQUIRED: 'Required field',
  INVALID_EMAIL: 'Enter valid e-mail',
};
const EMAIL_REGEX = /\S+@\S+\.\S+/;

export default {
  name: 'EmailInput',
  mixins: [InputMixin],
  props: {
    isRequired: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    typingValidate(value) {
      return (this.isRequired && !value && ERROR_MSGS.REQUIRED) ||
        false;
    },
    validate(value) {
      return (!EMAIL_REGEX.test(value) && ERROR_MSGS.INVALID_EMAIL) ||
        false;
    },
  },
  ERROR_MSGS,
};
</script>

<style lang="scss" scoped>
input {
  width: 100%;
  font-size: 18px;
  box-sizing: border-box;
  outline: none;

  &.invalid {
    border-color: red;
  }
}
</style>

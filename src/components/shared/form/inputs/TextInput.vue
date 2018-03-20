<template>
  <input
    :type="type"
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
  EXCEEDS_CHARS: maxLength => (`Content exceeds ${maxLength} characters`),
};

export default {
  name: 'TextInput',
  mixins: [InputMixin],
  props: {
    type: {
      type: String,
      default: 'text',
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    maxLength: {
      type: Number,
      default: Infinity,
    },
  },
  methods: {
    typingValidate(value) {
      return (this.isRequired && !value && ERROR_MSGS.REQUIRED) ||
        (value.length > this.maxLength && ERROR_MSGS.EXCEEDS_CHARS(this.maxLength)) ||
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

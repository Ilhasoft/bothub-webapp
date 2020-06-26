<template>
  <b-input
    :maxlength="!showMaxLenght ? '' : max_length"
    v-model="value"
    :placeholder="labelPlaceholder"
    type="text" />
</template>

<script>

export default {
  props: {
    max_length: {
      type: Number,
      default: null,
    },
    showMaxLenght: {
      type: Boolean,
      default: true,
    },
    labelPlaceholder: {
      type: String,
      default: '',
    },
    initialData: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      value: null,
    };
  },
  computed: {
    numberValue() {
      let numberValue = '';
      if (this.value) numberValue = this.value.replace(/[^\d]/, '');
      if (numberValue.length === 0) numberValue = null;
      this.$emit('input', numberValue);
      return numberValue;
    },
  },
  watch: {
    value() {
      this.$nextTick(() => {
        this.value = this.format(this.value);
        this.$emit('input', parseInt(this.value, 10));
      });
    },
  },
  mounted() {
    this.value = this.initialData;
  },
  methods: {
    update(value) {
      this.value = value;
    },
    format(value) {
      let numberValue = '';
      if (value) numberValue = value.replace(/[^\d]/, '');
      if (numberValue.length === 0) numberValue = null;
      this.$emit('input', numberValue);
      return numberValue;
    },
  },
};
</script>

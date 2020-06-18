<template>
  <b-autocomplete
    v-if="compact"
    v-model="value"
    :placeholder="labelPlaceholder"
    :custom-formatter="formatter"
    :data="choices"
    expanded
    @input="updateInput"
    @select.stop="selectOption"/>
  <b-select
    v-else
    v-model="value"
    expanded
    @input="update()">
    <option
      v-for="choice in choices"
      :key="choice.value"
      :value="choice.value">{{ choice.display_name }}</option>
  </b-select>
</template>

<script>
export default {
  props: {
    choices: {
      required: true,
      type: Array,
    },
    initialData: {
      type: [Array, String],
      default: null,
    },
    compact: {
      type: Boolean,
      default: null,
    },
    labelPlaceholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      value: this.initialData,
      formatter: choice => choice.display_name,
    };
  },
  mounted() {
    this.update();
  },
  methods: {
    updateInput() {
      const option = this.choices.find(
        choice => choice.display_name.toLowerCase() === this.value.toLowerCase(),
      );
      if (option) {
        this.$emit('input', option.value);
      } else {
        this.$emit('input', '');
      }
    },
    selectOption(option) {
      this.$emit('input', option.value);
    },
    update() {
      this.$emit('input', this.value);
    },
  },
};
</script>

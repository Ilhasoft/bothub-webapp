<template>
  <b-taginput
    v-model="value"
    :data="filteredData"
    expanded
    autocomplete
    open-on-focus
    clear-on-select
    field="display_name"
    icon="label"
    @input="update()" />
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
      default: () => ([]),
    },
  },
  data() {
    return {
      value: this.initialData,
    };
  },
  computed: {
    filteredData() {
      const values = this.value.map(({ value }) => (value));
      return this.choices.filter(({ value }) => (!values.includes(value)));
    },
  },
  mounted() {
    this.update();
  },
  methods: {
    update() {
      this.$emit('input', this.value.map(choice => choice.value));
    },
  },
};
</script>

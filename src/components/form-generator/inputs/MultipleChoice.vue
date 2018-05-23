<template>
  <b-taginput
    expanded
    autocomplete
    open-on-focus
    clear-on-select
    v-model="value"
    @input="update()"
    :data="filteredData"
    field="display_name"
    icon="label" />
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
    },
  },
  mounted() {
    this.update();
  },
  data() {
    return {
      value: this.initialData || [],
    };
  },
  computed: {
    filteredData() {
      const values = this.value.map(({ value }) => (value));
      return this.choices.filter(({ value }) => (!values.includes(value)));
    },
  },
  methods: {
    update() {
      this.$emit('input', this.value.map(choice => choice.value));
    },
  },
};
</script>

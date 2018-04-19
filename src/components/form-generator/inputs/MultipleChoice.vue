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
  },
  mounted() {
    this.update();
  },
  data() {
    return {
      value: [],
    };
  },
  computed: {
    filteredData() {
      return this.choices.filter(choice => !this.value.includes(choice));
    },
  },
  methods: {
    update() {
      this.$emit('input', this.value.map(choice => choice.value));
    },
  },
};
</script>

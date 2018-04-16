<template>
  <b-select
    expanded
    v-model="value"
    @input="update()">
    <option
      v-for="choice in choices"
      :key="choice.value"
      :value="choice.value">{{choice.display_name}}</option>
  </b-select>
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
      value: null,
    };
  },
  methods: {
    update() {
      this.$emit('input', this.value);
    },
  },
};
</script>

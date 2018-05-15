<template>
  <b-switch
    v-model="value"
    @input="update()">{{ verboseValue }}</b-switch>
</template>

<script>
export default {
  props: {
    initialData: {
      type: String,
    },
  },
  mounted() {
    this.update();
  },
  data() {
    return {
      value: this.initialData || false,
    };
  },
  computed: {
    verboseValue() {
      return this.value ? 'Yes' : 'No';
    },
  },
  methods: {
    update() {
      this.$emit('input', this.value);
    },
  },
};
</script>


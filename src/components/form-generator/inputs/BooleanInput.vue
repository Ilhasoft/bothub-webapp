<template>
  <b-field
    v-if="compact"
    :label="label"
    horizontal>
    <b-switch
      v-model="value"
      @input="update()" />
    <b-field :message="helpText" />
  </b-field>
  <b-switch
    v-else
    v-model="value"
    @input="update()">{{ verboseValue }}</b-switch>
</template>

<script>

export default {
  props: {
    initialData: {
      type: Boolean,
      default: false,
    },
    compact: {
      type: Boolean,
      default: null,
    },
    label: {
      type: String,
      default: '',
    },
    helpText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      value: this.initialData,
    };
  },
  computed: {
    verboseValue() {
      return this.value ? this.$t('webapp.layout.yes') : this.$t('webapp.layout.no');
    },
  },
  mounted() {
    this.update();
  },
  methods: {
    update() {
      this.$emit('input', this.value);
    },
  },
};
</script>

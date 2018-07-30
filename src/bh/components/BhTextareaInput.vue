<template>
  <div class="bh-input-wrapper">
    <textarea
      ref="textarea"
      v-bind="$attrs"
      v-model="val"
      :class="inputClassAttr" />
  </div>
</template>

<script>
import BhTextInput from './BhTextInput';

export default {
  name: 'BhTextareaInput',
  extends: BhTextInput,
  async mounted() {
    await this.$nextTick();
    this.updateTextareaHeight();
  },
  watch: {
    val() {
      this.updateTextareaHeight();
    },
  },
  methods: {
    updateTextareaHeight() {
      const { textarea } = this.$refs;
      const offset = textarea.offsetHeight - textarea.clientHeight;
      textarea.style.height = textarea.style.minHeight;
      textarea.style.height = `${offset + textarea.scrollHeight}px`;
    },
  },
};
</script>

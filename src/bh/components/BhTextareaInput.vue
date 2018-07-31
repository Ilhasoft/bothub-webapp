<template>
  <div class="bh-input-wrapper">
    <div :class="inputClassAttr">
      <textarea
        ref="textarea"
        v-bind="$attrs"
        v-model="val" />
    </div>
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
      const computedStyle = window.getComputedStyle(textarea);
      textarea.style.height = computedStyle.getPropertyValue('min-height');
      textarea.style.height = `${offset + textarea.scrollHeight}px`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/assets/scss/forms.scss';

.bh {
  &-textinput {
    @include textarea();
  }
}
</style>

<template>
  <span
    @click="$emit('click', $event)"
    :class="classAttr"
    v-html="svg" />
</template>

<script>
import CommentQuestion from 'bh/assets/icons/comment-question.svg';
import PlusCircle from 'bh/assets/icons/plus-circle.svg';


const icons = {
  'help-text': CommentQuestion,
  'plus-circle': PlusCircle,
};

export default {
  name: 'BhIcon',
  props: {
    value: {
      type: String,
      default: 'help-text',
    },
    size: {
      type: String,
      default: null,
    },
  },
  computed: {
    classAttr() {
      const classes = [
        'bh-icon',
      ];

      if (this.size) {
        classes.push(`bh-icon-${this.size}`);
      }

      return classes.join(' ');
    },
    svg() {
      return icons[this.value];
    },
  },
};
</script>

<style lang="scss">
.bh {
  &-icon {
    display: inline-block;
    width: 1.25rem;
    height: 1.25rem;
    vertical-align: text-top;

    svg {
      display: block;
      width: 100%;
      max-width: 100%;
      height: 100%;
      max-height: 100%;
      fill: currentColor;
    }

    &-small {
      width: 1rem;
      height: 1rem;
    }

    &-large {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
}
</style>

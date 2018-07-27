<template>
  <span
    @click="$emit('click', $event)"
    :class="classAttr">
    <img
      :alt="value"
      :src="imgSrc" />
  </span>
</template>

<script>
import CommentQuestion from 'bh/assets/icons/comment-question.svg';


const icons = {
  'help-text': CommentQuestion,
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
    imgSrc() {
      return icons[this.value];
    },
  },
};
</script>

<style lang="scss" scoped>
.bh {
  &-icon {
    display: inline-block;
    width: 1.25rem;
    height: 1.25rem;
    vertical-align: text-top;

    img {
      display: block;
      width: 100%;
      max-width: 100%;
      height: 100%;
      max-height: 100%;
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

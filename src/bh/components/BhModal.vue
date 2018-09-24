<template>
  <div
    v-show="open"
    class="bh-modal">
    <div
      class="bh-modal__background"
      @click="backgroundClose()" />
    <div class="bh-modal__close">
      <button
        class="bh-modal__close__button"
        @click="close()">
        <bh-icon
          size="medium"
          value="close" />
      </button>
    </div>
    <bh-card class="bh-modal__content">
      <slot />
    </bh-card>
  </div>
</template>

<script>
export default {
  name: 'BhModal',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    backgroundCloses: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    open(value) {
      if (value) {
        this.$bhModal.add(this);
      } else {
        this.$bhModal.rm(this);
      }
    },
  },
  mounted() {
    if (this.open) {
      this.$bhModal.add(this);
    }
  },
  beforeDestroy() {
    this.$bhModal.rm(this);
  },
  methods: {
    close() {
      this.$emit('update:open', false);
    },
    backgroundClose() {
      if (this.backgroundCloses) {
        this.close();
      }
    },
  },
};
</script>

<style lang="scss">
@import '~bh/assets/scss/variables.scss';


.bh {
  &-modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $modal-z-index;
    width: 100%;
    height: 100%;

    &__background {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
    }

    &__close {
      text-align: right;

      &__button {
        padding: .5rem;
        color: white;
        cursor: pointer;
        background: none;
        border: none;
        outline: none;
      }
    }

    &__content {
      max-width: 600px;
      margin: 3rem auto;
    }
  }
}
</style>

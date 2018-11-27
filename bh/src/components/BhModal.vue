<template>
  <transition
    name="fade"
  >
    <div
      v-show="open"
      ref="modal"
      class="bh-modal"
      @click="backgroundClose($event)"
    >
      <bh-card class="bh-modal__content">
        <div class="bh-modal__header">
          <div class="bh-grid">
            <h3 class="bh-modal__header__title bh-grid__item">{{ title }}</h3>
            <button
              ref="closeBtn"
              class="bh-modal__header__close-button clickable"
              @click="close()"
            >
              <bh-icon
                class="bh-modal__close bh-grid__itembh-grid__item--grow-0"
                size="small"
                value="close"
              />
            </button>
          </div>
        </div>
        <slot />
      </bh-card>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BhModal',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Title',
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
    backgroundClose(event) {
      if (this.backgroundCloses && event.target === this.$refs.modal) {
        this.close();
      }
    },
  },
};
</script>

<style lang="scss">
@import '@scss/variables.scss';
@import '@scss/colors.scss';


.bh {
  &-modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $modal-z-index;
    width: 100%;
    height: 100%;
    padding: .5rem;
    overflow: auto;
    background-color: rgba(0, 0, 0, .5);

    &__header {
      padding: 1rem;

      &__title {
        text-align: center;
      }

      &__close-button {
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-to
{
  opacity: 0
}
</style>

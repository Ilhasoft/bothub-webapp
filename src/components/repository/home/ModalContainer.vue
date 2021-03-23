<template>
  <transition name="modal-transition" v-if="showModal">
    <div class="modal-container">
      <div class="modal-container__content">
        <div class="modal-container__content__background">
          <section class="modal-container__content__background__header">
            <unnnic-icon
              size="lg"
              icon="keyboard-arrow-down-1"
              @click="closeModal()"
              clickable
            />

            <div class="modal-container__content__background__header__text">
              <div
                class="modal-container__content__background__header__text__title"
              >
                {{infoModal.title}}
              </div>
              <div
                class="modal-container__content__background__header__text__subtitle"
              >
                {{infoModal.subtitle}}
              </div>
            </div>
          </section>

          <section class="modal-container__content__background__content"
            v-if="infoModal.type === 0">
            <span :key="tag" v-for="tag in 100"
            class="modal-container__content__background__content__tags">
              <unnnic-tag
                @click.native="repositoryDetailsRouterParams()"
                text="calculate"
                type="indicator"
                :count="100"
                scheme="aux-blue"
                clickable
              />
            </span>
          </section>

          <section class="modal-container__content__background__content" v-else>
            <div class="modal-container__content__background__content__list">
              <span :key="tag" v-for="tag in 30">
                  Portuguese
              </span>
            </div>
          </section>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ModalContainer',
  props: {
    infoModal: {
      type: Object,
      default: null,
    },
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@weni/unnnic-system/dist/unnnic.css";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";

.modal-transition-leave-to{
  animation: transition .2s reverse;
}

.modal-transition-enter-active {
  animation: transition .2s;
}

@keyframes transition {
  100% {
    transform: translateY(0%);
  }
  0% {
    transform: translateY(100%);
  }
}

.modal-container {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.24);

  &__content {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: flex-end;
    align-items: flex-end;

    &__background {
      width: 100%;
      height: 60%;
      transition: opacity 0.9s;
      background-color: $unnnic-color-background-snow;
      overflow: hidden;
      padding: $unnnic-inline-xl;

      &__header {
        display: flex;
        border-bottom: 0.0625rem solid $unnnic-color-neutral-soft;
        padding-bottom: $unnnic-inset-md;

        &__text {
          margin-left: $unnnic-inline-md;

          &__title {
            margin-bottom: $unnnic-inset-xs;
            font-family: $unnnic-font-family-secondary;
            font-weight: $unnnic-font-weight-bold;
            font-size: $unnnic-font-size-title-sm;
            line-height: $unnnic-font-size-title-sm + $unnnic-line-height-medium;
            color: $unnnic-color-neutral-black;
          }

          &__subtitle {
            font-family: $unnnic-font-family-secondary;
            font-weight: $unnnic-font-weight-regular;
            font-size: $unnnic-font-size-body-gt;
            line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
            color: $unnnic-color-neutral-cloudy;
          }
        }
      }

      &__content {
        height: 80%;
        display: flex;
        overflow: auto;
        flex-wrap: wrap;
        margin-top: $unnnic-inset-md;

        &__tags{
          margin: $unnnic-inset-nano;
        }
        &__list{
          display: flex;
          flex-direction: column;
          overflow: auto;

          span {
            color: $unnnic-color-neutral-darkest;
          }
        }
      }

    }
  }
}
</style>

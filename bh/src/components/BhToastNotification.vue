<template>
  <transition name="bh-toast-notification-fade">
    <div
    v-if="open"
    class="bh-toast-notification">
      <div :class="`bh-toast-notification__info--${status}`">
        <bh-icon
            class="bh-toast-notification__info__icon"
            size="small"
            :value="status"
          />
      </div>
      <div class="bh-toast-notification__message">
        Text coppy
      </div>
      <div class="bh-toast-notification__action">
        <button
          class="bh-toast-notification__action__button"
          ref="closeBtn"
          @click="close()"
        >
          <bh-icon
            size="small"
            value="close"
          />
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BhToastNotification',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: 'success',
    },
    direction: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      default: null
    }
  },
  watch: {
    open(value) {
      this.open = this.open;
    },
  },
  methods: {
    close() {
      console.log('closed');

    }
  }
};
</script>

<style lang="scss">
@import '@scss/variables.scss';
@import '@scss/colors.scss';

.bh-toast-notification {
  margin: auto;
  background-color: $color-fake-white;
  color: #fff;
  text-align: center;
  position: fixed;
  z-index: 1;
  right: 1rem;
  top: 10px;
  font-size: 17px;
  display: flex;
  border-radius: .5rem;
  max-width: 350px;
  -webkit-box-shadow: 3px 3px 8px 0px rgba(0,0,0,0.22);
  -moz-box-shadow: 3px 3px 8px 0px rgba(0,0,0,0.22);
  box-shadow: 3px 3px 8px 0px rgba(0,0,0,0.22);

  &-fade-enter-active,
    &-fade-leave-active {
      transition: opacity .5s;
    }

    &-fade-enter,
    &-fade-leave-to {
      opacity: 0;
    }

  &__info {

    &--success {
      background-color: $color-success;
      width: 6rem;
      border-bottom-left-radius: .5rem;
      border-top-left-radius: .5rem;
    }

    &--warning {
      background-color: $color-warning;
      width: 6rem;
      border-bottom-left-radius: .5rem;
      border-top-left-radius: .5rem;
    }

    &--danger {
      background-color: $color-danger;
      width: 6rem;
      border-bottom-left-radius: .5rem;
      border-top-left-radius: .5rem;
    }

    &--info {
      background-color: $color-info;
      width: 6rem;
      border-bottom-left-radius: .5rem;
      border-top-left-radius: .5rem;
    }

    &__icon {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &__message {
    width: 100%;
    color: black;
    padding: 1rem;
    overflow: hidden;
    word-break: break-all;
    text-align: left;
  }

  &__action {
    &__button {
      background: none;
      border: none;
      outline: none;
      position: relative;
      top: 50%;
      color: $color-grey-dark;
      transform: translateY(-65%);
      margin: 0 .5rem;
    }
  }

  .visible {
    visibility: visible;
    opacity: 1;
    transition: opacity 2s linear;
  }
}
</style>

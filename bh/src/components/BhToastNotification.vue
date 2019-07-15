<template>
  <transition name="bh-toast-notification-wrapper__card-fade">
    <div class="bh-toast-notification-wrapper">
      <div
        v-if="open"
        class="bh-toast-notification-wrapper__card"
      >
        <div :class="`bh-toast-notification-wrapper__card__info--${status}`">
          <bh-icon
            class="bh-toast-notification-wrapper__card__info__icon"
            size="small"
            :value="status"
          />
        </div>
        <div class="bh-toast-notification-wrapper__card__message">
          Text coppy
        </div>
        <div class="bh-toast-notification-wrapper__card__action">
          <button
            ref="closeBtn"
            class="bh-toast-notification-wrapper__card__action__button"
            @click="close()"
          >
            <bh-icon
              size="small"
              value="close"
            />
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { events } from '../events';

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
      default: null,
    },
  },
  data() {
    return {
      list: [1, 2, 3],
    };
  },
  watch: {
    open(value) {
      console.log(value);

      this.open = this.open;
    },
  },
  mounted() {
    console.log(events);
    events.$on('add', this.close);
  },
  methods: {
    close(event) {
    },
    add(params) {
      events.$on('teste', this.close);
    },
  },
};
</script>

<style lang="scss">
@import '@scss/variables.scss';
@import '@scss/colors.scss';
.bh-toast-notification-wrapper {
  right: 1rem;
  top: 10px;
  position: fixed;
  max-width: 350px;
  z-index: 1;
  display: block;

  &__card {
    background-color: $color-fake-white;
    color: #fff;
    text-align: center;
    font-size: 15px;
    margin: .5rem 0;
    display: flex;
    border-radius: .5rem;
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
}
</style>

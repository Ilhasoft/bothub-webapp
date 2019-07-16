<template>

  <div class="bh-toast-notification-wrapper">
    <transition-group
      name="bh-toast-notification-wrapper__card-slide"
    >
      <div
        v-for="item in list"
        :key="item.id"
        class="bh-toast-notification-wrapper__card"
      >
        <div :class="`bh-toast-notification-wrapper__card__info--${item.type}`">
          <bh-icon
            class="bh-toast-notification-wrapper__card__info__icon"
            size="small"
            :value="item.type"
          />
        </div>
        <div class="bh-toast-notification-wrapper__card__message">
          {{ item.message }}
        </div>
        <div class="bh-toast-notification-wrapper__card__action">
          <button
            ref="closeBtn"
            class="bh-toast-notification-wrapper__card__action__button"
            @click="close(item)"
          >
            <bh-icon
              size="small"
              value="close"
            />
          </button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { uuid } from 'vue-uuid';
import { events } from '../events';

const STATE = {
  IDLE: 0,
  DESTROYED: 2,
};

export default {
  name: 'BhToastNotification',
  data() {
    return {
      list: [],
    };
  },
  created() {
    events.$on('add', (params) => {
      const { message, type, time } = params;
      const item = {
        id: uuid.v1(),
        message,
        type,
        state: STATE.IDLE,
        time,
      };
      this.list.push(item);
      setTimeout(() => { this.close(item); }, item.time);
    });
  },
  methods: {
    close(item) {
      const itemToDestroy = item;
      itemToDestroy.state = STATE.DESTROYED;
      this.clean();
    },
    clean() {
      this.list = this.list.filter(v => v.state !== STATE.DESTROYED);
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
    font-size: .8rem;
    margin: .5rem 0;
    display: flex;
    border-radius: .5rem;
    -webkit-box-shadow: 3px 3px 8px 0px rgba(0,0,0,0.22);
    -moz-box-shadow: 3px 3px 8px 0px rgba(0,0,0,0.22);
    box-shadow: 3px 3px 8px 0px rgba(0,0,0,0.22);

    &-slide-enter-active,
      &-slide-leave-active {
        transition: opacity .5s;
      }

      &-slide-enter,
      &-slide-leave-to {
        opacity: 0;
      }

    &__info {

      &--success {
        background-color: $color-success;
        width: 6rem;
        border-bottom-left-radius: .5rem;
        border-top-left-radius: .5rem;

        span {
          width: 1.5rem;
          height: 1.5rem;
        }
      }

      &--warning {
        background-color: $color-warning;
        width: 6rem;
        border-bottom-left-radius: .5rem;
        border-top-left-radius: .5rem;

        span {
          width: 1.5rem;
          height: 1.5rem;
        }
      }

      &--danger {
        background-color: $color-danger;
        width: 6rem;
        border-bottom-left-radius: .5rem;
        border-top-left-radius: .5rem;

        span {
          width: 1.5rem;
          height: 1.5rem;
        }
      }

      &--info {
        background-color: $color-info;
        width: 6rem;
        border-bottom-left-radius: .5rem;
        border-top-left-radius: .5rem;

        span {
          width: 1.5rem;
          height: 1.5rem;
        }
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
        transform: translateY(-50%);
        margin: 0 .5rem;
        cursor: pointer;
      }
    }
  }
}
</style>

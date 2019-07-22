<template>
  <div
    class="bh-toast-notification-wrapper"
  >
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
import events from '../events';

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
      this.addNew(params);
    });
  },
  methods: {
    addNew(event) {
      const { message, type, time } = event;

      const item = {
        id: uuid.v1(),
        message: message || 'Success',
        type: type.toLowerCase() || 'success',
        state: STATE.IDLE,
        time: time || 5000,
      };

      this.list.push(item);
      setTimeout(() => { this.close(item); }, item.time);
    },
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
  position: fixed;
  top: 10px;
  right: 1rem;
  z-index: 9999;
  display: block;
  width: 350px;

  &__card {
    display: flex;
    margin: .5rem 0;
    font-size: .8rem;
    color: #fff;
    text-align: center;
    background-color: $color-fake-white;
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
        width: 6rem;
        background-color: $color-success;
        border-top-left-radius: .5rem;
        border-bottom-left-radius: .5rem;

        span {
          width: 1.5rem;
          height: 1.5rem;
        }
      }

      &--warning {
        width: 6rem;
        background-color: $color-warning;
        border-top-left-radius: .5rem;
        border-bottom-left-radius: .5rem;

        span {
          width: 1.5rem;
          height: 1.5rem;
        }
      }

      &--danger {
        width: 6rem;
        background-color: $color-danger;
        border-top-left-radius: .5rem;
        border-bottom-left-radius: .5rem;

        span {
          width: 1.5rem;
          height: 1.5rem;
        }
      }

      &--question {
        width: 6rem;
        background-color: $color-info;
        border-top-left-radius: .5rem;
        border-bottom-left-radius: .5rem;

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
      padding: 1rem;
      overflow: hidden;
      color: black;
      text-align: left;
      word-break: break-word;
    }

    &__action {
      &__button {
        position: relative;
        top: 50%;
        margin: 0 .5rem;
        color: $color-grey-dark;
        cursor: pointer;
        background: none;
        border: none;
        outline: none;
        transform: translateY(-50%);
      }
    }
  }
}
</style>

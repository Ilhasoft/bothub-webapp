<template>
  <b-modal
    :active="active && shouldShow"
    :width="740"
    @close="onClose">
    <div
      v-if="info.count"
      class="news-modal">
      <h2> {{ $t(`${current}.title`) }} </h2>
      <p> {{ $t(`${current}.text`) }} </p>
      <div class="news-modal__image__wrapper">
        <img
          :src="$t(`${current}.img`)"
          class="news-modal__image">
      </div>
      <div class="news-modal__controls">
        <b-button
          :class="{'news-modal__controls__button': true,
                   'news-modal__controls__hidden': !hasPrevious}"
          type="is-primary"
          @click="previous()"> Back </b-button>
        <div class="news-modal__indicator__wrapper">
          <div
            v-for="index in info.count"
            :key="index"
            :class="{'news-modal__indicator': true,
                     'news-modal__indicator--active': current === index}"
            @click="current=index" />
        </div>
        <b-button
          :class="{'news-modal__controls__button': true,
                   'news-modal__controls__hidden': !hasNext}"
          type="is-primary"
          @click="next()"> Next </b-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

const en = require('../assets/news/en.json');
const ptBr = require('../assets/news/pt_br.json');
const info = require('../assets/news/info.json');

export default {
  name: 'NewsModal',
  data() {
    return {
      active: true,
      current: 1,
      info,
      en,
      ptBr,
    };
  },
  i18n: {
    messages: {
      'en-US': en,
      'pt-BR': ptBr,
    },
  },
  computed: {
    ...mapGetters([
      'lastVersionSeen',
    ]),
    shouldShow() {
      return this.lastVersionSeen !== process.env.VERSION;
    },
    hasNext() {
      return this.current < this.info.count;
    },
    hasPrevious() {
      return this.current > 1;
    },
  },
  methods: {
    ...mapActions([
      'setLastVersionSeen',
    ]),
    next() {
      this.current = Math.min(this.current + 1, this.info.count);
    },
    previous() {
      this.current = Math.max(this.current - 1, 1);
    },
    onClose() {
      this.active = false;
      this.setLastVersionSeen(process.env.VERSION);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
    .news-modal {

        background-color: white;
        padding: 3rem;
        text-align: center;

        &__image {
            width: auto;
            max-height: 100%;
            object-fit: cover;
            &__wrapper {
                width: 100%;
                height: 18rem;
            }
        }

        &__controls {
            margin: 2.2rem 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;

            &__button {
                padding: 2rem 3rem;
            }

            &__hidden {
                visibility: hidden;
            }
        }

        &__indicator {
              height: 1rem;
              width: 1rem;
              border-radius: 50%;
              display: inline-block;
              background-color: $color-grey;
              cursor: pointer;
            &--active {
                background-color: $color-primary;
            }

            &__wrapper {
                margin: 0 0.5rem;
                display: flex;
                justify-content: center;

                > * {
                    margin-right: 0.5rem;
                }

                :last-child {
                    margin: 0;
                }
            }
        }
    }
</style>

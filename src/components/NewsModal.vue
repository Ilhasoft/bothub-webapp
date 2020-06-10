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
          v-show="imageFor(current)"
          :src="imageFor(current)"
          class="news-modal__image">
      </div>
      <div class="news-modal__controls">
        <b-button
          :class="{'news-modal__controls__button': true,
                   'news-modal__controls__hidden': !hasPrevious}"
          type="is-primary"
          @click="previous()"> {{ $t('back') }} </b-button>
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
          @click="next()"> {{ $t('next') }}  </b-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

const info = require('../assets/news/info.json');

export default {
  name: 'NewsModal',
  data() {
    return {
      active: true,
      current: 1,
      info,
      en: info.en,
      ptBr: info.pt_br,
    };
  },
  i18n: {
    messages: {
      'en-US': this.en,
      'pt-BR': this.ptBr,
    },
  },
  computed: {
    ...mapGetters([
      'lastVersionSeen',
    ]),
    currentVersion() {
      return process.env.VERSION;
    },
    shouldShow() {
      return this.lastVersionSeen < this.currentVersion
      && this.currentVersion <= this.info.max_version;
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
    imageFor(index) {
      if (index >= this.info.images.length || !this.info.images[index]) return null;
      return `~@/assets/news/imgs/${this.info.images[index]}`;
    },
    next() {
      this.current = Math.min(this.current + 1, this.info.count);
    },
    previous() {
      this.current = Math.max(this.current - 1, 1);
    },
    onClose() {
      this.active = false;
      this.setLastVersionSeen(this.currentVersion);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
    .news-modal {
        border-radius: 10px;
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
                padding: 1.5rem 3rem;
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

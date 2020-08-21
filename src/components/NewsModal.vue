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
      <span> {{ $t(`${current}.subtext`) }} </span>
      <div class="news-modal__image__wrapper">
        <img
          v-show="images[current-1]"
          :src="images[current-1]"
          class="news-modal__image">
      </div>
      <div class="news-modal__controls">
        <b-button
          class="news-modal__controls__button"
          type="is-primary"
          @click="hasPrevious ? previous() : onClose()">
          {{ hasPrevious ? $t('back') : $t('cancel') }}
        </b-button>
        <div class="news-modal__indicator__wrapper">
          <div
            v-for="index in info.count"
            :key="index"
            :class="{'news-modal__indicator': true,
                     'news-modal__indicator--active': current === index}"
            @click="current=index" />
        </div>
        <b-button
          class="news-modal__controls__button"
          type="is-primary"
          @click="hasNext ? next() : onClose()">
          {{ hasNext ? $t('next') : $t('finish') }}
        </b-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { mapGetters, mapActions } from 'vuex';

const info = require('../assets/news/info.json');

export default {
  name: 'NewsModal',
  data() {
    return {
      active: true,
      current: 1,
      info,
      images: [],
    };
  },
  i18n: {
    messages: {
      'en-US': info.en,
      'pt-BR': info.pt_br,
    },
  },
  computed: {
    ...mapGetters([
      'lastVersionSeen',
      'authenticated',
    ]),
    currentVersion() {
      return process.env.VERSION;
    },
    shouldShow() {
      return this.authenticated
      && (!this.lastVersionSeen || this.lastVersionSeen < this.currentVersion)
      && this.currentVersion <= this.info.max_version;
    },
    hasNext() {
      return this.current < this.info.count;
    },
    hasPrevious() {
      return this.current > 1;
    },
  },
  mounted() {
    this.images = Array(this.info.count).fill(null);
    this.images = this.images.map((_, index) => {
      if (index >= this.info.images.length || !this.info.images[index]) return null;
      return require(`../assets/news/imgs/${this.info.images[index]}`);
    });
  },
  methods: {
    ...mapActions([
      'setLastVersionSeen',
      'setTutorialMenuActive',
    ]),
    next() {
      this.current = Math.min(this.current + 1, this.info.count);
    },
    previous() {
      this.current = Math.max(this.current - 1, 1);
    },
    onClose() {
      this.active = false;
      this.setLastVersionSeen(this.currentVersion);
      if (process.env.BOTHUB_WEBAPP_TUTORIAL_ENABLED) {
        this.setTutorialMenuActive();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
    .news-modal {
        border-radius: 10px;
        background-color: white;
        padding: 2rem;
        text-align: center;
        width: 42.5rem;
        height: 33.625rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: space-around;

        &__texts{
          margin-left: 4rem;
          margin-right: 4rem;
        }

        h2{
          font-weight: bold;
        }

        p {
          margin: 0.8rem 0 1.7rem ;
        }

        &__image {
            width: auto;
            max-height: 100%;
            &__wrapper {
                width: 100%;
                height: 15rem;
            }
        }

        &__controls {
            margin:1rem 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;

            &__button {
                padding: 1.5rem 3rem;
                width: 119px;
                height: 43px;
                box-shadow: 0px 3px 6px #00000029;
                border-radius: 6px;
                font-weight: bold;
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

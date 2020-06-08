<template>
  <b-modal
    :active="active && shouldShow"
    :width="740"
    @close="onClose">
    <div
      v-if="info.length"
      class="news-modal">
      <h2> {{ info[current].title }} </h2>
      <p> {{ info[current].text }} </p>
      <div class="news-modal__image__wrapper">
        <img
          :src="info[current].img"
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
            v-for="(item, index) in info"
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

export default {
  name: 'NewsModal',
  data() {
    return {
      active: true,
      current: 0,
      info: [],
    };
  },
  computed: {
    ...mapGetters([
      'lastVersionSeen',
    ]),
    shouldShow() {
      return this.lastVersionSeen !== process.env.VERSION;
    },
    hasNext() {
      return this.current < this.info.length - 1;
    },
    hasPrevious() {
      return this.current > 0;
    },
  },
  mounted() {
    this.info = new Array(5).fill([{
      title: 'Possum is awesome',
      text: 'Don\'t you agree?',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Opossum_2.jpg/730px-Opossum_2.jpg',
    },
    {
      title: 'Possum is cute',
      text: 'Isn\'t it?',
      img: 'https://mdc.mo.gov/sites/default/files/styles/detail/public/opossum%20with%20young38RGB.jpg?itok=yoCULeB9',
    }]).flat();
  },
  methods: {
    ...mapActions([
      'setLastVersionSeen',
    ]),
    next() {
      this.current = Math.min(this.current + 1, this.info.length - 1);
    },
    previous() {
      this.current = Math.max(this.current - 1, 0);
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

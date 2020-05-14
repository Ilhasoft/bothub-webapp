<template>
  <b-modal
    :active.sync="openValue">
    <div class="beginner-tutorial">
      <div class="beginner-tutorial__wrapper bh-grid bh-grid--column text-center">
        <h1>{{ $t('webapp.tutorial.create_your_first_bot') }}</h1>
        <div
          v-if="currentValue === 1"
          class="bh-grid__item bh-grid__item--nested">
          <img src="~@/assets/gifs/step1.gif">
          <div class="beginner-tutorial__wrapper__text">
            <div>
              <p>{{ $t('webapp.tutorial.grid1') }}</p>
              <p>{{ $t('webapp.tutorial.grid2') }}</p>
            </div>
          </div>
        </div>
        <div
          v-if="currentValue === 2"
          class="bh-grid__item bh-grid__item bh-grid__item--nested">
          <img src="~@/assets/gifs/step2.gif">
          <div class="beginner-tutorial__wrapper__text">
            <div>
              <p>{{ $t('webapp.tutorial.grid3') }}</p>
              <p>
                {{ $t('webapp.tutorial.grid4') }}</p>
            </div>
          </div>
        </div>
        <div
          v-if="currentValue === 3"
          class="bh-grid__item bh-grid__item--nested">
          <img src="~@/assets/gifs/step3.gif">
          <div class="beginner-tutorial__wrapper__text">
            <p>{{ $t('webapp.tutorial.grid5') }}</p>
          </div>
        </div>
        <div
          v-if="currentValue === 4"
          class="bh-grid__item bh-grid__item--nested">
          <img
            class="beginner-tutorial__wrapper__botinho"
            src="~@/assets/imgs/mascot.svg">
          <div class="beginner-tutorial__wrapper__text">
            <p>{{ $t('webapp.tutorial.grid6') }}</p>
          </div>
        </div>
      </div>
      <div class="beginner-tutorial__wrapper__footer">
        <bh-button
          :class="{
            'beginner-tutorial__wrapper__footer__prev-button--hidden': currentValue === 1,
            'beginner-tutorial__wrapper__footer__prev-button': true,
          }"
          primary
          @click="previous()">{{ $t('webapp.tutorial.previous') }}</bh-button>
        <b-button
          v-if="currentValue !== 4"
          class="beginner-tutorial__wrapper__footer__next-button"
          type="is-primary"
          @click="next()">{{ $t('webapp.tutorial.next') }}</b-button>
        <b-button
          v-else
          class="beginner-tutorial__wrapper__footer__next-button"
          type="is-primary"
          @click="closeModal()">{{ $t('webapp.tutorial.finish') }}</b-button>
        <bh-stepper
          :steps="steps"
          :current-step="currentValue"
        />
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'BeginnerTutorial',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      openValue: this.open,
      steps: 4,
      currentValue: 1,
    };
  },
  watch: {
    open(value) {
      this.openValue = value;
    },
    openValue(value) {
      this.$emit('update:open', value);
    },
  },
  methods: {
    closeModal() {
      this.$emit('update:open', false);
    },
    next() {
      if (this.currentValue < this.steps) {
        this.currentValue += 1;
      }
    },
    previous() {
      if (this.currentValue !== 1) {
        this.currentValue -= 1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';
@import '~bh/src/assets/scss/variables.scss';


.beginner-tutorial {

  background-color: white;
  padding: 0.5rem;

  &__wrapper {
    &__text {
      display: flex;
      min-height: 8rem;
      align-items: center;
      justify-content: center;
    }

    &__botinho {
      margin-top: 3rem;
      width: 50%;
    }

    &__footer {
      width: 100%;
      text-align: center;

      &__next-button {
        display: inline-block;
        float: right;
        margin: 1rem;
      }

      &__prev-button {
        display: inline-block;
        float: left;
        margin: 1rem;

        &--hidden {
          visibility: hidden;
        }
      }
    }
  }
}
</style>

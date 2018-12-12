<template>
  <bh-modal
    :open.sync="openValue"
    title="Create your first repository!">
    <div class="beginner-tutorial">
      <div class="beginner-tutorial__wrapper bh-grid bh-grid--column text-center">
        <div
          v-if="currentTab === 1"
          class="bh-grid__item">
          <p>On the top right of the window, click the "New bot" button.</p>
          <p>Fill in the fields and click on "Creat Bot"</p>
          <img src="~@/assets/gifs/step1.gif">
        </div>
        <div
          v-if="currentTab === 2"
          class="bh-grid__item">
          <p>Start adding content to the interpretation mechanism
          by providing example sentences.</p>
          <p>
            Choose "Training" and enter phrases highlighting the entities and
            relating it to an intention.</p>
          <p> Don't forget to submit your sentences.</p>
          <img src="~@/assets/gifs/step2.gif">
        </div>
        <div
          v-if="currentTab === 3"
          class="bh-grid__item">
          <p>After adding your example, click the status bar to see
          the status of your bot and train the sentences</p>
          <img src="~@/assets/gifs/step3.gif">
        </div>
        <div
          v-if="currentTab === 4"
          class="bh-grid__item">
          <p>That it! Your bot is ready to be used!</p>
          <img
            class="beginner-tutorial__wrapper__botinho"
            src="~@/assets/imgs/mascot.svg">
        </div>
      </div>
      <div class="beginner-tutorial__wrapper__footer">
        <bh-button
          :class="{
            'beginner-tutorial__wrapper__footer__prev-button--hidden': currentTab === 1,
            'beginner-tutorial__wrapper__footer__prev-button': true,
          }"
          primary
          @click="previous()">Previous</bh-button>
        <bh-button
          v-if="currentTab !== 4"
          class="beginner-tutorial__wrapper__footer__next-button"
          ref="nextButton"
          primary
          @click="next()">Next</bh-button>
        <bh-button
          v-else
          class="beginner-tutorial__wrapper__footer__next-button"
          primary
          @click="closeModal()">Finish</bh-button>
        <div class="beginner-tutorial__wrapper__footer__steps">
          <span
            v-for="value in steps"
            :key="value"
            :class="{
              'beginner-tutorial__wrapper__footer__steps__step--active': currentTab === value,
              'beginner-tutorial__wrapper__footer__steps__step': true,
          }"/>
        </div>
      </div>
    </div>
  </bh-modal>
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
      currentTab: 1,
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
      if (this.currentTab < this.steps) {
        this.currentTab += 1;
      }
    },
    previous() {
      if (this.currentTab !== 1) {
        this.currentTab -= 1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';
@import '~bh/src/assets/scss/variables.scss';


.beginner-tutorial {
  &__wrapper {
    max-width: 500px;
    height: 500px;
    margin: auto;

    &__botinho {
      margin-top: 5rem;
      max-width: 300px;
    }

    &__footer {
      width: 100%;
      text-align: center;

      &__steps {
        display: inline-block;
        margin-top: .5rem;

        &__step {
        height: 15px;
        width: 15px;
        margin: 1rem;
        background-color: #bbbbbb;
        border: none;
        border-radius: 50%;
        display: inline-block;
        opacity: 0.5;

          &--active {
            background-color: $color-primary;
            opacity: 1;
            animation-name: floating;
            animation-duration: 1s;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
            @keyframes floating {
              from { transform: translate(0, 0px); }
              65%  { transform: translate(0, -5px); }
              to   { transform: translate(0, 00px); }
            }
          }
        }
      }
      &__next-button {
        display: inline-block;
        float: right;
        margin: 1rem;
      }

      &__prev-button {
        margin: 1rem;
        display: inline-block;
        float: left;

          &--hidden {
           visibility: hidden;
          }
      }
    }
  }
}
</style>

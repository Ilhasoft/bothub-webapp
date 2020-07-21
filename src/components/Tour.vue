<template>
  <v-tour
    :name="name"
    :steps="steps"
    :options="options"
    :callbacks="callbacksTour">
    <template
      slot-scope="tour">
      <div
        v-for="(step, index) of tour.steps"
        :key="index"
      >
        <transition name="fade">
          <v-step
            v-if="tour.currentStep === index"
            :highlight="true"
            :step="step"
            :stop="tour.stop"
            :skip="tour.skip"
            :previous-step="tour.previousStep"
            :next-step="tour.nextStep"
            :is-first="tour.isFirst"
            :is-last="tour.isLast"
            :labels="tour.labels">
            <template>
              <div
                slot="actions">
                <button
                  v-if="!isLast"
                  class="v-step__button v-step__button-previous"
                  @click="prevStep()">{{ options.labels.buttonPrevious }}</button>
                <button
                  class="v-step__button v-step__button-next"
                  @click="nextStep()">{{ options.labels.buttonNext }} </button>
                <button
                  v-if="isLast"
                  class="v-step__button v-step__button-stop"
                  @click="onFinishTutorial()">{{ options.labels.buttonStop }}</button>
              </div>
            </template>
          </v-step>
        </transition>
      </div>
    </template>
  </v-tour>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Tour',
  props: {
    name: {
      type: String,
      default: null,
    },
    stepCount: {
      type: Number,
      default: 0,
    },
    nextEvent: {
      type: Boolean,
      default: false,
    },
    finishEvent: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      options: {
        labels: {
          buttonPrevious: this.$t('webapp.tutorial.previous'),
          buttonNext: this.$t('webapp.tutorial.next'),
          buttonStop: this.$t('webapp.tutorial.finish'),
        },
        highlight: true,
      },
      callbacksTour: {
        onStop: this.stopTutorial,
      },
      beginnerTutorialModalOpen: false,
    };
  },
  computed: {
    ...mapGetters([
      'activeTutorial',
    ]),
    currentStep() {
      return this.$tours[this.name].currentStep;
    },
    isLast() {
      return this.currentStep === this.stepCount - 1;
    },
    steps() {
      if (!this.name) return [];
      let index = 0;
      const steps = [];
      for (index = 0; index < this.stepCount; index += 1) {
        steps.push({
          target: `#tour-${this.name}-step-${index}`,
          content: this.$t(`webapp.tutorial.${this.name}.step_${index}`),
          params: {
            placement: 'left',
            enableScrolling: false,
          },
        });
      }
      return steps;
    },
    checkIntelligence() {
      if (this.name !== 'create_intelligence_forms') return this.name;

      return 'create_intelligence';
    },
  },
  watch: {
    nextEvent() {
      this.nextStep();
    },
    finishEvent() {
      this.onFinishTutorial();
    },
    beginnerTutorialModalOpen() {
      if (this.beginnerTutorialModalOpen === true) {
        this.openBeginnerTutorialModal();
      }
    },
  },
  mounted() {
    // A dynamically added onStop callback
    // this.callbacks.onStop = () => {
    //   document
    //     .querySelector(`#tour-${this.name}-step_0`)
    //     .scrollIntoView({ behavior: 'smooth' });
    // };
    this.startTutorial();
  },
  methods: {
    ...mapActions([
      'finishTutorial',
      'setTutorialInactive',
      'setTutorialMenuActive',
    ]),
    async stopTutorial() {
      await this.setTutorialInactive();
    },
    async setMenuActive() {
      await this.setTutorialMenuActive();
    },
    openBeginnerTutorialModal() {
      this.beginnerTutorialModalOpen = true;
    },
    startTutorial() {
      if (/* this.activeTutorial === this.name && */ this.$tours[this.name]) {
        this.$tours[this.name].start();
      }
    },
    async onFinishTutorial() {
      await this.finishTutorial(this.checkIntelligence);
      this.setMenuActive();
      this.$tours[this.name].skip();
    },
    nextStep() {
      // TODO: Show error message
      if (!this.isBlocked()) this.$tours[this.name].nextStep();
    },
    prevStep() {
      if (!this.previusBlocked()) this.$tours[this.name].previousStep();
    },
    showLastStep() {
      this.$tours[this.name].currentStep = this.steps.length - 1;
    },
    isBlocked() {
      const element = document.querySelector(this.steps[this.currentStep].target).attributes;
      try {
        const { value } = element.getNamedItem('is-step-blocked');
        return value === 'true';
      } catch (_) {
        return false;
      }
    },
    previusBlocked() {
      const element = document.querySelector(this.steps[this.currentStep].target).attributes;
      try {
        const { value } = element.getNamedItem('is-previus-blocked');
        return value === 'true';
      } catch (_) {
        return false;
      }
    },
  },
};
</script>

<style>

body.v-tour--active{
    pointer-events:none;
}
.v-tour{
    pointer-events:auto;
}
/* .v-tour__target--highlighted{
    -webkit-box-shadow:0 0 0 4px rgba(0,0,0,.4);
    box-shadow:0 0 0 4px rgba(0,0,0,.4);
    pointer-events:auto;
    z-index:9999;
} */
.v-tour__target--highlighted {
  box-shadow: 0 0 0 99999px rgba(0,0,0,.4);
  -webkit-box-shadow:0 0 0 99999px rgba(0,0,0,.4);
  pointer-events:auto;
    z-index:9999;
}
.v-tour__target--relative{
    position:relative
}
.v-step[data-v-7c9c03f0]{
    background:#12A391;
    color:#fff;
    width:320px;
    border-radius:3px;
    -webkit-filter:drop-shadow(0 0 2px rgba(0,0,0,.5));
    filter:drop-shadow(0 0 2px rgba(0,0,0,.5));
    padding:1rem;text-align:center;
    z-index:10000;
}
.v-step .v-step__arrow[data-v-7c9c03f0]{
    width:0;
    height:0;
    border-style:solid;
    position:absolute;
    margin:.5rem;
    border-color:#12A391;
}
.v-step .v-step__arrow--dark[data-v-7c9c03f0]{
    border-color:#12A391;
}
.v-step[x-placement^=top][data-v-7c9c03f0]{
    margin-bottom:.5rem;
}
.v-step[x-placement^=top] .v-step__arrow[data-v-7c9c03f0]{
    border-width:.5rem .5rem 0 .5rem;
    border-left-color:transparent;
    border-right-color:transparent;
    border-bottom-color:transparent;
    bottom:-.5rem;
    left:calc(50% - 1rem);
    margin-top:0;
    margin-bottom:0;
}
.v-step[x-placement^=bottom][data-v-7c9c03f0]{
    margin-top:.5rem;
}
.v-step[x-placement^=bottom] .v-step__arrow[data-v-7c9c03f0]{
    border-width:0 .5rem .5rem .5rem;
    border-left-color:transparent;
    border-right-color:transparent;
    border-top-color:transparent;
    top:-.5rem;
    left:calc(50% - 1rem);
    margin-top:0;
    margin-bottom:0;
}
.v-step[x-placement^=right][data-v-7c9c03f0]{
    margin-left:.5rem;
}
.v-step[x-placement^=right] .v-step__arrow[data-v-7c9c03f0]{
    border-width:.5rem .5rem .5rem 0;
    border-left-color:transparent;
    border-top-color:transparent;
    border-bottom-color:transparent;
    left:-.5rem;top:calc(50% - 1rem);
    margin-left:0;margin-right:0;
}
.v-step[x-placement^=left][data-v-7c9c03f0]{
    margin-right:.5rem;
}
.v-step[x-placement^=left] .v-step__arrow[data-v-7c9c03f0]{
    border-width:.5rem 0 .5rem .5rem;
    border-top-color:transparent;
    border-right-color:transparent;
    border-bottom-color:transparent;
    right:-.5rem;top:calc(50% - 1rem);
    margin-left:0;margin-right:0;
}
.v-step__header[data-v-7c9c03f0]{
    margin:-1rem -1rem .5rem;
    padding:.5rem;
    background-color:#454d5d;
    border-top-left-radius:3px;
    border-top-right-radius:3px
}
.v-step__content[data-v-7c9c03f0]{
    margin:0 0 1rem 0;
}
.v-step__button[data-v-7c9c03f0]{
    background:transparent;
    border:.05rem solid #fff;
    border-radius:.1rem;
    color:#fff;
    cursor:pointer;
    display:inline-block;
    font-size:.8rem;height:1.8rem;
    line-height:1rem;
    outline:none;
    margin:0 .2rem;
    padding:.35rem .4rem;
    text-align:center;
    text-decoration:none;
    -webkit-transition:all .2s ease;transition:all .2s ease;
    vertical-align:middle;
    white-space:nowrap
}
.v-step__button[data-v-7c9c03f0]:hover{
    background-color:hsla(0,0%,100%,.95);
    color:#50596c;
}
</style>

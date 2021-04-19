<template>
  <div class="progress-stages">
    <h3>
      {{checkProgressStage.stage}}
    </h3>
    <div
      class="progress-stages__bar__progress">
      <div
        :style="{ width: checkProgressStage.progress + '%' }"
        class="progress-stages__bar__field">
        <div class="progress-stages__bar__division">
          <div
            v-for="index in 3"
            :key="index"
            class="progress-stages__bar__division__stripe"/>
        </div>
        <div
          class="progress-stages__bar__brooch">
          <img
            class="progress-stages__bar__brooch__icon"
            src="@/assets/icons/bothub-white-icon.svg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'IntelligenceForce',
  props: {
    progressValue: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters([
      'getCurrentRepository',
    ]),
    checkProgressStage(){
      if (this.progressValue === 0) {
        return {
          stage: `${this.$t('webapp.evaluate-automatic.stage_1')}: 
          ${this.$t('webapp.evaluate-automatic.starting_evaluate')} `,
          progress: 25
        }
      }
      if (this.progressValue === 1) {
        return {
          stage: `${this.$t('webapp.evaluate-automatic.stage_2')}: 
          ${this.$t('webapp.evaluate-automatic.progress_evaluate')} `,
          progress: 65
        }
      }
      if (this.progressValue === 2) {
        return {
          stage: `${this.$t('webapp.evaluate-automatic.stage_3')}: 
          ${this.$t('webapp.evaluate-automatic.finished_evaluate')} `,
          progress: 100
        }
      }
      return 5
    }
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

.progress-stages{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 3rem;
        margin-top: .8rem;
        border: 1px solid $color-border;
        height: 147px;

        h3 {
          font-size: 1.4rem;
          font-weight: $font-weight-medium;
          color: $color-fake-black;
          margin-bottom: $between-title-subtitle;
        }

    &__bar {
      display: flex;
      margin-bottom: 4rem;

      &__progress {
        margin-top: 1rem;
        height: 20px;
        width: 85%;
        background-color: #EAEAEA;
        box-shadow: 0px 3px 6px #00000029;
      }
      &__field {
        background: linear-gradient(to right, #00FFDD 0%, #12A391 100%);
        height: 20px;
        width: 15px;

        &__icon{
          float: right;
        }
      }
      &__division{
        display:flex;
        width: 68%;
        position:absolute;

        &__stripe{
          border: 2px solid white;
          height: 20px;
          margin-left: 26.9%;
        }
      }
        &__brooch{
          display: flex;
          justify-content: flex-end;

          &__icon{
              margin-top: -0.5rem;
              margin-right: -0.3rem;
              background-color: black;
              box-shadow: 0px 0px 10px 10px rgba(255, 255, 255, 0.356);
              width: 2.4rem;
              padding: 0.5rem  0.4rem;
              border-radius: 6rem;
              z-index: 9999;
          }
        }
    }
    @media screen and (max-width: 45em) {
        h2{
            font-size: 1.4rem;
        }
    }
}

</style>

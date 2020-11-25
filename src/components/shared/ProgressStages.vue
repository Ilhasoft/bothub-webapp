<template>
  <div class="progress-stages">
    <h3>
      Stage 4: In Progress
    </h3>
    <div
      class="progress-stages__bar__progress">
      <div
        :style="{ width: progress + '%' }"
        class="progress-stages__bar__field">
        <div class="progress-stages__bar__division">
          <div
            v-for="index in 5"
            :key="index"
            class="progress-stages__bar__division__stripe"/>
        </div>
        <div
          v-if="hasIconBrooch"
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
  data() {
    return {
      progress: 50,
    };
  },
  computed: {
    ...mapGetters([
      'getCurrentRepository',
    ]),
    hasIconBrooch() {
      if (this.progress < 5) { return false; }
      return true;
    },
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
        background: linear-gradient(to right, #12A391 0%, #00FFDD 100%);
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
          margin-left: 16%;
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

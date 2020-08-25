<template>
  <b-modal
    :active="getTrainResponse"
    :width="567"
    :can-cancel="false">
    <div class="train-response">
      <div
        class="train-response__close">
        <b-icon
          icon="close"
          class="train-response__close__icon"
          @click.native="closeModal()"/>
      </div>
      <div class="train-response__container">
        <h2>{{ $t('webapp.trainings.train_response_title') }}</h2>
        <p>{{ $t('webapp.trainings.train_response_subtitle') }}</p>
        <b-button
          type="is-primary"
          class="train-response__container__button__style"
          @click="closeModal()">
          <span>{{ $t('webapp.train_modal.ok') }}</span>
        </b-button >
      </div>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'TrainResponse',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['getTrainResponse']),
  },
  methods: {
    ...mapActions([
      'setTrainResponse',
    ]),
    closeModal() {
      this.setTrainResponse(false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

  .train-response{
    height: 301px;
    background-color: $color-white;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 8px;

    &__close{
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 1rem 1rem 0 0;
      cursor: pointer;
      &__icon{
        color: #c7c5c5;
      }
    }

    &__container{
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem 2rem;

      h2{
        font-weight: $font-weight-bolder;
      }

      p{
        padding: 0.5rem 3rem 1.6rem;
        text-align: center;
      }

      &__button {
        display: flex;
        justify-content: center;
        align-items: center;

      &__style{
        box-shadow: 0px 3px 6px #00000029;
        width: 96px;
        height: 43px;
        font-weight: $font-weight-bolder;
      }
      }
    }
  }
</style>

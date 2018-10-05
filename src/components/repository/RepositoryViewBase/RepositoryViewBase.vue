<template>
  <layout :title="title || repository && repository.name || undefined">
    <div class="rpstr-vw-bs">
      <bh-card
        v-if="repository && !loading"
        shadow="strong"
        class="rpstr-vw-bs__card">
        <div class="rpstr-vw-bs__card__header">
          <div class="bh-grid bh-grid--ever-desktop">
            <div class="bh-grid__item">
              <repository-info :repository="repository" />
            </div>
            <div
              :class="[
                'bh-grid__item',
                'bh-grid__item--grow-0',
                'rpstr-vw-bs__card__header__mobile-navigation',
            ]">
              <repository-navigation :repository="repository" />
            </div>
          </div>
          <repository-navigation
            :repository="repository"
            class="rpstr-vw-bs__card__header__navigation" />
        </div>
        <div class="rpstr-vw-bs__status-bar">
          <div class="bh-grid">
            <div class="bh-grid__item">
              <div class="bh-grid bh-grid--fit-content rpstr-vw-bs__status-bar__authorization">
                <img
                  src="@/assets/imgs/mascot.svg"
                  alt="mascot"
                  class="rpstr-vw-bs__status-bar__mascot bh-grid__item">
                <div class="rpstr-vw-bs__status-bar__message bh-grid__item">
                  <p>You {{ repository.authorization &&
                  repository.authorization.can_contribute | can_t }} contribute</p>
                  <p>and you {{ repository.authorization &&
                  repository.authorization.can_write | can_t }} write.</p>
                </div>
              </div>
            </div>
            <div
              v-if="authenticated && repository.authorization.can_write "
              class="bh-grid__item rpstr-vw-bs__status-bar__button">
              <bh-button
                primary
                @click="openTrainModal()">
                <bh-icon
                  value="school"
                  size="small"/>
                <span>Train Your Bot</span>
              </bh-button>
            </div>
          </div>
        </div>
        <div class="rpstr-vw-bs__card__content">
          <slot />
        </div>
      </bh-card>
      <div
        v-else-if="errorCode"
        class="rpstr-vw-bs__error">
        <h1>{{ errorCode|errorVerbose }}</h1>
      </div>
      <div
        v-else
        class="rpstr-vw-bs__loading">
        <bh-loading />
      </div>
    </div>
    <train-modal
      v-if="repository"
      :training="training"
      :ready-for-train="repository.ready_for_train"
      :requirements-to-train="repository.requirements_to_train"
      :languages-ready-for-train="repository.languages_ready_for_train"
      :open.sync="trainModalOpen"
      @train="train()" />
    <train-response
      v-if="trainResponseData"
      :train-response="trainResponseData"
      :open.sync="trainResponseOpen" />
  </layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Layout from '@/components/shared/Layout';
import RepositoryInfo from '@/components/repository/RepositoryInfo';
import RepositoryNavigation from './RepositoryNavigation';
import TrainModal from '@/components-v1/repository/TrainModal';
import TrainResponse from '@/components-v1/repository/TrainResponse';


const ERROR_VERBOSE_LOOKUP = {
  404: 'Bot not found',
};

export default {
  name: 'RepositoryViewBase',
  inject: {
    updateRepository: {
      default: null,
    },
  },
  components: {
    Layout,
    RepositoryInfo,
    RepositoryNavigation,
    TrainModal,
    TrainResponse,
  },
  filters: {
    errorVerbose: code => (ERROR_VERBOSE_LOOKUP[code] || code),
  },
  props: {
    repository: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: true,
    },
    errorCode: {
      type: Number,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      trainModalOpen: false,
      trainResponseData: null,
      trainResponseOpen: false,
      training: false,
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
    ]),
  },
  methods: {
    ...mapActions([
      'trainRepository',
    ]),
    async train() {
      const { ownerNickname, slug } = this.$route.params;
      this.training = true;
      try {
        const response = await this.trainRepository({ ownerNickname, slug });
        this.trainResponseData = response.data;
        this.trainResponseOpen = true;
      } catch (e) {
        this.$toast.open({
          message: 'Repository not trained :(',
          type: 'is-danger',
        });
      }
      this.trainModalOpen = false;
      this.training = false;
      await this.updateRepository(false);
    },
    openTrainModal() {
      this.trainModalOpen = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';
@import '~bh/src/assets/scss/variables.scss';


.rpstr-vw-bs {
  $navigation-height: 4rem;
  $header-height: (14rem + $navigation-height);
  $card-width: 1200px;

  margin: 4rem 0;

  &::before {
    content: "";
    display: block;
    height: $header-height;
    background-color: $color-primary;
    margin-bottom: -($header-height);

    @media screen and (max-width: $card-width) {
      display: none;
    }
  }

   &__status-bar {
    background-color: $color-lighter-grey;
    padding: 1rem;

    &__mascot {
      width: 4rem;
      height: 4rem;
    }

    &__authorization {
      margin: auto;
    }

    &__message {
      align-self: center;
    }

    &__button {
      align-self: center;
      text-align: center;
    }
  }

  &__card {
    max-width: $card-width;
    margin: 0 auto;

    &__header {
      position: relative;
      min-height: $header-height;
      padding: 1rem 1rem $navigation-height;

      &__navigation {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;

        @media screen and (max-width: $mobile-width) {
          display: none;
        }
      }

      &__mobile-navigation {
        display: none;

        @media screen and (max-width: $mobile-width) {
          display: block;
        }
      }

      @media screen and (max-width: $mobile-width) {
        min-height: auto;
        padding: 1rem;
      }
    }

    @media screen and (max-width: $card-width) {
      border-radius: 0;
    }
  }

  &__error,
  &__loading {
    text-align: center;
  }

  &__error {
    padding: .5rem;
    h1 {
      font-size: 3rem;
      line-height: 4rem;
      font-weight: $font-weight-bolder;
      color: black;
      opacity: .5;
    }
  }

  @media screen and (max-width: $card-width) {
    margin: 1rem 0;
  }
}
</style>

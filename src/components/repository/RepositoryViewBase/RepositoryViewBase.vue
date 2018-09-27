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
        <div class="rpstr-vw-bs__general-header">
          <img
            src="@/assets/imgs/mascot.svg"
            alt="mascot"
            class="rpstr-vw-bs__general-header__mascot">
          <div class="rpstr-vw-bs__general-header__message">
            <p>You {{ repository.authorization &&
            repository.authorization.can_contribute | can_t }} contribute</p>
            <p>and you {{ repository.authorization &&
            repository.authorization.can_write | can_t }} write.</p>
          </div>
          <bh-button
            class="rpstr-vw-bs__general-header__buttons"
            primary
            @click="trainModalOpen=true">
            <bh-icon
              value="school"
              size="small"/>
            Train Your Bot
          </bh-button>
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
      :ready-for-train="repository.ready_for_train"
      :requirements-to-train="repository.requirements_to_train"
      :languages-ready-for-train="repository.languages_ready_for_train"
      :open.sync="trainModalOpen"
      @train="train()"
    />
  </layout>
</template>

<script>
import { mapActions } from 'vuex';
import Layout from '@/components/shared/Layout';
import RepositoryInfo from '@/components/repository/RepositoryInfo';
import RepositoryNavigation from './RepositoryNavigation';
import TrainModal from '@/components/repository/TrainModal';


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
      trainResponse: null,
    };
  },
  methods: {
    ...mapActions([
      'trainRepository',
    ]),
    async train() {
      const { ownerNickname, slug } = this.$route.params;
      this.training = true;
      try {
        const response = this.trainRepository({ ownerNickname, slug });
        this.trainResponse = response.data;
      } catch (e) {
        this.$toast.open({
          message: 'Repository not trained :(',
          type: 'is-danger',
        });
      }
      this.training = false;
      await this.updateRepository(true);
    },
  },
  onCloseTrainResponseModal() {
    this.trainResponse = null;
  },
};
</script>


<style lang="scss" scoped>
@import '~@/bh/assets/scss/colors.scss';
@import '~@/bh/assets/scss/variables.scss';


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

   &__general-header {
    background-color: $color-lighter-grey;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;

    &__mascot {
      width: 4rem;
      height: 4rem;

    }

    &__message {
      margin-left: 1rem;

    }

    &__buttons {
      margin-left: 4rem;

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

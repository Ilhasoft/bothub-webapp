<template>
  <layout :title="title || repository && (repository.name || repository.slug) || undefined">
    <div class="rpstr-vw-bs">
      <bh-card
        v-if="repository"
        shadow="strong"
        class="rpstr-vw-bs__card">
        <div class="rpstr-vw-bs__card__header">
          <div class="bh-grid bh-grid--row">
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
          <div class="bh-grid bh-grid--space-between">
            <div class="bh-grid__item">
              <div class="bh-grid text-color-grey">
                <div class="bh-grid__item">
                  <bh-icon value="flag-variant" />
                  <span>{{ repository.available_languages.length }} languages</span>
                </div>
                <div class="bh-grid__item">
                  <bh-icon value="botinho" />
                  <span>{{ repository.examples__count }} examples</span>
                </div>
              </div>
            </div>
            <div class="bh-grid__item">
              <div
                v-if="authenticated && repository.authorization.can_write"
                class="bh-grid">
                <div
                  v-if="warningsCount > 0"
                  class="bh-grid__item">
                  <a
                    href="#warnings"
                    @click.prevent="openWarningsModal()">
                    <bh-icon value="alert" />
                    <span>{{ warningsCount }} warnings</span>
                  </a>
                </div>
                <div
                  v-if="requirementsCount > 0"
                  class="bh-grid__item">
                  <a
                    href="#requirements"
                    @click.prevent="openTrainModal()">
                    <bh-icon value="clipboard-alert" />
                    <span>{{ requirementsCount }} requirements missed</span>
                  </a>
                </div>
                <div class="bh-grid__item">
                  <a
                    :class="{
                      'text-color-grey': !repository.ready_for_train,
                    }"
                    href="#train"
                    @click.prevent="openTrainModal()">
                    <bh-icon value="school" />
                    <span>Train</span>
                  </a>
                </div>
              </div>
              <div
                v-else-if="authenticated && repository.available_request_authorization"
                class="bh-grid">
                <div class="bh-grid__item">
                  <a
                    href="#requestauthorization"
                    @click.prevent="openRequestAuthorizationModal()">
                    <bh-icon />
                    <span>Request Authorization</span>
                  </a>
                </div>
              </div>
              <div
                v-else-if="authenticated
                  && repository.request_authorization
                && !repository.request_authorization.approved_by"
                class="bh-grid">
                <div class="bh-grid__item">
                  <span class="text-color-grey">Authorization Requested</span>
                </div>
              </div>
              <div
                v-else-if="!authenticated"
                class="bh-grid">
                <div class="bh-grid__item">
                  <a
                    href="#signin"
                    @click.prevent="openLoginModal()">
                    <bh-icon value="account" />
                    <span>Sign in</span>
                  </a>
                </div>
              </div>
              <div
                v-else
                class="bh-grid">
                <div class="bh-grid__item">&nbsp;</div>
              </div>
              <analyze-text-drawer
                v-if="repository && repository.owner__nickname && repository.slug && authenticated"
                :owner-nickname="repository.owner__nickname"
                :slug="repository.slug"
                :default-language="repository.language"
                :available-languages="repository.available_languages" />
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
    <request-authorization-modal
      v-if="repository"
      :open.sync="requestAuthorizationModalOpen"
      :repository-uuid="repository.uuid"
      @requestDispatched="onAuthorizationRequested()" />
    <warning-modal
      v-if="repository"
      :languages-warnings="repository.languages_warnings"
      :open.sync="warningsModelOpen" />
  </layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Layout from '@/components/shared/Layout';
import RepositoryInfo from '@/components/repository/RepositoryInfo';
import RepositoryNavigation from './RepositoryNavigation';
import TrainModal from '@/components/repository/TrainModal';
import TrainResponse from '@/components/repository/TrainResponse';
import AnalyzeTextDrawer from '@/components-v1/repository/AnalyzeTextDrawer';
import RequestAuthorizationModal from '@/components/repository/RequestAuthorizationModal';
import WarningModal from '@/components/repository/WarningModal';


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
    AnalyzeTextDrawer,
    RequestAuthorizationModal,
    WarningModal,
  },
  filters: {
    errorVerbose: code => (ERROR_VERBOSE_LOOKUP[code] || code),
  },
  props: {
    repository: {
      type: Object,
      default: null,
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
      requestAuthorizationModalOpen: false,
      warningsModelOpen: false,
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
    ]),
    requirementsCount() {
      console.log(Object.keys(this.repository.requirements_to_train));
      return Object
        .keys(this.repository.requirements_to_train)
        .reduce(
          (previous, lang) => this.repository.requirements_to_train[lang].length + previous,
          0,
        );
    },
    warningsCount() {
      return Object
        .keys(this.repository.languages_warnings)
        .reduce(
          (previous, lang) => this.repository.languages_warnings[lang].length + previous,
          0,
        );
    },
  },
  methods: {
    ...mapActions([
      'trainRepository',
      'openLoginModal',
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
    openRequestAuthorizationModal() {
      this.requestAuthorizationModalOpen = true;
    },
    onAuthorizationRequested() {
      this.requestAuthorizationModalOpen = false;
      this.$toast.open({
        message: 'Request made! Wait for review of an admin.',
        type: 'is-success',
      });
      this.updateRepository(false);
    },
    openWarningsModal() {
      this.warningsModelOpen = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';
@import '~bh/src/assets/scss/variables.scss';


.rpstr-vw-bs {
  $navigation-height: 4rem;
  $header-height: (16rem + $navigation-height);
  $card-width: 1200px;

  &::before {
    content: "";
    display: block;
    height: ($header-height + 4rem);
    background-color: $color-primary;
    margin-bottom: -($header-height);

    @media screen and (max-width: $card-width) {
      display: none;
    }
  }

  &__status-bar {
    background-color: $color-white-fake;
  }

  &__card {
    max-width: $card-width;
    margin: 0 auto 4rem;

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

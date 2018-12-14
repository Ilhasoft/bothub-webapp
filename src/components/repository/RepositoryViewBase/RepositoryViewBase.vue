<template>
  <layout
    :title="currentTitle"
    :loading="ready && repository && repository.loading">
    <div class="rpstr-vw-bs">
      <div
        v-if="!ready"
        class="rpstr-vw-bs__loading">
        <bh-loading />
      </div>
      <bh-card
        v-else-if="repository"
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
        <div
          class="rpstr-vw-bs__status-bar clickable"
          @click="onStatusBarClick()">
          <div class="bh-grid bh-grid--space-between">
            <div class="bh-grid__item">
              <div class="bh-grid text-color-grey-dark">
                <div class="rpstr-vw-bs__status-bar__icons-align bh-grid__item">
                  <bh-icon value="language" />
                  <span class="rpstr-vw-bs__status-bar__text-information">
                    {{ repository.available_languages.length }} languages</span>
                </div>
                <div class="rpstr-vw-bs__status-bar__icons-align bh-grid__item">
                  <bh-icon value="sentence" />
                  <span class="rpstr-vw-bs__status-bar__text-information">
                    {{ repository.examples__count }} sentences</span>
                </div>
              </div>
            </div>
            <div class="bh-grid__item">
              <div
                v-if="authenticated && repository.authorization.can_write"
                class="bh-grid">
                <div
                  v-if="warningsCount > 0"
                  class="text-color-grey-dark bh-grid__item">
                  <div class="rpstr-vw-bs__status-bar__icons-align">
                    <bh-icon value="warning" />
                    <span class="rpstr-vw-bs__status-bar__text-information">
                      {{ warningsCount }} warnings</span>
                  </div>
                </div>
                <div
                  v-if="requirementsCount > 0"
                  class="text-color-grey-dark bh-grid__item">
                  <div class="rpstr-vw-bs__status-bar__icons-align">
                    <bh-icon value="close-circle" />
                    <span class="rpstr-vw-bs__status-bar__text-information">
                      {{ requirementsCount }} requirements missed</span>
                  </div>
                </div>
                <div
                  v-if="repository.ready_for_train"
                  class="bh-grid__item">
                  <div class="text-color-primary rpstr-vw-bs__status-bar__icons-align">
                    <bh-icon value="botinho" />
                    <span class="rpstr-vw-bs__status-bar__text-information">
                      Your bot is ready to be trained</span>
                  </div>
                </div>
              </div>
              <div
                v-else-if="authenticated && repository.available_request_authorization"
                class="bh-grid">
                <div class="bh-grid__item">
                  <div class="text-color-primary rpstr-vw-bs__status-bar__icons-align">
                    <bh-icon />
                    <span
                      class="rpstr-vw-bs__status-bar__text-information">Request Authorization</span>
                  </div>
                </div>
              </div>
              <div
                v-else-if="authenticated
                  && repository.request_authorization
                && !repository.request_authorization.approved_by"
                class="bh-grid">
                <div class="bh-grid__item">
                  <span class="text-color-grey-dark">Authorization Requested</span>
                </div>
              </div>
              <div
                v-else-if="!authenticated"
                class="bh-grid">
                <div class="bh-grid__item">
                  <div class="text-color-primary rpstr-vw-bs__status-bar__icons-align">
                    <bh-icon value="account" />
                    <span class="rpstr-vw-bs__status-bar__text-information">Sign in</span>
                  </div>
                </div>
              </div>
              <div
                v-else
                class="bh-grid">
                <div class="bh-grid__item">&nbsp;</div>
              </div>
            </div>
          </div>
        </div>
        <analyze-text-drawer
          v-if="repository && repository.owner__nickname && repository.slug && authenticated"
          :owner-nickname="repository.owner__nickname"
          :slug="repository.slug"
          :default-language="repository.language"
          :available-languages="repository.available_languages" />
        <div class="rpstr-vw-bs__card__content">
          <slot />
        </div>
      </bh-card>
      <div
        v-else-if="errorCode"
        class="rpstr-vw-bs__error">
        <h1>{{ errorCode|errorVerbose }}</h1>
      </div>
    </div>
    <train-modal
      v-if="repository"
      :training="training"
      :ready-for-train="repository.ready_for_train"
      :requirements-to-train="repository.requirements_to_train"
      :languages-ready-for-train="repository.languages_ready_for_train"
      :open.sync="trainModalOpen"
      :languages-warnings="repository.languages_warnings"
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
  </layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Layout from '@/components/shared/Layout';
import RepositoryInfo from '@/components/repository/RepositoryInfo';
import RepositoryNavigation from './RepositoryNavigation';
import TrainModal from '@/components/repository/TrainModal';
import TrainResponse from '@/components/repository/TrainResponse';
import AnalyzeTextDrawer from '@/components/repository/AnalyzeTextDrawer';
import RequestAuthorizationModal from '@/components/repository/RequestAuthorizationModal';


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
  },
  filters: {
    errorVerbose: code => (ERROR_VERBOSE_LOOKUP[code] || code),
  },
  props: {
    ready: {
      type: Boolean,
      default: false,
    },
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
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
    ]),
    currentTitle() {
      if (this.title) {
        return this.title;
      }

      if (this.repository) {
        if (this.repository.name) {
          return this.repository.name;
        }

        return `${this.repository.owner__nickname}/${this.repository.slug}`;
      }

      return undefined;
    },
    requirementsCount() {
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
    onStatusBarClick() {
      if (!this.authenticated) {
        this.openLoginModal();
      }
      if (this.authenticated && this.repository.available_request_authorization) {
        this.openRequestAuthorizationModal();
      }
      if (this.authenticated && this.repository.authorization.can_write) {
        this.trainModalOpen = true;
      }
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
    background-color: $color-fake-white;
    padding: 0 1.5rem;

    &__icons-align {
      display: flex;
      align-items: center;
    }

    &__text-information {
      margin: 0 .25rem;
    }

    &:hover {
      background-color: $color-grey-light;
      transition: 0.4s;
    }
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

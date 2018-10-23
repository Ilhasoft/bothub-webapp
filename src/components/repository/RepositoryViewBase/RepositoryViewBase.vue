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
                v-if="repository && authenticated"
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
    <bh-modal :open.sync="requestAuthorizationModal">
      <div v-if="repository && requestAuthorizationModal">
        <div class="bh-grid bh-grid--column">
          <div class="bh-grid__item">
            <h1 class="bh-title-2">Request Authorization</h1>
          </div>
          <request-authorization-form
            :repository-uuid="repository.uuid"
            class="bh-grid__item"
            @requested="onAuthorizationRequested()" />
        </div>
      </div>
    </bh-modal>
    <bh-modal :open.sync="warningsModelOpen">
      <div v-if="repository">
        <div class="bh-grid">
          <div class="bh-grid__item">
            <h2>Warnings</h2>
            <div
              v-for="(warnings, lang) in repository.languages_warnings"
              :key="lang">
              <div><strong>{{ lang | languageVerbose }}</strong></div>
              <div
                v-for="(warning, index) in warnings"
                :key="index">{{ warning }}</div>
            </div>
          </div>
        </div>
      </div>
    </bh-modal>
  </layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Layout from '@/components/shared/Layout';
import RepositoryInfo from '@/components/repository/RepositoryInfo';
import RepositoryNavigation from './RepositoryNavigation';
import TrainModal from '@/components/repository/TrainModal';
import TrainResponse from '@/components-v1/repository/TrainResponse';
import RequestAuthorizationForm from '@/components/repository/RequestAuthorizationForm';
import AnalyzeTextDrawer from '@/components-v1/repository/AnalyzeTextDrawer';


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
    RequestAuthorizationForm,
    AnalyzeTextDrawer,
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
      requestAuthorizationModal: false,
      warningsModelOpen: false,
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
    ]),
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
    openTrainModal() {
      this.trainModalOpen = true;
    },
    openRequestAuthorizationModal() {
      this.requestAuthorizationModal = true;
    },
    onAuthorizationRequested() {
      this.requestAuthorizationModal = false;
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

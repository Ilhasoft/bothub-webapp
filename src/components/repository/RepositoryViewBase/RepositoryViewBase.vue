<template>
  <div class="rpstr-vw-bs">
    <div
      v-if="!repository || (repository && !repository.name && repository.loading)"
      class="rpstr-vw-bs__loading">
      <bh-loading />
    </div>
    <div
      v-else-if="repository && !repository.fatal"
      shadow="strong"
      class="rpstr-vw-bs__card">
      <div class="rpstr-vw-bs__card__header">
        <repository-info
          :repository="repository"
          class="bh-grid__item rpstr-vw-bs__card__header__info" />
        <repository-navigation
          :repository="repository"
          class="rpstr-vw-bs__card__header__navigation bh-grid__item--grow-1" />
        <div
          :class="[
            'bh-grid__item',
            'bh-grid__item--grow-0',
            'rpstr-vw-bs__card__header__mobile-navigation',
        ]">
          <repository-navigation :repository="repository" />
        </div>
        <div
          v-if="authenticated && openMyProfile"
          class="rpstr-vw-bs__card__header__avatar">
          <bh-dropdown position="left">
            <user-avatar
              slot="trigger"
              :profile="myProfile"
              size="medium" />
            <bh-dropdown-item @click="openMyProfile()">
              {{ myProfile.name || '...' }}
            </bh-dropdown-item>
            <bh-dropdown-item
              @click="openNewRepositoryModal()">
              Start your bot
            </bh-dropdown-item>
            <bh-dropdown-item @click="logout()">
              Logout
            </bh-dropdown-item>
          </bh-dropdown>
        </div>
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
    </div>
    <div
      v-else-if="repository && repository.fatal && errorCode"
      class="rpstr-vw-bs__error">
      <h1>{{ errorCode|errorVerbose }}</h1>
    </div>
    <div
      v-else-if="repository && repository.fatal"
      class="rpstr-vw-bs__error">
      <h1>Error to retrieve bot</h1>
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
    <site-footer class="rpstr-vw-bs__footer"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import UserAvatar from '@/components/user/UserAvatar';
import SiteFooter from '@/components-v1/shared/SiteFooter';
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
    SiteFooter,
    RepositoryInfo,
    RepositoryNavigation,
    TrainModal,
    TrainResponse,
    AnalyzeTextDrawer,
    RequestAuthorizationModal,
    UserAvatar,
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
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
      'myProfile',
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
      'logout',
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
    openMyProfile() {
      this.$router.push({ name: 'myProfile' });
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
  $card-width: 100%;
  background-color: white;
  height: 100%;

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
    &__header {
      position: relative;
      display: flex;
      justify-content: space-around;
      align-items: center;

    &__avatar {
      border: .120rem solid $color-primary;
      border-radius: 50%;
      margin-right: 3rem;
      margin-top: 3vh;

    }

    &__info {
      margin-left: 2rem;
    }

      &__navigation {
        position: absolute;
        bottom: 0rem;
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

  &__footer {
    margin-top: 30rem;
  }
}
</style>

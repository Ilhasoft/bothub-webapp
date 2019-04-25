<template>
  <div
    id="rpstr-vw-bs"
    class="rpstr-vw-bs">
    <div
      v-if="!repository || (repository && !repository.name && repository.loading)"
      class="rpstr-vw-bs__loading">
      <bh-loading />
    </div>
    <div
      v-else-if="repository && !repository.fatal"
      shadow="strong"
      class="rpstr-vw-bs__wrapper">
      <div class="rpstr-vw-bs__wrapper__header">
        <repository-info
          :repository="repository"
          class="bh-grid__item rpstr-vw-bs__wrapper__header__info" />
        <repository-navigation
          :repository="repository"
          class="rpstr-vw-bs__wrapper__header__navigation bh-grid__item--grow-1" />
        <div
          :class="[
            'bh-grid__item',
            'bh-grid__item--grow-0',
            'rpstr-vw-bs__wrapper__header__mobile-navigation',
        ]">
          <repository-navigation :repository="repository" />
        </div>
        <div
          v-if="authenticated && openMyProfile"
          class="bh-grid__item--grow-0 rpstr-vw-bs__wrapper__header__avatar">
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
        class="rpstr-vw-bs__status-bar clickable">
        <div class="rpstr-vw-bs__status-bar bh-grid">
          <side-bar-navigation
            :repository="repository"
            class="bh-grid__item rpstr-vw-bs__wrapper__header__info--mobile"/>
          <div class="rpstr-vw-bs__status-bar__repo-info bh-grid text-color-grey-dark">
            <div class="rpstr-vw-bs__status-bar__icons-align bh-grid__item">
              <bh-icon
                class="rpstr-vw-bs__status-bar__icons-align--size"
                value="language" />
              <span class="rpstr-vw-bs__status-bar__text-information">
                {{ repository.available_languages.length }}</span>
              <span class="hide-mobile">languages</span>
            </div>
            <div class="rpstr-vw-bs__status-bar__icons-align bh-grid__item">
              <bh-icon
                class="rpstr-vw-bs__status-bar__icons-align--size"
                value="sentence" />
              <span class="rpstr-vw-bs__status-bar__text-information">
                {{ repository.examples__count }}</span>
              <span class="hide-mobile">sentences</span>
            </div>
            <div class="gap"/>
          </div>
          <div
            v-if="authenticated && repository.authorization.can_write"
            class="bh-grid rpstr-vw-bs__status-bar__repo-info">
            <div
              v-if="warningsCount > 0"
              class="rpstr-vw-bs__status-bar__icons-align text-color-grey-dark bh-grid__item">
              <bh-icon
                class="rpstr-vw-bs__status-bar__icons-align--size"
                value="warning" />
              <span class="rpstr-vw-bs__status-bar__text-information">
                {{ warningsCount }}
              </span>
              <span class="hide-mobile">warnings</span>
            </div>

            <div
              v-if="requirementsCount > 0"
              class="rpstr-vw-bs__status-bar__icons-align text-color-grey-dark bh-grid__item">
              <bh-icon
                class="rpstr-vw-bs__status-bar__icons-align--size"
                value="close-circle" />
              <span class="rpstr-vw-bs__status-bar__text-information">
                {{ requirementsCount }}</span>
              <span class="hide-mobile">requirements missed</span>
            </div>
            <div
              v-if="!repository.ready_for_train"
              class="text-color-primary bh-grid__item rpstr-vw-bs__status-bar__icons-align">
              <bh-icon
                class="rpstr-vw-bs__status-bar__icons-align--size"
                value="botinho" />
              <span class="rpstr-vw-bs__status-bar__text-information hide-mobile">
                Your bot is ready to be trained</span>
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
      <analyze-text-drawer
        v-if="repository && repository.owner__nickname && repository.slug && authenticated"
        :owner-nickname="repository.owner__nickname"
        :slug="repository.slug"
        :default-language="repository.language"
        :available-languages="repository.available_languages" />
      <div class="rpstr-vw-bs__wrapper__content">
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
    <new-repository-modal
      :active="newRepositoryModalOpen"
      @requestClose="openNewRepositoryModal()" />
    <site-footer class="rpstr-vw-bs__footer"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import NewRepositoryModal from '@/components-v1/shared/NewRepositoryModal';
import UserAvatar from '@/components/user/UserAvatar';
import SiteFooter from '@/components-v1/shared/SiteFooter';
import RepositoryInfo from '@/components/repository/RepositoryInfo';
import RepositoryNavigation from './RepositoryNavigation';
import TrainModal from '@/components/repository/TrainModal';
import TrainResponse from '@/components/repository/TrainResponse';
import AnalyzeTextDrawer from '@/components/repository/AnalyzeTextDrawer';
import RequestAuthorizationModal from '@/components/repository/RequestAuthorizationModal';
import SideBarNavigation from '@/components/shared/SideBar';


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
    NewRepositoryModal,
    SideBarNavigation,
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
      newRepositoryModalOpen: false,
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
  mounted() {
    this.updateMyProfile();
  },
  methods: {
    ...mapActions([
      'trainRepository',
      'openLoginModal',
      'logout',
      'updateMyProfile',
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
    // onStatusBarClick() {
    //   if (!this.authenticated) {
    //     this.openLoginModal();
    //   }
    //   if (this.authenticated && this.repository.available_request_authorization) {
    //     this.openRequestAuthorizationModal();
    //   }
    //   if (this.authenticated && this.repository.authorization.can_write) {
    //     this.trainModalOpen = true;
    //   }
    // },
    openMyProfile() {
      this.$router.push({ name: 'myProfile' });
    },
    openRequestAuthorizationModal() {
      this.requestAuthorizationModalOpen = true;
    },
    openNewRepositoryModal() {
      this.newRepositoryModalOpen = !this.newRepositoryModalOpen;
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
  $medium-screen: 1035px;
  $header-height: (16rem + $navigation-height);
  $wrapper-width: 100%;
  background-color: $color-white;
  height: 100%;


  &__status-bar {
    background-color: $color-fake-white;
    padding: 0 1.5rem;
    justify-content: space-between;
    flex-direction: row;

      @media screen and (max-width: $medium-screen) {
        justify-content: space-around;
      }

    &__repo-info {
       @media screen and (max-width: $medium-screen) {
        flex-grow: 1;
        justify-content: space-between;
        flex-direction: row;
      }
    }

    &__icons-align {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-grow: 0;

      &--size {
        @media screen and (max-width: $medium-screen) {
          height: 1.5rem;
          width: 1.5rem;
        }
      }
    }

    &__text-information {
      margin: 0 .25rem;
    }

    &:hover {
      background-color: $color-grey-light;
      transition: 0.4s;
    }
  }

  &__wrapper {
    &__header {
      position: relative;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 0px;

      @media screen and (max-width: $medium-screen) {
        display: none;
      }

      &__avatar {
        border: .120rem solid $color-primary;
        border-radius: 50%;
        margin-right: 3rem;

        @media screen and (max-width: $medium-screen) {
          display: none;
        }
      }

      &__info {
        margin-left: 2rem;
        flex-direction: row;

        @media screen and (max-width: $medium-screen) {
          display: none;
        }


        &--mobile {
          display: none;
          @media screen and (max-width: $medium-screen) {
            display: inline;
            flex-grow: 0;
            margin:0px;
          }
        }
      }

      &__navigation {
        position: absolute;
        bottom: 0rem;
        left: 0;
        width: 100%;

        @media screen and (max-width: $medium-screen) {
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

    &__content {
      max-width: 80%;
      margin: 0 auto;
    }

    @media screen and (max-width: $wrapper-width) {
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

  @media screen and (max-width: $wrapper-width) {
    margin: 1rem 0;
  }

  &__footer {
    margin-top: 60vh;
  }
}

.hide-mobile {
  @media screen and (max-width: 1035px) {
    display: none;
  }
}
</style>

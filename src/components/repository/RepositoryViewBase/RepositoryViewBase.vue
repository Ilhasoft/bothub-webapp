<template>
  <div
    id="rpstr-vw-bs"
    class="rpstr-vw-bs">
    <div
      shadow="strong"
      class="rpstr-vw-bs__wrapper">
      <div class="rpstr-vw-bs__wrapper__header">
        <router-link
          class="rpstr-vw-bs__wrapper__header__logo"
          to="/home">
          <img
            src="~@/assets/imgs/logo.svg"
            alt="bothub">
        </router-link>
        <div>
          <repository-info
            v-if="repository && repository.name"
            :repository="repository" />
        </div>
        <div
          :class="[
            'bh-grid__item',
            'bh-grid__item--grow-0',
            'rpstr-vw-bs__wrapper__header__mobile-navigation',
        ]"/>
        <div
          v-if="authenticated && openMyProfile"
          class="bh-grid__item--grow-0 rpstr-vw-bs__wrapper__header__options">
          <user-avatar
            :profile="myProfile"
            size="normal"
            class="rpstr-vw-bs__wrapper__header__options__avatar"/>
          <bh-dropdown position="left">
            <bh-icon
              slot="trigger"
              value="menu-down"
              size="small"
              class="rpstr-vw-bs__wrapper__header__options__dropdown"/>
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
      <repository-navigation
        v-if="repository && !repository.fatal && repository.name"
        :repository="repository"
        class="rpstr-vw-bs__wrapper__navigation hide-mobile" />
      <div
        v-if="repository && !repository.fatal && repository.name"
        class="rpstr-vw-bs__status-bar">
        <div class="rpstr-vw-bs__status-bar rpstr-vw-bs__wrapper__content bh-grid">
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
              v-if="repository.ready_for_train"
              class="text-color-primary bh-grid__item rpstr-vw-bs__status-bar__icons-align">
              <bh-icon
                class="rpstr-vw-bs__status-bar__icons-align--size hide-mobile"
                value="botinho" />
              <span class="rpstr-vw-bs__status-bar__text-information hide-mobile">
                Your bot is ready to be trained</span>
            </div>
          </div>
          <div
            v-else-if="authenticated && repository.available_request_authorization"
            class="bh-grid hide-mobile">
            <div
              class="bh-grid__item clickable"
              @click.prevent="openRequestAuthorizationModal">
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
            class="bh-grid hide-mobile">
            <div class="bh-grid__item">
              <span class="text-color-grey-dark">Authorization Requested</span>
            </div>
          </div>
          <div
            v-else-if="!authenticated"
            class="bh-grid hide-mobile">
            <div
              class="bh-grid__item clickable"
              @click.prevent="openLoginModal">
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
        v-if="repository && repository.uuid && authenticated"
        :repository-uuid="repository.uuid"
        :default-language="repository.language"
        :available-languages="repository.available_languages" />
      <div
        v-if="repository && !repository.fatal && repository.name"
        class="rpstr-vw-bs__wrapper__content">
        <slot />
      </div>
    </div>
    <div
      v-if="repository && repository.fatal && errorCode"
      class="rpstr-vw-bs__error">
      <h1>{{ errorCode|errorVerbose }}</h1>
    </div>
    <div
      v-else-if="repository && repository.fatal"
      class="rpstr-vw-bs__error">
      <h1>Error to retrieve bot</h1>
    </div>
    <div
      v-else-if="!repository || (repository && !repository.name && repository.loading)"
      class="rpstr-vw-bs__loading">
      <bh-loading />
    </div>
    <new-repository-modal
      :active="newRepositoryModalOpen"
      @requestClose="openNewRepositoryModal()" />
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
import NewRepositoryModal from '@/components/shared/NewRepositoryModal';
import RequestAuthorizationModal from '@/components/repository/RequestAuthorizationModal';
import UserAvatar from '@/components/user/UserAvatar';
import SiteFooter from '@/components/shared/SiteFooter';
import RepositoryInfo from '@/components/repository/RepositoryInfo';
import RepositoryNavigation from './RepositoryNavigation';
import AnalyzeTextDrawer from '@/components/repository/AnalyzeTextDrawer';
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
    AnalyzeTextDrawer,
    UserAvatar,
    NewRepositoryModal,
    RequestAuthorizationModal,
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
      newRepositoryModalOpen: false,
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
  mounted() {
    this.updateMyProfile('user');
  },
  methods: {
    ...mapActions([
      'logout',
      'updateMyProfile',
      'openLoginModal',
    ]),
    openMyProfile() {
      this.$router.push({ name: 'myProfile' });
    },
    openNewRepositoryModal() {
      this.newRepositoryModalOpen = !this.newRepositoryModalOpen;
    },
    openRequestAuthorizationModal() {
      this.requestAuthorizationModalOpen = true;
    },
    onAuthorizationRequested() {
      this.requestAuthorizationModalOpen = false;
      this.$bhToastNotification({
        message: 'Request made! Wait for review of an admin.',
        type: 'success',
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
      justify-content: space-between;
      flex-direction: row;
      padding: 0;

      :nth-child(3n) {
        // margin-right: 8px;
      }

      @media screen and (max-width: $medium-screen) {
        justify-content: space-around;
      }

      &__repo-info {
        @media screen and (max-width: $medium-screen) {
          flex-grow: 0;
          flex-direction: row;
          justify-content: flex-end;
          padding: 0px;
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
    }

    &__wrapper {
      &__header {
        position: relative;
        display: grid;
        grid-template-columns: 10% 1fr 10%;
        padding: 1rem 1.5rem;
        border-bottom: .120rem solid whitesmoke;

        @media screen and (max-width: $medium-screen) {
          display: none;
        }

        &__logo {
          align-self: center;
        }

        &__options {
          display: flex;
          align-items: center;
          justify-content: flex-end;

          &__avatar {
            text-align: right;
            cursor: auto;
            border: .120rem solid $color-primary;
            border-radius: 50%;

            @media screen and (max-width: $medium-screen) {
              display: none;
            }
          }

          &__dropdown {
            cursor: pointer;
          }
        }

        &__info {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-left: 2rem;

          @media screen and (max-width: $medium-screen) {
            display: none;
          }


          &--mobile {
            display: none;
            @media screen and (max-width: $medium-screen) {
              display: inline;
              flex-grow: 1;
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

        @media screen and (min-width: 1200px) {
          width: 62.5rem;
        }
      }

      @media screen and (max-width: $wrapper-width) {
        border-radius: 0;
      }
    }

    &__error,
    &__loading {
      margin-top: 2rem;
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

<template>
  <div class="dashboard-layout">
    <div
      :class="
      collapse ? 'dashboard-layout__main-panel': 'dashboard-layout__main-panel--collapsed'">
      <div class="dashboard-layout__main-panel__header">
        <div class="dashboard-layout__main-panel__header__info">
          <div class="dashboard-layout__main-panel__header__info__badge">
            <bh-icon
              value="botinho"
              size="large"
              class="dashboard-layout__main-panel__header__info__badge__icon"/>
          </div>
          <div
            v-show="hasLoaded"
            class="
            dashboard-layout__main-panel__header__info__left">
            <div
              class="
              dashboard-layout__main-panel__header__info__left__wrapper">
              <p
                class="
               dashboard-layout__main-panel__header__info__left__wrapper__title">
                {{ getCurrentRepository.name }}
              </p>
              <VersionDropdown v-if="versionEnabled" />
            </div>
            <span class="has-text-white">{{ $t('webapp.dashboard.created_by') }}
              <b class="has-text-primary">{{ getCurrentRepository.owner__nickname }}</b>
            </span>
          </div>
        </div>
        <div
          class="dashboard-layout__main-panel__header__right">
          <div
            v-show="hasLoaded"
            class="dashboard-layout__main-panel__header__right__icons">
            <bh-icon
              value="language" />
            <span>{{
              getCurrentRepository.available_languages ?
                getCurrentRepository.available_languages.length :
            0 }} {{ $t('webapp.dashboard.languages') }}</span>
          </div>
          <div
            v-show="hasLoaded"
            class="dashboard-layout__main-panel__header__right__icons">
            <bh-icon
              value="sentence" />
            <span>
              {{ getCurrentRepository.examples__count }} {{ $t('webapp.dashboard.sentences') }}
            </span>
          </div>
          <div
            v-show="hasLoaded"
            v-if="warningsCount > 0"
            class="dashboard-layout__main-panel__header__right__icons">
            <bh-icon
              value="warning" />
            <span>{{ warningsCount }} {{ $t('webapp.dashboard.warning') }}</span>
          </div>
          <b-dropdown
            v-show="hasLoaded"
            position="is-bottom-left"
            aria-role="list">
            <user-avatar
              slot="trigger"
              :profile="myProfile"
              size="medium"
              class="dashboard-layout__main-panel__header__right__user"/>
            <b-icon
              slot="trigger"
              icon="chevron-down"
              class="dashboard-layout__main-panel__header__right__icon"/>
            <b-dropdown-item
              v-if="!authenticated"
              aria-role="listitem"
              @click="signIn()">{{ $t('webapp.landing_page.signin') }}</b-dropdown-item>
            <b-dropdown-item
              v-if="!authenticated"
              aria-role="listitem"
              @click="signUp()">{{ $t('webapp.landing_page.signup') }}</b-dropdown-item>
            <b-dropdown-item
              v-if="authenticated"
              aria-role="listitem"
              @click="routerHandle('myProfile')">{{ myProfile.name }}</b-dropdown-item>
            <b-dropdown-item
              v-if="authenticated"
              aria-role="listitem"
              @click="openNewRepository()">
              {{ $t('webapp.layout.start_you_bot') }}
            </b-dropdown-item>
            <b-dropdown-item
              aria-role="listitem"
              @click="routerHandle('home')">
              {{ $t('webapp.dashboard.exit_inteligence') }}
            </b-dropdown-item>
            <b-dropdown-item
              v-if="authenticated"
              aria-role="listitem"
              @click="logout()">{{ $t('webapp.layout.logout') }}</b-dropdown-item>
          </b-dropdown>
          <side-bar @collapse="collapseHandle()" />
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import SideBar from '@/components/repository/sidebar/SideBar';
import UserAvatar from '@/components/user/UserAvatar';
import VersionDropdown from '@/layout/dashboard/VersionDropdown';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'DashboardLayout',
  components: {
    SideBar,
    UserAvatar,
    VersionDropdown,
  },
  data() {
    return {
      collapse: true,
      isLoading: false,
      isFullPage: true,
    };
  },
  computed: {
    ...mapGetters([
      'getCurrentRepository',
      'myProfile',
      'authenticated',
      'versionEnabled',
    ]),
    hasLoaded() {
      if (this.getCurrentRepository.name) return true;
      return false;
    },
    warningsCount() {
      if (!this.getCurrentRepository
        || !this.getCurrentRepository.selectedRepositoryselectedRepository) return 0;
      return Object.keys(this.getCurrentRepository.languages_warnings).length;
    },
  },
  methods: {
    ...mapActions([
      'logout',
      'getFirstFiveVersions',
    ]),
    collapseHandle() {
      this.collapse = !this.collapse;
    },
    routerHandle(path) {
      this.$router.push({
        name: `${path}`,
      });
    },
    openNewRepository() {
      this.$router.push({
        name: 'new',
      });
    },
    signIn() {
      this.$router.push({
        name: 'signIn',
      });
    },
    signUp() {
      this.$router.push({
        name: 'signUp',
      });
    },
  },
};
</script>
<style lang="scss">
@import '~@/assets/scss/utilities.scss';
html{
  overflow-y:auto
}
.dashboard-layout {
  &__main-panel {
    width: calc( 100% - #{$menu-expanded-size} - #{$menu-padding});
    position: relative;
    float: right;

    &__header {
      position: fixed;
      width: inherit;
      z-index: 9;
      height: 6rem;
      background: #404143;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 2.5rem 0 2rem;
      box-shadow: 0px 3px 6px #00000029;

      &__info {
        display: flex;
        align-items: center;

        &__badge {
          position: relative;
          display: block;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
          background-color: #12a391;
          overflow: hidden;

          &__icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #FFFFFF;
          }
        }

        &__left {
          margin: 0 .8rem;

          &__wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;

            p {
              color: #FFFFFF;
            }

            &__title {
              font-weight: bold;
              font-size: 1.3rem;
            }
          }
        }
      }

      &__right {
        display: flex;
        align-items: center;

        &__icons {
          margin: 0 .3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #FFFFFF;

          span {
            margin: 0 .3rem;

          }
        }
        &__icon {
          margin-left: 0.5rem;
          color: white;
          width: 1rem;
          height: 3rem;
          cursor: pointer;
          float: right;
        }

        &__user {
          margin-left: 3rem;
          @media screen and (max-width: 52rem) {
          margin-left: 2rem;
          margin-bottom: 0.4rem;
          }
        }

        @media screen and (max-width: 52rem) {
            display: flex;
            flex-direction: column-reverse;
            font-size: 13px;
            margin-top: 0.5rem;
            width: 20rem;
        }
      }

      @media screen and (max-width: 52rem) {
            padding: 0 0 0 2rem;
            height: 7rem;
      }
    }

    &--collapsed {
       position: relative;
       float: right;
       width: calc( 100% - #{$menu-collapsed-size} - #{$menu-padding});
    }
  }
}
</style>

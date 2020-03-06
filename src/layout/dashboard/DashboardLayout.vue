<template>
  <div class="dashboard-layout">
    <side-bar @collapse="collapseHandle()" />
    <b-loading
      :is-full-page="isFullPage"
      :active.sync="getCurrentRepository.name ? false : true" />
    <div
      v-show="getCurrentRepository.name ? true : false"
      :class="
      collapse ? 'dashboard-layout__main-panel': 'dashboard-layout__main-panel--collapsed'">
      <div class="dashboard-layout__main-panel__header">
        <div class="dashboard-layout__main-panel__header__info">
          <div class="dashboard-layout__main-panel__header__info__badge">
            <bh-icon
              value="botinho"
              size="large"
              class="dashboard-layout__main-panel__header__info__badge__icon" />
          </div>
          <div
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
              <div
                class="
                dashboard-layout__main-panel__header__info__left__wrapper__versions">
                <span
                  class="
                  dashboard-layout__main-panel__header__info__left__wrapper__versions__number">
                  {{ $store.state.Repository.repositoryVersionName }}
                </span>
                <b-dropdown
                  aria-role="list">
                  <b-icon
                    v-if="authenticated"
                    :slot="authenticated ? 'trigger' : ''"
                    class="
                    dashboard-layout__main-panel__header__info__left__wrapper__versions__icon"
                    icon="chevron-down"/>
                  <b-dropdown-item
                    v-for="(version, index) in allVersions"
                    :key="index"
                    aria-role="listitem"
                    @click="handleVersion(version.id, version.name)">
                    {{ version.name }}
                  </b-dropdown-item>
                  <b-dropdown-item
                    aria-role="listitem"
                    @click="routerHandle('repository-versions')">See all versions</b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
            <span class="has-text-white">Created by
              <b class="has-text-primary">{{ getCurrentRepository.owner__nickname }}</b>
            </span>
          </div>
        </div>
        <div class="dashboard-layout__main-panel__header__right">
          <div class="dashboard-layout__main-panel__header__right__icons">
            <bh-icon
              value="language" />
            <span>{{
              getCurrentRepository.available_languages ?
                getCurrentRepository.available_languages.length :
            0 }} languages</span>
          </div>
          <div class="dashboard-layout__main-panel__header__right__icons">
            <bh-icon
              value="sentence" />
            <span>{{ getCurrentRepository.examples__count }} sentences</span>
          </div>
          <div class="dashboard-layout__main-panel__header__right__icons">
            <bh-icon
              value="warning" />
            <span>2 warning</span>
          </div>
          <b-dropdown
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
              @click="openLoginModal()">Sign in</b-dropdown-item>
            <b-dropdown-item
              v-if="!authenticated"
              aria-role="listitem"
              @click="signUp()">Sign up</b-dropdown-item>
            <b-dropdown-item
              v-if="authenticated"
              aria-role="listitem"
              @click="routerHandle('myProfile')">{{ myProfile.name }}</b-dropdown-item>
            <b-dropdown-item
              v-if="authenticated"
              aria-role="listitem"
              @click="openNewRepositoryModal()">Start your bot</b-dropdown-item>
            <b-dropdown-item
              aria-role="listitem"
              @click="routerHandle('home')">Exit Inteligence</b-dropdown-item>
            <b-dropdown-item
              v-if="authenticated"
              aria-role="listitem"
              @click="logout()">Logout</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <router-view />
    </div>
    <new-repository-modal
      :active="isNewRepositoryModalOpen"
      @requestClose="openNewRepositoryModal()" />
  </div>
</template>
<style lang="scss">
</style>
<script>
import SideBar from '@/components/repository/sidebar/SideBar';
import UserAvatar from '@/components/user/UserAvatar';
import NewRepositoryModal from '@/components/shared/NewRepositoryModal';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    SideBar,
    UserAvatar,
    NewRepositoryModal,
  },
  data() {
    return {
      collapse: true,
      isLoading: false,
      isFullPage: true,
      isNewRepositoryModalOpen: false,
      allVersions: [],
    };
  },
  computed: {
    ...mapGetters([
      'getCurrentRepository',
      'myProfile',
      'authenticated',
    ]),
  },
  watch: {
    getCurrentRepository() {
      if (this.authenticated && this.getCurrentRepository) {
        this.getAllVersions();
      }
    },
    authenticated() {
      if (this.authenticated && this.getCurrentRepository) {
        this.getAllVersions();
      } else {
        this.allVersions = [];
      }
    },
  },
  methods: {
    ...mapActions([
      'logout',
      'getFirstFiveVersions',
      'setRepositoryVersion',
      'openLoginModal',
    ]),
    collapseHandle() {
      this.collapse = !this.collapse;
    },
    routerHandle(path) {
      this.$router.push({
        name: `${path}`,
      });
    },
    openNewRepositoryModal() {
      this.isNewRepositoryModalOpen = !this.isNewRepositoryModalOpen;
    },
    async getAllVersions() {
      const response = await this.getFirstFiveVersions(this.getCurrentRepository.uuid);
      this.allVersions = response.data.results;
    },
    handleVersion(id, name) {
      const version = {
        id,
        name,
      };
      this.setRepositoryVersion({
        version,
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

.dashboard-layout {

  &__main-panel {
    width: calc( 100% - #{$menu-expanded-size} - #{$menu-padding} - #{$menu-space});
    position: relative;
    float: right;

    &__header {
      width: 100%;
      height: 6rem;
      background: #2F343D;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 2.5rem 0 3rem;

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

            &__versions {
              margin: 0 1rem;
              display: flex;
              justify-content: center;
              align-items: center;

              &__icon {
                color: #FFFFFF;
                margin-top: .2rem;
                cursor: pointer;
              }

              &__number {
                color: #12a391;
                font-size: 1.1rem;
                font-weight: bold;
              }
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
          height: 1rem;
          vertical-align: middle;
          cursor: pointer;
        }

        &__user {
          margin-left: 3rem;
        }
      }
    }

    &--collapsed {
       position: relative;
       float: right;
       width: calc( 100% - #{$menu-collapsed-size} - #{$menu-padding} - #{$menu-space});
    }
  }
}
</style>

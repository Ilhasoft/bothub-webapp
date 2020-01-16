<template>
  <div class="dashboard-layout">
    <side-bar @colapse="colapseHandle()" />
    <b-loading
      :is-full-page="isFullPage"
      :active.sync="getCurrentRepository.name ? false : true" />
    <div
      v-show="getCurrentRepository.name ? true : false"
      :class="colapse ? 'dashboard-layout__main-panel': 'dashboard-layout__main-panel--colapsed'">
      <div class="dashboard-layout__main-panel__header">
        <div class="dashboard-layout__main-panel__header__info">
          <div class="dashboard-layout__main-panel__header__info__badge">
            <bh-icon
              value="botinho"
              size="large"
              class="dashboard-layout__main-panel__header__info__badge__icon" />
          </div>
          <div class="dashboard-layout__main-panel__header__info__left">
            <p class="dashboard-layout__main-panel__header__info__left__title">
              {{ getCurrentRepository.name }}
            </p>
            <p>Created by
              <b class="has-text-primary">{{ getCurrentRepository.owner__nickname }}</b>
            </p>
          </div>
        </div>
        <div class="dashboard-layout__main-panel__header__right">
          <div class="dashboard-layout__main-panel__header__right__icons">
            <bh-icon
              size=""
              value="language" />
            <span>{{
              getCurrentRepository.available_languages ?
                getCurrentRepository.available_languages.length :
            0 }} languages</span>
          </div>
          <div class="dashboard-layout__main-panel__header__right__icons">
            <bh-icon
              size=""
              value="sentence" />
            <span>{{ getCurrentRepository.examples__count }} sentences</span>
          </div>
          <div class="dashboard-layout__main-panel__header__right__icons">
            <bh-icon
              size=""
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
            <b-dropdown-item
              aria-role="listitem"
              @click="routerHandle('myProfile')">{{ myProfile.name }}</b-dropdown-item>
            <b-dropdown-item
              aria-role="listitem"
              @click="openNewRepositoryModal()">Start your bot</b-dropdown-item>
            <b-dropdown-item
              aria-role="listitem"
              @click="routerHandle('home')">Exit Inteligence</b-dropdown-item>
            <b-dropdown-item
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
      colapse: true,
      isLoading: false,
      isFullPage: true,
      isNewRepositoryModalOpen: false,
    };
  },
  computed: {
    ...mapGetters([
      'getCurrentRepository',
      'myProfile',
    ]),
  },
  methods: {
    ...mapActions([
      'logout',
    ]),
    colapseHandle() {
      this.colapse = !this.colapse;
    },
    routerHandle(path) {
      this.$router.push({
        name: `${path}`,
      });
    },
    openNewRepositoryModal() {
      this.isNewRepositoryModalOpen = !this.isNewRepositoryModalOpen;
    },
  },
};
</script>
<style lang="scss">
.dashboard-layout {

  &__main-panel {
    width: calc( 100% - 260px);
    position: relative;
    float: right;

    &__header {
      width: 100%;
      height: 6rem;
      background: #2F343D;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem;

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

          p {
            color: #FFFFFF;
          }

          &__title {
            font-weight: bold;
            font-size: 1.3rem;
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

        &__user {
          margin-left: 3rem;
        }
      }
    }

    &--colapsed {
       position: relative;
       float: right;
       width: calc( 100% - 60px);
    }
  }
}
</style>

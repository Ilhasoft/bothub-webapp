<template>
  <div>
    <div class="sidenav__button-open">
      <bh-icon-button
        class="sidenav__button-open__icon"
        value="botinho"
        size="small"
        @click="openNav()"
      />
    </div>
    <div
      id="mySidenav"
      class="sidenav">
      <div class="sidenav__repository-info">
        <div class="sidenav__repository-info__big-badge">
          <bh-icon-button
            :value="repositoryInfoIcon"
            size="small"
            class="sidenav__repository-info__big-badge__icon" />
        </div>
        <div class="sidenav__repository-info__text-info">
          <strong>{{ repository.name }}</strong>
          <p>
            created by <strong class="text-color-primary">{{ repository.owner__nickname }}</strong>
          </p>
        </div>
      </div>
      <div>
        <button
          href="javascript:void(0)"
          class="sidenav__closebtn"
          @click="closeNav()">&times;</button>
        <router-link
          v-for="([name, label], i) in repositoryLinks"
          :key="i"
          :to="toFactory(name)"> {{ label }}
        </router-link>
      </div>
      <div class="sidenav__status">
        <a
          v-if="authenticated && repository.authorization.can_write && repository.ready_for_train"
          href="#">
          <span class="text-color-primary sidenav__status__info">
            <bh-icon
              value="botinho" />
            Your bot is ready to be trained </span>
        </a>
        <a
          v-else-if="!authenticated"
          href="#"
          @click.prevent="openLoginModal">
          Sign In
        </a>
        <a
          v-else-if="authenticated && repository.available_request_authorization"
          href="#"
          @click.prevent="openRequestAuthorizationModal">
          Request Authorization
        </a>
        <a
          v-else-if="authenticated
            && repository.request_authorization
          && !repository.request_authorization.approved_by">
          <p class="text-color-grey-dark">
            Authorization Requested
          </p>
        </a>
      </div>
      <div
        v-if="authenticated"
        class="sidenav__profile-menu">
        <a
          href="#"
          @click.prevent="openMyProfile">
          {{ myProfile.name || '...' }}
        </a>
        <a
          href="#"
          @click.prevent="openNewRepositoryModal">
          Start your bot
        </a>
        <a
          href="#"
          @click.prevent="logout">
          Logout
        </a>
      </div>
    </div>
    <new-repository-modal
      :active="newRepositoryModalOpen"
      @requestClose="openNewRepositoryModal()" />
    <request-authorization-modal
      v-if="repository"
      :open.sync="requestAuthorizationModalOpen"
      :repository-uuid="repository.uuid"
      @requestDispatched="onAuthorizationRequested()" />
  </div>
</template>
<script>
import RepositoryInfo from '@/components/repository/RepositoryInfo';
import NewRepositoryModal from '@/components-v1/shared/NewRepositoryModal';
import RequestAuthorizationModal from '@/components/repository/RequestAuthorizationModal';
import { mapGetters, mapActions } from 'vuex';


export default {
  name: 'VsSidebar',
  inject: {
    updateRepository: {
      default: null,
    },
  },
  components: {
    RepositoryInfo,
    NewRepositoryModal,
    RequestAuthorizationModal,
  },
  props: {
    repository: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      repositoryLinks: [
        ['repository-summary', 'Summary'],
        ['repository-training', 'Training'],
        ['repository-test', 'Test'],
        ['repository-translate', 'Translate'],
        ['repository-translations-status', 'Translation status'],
        ['repository-integration', 'Integration'],
        ['repository-settings', 'Settings'],
      ],
      newRepositoryModalOpen: false,
      requestAuthorizationModalOpen: false,
    };
  },
  computed: {
    ...mapGetters([
      'myProfile',
      'authenticated',
    ]),

    repositoryInfoIcon() {
      return (this.repository.categories[0] && this.repository.categories[0].icon) || 'botinho';
    },
  },
  methods: {
    ...mapActions([
      'logout',
      'openLoginModal',
    ]),
    openNav() {
      document.getElementById('mySidenav').style.width = '280px';
    },
    closeNav() {
      document.getElementById('mySidenav').style.width = '0';
    },
    toFactory(name) {
      return {
        name,
        params: {
          ownerNickname: this.repository.owner__nickname,
          slug: this.repository.slug,
        },
      };
    },
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
      this.$toast.open({
        message: 'Request made! Wait for review of an admin.',
        type: 'is-success',
      });
      this.updateRepository(false);
    },
  },
};
</script>
<style lang="scss">
@import '~bh/src/assets/scss/colors.scss';


.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  background-color: $color-fake-white;
  overflow-x: hidden;
  transition: 0.5s;

  &__button-open {
    margin: 1rem;
    $size: 3rem;
    position: relative;
    display: block;
    width: $size;
    height: $size;
    border-radius: 50%;
    background-color: #009688;
    overflow: hidden;

    &__icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
    }
  }

  &__repository-info {
    display: grid;
    grid-template-columns: 5rem 1fr;
    padding: 0.5rem 0;

    &__big-badge {
      margin: 1rem;
      $size: 3rem;
      position: relative;
      display: block;
      width: $size;
      height: $size;
      border-radius: 50%;
      background-color: #009688;
      overflow: hidden;

      &__icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
      }
    }

    &__text-info {
      text-align: left;
      align-self: center;
      padding-right: 2rem;
      p {
        margin: 0;
        font-size: 1rem;
      }
    }
  }

  a {
    padding: 1rem 1rem;
    text-decoration: none;
    border-bottom: 1px solid $color-grey;
    color: black;
    display: block;
    transition: 0.3s;
    text-align: center;

    &:last-child {
      border-bottom: 1px solid #009688;
    }

    &:hover {
      color: #009688;
    }
  }

  &__closebtn {
      border-bottom: 15px;
      position: absolute;
      top: 0;
      right: .05rem;
      font-size: 36px;
      margin-left: 50px;
      border:none;
      background-color: $color-fake-white;
    }

  &__profile-menu {
    a:last-child {
      border-bottom: 1px solid $color-grey;
    }
  }

  &__status {
    &__info {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>

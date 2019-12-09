<template>
  <layout title="My Profile on bothub">
    <div class="bh-grid bh-grid--column my-profile__header">
      <div class="text-center">
        <user-avatar
          slot="trigger"
          :profile="myProfile"
          size="large" />
        <user-profile :profile="myProfile" />
      </div>
      <div class="bh-grid">
        <div class="bh-grid__item text-center">
          <bh-button
            primary
            inverted
            @click="openEditProfileModal()">
            <bh-icon value="account-edit" />
            <span>Edit Your Profile</span>
          </bh-button>
          <bh-button
            primary
            inverted
            @click="openChangePasswordModal()">
            <bh-icon value="lock-reset" />
            <span>Change Password</span>
          </bh-button>
        </div>
      </div>
    </div>
    <div class="bh-grid bh-grid--column my-profile__repositories">
      <div class="bh-grid__item">
        <h1>Repositories</h1>
      </div>
      <div class="bh-grid__item">
        <pagination
          v-if="repositoryList"
          :item-component="repositoryItemElem"
          :list="repositoryList"
          class="my-profile__repositories__cards" />
      </div>
    </div>
    <bh-modal :open.sync="editProfileModalOpen">
      <div
        v-if="editProfileModalOpen"
        class="bh-grid">
        <div class="bh-grid__item">
          <h1>Edit your profile</h1>
          <edit-profile-form @edited="onMyProfileEdited()" />
        </div>
      </div>
    </bh-modal>
    <bh-modal :open.sync="changePasswordModalOpen">
      <div
        v-if="changePasswordModalOpen"
        class="bh-grid">
        <div class="bh-grid__item">
          <h1>Change Password</h1>
          <change-password-form @changed="onPasswordChanged()" />
        </div>
      </div>
    </bh-modal>
  </layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Layout from '@/components/shared/Layout';
import UserProfile from '@/components/user/UserProfile';
import RepositoryCard from '@/components/repository/RepositoryCard';
import Pagination from '@/components/shared/Pagination';
import EditProfileForm from '@/components/user/EditProfileForm';
import ChangePasswordForm from '@/components/user/ChangePasswordForm';
import LoginIsRequired from '@/components/auth/LoginIsRequired';
import UserAvatar from '@/components/user/UserAvatar';


export default {
  name: 'MyProfile',
  components: {
    Layout,
    UserProfile,
    Pagination,
    EditProfileForm,
    ChangePasswordForm,
    UserAvatar,
  },
  extends: LoginIsRequired,
  data() {
    return {
      repositoryItemElem: RepositoryCard,
      repositoryList: null,
      editProfileModalOpen: false,
      changePasswordModalOpen: false,
    };
  },
  computed: {
    ...mapGetters([
      'myProfile',
      'getProfile',
    ]),
  },
  mounted() {
    this.updateMyProfile();
    this.updateMyRepositories();
  },
  methods: {
    ...mapActions([
      'updateMyProfile',
      'getMyRepositories',
    ]),
    async updateMyRepositories() {
      this.repositoryList = await this.getMyRepositories();
    },
    openEditProfileModal() {
      this.editProfileModalOpen = true;
    },
    onMyProfileEdited() {
      this.updateMyProfile();
      this.updateMyRepositories();
      this.$bhToastNotification({
        message: 'Profile edited!',
        type: 'success',
      });
      this.editProfileModalOpen = false;
    },
    openChangePasswordModal() {
      this.changePasswordModalOpen = true;
    },
    onPasswordChanged() {
      this.$bhToastNotification({
        message: 'Password changed!',
        type: 'success',
      });
      this.changePasswordModalOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';
@import '~@/assets/scss/utilities.scss';


.my-profile {
  &__header {
    background-color: $color-primary;
  }

  &__repositories {
    max-width: $max-repository-card-width;
    margin: 2rem auto;

    &__cards {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>

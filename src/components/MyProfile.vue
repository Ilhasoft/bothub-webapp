<template>
  <layout title="My Profile on bothub">
    <div class="wrapper">
      <div class="container">
        <div class="columns is-variable is-2">
          <div class="column is-narrow">
            <div class="card">
              <div class="card-content">
                <user-profile :profile="myProfile" />
              </div>
            </div>
          </div>
          <div class="column is-narrow">
            <div class="item-1-2">
              <button
                @click="openEditProfileModal()"
                class="button is-outlined is-primary">
                <b-icon icon="pencil" />
                <span>Edit Profile</span>
              </button>
            </div>
            <div class="item-1-2">
              <button
                @click="openChangePasswordModal()"
                class="button is-outlined is-primary">
                <b-icon icon="lock-reset" />
                <span>Change Password</span>
              </button>
            </div>
          </div>
        </div>
        <h1 class="title is-4">My Repositories</h1>
        <pagination
          v-if="repositoryList"
          class="repository-list"
          :itemComponent="repositoryItemElem"
          :list="repositoryList" />
      </div>
    </div>
    <b-modal :active.sync="editProfileModalOpen">
      <div
        v-if="editProfileModalOpen"
        class="card">
        <div class="card-content">
          <h1 class="title is-4">Edit your profile</h1>
          <edit-profile-form @edited="onMyProfileEdited()" />
        </div>
      </div>
    </b-modal>
    <b-modal :active.sync="changePasswordModalOpen">
      <div
        v-if="changePasswordModalOpen"
        class="card">
        <div class="card-content">
          <h1 class="title is-4">Change Password</h1>
          <change-password-form @changed="onPasswordChanged()" />
        </div>
      </div>
    </b-modal>
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

const components = {
  Layout,
  UserProfile,
  Pagination,
  EditProfileForm,
  ChangePasswordForm,
};

export default {
  extends: LoginIsRequired,
  name: 'MyProfile',
  components,
  mounted() {
    this.updateMyProfile();
    this.updateMyRepositories();
  },
  computed: {
    ...mapGetters([
      'myProfile',
    ]),
  },
  data() {
    return {
      repositoryItemElem: RepositoryCard,
      repositoryList: null,
      editProfileModalOpen: false,
      changePasswordModalOpen: false,
    };
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
      this.$toast.open({
        message: 'Profile edited!',
        type: 'is-success',
      });
      this.editProfileModalOpen = false;
    },
    openChangePasswordModal() {
      this.changePasswordModalOpen = true;
    },
    onPasswordChanged() {
      this.$toast.open({
        message: 'Password changed!',
        type: 'is-success',
      });
      this.changePasswordModalOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: #f8f8f8;
  min-height: 400px;
  padding: 8px;
}
</style>

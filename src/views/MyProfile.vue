<template>
  <layout title="My Profile on Bothub">
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
        <repository-card
          v-for="repository in myRepositoriesList.toArray()"
          :key="repository.uuid"
          :repository="repository" />
        <loading v-if="myRepositoriesList.loading" />
        <p v-else-if="myRepositoriesList.isEmpty()">Repositories not found.</p>
        <div
          v-if="!myRepositoriesList.isEmpty() && !myRepositoriesList.isLastPage()"
          class="next has-text-centered">
          <button
            :disabled="myRepositoriesList.loading"
            class="button is-primary"
            @click="nextPage()">More</button>
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
    </div>
  </layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Layout from '@/components/shared/Layout';
import UserProfile from '@/components-v1/user/UserProfile';
import RepositoryCard from '@/components/repository/RepositoryCard';
import EditProfileForm from '@/components-v1/user/EditProfileForm';
import ChangePasswordForm from '@/components-v1/user/ChangePasswordForm';
import LoginIsRequired from '@/components-v1/auth/LoginIsRequired';
import UserAvatar from '@/components/user/UserAvatar';
import Loading from '@/components-v1/shared/Loading';
import MyRepositoriesList from '@/collections/my-repositories';


export default {
  name: 'MyProfile',
  components: {
    Layout,
    UserProfile,
    RepositoryCard,
    EditProfileForm,
    ChangePasswordForm,
    UserAvatar,
    Loading,
  },
  extends: LoginIsRequired,
  data() {
    return {
      myRepositoriesList: new MyRepositoriesList(),
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
    ]),
    async updateMyRepositories() {
      this.myRepositoriesList = new MyRepositoriesList();
      this.myRepositoriesList.fetch();
    },
    nextPage() {
      this.myRepositoriesList.fetch();
    },
    openEditProfileModal() {
      this.editProfileModalOpen = true;
    },
    onMyProfileEdited() {
      this.updateMyProfile();
      this.updateMyRepositories();
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
@import '~bh/src/assets/scss/colors.scss';
@import '~@/assets/scss/utilities.scss';


.my-profile {
  &__header {
    background-color: $color-primary;
  }

  &__repositories {
    max-width: $max-repository-card-width;
    margin: 2rem auto;
  }
}
</style>

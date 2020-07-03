<template>
  <layout>
    <div class="profile__header">
      <div class="profile__header__content">
        <user-avatar
          :profile="myProfile"
          size="full"
          class="profile__avatar" />
        <div class="profile__header__info">
          <h1> {{ myProfile.name }} </h1>
          <h3 v-if="myProfile.locale"> {{ myProfile.locale }} </h3>
          <span class="profile__plan"> FREE USER </span>
        </div>
      </div>
    </div>
    <div class="profile__tabs__container">
      <tab-select
        :options="tabs"
        :selected.sync="selected"
        class="profile__tabs" />
    </div>
    <div
      v-show="selected==0"
      class="profile__content">
      <div>
        <h1> Personal information </h1>
        <edit-profile-form />
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from '@/components/shared/Layout';
import UserAvatar from '@/components/user/UserAvatar';
import EditProfileForm from '@/components/user/EditProfileForm';
import TabSelect from '@/components/shared/TabSelect';
import { mapGetters } from 'vuex';

export default {
  name: 'Profile',
  components: {
    Layout,
    UserAvatar,
    EditProfileForm,
    TabSelect,
  },
  data() {
    return {
      selected: 0,
      tabs: ['Profile', 'Intelligences', 'Activities', 'Reports', 'Payments'],
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
      'myProfile',
    ]),
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
$shadow-color: #00000029;

    .profile {
        &__avatar {
            width: 90px;
            height: 90px;
            margin-right: 1.15rem;
            box-shadow: 0px 3px 6px $shadow-color;
            background-color: $color-white;
        }

        &__plan {
            background-color: $color-primary-dark;
            color: $color-white;
            text-align: center;
            border-radius: 12px;
            padding: 0.3rem 0.75rem;
            font-size: 0.75rem;
            font-weight: bold;
        }

        &__content {
            max-width: 40rem;
            padding: 0 1rem;
            margin: 4.5rem auto auto auto;
        }

        &__header {
            background-color: $color-white;
            width: 100%;
            padding: 4rem 0;
            &__content {
                display: flex;
                justify-content: center;
                margin: 1rem;
            }
        }

        &__tabs {
          &__container {
            background-color: $color-white;
            width: 100%;
          }
        }
    }
</style>

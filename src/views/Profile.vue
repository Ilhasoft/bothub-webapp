<template>
  <layout>
    <div class="profile__header">
      <div class="profile__header__content">
        <user-avatar
          :profile="myProfile"
          size="large"
          class="profile__avatar" />
        <div class="profile__header__info">
          <h1> Name </h1>
          <h2> Location </h2>
          <div class="profile__plan"> FREE USER </div>
        </div>
      </div>
      <div class="profile__content">
        <edit-profile />
      </div>
  </div></layout>
</template>

<script>
import Layout from '@/components/shared/Layout';
import UserAvatar from '@/components/user/UserAvatar';
import EditProfile from '@/components/profile/EditProfile';
import { mapGetters } from 'vuex';

export default {
  name: 'Profile',
  components: {
    Layout,
    UserAvatar,
    EditProfile,
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
    .profile {
        &__avatar {
            width: 90px;
            height: 90px;
            margin-right: 1.15rem;
        }

        &__plan {
            background-color: $color-primary;
            color: $color-white;
            text-align: center;
            border-radius: 12px;
            padding: 0.3rem 0;
        }

        &__content {
            max-width: 40rem;
        }

        &__header {
            &__content {
                display: flex;
                justify-content: center;
                margin: 4rem 1rem;
            }
        }
    }
</style>

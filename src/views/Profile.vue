<template>
  <layout :show-footer="false">
    <div class="profile__header">
      <div class="profile__header__content">
        <user-avatar
          :profile="myProfile"
          size="full"
          class="profile__avatar" />
        <div class="profile__header__info">
          <h1 class="profile__header__title"> {{ myProfile.name }} </h1>
          <p
            v-if="myProfile.locale"
            class="profile__header__subtitle"> {{ myProfile.locale }} </p>
          <span class="profile__plan"> {{ $t('webapp.my_profile.free_user' ) }} </span>
        </div>
      </div>
    </div>
    <div class="profile__tabs__container">
      <tab-select
        :options="tabs"
        :selected.sync="selected"
        class="profile__tabs" />
    </div>
    <div class="profile__content">
      <div
        v-show="selected==0">
        <h1 class="profile__title"> {{ $t('webapp.my_profile.personal_info' ) }} </h1>
        <div class="profile__edit__content">
          <edit-profile-form class="profile__edit" />
        </div>
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
      tabs: [
        this.$t('webapp.my_profile.profile'),
        this.$t('webapp.my_profile.intelligences'),
        this.$t('webapp.my_profile.activities'),
        this.$t('webapp.my_profile.reports'),
        this.$t('webapp.my_profile.payments')],
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

        &__title {
            max-width: 56.25rem;
            padding: 0 1rem;
            margin: 0 auto;
        }

        &__content {
          padding: 3.875rem 0 6.563rem 0;
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
            &__title {
              font-size: 1.5rem;
              margin-bottom: 0.625;
            }
            &__subtitle {
              font-size: 1.125rem;
              margin-bottom: 1rem;
            }
        }

        &__tabs {
          &__container {
            background-color: $color-white;
            width: 100%;
          }
        }

        &__edit {
          max-width: 40rem;
          margin-top: 1.563rem;
          &__content {
            max-width: 56.25rem;
            padding: 0 1rem;
            margin: 0 auto;
          }
        }
    }
</style>

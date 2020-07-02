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
      <div class="profile__tabs">
        <div
          v-for="tab in tabs"
          :key="tab"
          :class="{'profile__tabs__item': true, 'profile__tabs__item__selected': selected==tab}"
          @click="selected=tab"> {{ tab }} </div>
      </div>
    </div>
    <div class="profile__content">
      <h1> Personal information </h1>
      <edit-profile-form />
    </div>
  </layout>
</template>

<script>
import Layout from '@/components/shared/Layout';
import UserAvatar from '@/components/user/UserAvatar';
import EditProfileForm from '@/components/user/EditProfileForm';
import { mapGetters } from 'vuex';

export default {
  name: 'Profile',
  components: {
    Layout,
    UserAvatar,
    EditProfileForm,
  },
  data() {
    return {
      selected: 'Profile',
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
            margin: 4.5rem 1rem auto 5rem;
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
            display: flex;
            margin: auto;
            justify-content: center;
            max-width: 50rem;

            &__container {
              background-color: $color-white;
              width: 100%;
            }

            > * {
                margin-right: 2rem;
            }

            &__item {
                padding: 0.8rem 2.5rem;
                background-color: $color-fake-white;
               box-shadow: 5px 0 5px -5px $shadow-color,
                          -5px 0 5px -5px $shadow-color,
                          inset 0 -5px 5px -5px $shadow-color;
               cursor: pointer;

               &__selected {
                   background-color: $color-primary;
                   color: $color-white;
               }
            }
        }
    }
</style>

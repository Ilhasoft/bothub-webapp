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
    </div>
    <div class="profile__tabs">
      <div
        v-for="tab in tabs"
        :key="tab"
        :class="{'profile__tabs__item': true, 'profile__tabs__item__selected': selected==tab}"
        @click="selected=tab"> {{ tab }} </div>
    </div>
    <div class="profile__content">
      <h1> Personal information </h1>
      <edit-profile />
    </div>
  </layout>
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
            background-color: $color-white;
            padding: 4rem 0;
            &__content {
                display: flex;
                justify-content: center;
                margin: 1rem;
            }
        }

        &__tabs {
            display: flex;
            background-color: $color-white;
            padding: 0 2rem;
            justify-content: center;
            width: 100%;
            > * {
                margin-right: 2rem;
            }

            &__item {
                padding: 0.8rem 2.5rem;
                background-color: $color-fake-white;
            //    box-shadow: 0px 3px 6px $shadow-color;
               box-shadow: 5px 0 5px -5px $shadow-color, -5px 0 5px -5px $shadow-color, inset 0 -5px 5px -5px $shadow-color;
               cursor: pointer;

               &__selected {
                   background-color: $color-primary;
                   color: $color-white;
               }
            }
        }
    }
</style>

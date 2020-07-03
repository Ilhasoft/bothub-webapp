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
    <div>
      <div
        v-show="selected==0"
        class="profile__content">
        <h1> Personal information </h1>
        <edit-profile-form />
      </div>
      <div v-show="selected==1">
        <h1> My Intelligences </h1>
        <paginated-list
          v-if="repositoryList"
          :item-component="repositoryItemElem"
          :per-page="repositoriesLimit"
          :list="repositoryList"
          class="profile__repositories__cards" />

        <h1> Contribution intelligences </h1>
        <paginated-list
          v-if="repositoryList"
          :item-component="repositoryItemElem"
          :per-page="repositoriesLimit"
          :list="repositoryList"
          class="profile__repositories__cards" />

        <h1> Use intelligences </h1>
        <paginated-list
          v-if="repositoryList"
          :item-component="repositoryItemElem"
          :per-page="repositoriesLimit"
          :list="repositoryList"
          class="profile__repositories__cards" />
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from '@/components/shared/Layout';
import UserAvatar from '@/components/user/UserAvatar';
import EditProfileForm from '@/components/user/EditProfileForm';
import RepositoryCard from '@/components/repository/RepositoryCard';
import TabSelect from '@/components/shared/TabSelect';
import PaginatedList from '@/components/shared/PaginatedList';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Profile',
  components: {
    Layout,
    UserAvatar,
    EditProfileForm,
    TabSelect,
    PaginatedList,
  },
  data() {
    return {
      selected: 0,
      repositoryItemElem: RepositoryCard,
      repositoryList: null,
      tabs: ['Profile', 'Intelligences', 'Activities', 'Reports', 'Payments'],
      repositoriesLimit: 3,
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
      'myProfile',
    ]),
  },
  mounted() {
    this.updateMyProfile();
    this.updateMyRepositories();
  },
  methods: {
    ...mapActions([
      'getMyRepositories',
      'updateMyProfile',
    ]),
    async updateMyRepositories() {
      this.repositoryList = await this.getMyRepositories(this.repositoriesLimit);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
$shadow-color: #00000029;
h1 {
        max-width: 58.25rem;
        padding: 0 1rem;
        margin: 0.75rem auto;
        display: block;
      }

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

        &__repositories {

          &__cards {
            display: flex;
            flex-wrap: wrap;
            max-width: 72.875rem;
            min-height: 31.25rem;
            padding: 1rem;
            margin: auto;
          }
        }
    }
</style>

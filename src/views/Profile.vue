<template>
  <layout :show-footer="false">
    <div class="profile__header">
      <div class="profile__header__content">
        <user-avatar
          :profile="myProfile"
          :clickable="false"
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
      <div v-show="selected==1">
        <h1 class="profile__title"> {{ $t('webapp.my_profile.intelligences.mine') }} </h1>
        <paginated-list
          v-if="repositoryLists.mine"
          :item-component="repositoryItemElem"
          :per-page="repositoriesLimit"
          :list="repositoryLists.mine"
          :empty-message="$t('webapp.home.no_repo')"
          class="profile__repositories__cards" />

        <div class="profile__repositories__separator" />

        <h1 class="profile__title"> {{ $t('webapp.my_profile.intelligences.contributing') }} </h1>
        <paginated-list
          v-if="repositoryLists.contributing"
          :item-component="repositoryItemElem"
          :per-page="repositoriesLimit"
          :list="repositoryLists.contributing"
          :empty-message="$t('webapp.home.no_repo')"
          class="profile__repositories__cards" />

        <div class="profile__repositories__separator" />

        <h1 class="profile__title"> {{ $t('webapp.my_profile.intelligences.using') }} </h1>
        <paginated-list
          v-if="repositoryLists.using"
          :item-component="repositoryItemElem"
          :per-page="repositoriesLimit"
          :list="repositoryLists.using"
          :empty-message="$t('webapp.home.no_repo')"
          class="profile__repositories__cards" />
      </div>
      <div
        v-show="selected==2">
        <h1 class="profile__title"> {{ $t('webapp.my_profile.activities.recent' ) }} </h1>
        <div class="profile__edit__content">
          <activities class="profile__activities" />
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from '@/components/shared/Layout';
import UserAvatar from '@/components/user/UserAvatar';
import EditProfileForm from '@/components/user/EditProfileForm';
import RepositoryCard from '@/components/repository/RepositoryCard';
import Activities from '@/components/user/Activities';
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
    Activities,
  },
  data() {
    return {
      selected: 0,
      repositoryItemElem: RepositoryCard,
      repositoryLists: {
        mine: null,
        contributing: null,
        using: null,
      },
      repositoriesLimit: 3,
      tabs: [
        this.$t('webapp.my_profile.profile'),
        this.$t('webapp.my_profile.intelligences.title'),
        this.$t('webapp.my_profile.activities.title'),
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
  watch: {
    authenticated() {
      if (!this.authenticated) {
        this.$router.push({
          name: 'signIn',
        });
      }
    },
  },
  mounted() {
    this.updateMyProfile();
    this.updateMyRepositories();
  },
  methods: {
    ...mapActions([
      'getMyRepositories',
      'getContributingRepositories',
      'getUsingRepositories',
      'updateMyProfile',
    ]),
    async updateMyRepositories() {
      this.repositoryLists.mine = await this.getMyRepositories(this.repositoriesLimit);
      this.repositoryLists.using = await this.getContributingRepositories(this.repositoriesLimit);
      this.repositoryLists.contributing = await this.getUsingRepositories(this.repositoriesLimit);
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
            margin: 0 1rem;
        }

        &__title {
            max-width: 56.25rem;
            font-size: 1.75rem;
            font-weight: bold;
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
                flex-wrap: wrap;
                margin: 1rem;
                align-items: center;
            }
            &__title {
              font-size: 1.5rem;
              margin: 0 0 0.625rem 0;
            }
            &__subtitle {
              font-size: 1.125rem;
              margin: 0 1rem 0.625rem 1rem;
            }
        }

        &__tabs {
          &__container {
            background-color: $color-white;
            width: 100%;
          }
        }

        &__repositories {

          &__separator {
            background-color: $color-grey;
            max-width: 50rem;
            height: 2px;
            margin: 1rem auto 5rem auto;
          }

          &__cards {
            display: flex;
            flex-wrap: wrap;
            max-width: 72.875rem;
            // min-height: 31.25rem;
            padding: 1rem;
            margin: auto;
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

        &__activities {
          margin-top: 2.5rem;
        }
    }
</style>

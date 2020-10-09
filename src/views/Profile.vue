<template>
  <layout :show-footer="false">
    <div class="profile__header">
      <div class="profile__header__content">
        <div class="profile__avatar__container">
          <user-avatar
            :profile="myProfile"
            :clickable="false"
            size="full"
            class="profile__avatar" />
        </div>
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
        <div
          v-show="noRepositories"
          class="profile__add-repo profile__edit__content">
          <p> {{ $t('webapp.my_profile.no_repo') }} </p>
          <router-link to="/new">
            <b-button type="is-primary"> {{ $t('webapp.my_profile.add_repo') }} </b-button>
          </router-link>
        </div>
        <h1 class="profile__title"> {{ $t('webapp.my_profile.intelligences.mine') }} </h1>
        <div
          :class="{
            'profile__search-repository': true,
            'profile__search-repository__empty': repositoryLists.mine.empty}">
          <b-field class="profile__search-repository__input">
            <b-input
              v-model="search"
              :placeholder="$t('webapp.layout.search_bots')"
              no-border
              icon-right="magnify"
            />
          </b-field>
          <div class="profile__search-repository__categories">
            <categories-list
              v-model="category"/>
            <languages-list
              v-model="language"
              open-position="bottom-left" />
          </div>
        </div>
        <div v-show="!repositoryLists.mine.empty">
          <paginated-list
            v-if="repositoryLists.mine"
            :item-component="repositoryItemElem"
            :per-page="repositoriesLimit"
            :list="repositoryLists.mine"
            :empty-message="$t('webapp.home.no_repo')"
            class="profile__repositories__cards" />

          <div
            v-if="!repositoryLists.contributing.empty || !repositoryLists.contributing.empty"
            class="profile__repositories__separator" />
        </div>

        <p
          v-if="repositoryLists.mine.empty"
          class="profile__search-repository__empty__text">
          {{ $t('webapp.my_profile.no_repo_filter') }}
        </p>

        <div v-show="!repositoryLists.contributing.empty">
          <h1 class="profile__title"> {{ $t('webapp.my_profile.intelligences.contributing') }} </h1>
          <paginated-list
            v-if="repositoryLists.contributing"
            :item-component="repositoryItemElem"
            :per-page="repositoriesLimit"
            :list="repositoryLists.contributing"
            :empty-message="$t('webapp.home.no_repo')"
            class="profile__repositories__cards" />

          <div
            v-if="!repositoryLists.using.empty"
            class="profile__repositories__separator" />
        </div>

        <div v-show="!repositoryLists.using.empty">
          <h1 class="profile__title"> {{ $t('webapp.my_profile.intelligences.using') }} </h1>
          <paginated-list
            v-if="repositoryLists.using"
            :item-component="repositoryItemElem"
            :per-page="repositoriesLimit"
            :list="repositoryLists.using"
            :empty-message="$t('webapp.home.no_repo')"
            class="profile__repositories__cards" />
        </div>
      </div>
      <div
        v-show="selected==2">
        <h1 class="profile__title"> {{ $t('webapp.my_profile.activities.recent' ) }} </h1>
        <div class="profile__edit__content">
          <activities class="profile__activities" />
        </div>
      </div>
      <div
        v-show="selected==3">
        <div class="profile__edit__content">
          <user-report-list />
        </div>
      </div>
      <div
        v-if="selected==4">
        <h1 class="profile__title"> {{ $t('webapp.my_profile.payment.history') }} </h1>
        <div class="profile__edit__content profile__payment__content">
          <payment-history />
        </div>
        <div class="profile__repositories__separator" />
        <h1 class="profile__title"> {{ $t('webapp.my_profile.payment.info') }} </h1>
        <div class="profile__edit__content profile__payment__content">
          <payment-form class="profile__payment__form" />
        </div>
        <h1 class="profile__title"> {{ $t('webapp.my_profile.payment.coupon_payment') }} </h1>
        <div class="profile__edit__content profile__payment__content">
          <b-field>
            <b-input
              v-model="coupon"
              expanded/>
            <b-button
              class="profile__payment__button"
              type="is-primary"
              @click="submitCoupon"> {{ $t('webapp.my_profile.payment.submit') }} </b-button>
          </b-field>
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
import CategoriesList from '@/components/shared/CategoriesList';
import LanguagesList from '@/components/shared/LanguagesList';
import Activities from '@/components/user/Activities';
import UserReportList from '@/components/user/UserReportList';
import TabSelect from '@/components/shared/TabSelect';
import PaginatedList from '@/components/shared/PaginatedList';
import PaymentForm from '@/components/payment/PaymentForm';
import PaymentHistory from '@/components/payment/PaymentHistory';
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
    CategoriesList,
    LanguagesList,
    UserReportList,
    PaymentForm,
    PaymentHistory,
  },
  data() {
    return {
      selected: 0,
      repositoryItemElem: RepositoryCard,
      category: 0,
      language: '',
      search: '',
      repositorySearch: '',
      repositoryLists: {
        mine: { empty: false },
        contributing: { empty: false },
        using: { empty: !process.env.BOTHUB_WEBAPP_PAYMENT_ENABLED },
      },
      repositoriesLimit: 6,
      tabs: [
        { label: this.$t('webapp.my_profile.profile'), value: 0 },
        { label: this.$t('webapp.my_profile.intelligences.title'), value: 1 },
        { label: this.$t('webapp.my_profile.activities.title'), value: 2, hide: !process.env.BOTHUB_WEBAPP_PAYMENT_ENABLED },
        { label: this.$t('webapp.my_profile.reports.title'), value: 3 },
        { label: this.$t('webapp.my_profile.payment.title'), value: 4, hide: !process.env.BOTHUB_WEBAPP_PAYMENT_ENABLED },
      ],
      coupon: null,
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
      'myProfile',
    ]),
    noRepositories() {
      return Object.values(this.repositoryLists).every(value => value.empty);
    },
  },
  watch: {
    authenticated() {
      if (!this.authenticated) {
        this.$router.push({
          name: 'signIn',
        });
      }
    },
    category() {
      this.updateRepositoryList();
    },
    language() {
      this.updateRepositoryList();
    },
    search() {
      this.updateRepositoryList();
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
      'getinho',
    ]),
    async updateRepositoryList() {
      const { search } = this;
      this.repositorySearch = null;

      if (this.category === 0) {
        this.repositorySearch = await this.getMyRepositories({
          language: this.language,
          search,
          limit: this.repositoriesLimit,
        });
      } else if (this.category > 0) {
        this.repositorySearch = await this.getMyRepositories({
          categories: this.category,
          language: this.language,
          search,
          limit: this.repositoriesLimit,
        });
      }
      this.repositoryLists.mine = this.repositorySearch;
    },
    submitCoupon() {},
    async updateMyRepositories() {
      this.repositoryLists.mine = await this.getMyRepositories(this.repositoriesLimit);
      this.repositoryLists.contributing = await this.getContributingRepositories(
        this.repositoriesLimit,
      );
      if (process.env.BOTHUB_WEBAPP_PAYMENT_ENABLED) {
        this.repositoryLists.using = await this.getUsingRepositories(this.repositoriesLimit);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/utilities.scss';
@import '~@/assets/scss/variables.scss';

$shadow-color: #00000029;

h1 {
        max-width: 58.25rem;
        padding: 0 1rem;
        margin: 0.75rem auto;
        display: block;
      }

    .profile {

        &__avatar {
            box-shadow: 0px 3px 6px $shadow-color;
            background-color: $color-white !important;

            &__container {
              width: 5.625rem;
              height: 5.625rem;
            }
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

        &__search-repository{
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          max-width: 72.875rem;
          padding: 1rem;
          margin: auto;

          &__input{
            padding-left: 1rem;
            margin: 0;
          }

          &__empty{
            margin-bottom: 5rem;

            &__text{
              font-weight: $font-weight-bolder;
              text-align: center;
              margin-bottom: 3rem;
            }
          }

          &__categories{
          display: flex;
          justify-content: flex-end;

          > * {
            margin-left: 0.625rem;
          }

          @media screen and (max-width: $mobile-width) {
           flex-direction: column;
          }

        }
         @media screen and (max-width: $mobile-width) {
           align-items: center;
          }
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

        &__add-repo {
          display: flex;
          justify-content: flex-end;
          > * {
            margin-right: 1rem;
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

        &__payment {

          &__content {
            margin-top: 2.313rem;
          }

          &__button {
            margin-left: 0.625rem;
          }

          &__form {
            max-width: 30rem;
            margin-bottom: 2rem
          }
        }
    }
</style>

<template>
  <layout :show-footer="false">
    <div class="org__header">
      <div class="org__header__content">
        <div class="org__header__info">
          <h1 class="org__header__title"> Org </h1>
          <p
            class="org__header__subtitle">
            {{ $t('webapp.orgs.created_by') }} <a> User </a>
          </p>
        </div>
      </div>
    </div>
    <div class="org__tabs__container">
      <tab-select
        :options="tabs"
        :selected.sync="selected"
        class="org__tabs" />
    </div>
    <div class="org__content">
      <div
        v-show="selected==0">
        <h1 class="org__title"> {{ $t('webapp.orgs.org_info' ) }} </h1>
        <div class="org__edit__content">
          <edit-org-form class="org__edit" />

          <div class="org__repositories__separator" />
        </div>

        <h1 class="org__title"> {{ $t('webapp.orgs.manage_contributors') }} </h1>
        <div class="org__edit__content">
          <p> {{ $t('webapp.orgs.manage_subtitle' ) }} </p>
          <set-authorization-role-form
            ref="setAuthorizationRoleForm"
            repository-uuid=""
            @roleSetted="onRoleSetted()" />
          <authorizations-list
            ref="authorizationsList"
            repository-uuid="" />
        </div>

      </div>
      <div v-show="selected==1">
        <h1 class="org__title"> {{ $t('webapp.orgs.intelligences.mine') }} </h1>
        <paginated-list
          v-if="repositoryLists.mine"
          :item-component="repositoryItemElem"
          :per-page="repositoriesLimit"
          :list="repositoryLists.mine"
          :empty-message="$t('webapp.home.no_repo')"
          class="org__repositories__cards" />

        <div class="org__repositories__separator" />

        <h1 class="org__title"> {{ $t('webapp.orgs.intelligences.using') }} </h1>
        <paginated-list
          v-if="repositoryLists.using"
          :item-component="repositoryItemElem"
          :per-page="repositoriesLimit"
          :list="repositoryLists.using"
          :empty-message="$t('webapp.home.no_repo')"
          class="org__repositories__cards" />
      </div>
      <div
        v-show="selected==2">
        <h1 class="org__title"> {{ $t('webapp.orgs.activities.recent' ) }} </h1>
        <div class="org__edit__content">
          <activities class="org__activities" />
        </div>
      </div>
      <div
        v-show="selected==3">
        <div class="org__edit__content">
          <user-report-list />
        </div>
      </div>
      <div
        v-show="selected==4">
        <h1 class="org__title"> {{ $t('webapp.orgs.payment.history') }} </h1>
        <div class="org__edit__content org__payment__content">
          <payment-history />
        </div>
        <div class="org__repositories__separator" />
        <h1 class="org__title"> {{ $t('webapp.orgs.payment.info') }} </h1>
        <div class="org__edit__content org__payment__content">
          <payment-form class="org__payment__form" />
        </div>
        <h1 class="org__title"> {{ $t('webapp.orgs.payment.coupon_payment') }} </h1>
        <div class="org__edit__content org__payment__content">
          <b-field>
            <b-input
              v-model="coupon"
              expanded/>
            <b-button
              class="org__payment__button"
              type="is-primary"
              @click="submitCoupon"> {{ $t('webapp.orgs.payment.submit') }} </b-button>
          </b-field>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from '@/components/shared/Layout';
import UserAvatar from '@/components/user/UserAvatar';
import EditOrgForm from '@/components/user/EditOrgForm';
import RepositoryCard from '@/components/repository/RepositoryCard';
import Activities from '@/components/user/Activities';
import UserReportList from '@/components/user/UserReportList';
import TabSelect from '@/components/shared/TabSelect';
import PaginatedList from '@/components/shared/PaginatedList';
import PaymentForm from '@/components/payment/PaymentForm';
import PaymentHistory from '@/components/payment/PaymentHistory';
import SetAuthorizationRoleForm from '@/components/repository/SetAuthorizationRoleForm';
import AuthorizationsList from '@/components/repository/AuthorizationsList';

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Profile',
  components: {
    Layout,
    UserAvatar,
    EditOrgForm,
    TabSelect,
    PaginatedList,
    Activities,
    UserReportList,
    PaymentForm,
    PaymentHistory,
    SetAuthorizationRoleForm,
    AuthorizationsList,
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
        this.$t('webapp.orgs.information'),
        this.$t('webapp.orgs.intelligences.title'),
        this.$t('webapp.orgs.activities.title'),
        this.$t('webapp.orgs.reports.title'),
        this.$t('webapp.orgs.payment.title')],
      coupon: null,
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
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
    this.updateMyRepositories();
  },
  methods: {
    ...mapActions([
      'getMyRepositories',
      'getContributingRepositories',
      'getUsingRepositories',
    ]),
    submitCoupon() {},
    async updateMyRepositories() {
      this.repositoryLists.mine = await this.getMyRepositories(this.repositoriesLimit);
      this.repositoryLists.using = await this.getContributingRepositories(this.repositoriesLimit);
      this.repositoryLists.contributing = await this.getUsingRepositories(this.repositoriesLimit);
    },
    onRoleSetted() {
      this.$refs.authorizationsList.updateAuthorizations();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
h1 {
        max-width: 58.25rem;
        padding: 0 1rem;
        margin: 0.75rem auto;
        display: block;
      }

    .org {

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
            text-align: center;
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
              font-weight: bold;
              margin: 0 0 0.625rem 0;
            }
            &__subtitle {
              font-size: 0.875rem;
              margin: 0 1rem 0.625rem 1rem;
              color: $color-grey-darker;
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
            padding: 1rem;
            margin: auto;
          }
        }
        &__edit {
          max-width: 40rem;
          margin-top: 1.563rem;
          padding: 0 0 4rem 0;
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

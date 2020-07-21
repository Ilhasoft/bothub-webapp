<template>
  <layout :show-footer="false">
    <div class="org__header">
      <div class="org__header__content">
        <div class="org__header__info">
          <h1 class="org__header__title"> {{ org ? org.name : '' }} </h1>
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
    <b-loading :active="loading" />
    <div
      v-if="!loading"
      class="org__content">
      <div
        v-show="selected==0">
        <h1 class="org__title"> {{ $t('webapp.orgs.org_info' ) }} </h1>
        <div class="org__edit__content">
          <edit-org-form
            :nickname="nickname"
            :initial-data="org"
            class="org__edit"
            @edited="loadOrg" />

          <div class="org__repositories__separator" />
        </div>

        <h1 class="org__title"> {{ $t('webapp.orgs.manage_contributors') }} </h1>
        <div class="org__edit__content">
          <p> {{ $t('webapp.orgs.manage_subtitle' ) }} </p>
          <org-set-authorization-role-form
            ref="setAuthorizationRoleForm"
            :org-nickname="nickname"
            @roleSetted="onRoleSetted()" />
          <org-authorizations-list
            ref="authorizationsList"
            :org-nickname="nickname" />
        </div>

      </div>
      <div v-show="selected==1">
        <h1 class="org__title"> {{ $t('webapp.orgs.intelligences.mine') }} </h1>
        <paginated-list
          v-if="repositoryLists.org"
          :item-component="repositoryItemElem"
          :per-page="repositoriesLimit"
          :list="repositoryLists.org"
          :empty-message="$t('webapp.home.no_repo')"
          class="org__repositories__cards" />

        <div class="org__repositories__separator" />

        <h1 class="org__title"> {{ $t('webapp.orgs.intelligences.using') }} </h1>
        <paginated-list
          v-if="repositoryLists.contributing"
          :item-component="repositoryItemElem"
          :per-page="repositoriesLimit"
          :list="repositoryLists.contributing"
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
import EditOrgForm from '@/components/org/EditOrgForm';
import RepositoryCard from '@/components/repository/RepositoryCard';
import Activities from '@/components/user/Activities';
import UserReportList from '@/components/user/UserReportList';
import TabSelect from '@/components/shared/TabSelect';
import PaginatedList from '@/components/shared/PaginatedList';
import PaymentForm from '@/components/payment/PaymentForm';
import PaymentHistory from '@/components/payment/PaymentHistory';
import OrgSetAuthorizationRoleForm from '@/components/org/OrgSetAuthorizationRoleForm';
import OrgAuthorizationsList from '@/components/org/OrgAuthorizationsList';

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Org',
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
    OrgSetAuthorizationRoleForm,
    OrgAuthorizationsList,
  },
  data() {
    return {
      org: null,
      loading: false,
      selected: 0,
      repositoryItemElem: RepositoryCard,
      repositoryLists: {
        org: null,
        contributing: null,
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
    nickname() {
      return this.$route.params.org_nickname;
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
  },
  mounted() {
    this.loadOrg();
    this.updateRepositories();
  },
  methods: {
    ...mapActions([
      'getOrgContributingRepositories',
      'getOrgRepositories',
      'getOrg',
    ]),
    async loadOrg() {
      this.loading = true;
      try {
        const response = await this.getOrg({ nickname: this.nickname });
        this.org = response.data;
      } finally {
        this.loading = false;
      }
    },
    submitCoupon() {},
    async updateRepositories() {
      this.repositoryLists.org = await this.getOrgRepositories(
        { nickname: this.nickname, limit: this.repositoriesLimit },
      );
      this.repositoryLists.contributing = await this.getOrgContributingRepositories(
        { nickname: this.nickname, limit: this.repositoriesLimit },
      );
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

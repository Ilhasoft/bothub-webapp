<template>
  <layout>
    <div
      v-if="!authenticated">
      <div class="orgs__login">
        <login-form hide-forgot-password />
      </div>
    </div>
    <div
      v-else
      class="orgs">
      <div class="orgs__buttons">
        <b-button
          type="is-primary"
          @click="createOrgOpen = true"> {{ $t('webapp.orgs.create_org') }} </b-button>
      </div>
      <org-list />
      <b-modal
        :active.sync="createOrgOpen"
        width="460px">
        <div class="form__wrapper">
          <h1 class="form__title"> {{ $t('webapp.orgs.create_org_title') }} </h1>
          <p> {{ $t('webapp.orgs.create_org_subtitle') }} </p>
          <create-org-form class="form"/>
        </div>
      </b-modal>
    </div>
  </layout>
</template>

<script>
import Layout from '@/components/shared/Layout';
import OrgList from '@/components/user/OrgList';
import LoginForm from '@/components/auth/LoginForm';
import CreateOrgForm from '@/components/user/CreateOrgForm';
import { mapGetters } from 'vuex';

export default {
  name: 'Orgs',
  components: {
    Layout,
    OrgList,
    LoginForm,
    CreateOrgForm,
  },
  data() {
    return {
      createOrgOpen: false,
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
    ]),
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
    .form {
      margin-top: 1rem;

      &__title {
        color: $color-primary;
        font-size: 1.813rem;
      }

      &__wrapper {
      background-color: white;
      border-radius: 10px;
      padding: 4rem 2rem 2rem 2rem;
      }
    }

    .orgs {
      max-width: 1200px;
      margin: 3rem auto;
      padding: 0 1rem;
        &__buttons {
            display: flex;
            flex-direction: row-reverse;
            margin-bottom: 3rem;
        }

        &__login {
            max-width: 50rem;
            padding: 0 1rem;
            margin: 3rem auto;
        }
    }
</style>

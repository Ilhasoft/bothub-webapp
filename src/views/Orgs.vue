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
        width="568px">
        <div class="form__wrapper">
          <h1 class="form__title"> {{ $t('webapp.orgs.create_org_title') }} </h1>
          <p> {{ $t('webapp.orgs.create_org_subtitle') }} </p>
          <create-org-form
            class="form"
            @created="onCreated"/>
        </div>
      </b-modal>
    </div>
  </layout>
</template>

<script>
import Layout from '@/components/shared/Layout';
import OrgList from '@/components/org/OrgList';
import LoginForm from '@/components/auth/LoginForm';
import CreateOrgForm from '@/components/org/CreateOrgForm';
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
  methods: {
    onCreated(nickname) {
      this.getNewOrgSchema = false;
      this.$router.push({
        name: 'org',
        params: { org_nickname: nickname },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

    .form {
      margin-top: 2.188rem;

      &__title {
        margin-bottom: 0;
        color: $color-primary;
        font-family: $font-family;
        font-size: 1.813rem;
      }

      &__wrapper {
      background-color: white;
      border-radius: 10px;
      padding: 4rem 3.75rem 3.625rem 4rem;
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

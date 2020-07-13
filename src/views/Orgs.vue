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
        <b-button type="is-primary"> {{ $t('webapp.orgs.create') }} </b-button>
      </div>
      <org-list />
    </div>
  </layout>
</template>

<script>
import Layout from '@/components/shared/Layout';
import OrgList from '@/components/user/OrgList';
import LoginForm from '@/components/auth/LoginForm';
import { mapGetters } from 'vuex';

export default {
  name: 'Orgs',
  components: {
    Layout,
    OrgList,
    LoginForm,
  },
  computed: {
    ...mapGetters([
      'authenticated',
    ]),
  },
};
</script>

<style lang="scss" scoped>
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

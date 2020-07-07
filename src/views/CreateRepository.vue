<template>
  <layout>
    <login-form
      v-if="!authenticated"
      class="login-form"
      hide-forgot-password />
    <create-repository-form
      v-else
      :user-name="myProfile.name"/>
  </layout>
</template>

<script>
import CreateRepositoryForm from '@/components/repository/CreateRepositoryForm';
import Layout from '@/components/shared/Layout';
import { mapGetters } from 'vuex';
import LoginForm from '@/components/auth/LoginForm';

export default {
  name: 'CreateRepository',
  components: {
    Layout,
    CreateRepositoryForm,
    LoginForm,
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

    .login-form {
      margin: 5rem 5rem;
    }

</style>

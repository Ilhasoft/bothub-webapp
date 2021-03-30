<template>
  <div class="create-repository">
    <login-form
      v-if="!authenticated"
      class="create-repository__login-form"
      hide-forgot-password />
    <create-repository-form
      v-else
      :user-name="myProfile.name"/>
  </div>
</template>

<script>
import CreateRepositoryForm from '@/components/repository/CreateRepositoryForm';
import { mapGetters } from 'vuex';
import LoginForm from '@/components/auth/LoginForm';

export default {
  name: 'CreateRepository',
  components: {
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
.create-repository {
  height: 100vh;
  width: 100%;
    &__login-form {
      padding: 5rem 5rem;
    }
}

</style>

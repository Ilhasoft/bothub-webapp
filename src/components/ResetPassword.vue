<template>
  <layout>
    <div class="container">
      <reset-password-form
        :nickname="$route.params.nickname"
        :token="$route.params.token" />
    </div>
  </layout>
</template>

<script>
import Layout from '@/components/shared/Layout';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

const components = {
  Layout,
  ResetPasswordForm,
};

export default {
  name: 'ResetPassword',
  components,
};
</script>

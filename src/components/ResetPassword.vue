<template>
  <div>
    <reset-password-form
      :nickname="$route.params.nickname"
      :token="$route.params.token" />
  </div>
</template>

<script>
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

const components = {
  ResetPasswordForm,
};

export default {
  name: 'ResetPassword',
  components,
};
</script>

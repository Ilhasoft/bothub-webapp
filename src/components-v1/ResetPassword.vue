<template>
  <layout>
    <div class="wrapper">
      <reset-password-form
        :nickname="$route.params.nickname"
        :token="$route.params.token" />
    </div>
  </layout>
</template>

<script>
import Layout from '@/components/shared/Layout';
import ResetPasswordForm from '@/components-v1/auth/ResetPasswordForm';

const components = {
  Layout,
  ResetPasswordForm,
};

export default {
  name: 'ResetPassword',
  components,
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';

.wrapper {
  background-color: $white;
  padding: 8px;
  max-width: 400px;
  margin: 0 auto 16px;
  border-radius: 4px;
}
</style>

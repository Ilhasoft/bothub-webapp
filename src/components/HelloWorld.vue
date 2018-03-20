<template>
  <div class="hello">
    <h1>Bothub</h1>
    <h2><auth-status /></h2>
    <login-form />
  </div>
</template>

<script>
import AuthStatus from '@/components/auth/AuthStatus';
import LoginForm from '@/components/auth/LoginForm';

const components = {
  'auth-status': AuthStatus,
  LoginForm,
};

export default {
  name: 'HelloWorld',
  components,
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
</style>

<template>
  <div class="hello">
    <h1>Bothub</h1>
    <h2><auth-status /></h2>
  </div>
</template>

<script>
import AuthStatus from '@/components/shared/AuthStatus';

export default {
  name: 'HelloWorld',
  components: {
    'auth-status': AuthStatus,
  },
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

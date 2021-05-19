<template>
  <div class="create-repository">
    <create-repository-form/>
  </div>
</template>

<script>
import CreateRepositoryForm from '@/components/repository/CreateRepository/CreateRepositoryForm';
import { mapGetters } from 'vuex';

export default {
  name: 'CreateRepository',
  components: {
    CreateRepositoryForm,
  },
  computed: {
    ...mapGetters([
      'authenticated',
    ]),
  },
  mounted() {
    this.checkIsAuthenticated();
  },
  methods: {
    checkIsAuthenticated() {
      if (!this.authenticated) {
        this.$router.push({
          name: 'home'
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.create-repository {
  height: 100vh;
  width: 100%;
}

</style>

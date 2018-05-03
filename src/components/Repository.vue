<template>
  <layout>
    <div
      v-if="repository"
      class="wrapper">
      <repository-info
        hideDescription
        :slug="repository.slug"
        :name="repository.name"
        :owner__nickname="repository.owner__nickname"
        :available_languages="repository.available_languages"
        :description="repository.description"
        :categories_list="repository.categories_list" />
    </div>
    <div
      v-else-if="!hasError"
      class="wrapper">
        <loading />
      </div>
    <div v-else><error-message :detail="errorDetail" /></div>
  </layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Layout from '@/components/shared/Layout';
import Loading from '@/components/shared/Loading';
import RepositoryInfo from '@/components/repository/RepositoryInfo';
import ErrorMessage from '@/components/shared/ErrorMessage';

const components = {
  Layout,
  Loading,
  RepositoryInfo,
  ErrorMessage,
};

export default {
  name: 'Repository',
  components,
  mounted() {
    this.updateRepository();
  },
  watch: {
    authenticated() {
      this.updateRepository();
    },
  },
  data() {
    return {
      repository: null,
      hasError: false,
      errorDetail: null,
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
    ]),
  },
  methods: {
    ...mapActions([
      'getRepository',
    ]),
    async updateRepository() {
      const { ownerNickname, slug } = this.$route.params;
      this.repository = null;
      try {
        const response = await this.getRepository({ ownerNickname, slug });
        this.repository = response.data;
      } catch (e) {
        this.hasError = true;
        const { detail } = e.response.data;
        this.errorDetail = detail;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';

.wrapper {
  margin: 2rem auto;
  max-width: $desktop;
  min-height: 35rem;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;

  @media screen and (max-width: $desktop) {
    margin: 0 auto;
    border-radius: 0;
    padding: 8px;
  }
}
</style>

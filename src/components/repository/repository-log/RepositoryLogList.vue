<template>

  <div class="repository-log-list">

    <b-notification
      v-if="loading"
      :closable="false">
      <b-loading :active.sync="loading"/>
    </b-notification>

    <log-accordion
      v-for="item in items"
      :key="item.id"
      :log="item"
    />
    <div
      v-if="items.count > 0"
      class="repository-log-list__pagination">
      <b-pagination
        :total="total"
        :current.sync="page"
        :per-page="perPage"
        @change="updateLogs()"/>
    </div>
    <h4
      v-else
      class="repository-log-list__empty-message">
      No logs found
    </h4>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import LogAccordion from '@/components/shared/accordion/LogAccordion';

export default {
  name: 'RepositoryLogList',
  components: {
    LogAccordion,
  },
  props: {
    query: {
      type: Object,
      default: null,
    },
    perPage: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      page: 1,
      items: [],
      total: 0,
      loading: false,
    };
  },
  computed: {
    ...mapState({
      repository: state => state.Repository.selectedRepository,
    }),
  },
  watch: {
    query() {
      this.updateLogs();
    },
  },
  mounted() {
    this.updateLogs();
  },
  methods: {
    ...mapActions([
      'searchLogs',
    ]),
    async updateLogs() {
      this.loading = true;
      const response = await this.searchLogs({
        repositoryUUID: this.repository.uuid,
        limit: this.perPage,
        offset: (this.page - 1) * this.perPage,
        ...this.query,
      });

      this.loading = false;
      this.items = response.data.results;
      this.total = response.data.count;
    },
  },
};
</script>

<style lang="scss" scoped>
  .repository-log-list {
    &__pagination {
      margin-top: 1.25rem;
    }

    &__empty-message {
      margin: 2rem;
      text-align: center;
    }
  }
</style>

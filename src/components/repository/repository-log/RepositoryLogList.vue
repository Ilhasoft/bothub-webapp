<template>

  <div class="repository-log-list">

    <paginated-list
      :per-page="perPage"
      :item-component="logAccordion"
      :list="list"
      :loading.sync="loading"
      :editable="editable"
    />

    <h4
      v-if="list && list.empty && !loading"
      class="repository-log-list__empty-message">
      No logs found
    </h4>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PaginatedList from '@/components/shared/PaginatedList';
import LogAccordion from '@/components/shared/accordion/LogAccordion';

export default {
  name: 'RepositoryLogList',
  components: {
    PaginatedList,
    LogAccordion,
  },
  props: {
    query: {
      type: Object,
      default: null,
    },
    perPage: {
      type: Number,
      default: 20,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      list: null,
      loading: false,
      logAccordion: LogAccordion,
      versionsList: null,
      versions: [],
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
      this.list = await this.searchLogs({
        repositoryUUID: this.repository.uuid,
        query: this.query,
        limit: this.perPage,
      });
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

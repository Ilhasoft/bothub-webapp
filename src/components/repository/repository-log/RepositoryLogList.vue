<template>
  <b-pagination
    :total="total"
    :current.sync="page"
    :per-page="per-page"
    @change="updateLogs()">
    <log-accordion
      v-for="item in items"
      :key="item.id"
      :id="item.id"
    />
  </b-pagination>
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
    'per-page': {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      page: 1,
      items: [],
      total: 0,
    };
  },
  computed: {
    ...mapState({
      repository: state => state.Repository.selectedRepository,
    }),
  },
  mounted() {
    this.updateLogs();
  },
  methods: {
    ...mapActions([
      'searchLogs',
    ]),
    async updateLogs() {
      const response = await this.searchLogs({
        repositoryUUID: this.repository.uuid,
        limit: this.perPage,
        offset: (this.page - 1) * this.perPage,
      });
      this.items = response.data.results;
      this.total = response.data.count;
    },
  },
};
</script>

<style scoped>

</style>

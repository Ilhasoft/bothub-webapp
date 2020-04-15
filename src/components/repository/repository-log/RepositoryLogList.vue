<template>

  <div class="repository-log-list">
    {{ getLogSentence }}
    <div class="repository-log-list__buttons">

      <div>
        <b-checkbox
          v-model="select"
          :native-value="selectAll">
          Select all
        </b-checkbox>
      </div>

      <div>
        <b-icon
          icon="refresh"
          class="repository-log-list__buttons__icons"/>
        <b-icon
          icon="chat-processing"
          class="repository-log-list__buttons__icons"/>
        <b-icon
          icon="delete"
          class="repository-log-list__buttons__icons"/>
      </div>
    </div>
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
      {{ $t('webapp.inbox.list_empty') }}
    </h4>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
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
      select: '',
      selectAll: false,
    };
  },
  computed: {
    ...mapState({
      repository: state => state.Repository.selectedRepository,
    }),
    ...mapGetters(['getLogSentence']),
  },
  watch: {
    query() {
      this.updateLogs();
    },
    select() {
      this.$root.$emit('selectAll', this.select);
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
@import '~@/assets/scss/colors.scss';
  .repository-log-list {
    &__pagination {
      margin-top: 1.25rem;
    }

    &__empty-message {
      margin: 2rem;
      text-align: center;
    }

    &__buttons{
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $color-grey-dark;
      font-size: 1.1rem;
      font-weight: bold;
      &__icons{
      color: $color-grey-dark;
      margin-right: 0.7rem;
    }
    }


  }
</style>

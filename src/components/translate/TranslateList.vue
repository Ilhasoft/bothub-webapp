<template>
  <div>
    <paginatedList
      v-if="translateList"
      :list="translateList"
      :item-component="translateExampleItem"
      :repository="repository"
      :translate-to="to"
      @translated="onTranslated()" />
    <p v-if="translateList && translateList.empty">
      {{ $t('webapp.translate.no_examples') }}
    </p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import PaginatedList from '@/components/shared/PaginatedList';
import TranslateExampleItem from './TranslateExampleItem';

export default {
  name: 'TranslateList',
  components: {
    PaginatedList,
  },
  props: {
    repository: {
      type: Object,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    query: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      translateList: null,
      translateExampleItem: TranslateExampleItem,
    };
  },
  computed: {
    ...mapState({
      repositoryVersion: state => state.Repository.repositoryVersion,
    }),
  },
  watch: {
    async from() { await this.updateList(); },
    async to() { await this.updateList(); },
    query() { this.updateList(); },
  },
  async mounted() {
    await this.updateList();
  },
  methods: {
    ...mapActions([
      'getExamplesToTranslate',
    ]),
    async updateList() {
      this.translateList = null;
      if (!!this.from && !!this.to) {
        await this.$nextTick();
        this.translateList = await this.getExamplesToTranslate({
          repositoryUuid: this.repository.uuid,
          version: this.repositoryVersion,
          from: this.from,
          to: this.to,
          query: this.query,
        });
      }
    },
    async onTranslated() {
      /* istanbul ignore next */
      this.$emit('translated');
      /* istanbul ignore next */
      await this.updateList();
    },
  },
};
</script>

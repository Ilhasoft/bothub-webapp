<template>
  <div>
    <paginated-list
      v-if="versionsList"
      :item-component="evaluateItem"
      :list="versionsList" />
    <p
      v-if="versionsList && versionsList.empty"
      class="no-examples">{{ $t('webapp.evaluate.no_versions') }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PaginatedList from '@/components/shared/PaginatedList';
import EvaluateVersionItem from '@/components/repository/repository-evaluate/versions/EvaluateVersionItem';


export default {
  name: 'EvaluateVersionList',
  components: {
    EvaluateVersionItem,
    PaginatedList,
  },
  data() {
    return {
      evaluateItem: EvaluateVersionItem,
      versionsList: null,
    };
  },
  computed: {
    ...mapGetters({
      repository: 'getCurrentRepository',
      version: 'getSelectedVersion',
    }),
  },
  mounted() {
    this.updateVersionList();
  },
  methods: {
    ...mapActions([
      'getAllResults',
    ]),
    async updateVersionList(force = false) {
      if (!this.resultExampleList || force) {
        this.versionsList = await this.getAllResults({
          repositoryUuid: this.repository.uuid,
          version: this.version,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.no-examples {
  margin: 8px;
}
</style>

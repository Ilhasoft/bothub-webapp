<template>
  <div>
    <pagination
      v-if="versionsList"
      :item-component="evaluateItem"
      :list="versionsList"
      @dispatch="goToDetails()" />
    <p
      v-if="versionsList && versionsList.empty"
      class="no-examples">No examples.</p>
  </div>
</template>

<script>
import Pagination from '@/components-v1/shared/Pagination';
import EvaluateVersionItem from '@/components/repository/repository-evaluate/versions/EvaluateVersionItem';


export default {
  name: 'EvaluateVersionList',
  components: {
    EvaluateVersionItem,
    Pagination,
  },
  props: {
    repository: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      evaluateItem: EvaluateVersionItem,
      versionsList: null,
    };
  },
  mounted() {
    this.updateVersionList();
  },
  methods: {
    updateVersionList(force = false) {
      if (!this.resultExampleList || force) {
        this.versionsList = this.$api.evaluateExample.allVersions(
          this.repository.uuid,
        );
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

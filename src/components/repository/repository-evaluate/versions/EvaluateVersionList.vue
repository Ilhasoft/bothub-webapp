<template>
  <div>
    <pagination
      v-if="versionsList"
      :item-component="evaluateItem"
      :list="versionsList" />
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
  },
  data() {
    return {
      evaluateItem: EvaluateVersionItem,
      versionsList: null,
    };
  },
  mounted() {
    this.updateVersions();
  },
  methods: {
    updateVersions() {
      this.versionsList = {
        count: 3,
        next: null,
        previous: null,
        results: [{
          id: 1,
          language: 'pt-br',
          created_at: '2 minuts ago',
        }],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.no-examples {
  margin: 8px;
}
</style>

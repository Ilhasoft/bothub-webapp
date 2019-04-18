<template>
  <div>
    <pagination
      v-if="versionsList"
      :item-component="VersionTestItem"
      :list="versionsList" />
    <p
      v-if="versionsList && versionsList.empty"
      class="no-examples">No examples.</p>
  </div>
</template>

<script>
import Pagination from '@/components-v1/shared/Pagination';
import VersionTestItemComponent from '@/components/repository/repository-test/versions/VersionTestItem';


export default {
  name: 'VersionTestList',
  components: {
    VersionTestItemComponent,
    Pagination,
  },
  props: {
  },
  data() {
    return {
      VersionTestItem: VersionTestItemComponent,
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

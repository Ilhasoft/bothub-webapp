<template>
  <div>
    <pagination
      v-if="versionsList"
      :item-component="evaluateItem"
      :list="versionsList"
      @dispatch="goToDetails()" />
    <p
      v-if="versionsList && versionsList.empty"
      class="no-examples">No versions</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
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
    ...mapActions([
      'getAllVersions',
    ]),
    updateVersionList(force = false) {
      if (!this.resultExampleList || force) {
        this.getAllVersions({ repositoryUuid: this.repository.uuid })
          .then((response) => {
            this.versionsList = response;
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

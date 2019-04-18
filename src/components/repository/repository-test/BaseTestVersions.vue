<template>
  <div class="base-test-versions bh-grid bh-grid--column">
    <bh-button
      class="base-test-versions__btn"
      primary> Run new test </bh-button>
    <version-test-list/>
  </div>
</template>

<script>
import VersionTestList from '@/components/repository/repository-test/versions/VersionTestList';


export default {
  name: 'BaseTestVersions',
  components: {
    VersionTestList,
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
.base-test-versions {
  &__btn {
    align-self: center;
    margin: 1rem;
  }
}
</style>

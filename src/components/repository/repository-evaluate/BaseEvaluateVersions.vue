<template>
  <div class="base-evaluate-versions bh-grid bh-grid--column">
    <bh-button
      ref="runNewTestButton"
      :loading="evaluating"
      :disabled="evaluating"
      class="base-evaluate-versions__btn"
      primary
      @click="newEvaluate()">
    <slot v-if="!evaluating">Run new test</slot> </bh-button>
    <evaluate-version-list
      :repository="repository"
    />
  </div>
</template>

<script>
import EvaluateVersionList from '@/components/repository/repository-evaluate/versions/EvaluateVersionList';
import { mapActions } from 'vuex';

export default {
  name: 'BaseEvaluateVersions',
  components: {
    EvaluateVersionList,
  },
  props: {
    repository: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      evaluating: false,
      error: {},
    };
  },
  methods: {
    ...mapActions([
      'runNewEvaluate',
      'setUpdateEvaluateResultId',
    ]),
    async newEvaluate() {
      this.evaluating = true;
      try {
        const result = await this.runNewEvaluate({
          owner: this.repository.owner__nickname,
          slug: this.repository.slug,
          language: this.repository.language,
        });
        this.evaluating = false;
        this.setUpdateEvaluateResultId(result.data.evaluate_id);
        return true;
      } catch (error) {
        this.error = error.response.data;
        this.evaluating = false;
        this.$toast.open({
          message: `${this.error.detail}`,
          type: 'is-danger',
          duration: 3000,
        });
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.base-evaluate-versions {
  &__btn {
    align-self: center;
    margin: 1rem;
    left: .75rem;
  }
}
</style>

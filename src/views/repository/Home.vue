<template>
  <repository-view-base
    :repository="repository"
    :loading="loading"
    :error-code="errorCode">
    <div
      v-if="repository"
      class="repository-home">
      <div class="bh-grid bh-grid--column">
        <div class="bh-grid__item">
          <p v-if="repository.description">{{ repository.description }}</p>
          <p v-else><i class="text-color-grey">There is no description for this repository</i></p>
        </div>
        <div
          v-if="hasIntents || hasLabels"
          class="bh-grid__item bh-grid__item--nested">
          <div class="bh-grid">
            <div
              v-if="hasIntents"
              class="bh-grid__item">
              <div class="repository-home__attribute">
                <h4>Intents</h4>
                <div class="repository-home__attribute__card">
                  <bh-badge
                    v-for="(intent) in repository.intents_list"
                    :key="intent"
                    size="small"
                    color="lighter-grey"
                    class="repository-home__attribute__card__badge">
                    <span>{{ intent }}</span>
                  </bh-badge>
                </div>
              </div>
            </div>
            <div
              v-if="hasLabels"
              class="bh-grid__item">
              <div class="repository-home__attribute">
                <h4>Labels</h4>
                <div class="repository-home__attribute__card">
                  <bh-badge
                    v-for="(label) in repository.labels_list"
                    :key="label"
                    size="small"
                    color="lighter-grey"
                    class="repository-home__attribute__card__badge">
                    <span>{{ label }}</span>
                  </bh-badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </repository-view-base>
</template>

<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryBase from './Base';


export default {
  name: 'RepositoryHome',
  components: {
    RepositoryViewBase,
  },
  extends: RepositoryBase,
  computed: {
    hasIntents() {
      return this.repository.intents_list.length > 0;
    },
    hasLabels() {
      return this.repository.labels_list.length > 0;
    },
  },
};
</script>

<style lang="scss">
@import '~bh/src/assets/scss/colors.scss';
@import '~bh/src/assets/scss/variables.scss';


.repository-home {
  &__attribute {
    &__card {
      background-color: $color-white-fake;
      border-radius: 6px;
      padding: .75rem;
      margin: -.25rem;

      &__badge {
        margin: .25rem;
      }
    }
  }
}

</style>

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
          <div class="bh-grid">
            <div class="bh-grid__item bh-grid__item--grow-0">
              <bh-icon value="flag-variant" />
              <span>{{ repository.available_languages.length }} languages</span>
            </div>
            <div class="bh-grid__item bh-grid__item--grow-0">
              <bh-icon value="botinho" />
              <span>{{ repository.examples__count }} examples</span>
            </div>
            <div class="bh-grid__item bh-grid__item--grow-0">
              <bh-icon />
              <span>Created {{ repository.created_at | moment('from') }}</span>
            </div>
          </div>
        </div>
        <div class="bh-grid__item">
          <p v-if="repository.description">{{ repository.description }}</p>
          <p v-else>There is no description for this repository</p>
        </div>
        <div class="bh-grid__item">
          <div v-if="hasIntents || hasLabels">
            <h2 class="bh-title-2">Can identify</h2>
            <div class="bh-grid">
              <div
                v-if="hasIntents"
                class="bh-grid__item">
                <div class="repository-home__attribute">
                  <h3 class="bh-title-3">Intents</h3>
                  <div class="repository-home__attribute__card">
                    <bh-badge
                      v-for="(intent) in repository.intents_list"
                      :key="intent"
                      size="small"
                      color="grey"
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
                  <h3 class="bh-title-3">Labels</h3>
                  <div class="repository-home__attribute__card">
                    <bh-badge
                      v-for="(label) in repository.labels_list"
                      :key="label"
                      size="small"
                      color="grey"
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
      background-color: $color-lighter-grey;
      border-radius: 6px;
      padding: .75rem;
      margin: -.25rem;

      &__badge {
        margin: .25rem;

        > span {
          color: $color-primary-inverted
        }
      }
    }
  }
}

</style>

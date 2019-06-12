<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">
    <div
      v-if="repository"
      class="repository-home">
      <div class="repository-home__header">
        <div class="repository-home__header__icon-badge">
          <bh-icon
            :value="repositoryIcon"
            size="small"
            class="repository-home__header__icon-badge__icon" />
        </div>
        <div class="repository-home__header__wrapper">
          <div class="repository-home__title">
            {{ repository.name }}
          </div>
          <span
            v-for="language in repository.available_languages"
            :key="language"
          >
            <bh-badge
              :transparent="language !== repository.language"
              size="small"
              color="primary"
              class="repository-home__header__wrapper__badge"
            >
              {{ language }}
            </bh-badge>
          </span>
        </div>
      </div>
      <div class="repository-home__description">
        <div class="repository-home__title">
          Description
        </div>
        <div>
          <p
            v-if="repository.description"
            class="repository-home__description__text">{{ repository.description }}</p>
          <p v-else>
            <i class="text-color-grey-dark">There is no description for this repository</i>
          </p>
        </div>
      </div>

      <div class="bh-grid bh-grid--column">
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
                <h4>Labels</h4>
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
    repositoryIcon() {
      return (this.repository.categories[0] && this.repository.categories[0].icon) || 'botinho';
    },
  },
};
</script>

<style lang="scss">
@import '~bh/src/assets/scss/colors.scss';
@import '~bh/src/assets/scss/variables.scss';


.repository-home {
  &__title {
    font-size: 1.75rem;
    font-weight: 700;
  }

  &__header {
    display: flex;
    margin: 2rem .5rem 1rem;

    &__icon-badge {
      $size: 4rem;

      position: relative;
      display: block;
      width: $size;
      height: $size;
      overflow: hidden;
      background-color: $color-primary-dark;
      border-radius: 50%;

      &__icon {
        position: absolute;
        top: 50%;
        left: 50%;
        color: white;
        transform: translate(-50%, -50%);
      }
    }

    &__wrapper {
      padding: 0 .75rem;

      &__badge {
        height: 1.5rem;
        margin: .4rem .5rem 0 0;
        font-weight: bold;
        line-height: calc(1.5rem - 4px);
        border-width: 1px;
      }
    }
  }

  &__description {
    padding: 1rem .5rem;

    &__text {
      white-space: pre-wrap;
    }
  }

  &__intents-list {
    padding: 1rem .5rem;
  }

  &__entities-list {
    padding: 1rem .5rem;
  }

  &__attribute {
    &__card {
      padding: .75rem;
      margin: -.25rem;
      background-color: $color-fake-white;
      border-radius: 6px;

      &__badge {
        margin: .25rem;
      }
    }
  }
}

</style>

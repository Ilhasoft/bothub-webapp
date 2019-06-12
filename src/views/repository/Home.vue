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

      <div
        v-if="hasIntents"
        class="repository-home__intents-list"
      >
        <div class="repository-home__title">
          Intents List
        </div>
        <div class="repository-home__intents-list__card">
          <div>This bot has <strong>{{ repository.intents_list.length }}</strong> intents</div>
          <div class="repository-home__intents-list__card__wrapper">
            <bh-badge
              v-for="(intent) in repository.intents_list"
              :key="intent"
              class="repository-home__intents-list__card__wrapper__badge"
              size="small"
              color="grey"
            >
              <span>{{ intent }}</span>
            </bh-badge>
          </div>
        </div>
      </div>

      <div
        v-if="hasLabels"
        class="repository-home__entities-list"
      >
        <div class="repository-home__title">
          Entities List
        </div>
        <div
          v-for="(label, i) in labels"
          :key="i"
          class="repository-home__entities-list__card"
        >
          <div v-html="formattedLabel(label)" />
          <div class="repository-home__entities-list__card__wrapper">
            <bh-badge
              v-for="(entity, i) in label.entities"
              :key="i"
              size="small"
              color="grey"
              class="repository-home__entities-list__card__wrapper__badge">
              <span>{{ entity }}</span>
            </bh-badge>
          </div>
          <div>
            <strong>{{ label.examples__count }}</strong> sentences
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
    labels() {
      return this.repository.labels.concat([this.repository.other_label]);
    },
    unlabeleds() {
      return this.repository.other_label;
    },
    hasIntents() {
      return this.repository.intents_list.length > 0;
    },
    hasLabels() {
      return this.labels.length > 0;
    },
    repositoryIcon() {
      return (this.repository.categories[0] && this.repository.categories[0].icon) || 'botinho';
    },
  },
  methods: {
    formattedLabel(label) {
      if (label === undefined || label.entities === undefined) {
        return '';
      }

      const entity = label.entities.length > 1 ? 'entities' : 'entity';

      if (label.value === 'other') {
        return `<strong>${label.entities.length}</strong> unlabeled ${entity}`;
      }

      return `<strong>${label.entities.length}</strong> ${entity} labeled <strong>${label.value}</strong>`;
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
    }
  }

  &__description {
    padding: 1rem .5rem;

    &__text {
      white-space: pre-wrap;
    }
  }

  &__intents-list,
  &__entities-list {
    padding: 1rem .5rem;

    &__card {
      padding: .75rem;
      margin: .75rem 0;
      border: 1px solid #CFD5D9;
      border-radius: 6px;

      &__wrapper {
        margin: .75rem .5rem;
      }
    }
  }

  &__intents-list__card__wrapper,
  &__entities-list__card__wrapper,
  &__header__wrapper {
    &__badge {
      height: 1.5rem;
      margin: .4rem .5rem 0 0;
      font-weight: bold;
      line-height: calc(1.5rem - 4px);
      border-width: 1px;
    }
  }
}

</style>

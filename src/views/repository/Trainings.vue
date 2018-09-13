<template>
  <repository-view-base
    :repository="repository"
    :loading="loading"
    :error-code="errorCode">
    <div
      v-if="repository"
      class="trainings">
      <div class="trainings__new-example">
        <new-example-form :repository="repository" />
      </div>
      <div class="trainings__navigation">
        <bh-navigation :actived.sync="currentPath">
          <div label="Home">
            <intents-and-labels-list
              :intents="repository.intents"
              :labels="repository.labels"
              @showSentences="onShowSentences($event)" />
          </div>
          <div
            slot="intent"
            :label="currentIntent && `Intent: ${currentIntent.value}`">
            <div v-if="currentIntent">
              <example-search-input v-model="searchQueryIntent" />
              <examples-list
                :repository="repository"
                :query="searchQueryIntent" />
            </div>
          </div>
          <bh-navigation
            slot="label"
            :label="currentLabel && `Label: ${currentLabel.value}`">
            <div v-if="currentLabel">
              <h1>Label {{ currentLabel.value }}</h1>
              <example-search-input v-model="searchQueryLabel" />
              <examples-list
                :repository="repository"
                :query="searchQueryLabel" />
            </div>
            <div
              slot="entity"
              :label="currentEntity && `Entity: ${currentEntity}`">
              <example-search-input v-model="searchQueryEntity" />
              <examples-list
                :repository="repository"
                :query="searchQueryEntity" />
            </div>
          </bh-navigation>
        </bh-navigation>
      </div>
    </div>
  </repository-view-base>
</template>

<script>
import RepositoryBase from './Base';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import IntentsAndLabelsList from '@/components/repository/IntentsAndLabelsList';
import NewExampleForm from '@/components/example/NewExampleForm';
import ExamplesList from '@/components/example/ExamplesList';
import ExampleSearchInput from '@/components/example/ExampleSearchInput';


export default {
  name: 'RepositoryTrainings',
  components: {
    RepositoryViewBase,
    IntentsAndLabelsList,
    NewExampleForm,
    ExamplesList,
    ExampleSearchInput,
  },
  extends: RepositoryBase,
  data() {
    return {
      currentPath: null,
      currentIntent: null,
      currentLabel: null,
      currentEntity: null,
      searchQueryIntent: {},
      searchQueryLabel: {},
      searchQueryEntity: {},
    };
  },
  watch: {
    currentIntent(value) {
      this.searchQueryIntent = { intent: value.value };
    },
    currentLabel(value) {
      this.searchQueryLabel = { label: value.value };
    },
    currentEntity(value) {
      this.searchQueryEntity = { entity: value };
    },
  },
  methods: {
    onShowSentences({
      type, intent, label, entity,
    }) {
      this.currentIntent = type === 'intent'
        ? intent
        : null;
      this.currentLabel = ['label', 'entity'].includes(type)
        ? label
        : null;
      this.currentEntity = type === 'entity'
        ? entity
        : null;
      this.currentPath = type === 'entity'
        ? 'label.entity'
        : type;
    },
    openEntity(entity) {
      this.currentEntity = entity;
      this.currentPath = 'label.entity';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/assets/scss/colors.scss';


.trainings {
  &__new-example {
    padding: 1rem;
    background-color: $color-lighter-grey;
  }

  &__navigation {
    padding: 1rem;
  }
}
</style>

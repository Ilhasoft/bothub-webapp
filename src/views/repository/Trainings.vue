<template>
  <repository-view-base
    :repository="repository"
    :loading="loading"
    :error-code="errorCode">
    <div
      v-if="repository"
      class="bh-grid bh-grid--column">
      <div class="bh-grid__item bh-grid__item--nested">
        <div class="bh-grid trainings-repository__new-example">
          <div class="bh-grid__item">
            <div v-if="authenticated">
              <new-example-form
                v-if="repository.authorization.can_contribute"
                :repository="repository"
                @created="onExampleCreated()" />
              <div v-else>
                <div class="bh-notification bh-notification--warning">
                  You can not contribute to this repository
                </div>
              </div>
            </div>
            <div v-else>
              <div class="bh-notification bh-notification--info">
                Sign in to your account to contribute to this repository.
              </div>
              <login-form hide-forgot-password />
            </div>
          </div>
        </div>
      </div>
      <div class="bh-grid__item">
        <bh-navigation :actived.sync="currentPath">
          <div label="Home">
            <intents-and-labels-list
              :intents="repository.intents"
              :labels="repository.labels.concat([repository.other_label])"
              @showSentences="onShowSentences($event)" />
          </div>
          <div
            slot="intent"
            :label="currentIntent && `Intent: ${currentIntent.value}`">
            <div v-if="currentIntent">
              <example-search-input v-model="searchQueryIntent" />
              <examples-list
                :repository="repository"
                :query="searchQueryIntent"
                @exampleDeleted="onExampleDeleted" />
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
                :query="searchQueryLabel"
                @exampleDeleted="onExampleDeleted" />
            </div>
            <div
              slot="entity"
              :label="currentEntity && `Entity: ${currentEntity}`">
              <example-search-input v-model="searchQueryEntity" />
              <examples-list
                :repository="repository"
                :query="searchQueryEntity"
                @exampleDeleted="onExampleDeleted" />
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
import LoginForm from '@/components-v1/auth/LoginForm';
import ExampleSearchInput from '@/components/example/ExampleSearchInput';


export default {
  name: 'RepositoryTrainings',
  components: {
    RepositoryViewBase,
    IntentsAndLabelsList,
    NewExampleForm,
    ExamplesList,
    LoginForm,
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
      this.searchQueryIntent = value
        ? { intent: value.value }
        : null;
    },
    currentLabel(value) {
      this.searchQueryLabel = value
        ? { label: value.value }
        : null;
    },
    currentEntity(value) {
      this.searchQueryEntity = value
        ? { entity: value }
        : null;
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
    onExampleCreated() {
      this.updateRepository(true);
    },
    onExampleDeleted() {
      this.updateRepository(true);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';


.trainings-repository {
  &__new-example {
    background-color: $color-white-fake;
  }
}
</style>

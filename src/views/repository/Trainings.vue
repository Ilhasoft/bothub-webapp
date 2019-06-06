<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">
    <div
      v-if="repository"
      class="bh-grid bh-grid--column">
      <div class="bh-grid__item bh-grid__item--nested">
        <div class="bh-grid trainings-repository__new-example">
          <div class="bh-grid__item">
            <div v-if="authenticated">
              <h2>Train a new sentence</h2>
              <span>Add examples to improve your bot intelligence.</span>
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
        <h2>Sentence list</h2>
        <span>Your bot has -- trained sentences and -- not trained sentences.</span>
        <examples-list
          :query="query"
          @exampleDeleted="onExampleDeleted" />
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
import LoginForm from '@/components/auth/LoginForm';
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
      query: {},
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
    currentPath(value) {
      if (value === 'default') {
        this.updateRepository();
      }
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
      this.repository.examples__count -= 1;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';


.trainings-repository {
  &__new-example {
    margin-top: 1rem;
    background-color: $color-white;
    border-bottom: .120rem solid whitesmoke;
  }
}
</style>

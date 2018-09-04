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
              <h1>Intent {{ currentIntent.value }}</h1>
              <pre>{{ currentIntent }}</pre>
            </div>
          </div>
          <bh-navigation
            slot="label"
            :label="currentLabel && `Label: ${currentLabel.value}`">
            <div v-if="currentLabel">
              <h1>Label {{ currentLabel.value }}</h1>
              <div>
                <div
                  v-for="entity in currentLabel.entities"
                  :key="entity"><a @click.prevent="openEntity(entity)">{{ entity }}</a></div>
              </div>
              <pre>{{ currentLabel }}</pre>
            </div>
            <div
              slot="entity"
              :label="currentEntity && `Entity: ${currentEntity}`">
              <div v-if="currentEntity">
                {{ currentEntity }}
              </div>
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


export default {
  name: 'RepositoryTrainings',
  components: {
    RepositoryViewBase,
    IntentsAndLabelsList,
    NewExampleForm,
  },
  extends: RepositoryBase,
  data() {
    return {
      currentPath: null,
      currentIntent: null,
      currentLabel: null,
      currentEntity: null,
    };
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

<template>
  <repository-view-base
    :repository="repository"
    :loading="loading"
    :error-code="errorCode">
    <div
      v-if="repository"
      class="repository-trainings">
      <div class="repository-trainings__new-example">
        <div
          v-if="repository.authorization &&
          repository.authorization.can_contribute">
          <new-example-form :repository="repository" />
        </div>
        <div v-else-if="authenticated">
          <div class="bh-notification bh-notification--warning">
            You can not contribute to this repository
          </div>
        </div>
        <div v-else>
          <div class="bh-notification bh-notification--info">
            Sign in to your account to contribute to this repository.
          </div>
          <login-form hide-forgot-password />
        </div>
      </div>
      <div class="repository-trainings__navigation">
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
              <examples-list
                :repository="repository"
                :query="{ intent: currentIntent.value }" />
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
import { mapGetters } from 'vuex';
import RepositoryBase from './Base';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import IntentsAndLabelsList from '@/components/repository/IntentsAndLabelsList';
import NewExampleForm from '@/components/example/NewExampleForm';
import ExamplesList from '@/components/example/ExamplesList';
import LoginForm from '@/components-v1/auth/LoginForm';


export default {
  name: 'RepositoryTrainings',
  components: {
    RepositoryViewBase,
    IntentsAndLabelsList,
    NewExampleForm,
    ExamplesList,
    LoginForm,
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
  computed: {
    ...mapGetters([
      'authenticated',
    ]),
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


.repository-trainings {
  &__new-example {
    padding: 1rem;
    background-color: $color-lighter-grey;
  }

  &__navigation {
    padding: 1rem;
  }
}
</style>

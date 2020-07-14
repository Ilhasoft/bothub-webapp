<template>
  <sentence-accordion
    :open.sync="open"
    :type="success ? 'is-success' : 'is-danger'"
    :class="{ example: true,
              'fadeIn': true,
    }"
    thick-border
    is-light>
    <div slot="header">
      <highlighted-text
        v-if="open"
        :text="text"
        :entities="allEntities"
        :all-entities="repositoryEntities" />
      <p
        v-else
        class="example-text"> {{ text }}</p>
    </div>

    <b-icon
      slot="options"
      :class="['level-right', success ? 'success' : 'failed']"
      :icon="success ? 'check-bold' : 'close-thick'" />

    <div
      slot="body"
      class="example-infos">
      <p v-if="intentSuccess">
        <strong> {{ $t('webapp.result.intent') }}: </strong>
        <span> {{ intent }}
          ({{ intentPrediction.confidence.toFixed(2) }}
          {{ $t('webapp.result.confidence') }}) </span>
        <strong
          class="success">[{{ $t('webapp.result.ok') }}]</strong>
      </p>
      <p v-else>
        <strong> {{ $t('webapp.result.expected_intent') }}: </strong>
        <span> {{ intent }} / </span>
        <span v-if="intentPrediction.name && intentPrediction.name.length > 0">
          <strong> {{ $t('webapp.result.predicted_intent') }}:</strong>
          {{ intentPrediction.name }}
        </span>
        <strong v-else>{{ $t('webapp.result.no_intent_predicted') }}</strong>
        ({{ intentPrediction.confidence.toFixed(2) }}
        {{ $t('webapp.result.confidence') }})
        <strong
          class="failed">[{{ $t('webapp.result.failed') }}]</strong>
      </p>

      <div
        v-if="entities.length > 0"
        class="example__entities">
        <strong> {{ $tc('webapp.result.entity', entities.length) }}: </strong>
        <div>
          <p
            v-for="(entity, i) in entities"
            :key="i"
            class="entity__text">
            <span> {{ entity.value }} {{ $t('webapp.result.is') }}
              <b-tag
                :class="['entity', getEntityClass(entity)]"
                rounded>{{ entity.entity }}</b-tag>
              <span v-if="entity.confidence">
                ({{ entity.confidence.toFixed(2) }}
                {{ $t('webapp.result.confidence') }})
              </span>
            </span>
            <strong
              v-if="entity.status === 'success'"
              class="success">[{{ $t('webapp.result.ok') }}]</strong>
            <strong
              v-else
              class="failed">[{{ $t('webapp.result.not_predicted') }}]</strong>
          </p>
        </div>
      </div>

      <div
        v-if="addedEntities.length > 0"
        class="example__entities">
        <strong> {{ $tc('webapp.result.added_entity', addedEntities.length) }}: </strong>
        <div>
          <p
            v-for="(entity, i) in addedEntities"
            :key="i"
            class="entity__text">
            <span> {{ entity.value }} {{ $t('webapp.result.is') }}
              <b-tag
                :class="['entity', getEntityClass(entity)]"
                rounded>{{ entity.entity }}</b-tag>
              <span v-if="entity.confidence">
                ({{ entity.confidence.toFixed(2) }}
                {{ $t('webapp.result.confidence') }})
              </span>
            </span>
            <strong
              class="failed">[{{ $t('webapp.result.false_positive') }}]</strong>
          </p>
        </div>
      </div>

      <div
        v-for="(entity, i) in swappedEntities"
        :key="i">
        <p>
          <strong> {{ $t('webapp.result.expected_entity') }}: </strong>
          <span> {{ entity.value }} {{ $t('webapp.result.is') }}
            <b-tag
              :class="['entity', getEntityClass(entity)]"
              rounded>
              {{ entity.entity }}
          </b-tag>/ </span>
          <strong> {{ $t('webapp.result.predicted_entity') }}:</strong>
          <span> {{ entity.value }} {{ $t('webapp.result.is') }}
            <b-tag
              :class="['entity', getEntityClass(toEntity(entity))]"
              rounded>
              {{ entity.predicted_entity }}
            </b-tag>
            <span v-if="entity.confidence">
              ({{ entity.confidence.toFixed(2) }}
              {{ $t('webapp.result.confidence') }})
          </span> </span>
          <strong
            class="failed">[{{ $t('webapp.result.failed') }}]</strong>
        </p>
      </div>
  </div></sentence-accordion>
</template>

<script>
import { mapState } from 'vuex';
import { getEntitiesList } from '@/utils';
import { getEntityColor } from '@/utils/entitiesColors';
import HighlightedText from '@/components/shared/HighlightedText';
import LanguageBadge from '@/components/shared/LanguageBadge';
import SentenceAccordion from '@/components/shared/accordion/SentenceAccordion';

export default {
  name: 'EvaluateResultExampleItem',
  components: {
    HighlightedText,
    LanguageBadge,
    SentenceAccordion,
  },
  props: {
    text: {
      type: String,
      default: '...',
    },
    intent: {
      type: String,
      default: '',
    },
    entities: {
      type: Array,
      default: /* istanbul ignore next */ () => ([]),
    },
    swappedEntities: {
      type: Array,
      default: /* istanbul ignore next */ () => ([]),
    },
    addedEntities: {
      type: Array,
      default: /* istanbul ignore next */ () => ([]),
    },
    success: {
      type: Boolean,
      default: true,
    },
    intentSuccess: {
      type: Boolean,
      default: true,
    },
    intentPrediction: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    repositoryEntities() {
      return this.repository.entities || this.repository.entities_list;
    },
    markEntities() {
      return this.allEntities.filter(entity => !entity.ignore);
    },
    allEntities() {
      const swappedEntities = this.swappedEntities.reduce((entities, entity) => {
        // eslint-disable-next-line no-param-reassign
        entities = [...entities,
          {
            entity: entity.entity || '',
            start: 0,
            end: 0,
            value: entity.value,
          },
          this.toEntity(entity)];
        return entities;
      }, []);
      const trueEntities = this.entities.map(entity => ({
        entity: entity.entity,
        value: entity.value,
        status: entity.status,
        start: entity.status === 'success' ? entity.start : 0,
        end: entity.status === 'success' ? entity.end : 0,
      }));
      return [...trueEntities, ...swappedEntities, ...this.addedEntities];
    },
    ...mapState({
      repository: state => state.Repository.selectedRepository,
    }),
    entitiesList() {
      return getEntitiesList(this.allEntities)
        .map(entity => ({
          value: entity,
          class: this.getEntityClass(entity),
          label: this.getEntityLabel(entity),
        }));
    },
  },
  methods: {
    toEntity(predicted) {
      return {
        entity: predicted.predicted_entity,
        start: predicted.start,
        end: predicted.end,
        value: predicted.value,
      };
    },
    getEntityClass(entity) {
      const color = getEntityColor(
        entity,
        this.repositoryEntities,
        this.allEntities,
      );
      return `entity-${color}`;
    },
    getEntityLabel(entityName) {
      const entity = this.repositoryEntities.find(e => e.entity === entityName);
      return entity.label || 'unlabeled';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../assets/scss/utilities.scss';
@import '~bh/src/assets/scss/colors.scss';

.entity {
  color: black;
  font-weight: bold;

  &__success {
    border: 1px solid $color-success;
  }

  &__text {
    margin: 0 0 0.5rem 0;
  }
}

.example {
  $radius: 8px;

  margin: 1rem 0;
  overflow: visible;
  background-color: $white-bis;
  border-radius: $radius;

  &--failed {
    border: .120rem solid $color-danger;
  }

  &--success {
    border: 2px solid $color-success;
  }

    &:hover {

      background-color: $white;
      box-shadow: 0 2px 8px rgba(100, 100, 100, .5);
  }

  &__entities {
    display: flex;
    flex-wrap: wrap;

    > * {
      margin-right: 0.5rem;
    }
  };

  &__icon {
    margin: 0 .5rem;

    &:hover {
      color: black;
      transition: 1s;
    }
  }

  &__align-no-predicted {
    display: inline-block
  }

  &-text {
    margin: 0;
  }

  &-entities,
  &-infos {
    padding: 4px 8px 4px 16px;
  }
}

.success {
  color: $color-success;
}

.failed {
  color: $color-danger;
}

.fadeIn  {
  -webkit-animation: fadein 0.6s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 0.6s; /* Firefox < 16 */
  -ms-animation: fadein 0.6s; /* Internet Explorer */
  -o-animation: fadein 0.6s; /* Opera < 12.1 */
  animation: fadein 0.6s;
}

@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Internet Explorer */
@-ms-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Opera < 12.1 */
@-o-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}
</style>

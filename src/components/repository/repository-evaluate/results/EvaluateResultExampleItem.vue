<template>
  <!-- <div
    :class="{ example: true,
              'example--failed': !success,
              'example--success': success,
              'fadeIn': true,
  }">
    <div class="example-text">
      <div class="example-text__main">
        <highlighted-text
          :text="text"
          :entities="entities"
          :all-entities="repository.entities || repository.entities_list" />
      </div>
    </div>
    <div class="example-infos level is-mobile">
      <div class="level-left">
        <div
          v-if="intent"
          :class="{'level-item ': true,
                   'text-color-danger': !success}">
          <div v-if="!success">
            <strong
              :class="{
              'text-color-danger': !success}">
              {{ $t('webapp.result.expected_intent') }}:&nbsp;
            </strong>
            <span>{{ intent }} /</span>
            <div
              v-if="intentPrediction.name !== 'no predicted'"
              class="example__align-no-predicted">
              <strong
                :class="{
                'text-color-danger': !success}">
                {{ $t('webapp.result.predicted_intent') }}:&nbsp;
              </strong>
              <span>{{ intentPrediction.name }}
                ({{ intentPrediction.confidence.toFixed(2) }} {{ $t('webapp.result.confidence') }})
              </span>
            </div>
            <strong
              v-else
              :class="{
              'text-color-danger': !success}">
              {{ $t('webapp.result.no_expected_intent') }}
            </strong>
          </div>
          <div v-else>
            <strong>{{ $t('webapp.result.intent') }}:&nbsp;</strong>
            <span>{{ intent }} ({{ confidence.toFixed(2) }} {{ $t('webapp.result.confidence') }})
            </span>
          </div>
        </div>
        <span
          v-if="success"
          class="success">[{{ $t('webapp.result.ok') }}]</span>
        <span
          v-else
          class="failed">[{{ $t('webapp.result.failed') }}]</span>
      </div>
    </div> -->

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
        :entities="entities"
        :all-entities="repository.entities || repository.entities_list" />
      <div
        v-else
        class="level">
        <p class="level-left"> {{ text }}</p>
      </div>
    </div>

    <b-icon
      slot="options"
      :class="['level-right', success ? 'success' : 'failed']"
      :icon="success ? 'check-bold' : 'close-thick'" />

    <div slot="body">
      <div v-if="intentSuccess">
        <strong> {{ $t('webapp.result.intent') }}: </strong>
        <span> {{ intent }} </span>
        <strong
          class="success">[{{ $t('webapp.result.ok') }}]</strong>
      </div>
      <div v-else>
        <strong> {{ $t('webapp.result.expected_intent') }}: </strong>
        <span> {{ intent }} / </span>
        <strong> {{ $t('webapp.result.predicted_intent') }}:</strong>
        <span> {{ intentPrediction.name }}
          ({{ intentPrediction.confidence.toFixed(2) }}
          {{ $t('webapp.result.confidence') }}) </span>
        <strong
          class="failed">[{{ $t('webapp.result.failed') }}]</strong>
      </div>

      <div
        v-for="(entity, i) in entities"
        :key="i">
        <p><strong> {{ $t('webapp.result.entity') }}: </strong>
          <span> {{ entity.value }} is
            <b-tag :class="getEntityClass(entity)">{{ entity.entity }}</b-tag>
          </span>
          <strong
            v-if="entity.status === 'success'"
            class="success">[{{ $t('webapp.result.ok') }}]</strong>
          <strong
            v-else
            class="failed">[{{ $t('webapp.result.failed') }}]</strong>
        </p>
      </div>

      <div
        v-for="(entity, i) in swappedEntities"
        :key="i">
        <strong> {{ $t('webapp.result.expected_entity') }}: </strong>
        <span> {{ entity.value }} is {{ entity.true_entity }} / </span>
        <strong> {{ $t('webapp.result.predicted_entity') }}:</strong>
        <span> {{ entity.value }} is {{ entity.predicted_entity }}
          ({{ entity.confidence.toFixed(2) }}
          {{ $t('webapp.result.confidence') }}) </span>
        <strong
          class="failed">[{{ $t('webapp.result.failed') }}]</strong>
      </div>

    </div>
  </sentence-accordion>
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
    confidence: {
      type: Number,
      default: 0,
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
    ...mapState({
      repository: state => state.Repository.selectedRepository,
    }),
    entitiesList() {
      return getEntitiesList(this.entities)
        .map(entity => ({
          value: entity,
          class: this.getEntityClass(entity),
          label: this.getEntityLabel(entity),
        }));
    },
  },
  methods: {
    getEntityClass(entity) {
      const color = getEntityColor(
        entity,
        this.repository.entities || this.repository.entities_list,
        this.entities,
      );
      return `entity-${color}`;
    },
    getEntityLabel(entityName) {
      const entity = this.entities.find(e => e.entity === entityName);
      return entity.label || 'unlabeled';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../assets/scss/utilities.scss';
@import '~bh/src/assets/scss/colors.scss';

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
    &__entitie {
      margin: 0 .5rem;
    }
  }

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
    display: flex;
    padding: 8px 16px;
    background-color: $white-ter;
    border-radius: $radius;
    transition: box-shadow .2s ease;
    margin: 1px;

    &__main {
      flex-grow: 1;
      font-size: 1.25rem;
    }

    &__rigth {
      flex-grow: 0;
    }
  }

  &-entities,
  &-infos {
    padding: 4px 8px 4px 16px;
  }

  &-entities {
     >* {
      margin: 0 8px 0 0;

      &:last-child {
        margin: 0;
      }
    }
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

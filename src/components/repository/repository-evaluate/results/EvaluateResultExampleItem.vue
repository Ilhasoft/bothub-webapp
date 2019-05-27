<template>
  <div
    :class="{ example: true,
              'example--failed': status == 'error',
              'example--success': status == 'success',
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
                   'text-color-danger': status=='error'}">
          <div v-if="status =='error'">
            <strong
              :class="{
              'text-color-danger': status=='error'}">Expected intent:&nbsp;</strong>
            <span>{{ intent }} /</span>
            <strong
              :class="{
              'text-color-danger': status=='error'}">Predicted intent:&nbsp;</strong>
            <span>{{ intentPrediction.name }}
              ({{ intentPrediction.confidence.toFixed(2) }} confidence) </span>
          </div>
          <div v-else>
            <strong>Intent:&nbsp;</strong>
            <span>{{ intent }} ({{ confidence.toFixed(2) }} confidence)</span>
          </div>

        </div>
        <span
          v-if="status === 'success'"
          class="success">[ok]</span>
        <span
          v-else
          class="failed">[failed]</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getEntitiesList } from '@/utils';
import { getEntityColor } from '@/utils/entitiesColors';
import HighlightedText from '@/components-v1/shared/HighlightedText';
import LanguageBadge from '@/components/shared/LanguageBadge';


export default {
  name: 'EvaluateResultExampleItem',
  components: {
    HighlightedText,
    LanguageBadge,
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
    confidence: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: 'example--failed',
    },
    intentPrediction: {
      type: Object,
      default: null,
    },
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
@import '~@/assets/scss/utilities.scss';
@import '~bh/src/assets/scss/colors.scss';

.example {
  $radius: 8px;

  margin: 16px 8px;
  background-color: $white-bis;
  border-radius: $radius;
  overflow: visible;

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

<template>
  <div
    :class="{ example: true,
              'example--error': !true,
              'example--success': !false,
  }">
    <div class="example-text">
      <div class="example-text__main">
        <highlighted-text
          :text="text"
          :entities="entities"
          :all-entities="repository.entities || repository.entities_list" />
      </div>
    </div>
    <div
      v-if="entitiesList.length > 0"
      class="bh-grid example__entities">
      <div
        v-for="(entity, i) in entitiesList"
        :key="i"
        class="example__entities__entitie">
        <b-tag
          :class="`${entity.class} ${failed}`"
          rounded>
          <strong>{{ entity.value }}</strong>
          <span v-if="entity.label">is</span>
          <strong v-if="entity.label">{{ entity.label }}</strong>
        </b-tag>
        <span
          v-if="true"
          class="example__entities__entitie success">[ok]</span>
        <span
          v-else
          class="example__entities__entitie failed">[failed]</span>
      </div>
    </div>
    <div class="example-infos level is-mobile">
      <div class="level-left">
        <div
          v-if="intent"
          class="level-item has-text-grey">
          <strong>Intent:&nbsp;</strong>
          <span>{{ intent }}</span>
        </div>
        <div class="level-item has-text-grey-light">
          confidence here
        </div>
        <span class="success">[ok]</span>
        <span class="failed">[failed]</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getEntitiesList } from '@/utils';
import { getEntityColor } from '@/utils/entitiesColors';
import HighlightedText from '@/components-v1/shared/HighlightedText';
import LanguageBadge from '@/components/shared/LanguageBadge';


export default {
  name: 'ResultExampleTestItem',
  components: {
    HighlightedText,
    LanguageBadge,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      default: '...',
    },
    language: {
      type: String,
      default: null,
    },
    intent: {
      type: String,
      default: '',
    },
    entities: {
      type: Array,
      default: /* istanbul ignore next */ () => ([]),
    },
    created_at: {
      type: String,
      default: '',
    },
    repository: {
      type: Object,
      default: /* istanbul ignore next */ () => ({}),
    },
    failed: {
      type: String,
      default: 'example--failed',
    },
  },
  computed: {
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
      return this.entities.reduce((current, e) => {
        if (e.entity === entityName) {
          return e.label;
        }
        return current;
      }, 'unlabeled');
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
    border: .120rem solid $color-success;
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

  &:hover {
    .example-text {
      background-color: $white;
      box-shadow: 0 2px 8px rgba(100, 100, 100, .5);
    }
  }

  &-text {
    display: flex;
    padding: 8px 16px;
    background-color: $white-ter;
    border-radius: $radius;
    transition: box-shadow .2s ease;
    margin-bottom: 4px;

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
</style>

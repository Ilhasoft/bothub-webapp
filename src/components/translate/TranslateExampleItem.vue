<template>
  <div class="example">
    <div class="example-text">
      <highlighted-text
        :text="text"
        :entities="entities" />
    </div>
    <div
      v-if="entitiesList.length > 0"
      class="example-entities">
      <b-tag
        rounded
        v-for="(entity, i) in entitiesList"
        :key="i"
        :class="getEntityClass(entity)">{{ entity }}</b-tag>
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
          {{ created_at | moment('from') }}
        </div>
      </div>
      <div
        v-if="repository.authorization && repository.authorization.can_contribute"
        class="level-right">
        <div class="level-item">
          <button
            class="button is-primary"
            @click="toggleFormOpen()">
            <span>Translate</span>
            <b-icon icon="chevron-down" />
          </button>
        </div>
      </div>
    </div>
    <b-collapse :open="formOpen">
      <div class="translate-form">
        <new-translate-form
          :exampleId="id"
          :translateTo="translateTo"
          @translated="onTranslated()"
          :extraEntitiesList="entitiesList" />
      </div>
    </b-collapse>
  </div>
</template>

<script>
import { getEntitiesList } from '@/utils';
import { getEntityColor } from '@/utils/entitiesColors';
import { mapActions } from 'vuex';
import HighlightedText from '@/components/shared/HighlightedText';
import NewTranslateForm from './NewTranslateForm';


const components = {
  HighlightedText,
  NewTranslateForm,
};

export default {
  name: 'TranslateExample',
  props: {
    id: {
      type: Number,
      required: true,
    },
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
    created_at: {
      type: String,
      default: '',
    },
    repository: {
      type: Object,
      default: /* istanbul ignore next */ () => ({}),
    },
    language: {
      type: String,
      required: true,
    },
    translateTo: {
      type: String,
      required: true,
    },
  },
  components,
  data() {
    return {
      deleteDialog: null,
      formOpen: false,
    };
  },
  computed: {
    entitiesList() {
      return getEntitiesList(this.entities);
    },
  },
  methods: {
    ...mapActions([
      'deleteExample',
    ]),
    getEntityClass(entity) {
      return `entity-${getEntityColor(entity, this.entities)}`;
    },
    toggleFormOpen() {
      /* istanbul ignore next */
      this.formOpen = !this.formOpen;
    },
    onTranslated() {
      /* istanbul ignore next */
      this.$toast.open({
        message: 'Example translated!',
        type: 'is-success',
      });
      /* istanbul ignore next */
      // Emit deleted event to remove example from list
      this.$emit('deleted');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';

.example {
  $radius: 8px;

  margin: 16px 8px;
  background-color: $white-bis;
  border-radius: $radius;
  overflow: visible;

  &:hover {
    .example-text {
      background-color: $white;
      box-shadow: 0 2px 8px rgba(100, 100, 100, .5);
    }
  }

  &-text {
    font-size: 1.25rem;
    background-color: $white-ter;
    border-radius: $radius;
    transition: box-shadow .2s ease;
    padding: 8px 16px;
    margin-bottom: 4px;
  }

  &-entities,
  &-infos {
    padding: 4px 8px 4px 16px;
  }

  &-entities {
    > * {
      margin: 0 8px 0 0;

      &:last-child {
        margin: 0;
      }
    }
  }
}

.translate-form {
  padding: 8px 16px 16px;
}
</style>

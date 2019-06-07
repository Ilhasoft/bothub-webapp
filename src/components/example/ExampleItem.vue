<template>
  <div class="example">
    <example-accordion
      :id="id"
      :text="text"
      :entities="entities"
      :intent="intent" />
  </div>
</template>

<script>
import { getEntitiesList } from '@/utils';
import { getEntityColor } from '@/utils/entitiesColors';
import { mapActions } from 'vuex';
import HighlightedText from '@/components-v1/shared/HighlightedText';
import LanguageBadge from '@/components/shared/LanguageBadge';
import ExampleAccordion from '@/components/shared/accordion/ExampleAccordion';


export default {
  name: 'ExampleItem',
  components: {
    HighlightedText,
    LanguageBadge,
    ExampleAccordion,
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
  },
  data() {
    return {
      deleteDialog: null,
    };
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
    ...mapActions([
      'deleteExample',
    ]),
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
    deleteThisExample() {
      return new Promise((resolve, reject) => {
        this.deleteDialog = this.$dialog.confirm({
          message: 'Are you sure? The example will be deleted.',
          confirmText: 'Delete',
          type: 'is-danger',
          onConfirm: async () => {
            await this.deleteExample({ id: this.id });
            this.$emit('deleted');
            resolve();
          },
          onCancel: () => {
            /* istanbul ignore next */
            reject();
          },
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';
</style>

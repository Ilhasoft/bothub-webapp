<template>
  <sentence-accordion
    :open.sync="open">

    <div
      slot="header"
      class="level">

      <div class="example-accordion__tag level-left">
        <language-badge :language="language"/>
      </div>

      <div
        v-if="!open"
        class="level-right example-accordion__text">{{ text }}</div>

      <div
        v-else
        class="level-right">
        <highlighted-text
          v-if="open && !editing"
          :text="text"
          :entities="entities"
          :all-entities="repository.entities || repository.entities_list" />
      </div>
    </div>
    <div
      slot="options"
      class="level example-accordion__btns-wrapper">
      <div
        v-if="repository.authorization && repository.authorization.can_contribute && !training"
        class="level-right">
        <div class="level-item">
          <a
            v-show="!editing"
            :href="`#delete-example-${id}`"
            class="has-text-danger"
            @click.prevent.stop="editSentence()">
            <b-icon
              icon="pen"
              class="text-color-grey-dark example__icon" />
          </a>
        </div>
      </div>
      <div
        v-if="repository.authorization && repository.authorization.can_contribute"
        class="level-right">
        <div class="level-item">
          <a
            :href="`#delete-example-${id}`"
            class="has-text-danger"
            @click.prevent.stop="deleteThisExample()">
            <b-icon
              icon="delete"
              class="text-color-grey-dark example__icon" />
          </a>
        </div>
      </div>
    </div>
    <div slot="body">
      <example-info
        v-if="!editing"
        :entities-list="entitiesList"
        :intent="intent" />

      <edit-example
        v-else
        :entities="entitiesList"
        :intent-to-edit="intent"
        :text-to-edit="text"
        :sentence-id="id"
        @cancel="cancelEditSentence"/>
    </div>
  </sentence-accordion>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getEntitiesList } from '@/utils';
import { getEntityColor } from '@/utils/entitiesColors';
import ExampleInfo from '@/components/shared/accordion/ExampleInfo';
import EditExample from '@/components/shared/accordion/EditExample';
import SentenceAccordion from '@/components/shared/accordion/SentenceAccordion';
import HighlightedText from '@/components/shared/HighlightedText';
import LanguageBadge from '@/components/shared/LanguageBadge';

export default {
  name: 'ExampleAccordion',
  components: {
    SentenceAccordion,
    ExampleInfo,
    EditExample,
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
      default: '',
    },
    entities: {
      type: Array,
      default: /* istanbul ignore next */ () => ([]),
    },
    intent: {
      type: String,
      default: '',
    },
    training: {
      type: Boolean,
      default: false,
    },
    language: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      open: false,
      deleteDialog: null,
      editing: false,
    };
  },
  computed: {
    ...mapState({
      repository: state => state.Repository.selectedRepository,
    }),
    entitiesList() {
      const entitiesList = getEntitiesList(this.entities);

      return this.entities
        .map((entity, index) => ({
          value: entitiesList[index],
          class: this.getEntityClass(entitiesList[index]),
          label: this.getEntityLabel(entitiesList[index]),
          ...entity,
        }));
    },
  },
  watch: {
    open() {
      if (!this.open) {
        this.cancelEditSentence();
      }
    },
  },
  methods: {
    ...mapActions([
      'deleteEvaluateExample',
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
        this.deleteDialog = this.$buefy.dialog.confirm({
          message: 'Are you sure? The example will be deleted.',
          confirmText: 'Delete',
          type: 'is-danger',
          onConfirm: async () => {
            if (this.training) {
              await this.deleteExample({ id: this.id });
              this.$emit('deleted');
              resolve();
            } else {
              await this.deleteEvaluateExample({
                id: this.id,
                repositoryUuid: this.$store.state.Repository.selectedRepository.uuid,
              });
              this.$emit('deleted');
              resolve();
            }
          },
          onCancel: () => {
            /* istanbul ignore next */
            reject();
          },
        });
      });
    },
    cancelEditSentence() {
      this.editing = false;
    },
    editSentence() {
      this.editing = true;
      this.open = true;
    },
  },
};
</script>

<style lang="scss" scoped>

  .example-accordion {

    &__text {
      max-width: 100%;
    }

    &__tag {
      margin-right: 0.5rem;
    }

    &__btns-wrapper {
        display: flex;
        justify-content: flex-end;
      }
  }
</style>

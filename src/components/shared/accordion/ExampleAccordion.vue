<template>
  <div class="expander">
    <div
      :class="open ? 'active':'before-border'"
      class="expander__trigger"
      @click="toggleAccordion">

      <div v-if="!open">{{ text }}</div>

      <div v-else>
        <highlighted-text
          v-if="open && !editing"
          :text="text"
          :entities="entities"
          :all-entities="repository.entities || repository.entities_list" />
      </div>

      <div class="expander__trigger__btns-wrapper">
        <div
          v-if="repository.authorization && repository.authorization.can_contribute && !training"
          class="level-right">
          <div class="level-item">
            <a
              v-show="!editing"
              :href="`#delete-example-${id}`"
              class="has-text-danger"
              @click.prevent.stop="editSentence">
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
    </div>
    <transition name="fade">
      <div
        v-show="open"
        class="expander__body">
        <slot>
          <example-info
            v-if="!editing"
            :entities-list="entitiesList"
            :intent="intent" />
        </slot>
        <slot>
          <edit-example
            v-if="editing"
            :entities="entitiesList"
            :intent-to-edit="intent"
            :text-to-edit="text"
            :sentence-id="id"
            @cancel="cancelEditSentence"/>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getEntitiesList } from '@/utils';
import { getEntityColor } from '@/utils/entitiesColors';
import HighlightedText from '@/components-v1/shared/HighlightedText';
import ExampleInfo from '@/components/shared/accordion/ExampleInfo';
import EditExample from '@/components/shared/accordion/EditExample';

export default {
  name: 'ExampleAccordion',
  components: {
    HighlightedText,
    ExampleInfo,
    EditExample,
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
        this.deleteDialog = this.$dialog.confirm({
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
    toggleAccordion() {
      this.open = !this.open;

      if (!this.open) {
        this.cancelEditSentence();
      }
    },
  },
};
</script>


<style lang="scss" scoped>
  @import '../../../assets/scss/utilities';

  .before-border {
    position: relative;

    &:before {
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      content: '';
      border-bottom: 1px solid #2bbfac;
      transition: opacity .1s linear, transform .5s ease-in-out;
    }

    &:not(:hover)::before {
      opacity: 0;
      transform: scaleX(0);
    }
  }

  .accordion {
    overflow: hidden;
    background: #fff;
    box-shadow: 0 1px 12px 1PX rgba(0,0,0,0.25);
  }

  .expander {
    &__trigger {
      display: grid;
      grid-template-columns: 1fr 25%;
      justify-content: space-between;
      padding: .7rem;
      margin-top: 0.5rem;
      cursor: pointer;
      border: 1px solid #cfd5d9;
      border-radius: 3px;

      &__btns-wrapper {
        display: flex;
        justify-content: flex-end;
      }
    }

    &__body {
      padding: .7rem 0;
      background: #f5f5f5;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }

  .example {
    &__icon {
      margin: 0 .5rem;

      &:hover {
        color: black;
        transition: 1s;
      }
    }
  }
</style>

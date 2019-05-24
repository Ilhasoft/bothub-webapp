<template>
  <div class="expander">
    <div
      :class="open ? 'active':'before-border'"
      class="expander__trigger"
      @click="open=!open">

      <div v-if="!open">{{ text }}</div>

      <div v-else>
        <highlighted-text
          :text="text"
          :entities="entities"
          :all-entities="repository.entities || repository.entities_list" />
      </div>

      <div class="expander__trigger__btns-wrapper">
        <div
          v-if="repository.authorization && repository.authorization.can_contribute"
          class="level-right">
          <div class="level-item">
            <a
              :href="`#delete-example-${id}`"
              class="has-text-danger">
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
          <div
            v-if="entitiesList.length > 0"
            class="example-entities">
            <b-tag
              v-for="(entity, i) in entitiesList"
              :key="i"
              :class="entity.class"
              rounded>
              <strong>{{ entity.value }}</strong>
              <span v-if="entity.label">is</span>
              <strong v-if="entity.label">{{ entity.label }}</strong>
            </b-tag>
          </div>
          <div class="example-infos level is-mobile">
            <div class="level-left">
              <div
                v-if="intent"
                class="level-item has-text-grey">
                <strong>Intent:&nbsp;</strong>
                <span>{{ intent }}</span>
              </div>
            </div>
          </div>
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

export default {
  name: 'ExampleAccordion',
  components: {
    HighlightedText,
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
  },
  data() {
    return {
      open: false,
      deleteDialog: null,
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
    ...mapActions([
      'deleteEvaluateExample',
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
            await this.deleteEvaluateExample({ id: this.id });
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
  @import '../../assets/scss/utilities.scss';

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
      display: flex;
      justify-content: space-between;
      padding: .7rem;
      margin: .5rem .8rem 0;
      cursor: pointer;
      border: 1px solid #cfd5d9;
      border-radius: 3px;

      &__btns-wrapper {
        display: flex;
        justify-content: space-between;
      }
    }

    &__body {
      padding: .7rem 0;
      margin: 0 .8rem;
      background: #f5f5f5;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }

  .example {
    $radius: 8px;

    margin: 16px 8px;
    overflow: visible;
    background-color: $white-bis;
    border-radius: $radius;

    &__icon {
      margin: 0 .5rem;

      &:hover {
        color: black;
        transition: 1s;
      }
    }

    &-text {
      display: flex;
      padding: 1rem 2rem;
      margin-bottom: 4px;
      background-color: $white-ter;
      border-radius: $radius;
      transition: box-shadow .2s ease;

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
      > * {
        margin: 0 8px 0 0;

        &:last-child {
          margin: 0;
        }
      }
    }
  }
</style>

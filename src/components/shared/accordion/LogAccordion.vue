<template>
  <sentence-accordion
    :id="log.id"
    :language="log.language"
    :entities="log.entities"
    :training="false"
    :open.sync="open">

    <div
      slot="header"
      class="columns">
      <a class="column"> {{ log.nlp_log.repository_version }} </a>
      <div class="column">
        <language-badge :language="log.nlp_log.language"/>
      </div>
      <div
        v-if="!open"
        class="column">{{ log.text }}</div>

      <div
        v-else
        class="column">
        <highlighted-text
          v-if="open"
          :text="log.text"
          :entities="log.nlp_log.entities"
          :all-entities="repository.entities || repository.entities_list" />
      </div>
    </div>

    <div slot="options">

      <b-dropdown aria-role="list">
        <button
          slot="trigger"
          class="button is-text">
          <b-icon icon="plus"/>
        </button>

        <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
        <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
        <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
      </b-dropdown>
    </div>

    <div slot="body">
      <log-info
        :entities-list="entitiesList"
        :intent="log.nlp_log.intent.name"
        :confidence="log.nlp_log.intent.confidence"/>
    </div>

  </sentence-accordion>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getEntitiesList } from '@/utils';
import { getEntityColor } from '@/utils/entitiesColors';
import LogInfo from '@/components/shared/accordion/LogInfo';
import SentenceAccordion from '@/components/shared/accordion/SentenceAccordion';
import LanguageBadge from '@/components/shared/LanguageBadge';

export default {
  name: 'LogAccordion',
  components: {
    SentenceAccordion,
    LogInfo,
    LanguageBadge,
  },
  props: {
    log: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      deleteDialog: null,
      open: false,
    };
  },
  computed: {
    ...mapState({
      repository: state => state.Repository.selectedRepository,
    }),
    entitiesList() {
      const entitiesList = getEntitiesList(this.log.nlp_log.entities_list);

      return this.log.nlp_log.entities_list
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

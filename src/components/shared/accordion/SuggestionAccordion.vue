<template>
  <div class="suggestion-accordion">
    <b-field
      v-if="editing"
      class="suggestion-accordion__field">
      <b-input
        v-model="suggestionWord"
        size="is-small"/>
    </b-field>

    <div
      v-else
      class="suggestion-accordion__phrase">
      <p>{{ suggestionWord }}</p>
    </div>

    <div class="suggestion-accordion__icons">
      <b-icon
        v-if="editing"
        icon="check-bold"
        size="is-small"
        class="text-color-grey-dark suggestion-accordion__icons__style"
        @click.native="saveEdition()" />
      <b-icon
        v-else
        icon="pencil"
        size="is-small"
        class="text-color-grey-dark suggestion-accordion__icons__style"
        @click.native="editPhrase()" />
      <b-icon
        icon="delete"
        size="is-small"
        class="text-color-grey-dark suggestion-accordion__icons__style"
        @click.native="deletePhrase()" />
    </div>
  </div>
</template>

<script>
import ExampleAccordion from '@/components/shared/accordion/ExampleAccordion';


export default {
  name: 'SuggestionAccordion',
  components: {
    ExampleAccordion,
  },
  props: {
    text: {
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
      open: false,
      suggestionWord: '',
      editing: false,
    };
  },
  computed: {
    allEntities() {
      return this.repository.entities.map(
        entityValue => entityValue.value,
      );
    },
  },
  mounted() {
    this.updateText();
  },
  methods: {
    updateText() {
      this.suggestionWord = this.text;
    },
    editPhrase() {
      this.editing = !this.editing;
    },
    deletePhrase() {
      this.$emit('deleted');
    },
    saveEdition() {
      this.$emit('updateList', this.suggestionWord);
      this.editing = false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';

.suggestion-accordion{
    width: 100%;
    height: 40px;
    margin: 0.4rem 0;
    background: $color-fake-white;
    border: 1px solid $color-border;

    display:flex;
    justify-content: space-between;
    align-items: center;

    &__field{
        width:55%;
        margin-top: 0.69rem;
        margin-left: 1rem;

    }

    &__phrase{
        margin-left: 1rem;
        p {
        white-space: nowrap;
        width: 32rem;
        overflow: hidden;
        text-overflow: ellipsis;
        }
    }

    &__icons{
        margin-right: 1rem;

        &__style{
            cursor: pointer;
        }
        &__style:hover{
            color: $color-fake-grey;
        }

    }

}
</style>

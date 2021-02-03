<template>
  <div class="intent-suggestion-accordion">
    <div class="intent-suggestion-accordion__content">
      <div
        class="intent-suggestion-accordion__content__check-field">
        <b-checkbox
          v-model="checked"
          :native-value="toExample"/>
      </div>
      <b-field
        v-if="editing"
        class="intent-suggestion-accordion__content__field">
        <b-input
          v-model="phraseSuggestion"
          class="intent-suggestion-accordion__content__field__input"
          size="is-small"/>
      </b-field>

      <div
        v-else
        class="intent-suggestion-accordion__content__phrase">
        <p>{{ phraseSuggestion }}</p>
      </div>
    </div>

    <div class="intent-suggestion-accordion__icons">
      <b-icon
        icon="pencil"
        size="is-small"
        class="text-color-grey-dark intent-suggestion-accordion__icons__style"
        @click.native="!editing ? editPhrase() : ''" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'IntentSuggestion',
  props: {
    id: {
      type: Number,
      default: 0,
    },
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
      phraseSuggestion: '',
      editing: false,
      checked: false,
    };
  },
  computed: {
    toExample() {
      return {
        text: this.phraseSuggestion,
        id: this.id,
      };
    },
  },
  watch: {
    checked() {
      if (this.checked) {
        this.setSelectedSuggestion(this.toExample);
      } else {
        this.removeSelectedSuggestion(this.toExample);
      }
    },
    isAccordionOpen() {
      this.open = false;
    },
  },
  created() {
    this.$root.$on('selectAll', value => this.selectAll(value));
    this.$root.$on('confirmEdit', () => this.saveEdit());
    this.$root.$on('cancelEdit', () => this.updateText());
  },
  mounted() {
    this.updateText();
  },
  methods: {
    ...mapActions([
      'setEditingStatus',
      'setSelectedSuggestion',
      'removeSelectedSuggestion',
      'changeSelectedSuggestion',
    ]),
    selectAll(value) {
      this.checked = value;
    },
    updateText() {
      this.phraseSuggestion = this.text;
      this.editing = false;
    },
    editPhrase() {
      this.editing = !this.editing;
      this.setEditingStatus(this.editing);
    },
    saveEdit() {
      this.changeSelectedSuggestion({ id: this.id, text: this.phraseSuggestion });
      this.editing = false;
      this.setEditingStatus(false);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

.b-checkbox.checkbox:not(.button){
  margin-right: 0;
}

.intent-suggestion-accordion{
    width: 100%;
    height: 40px;
    margin: 0.4rem 0;
    background: $color-fake-white;
    border: 1px solid $color-border;

    display:flex;
    justify-content: space-between;
    align-items: center;


    &__content{
     width: 80%;
     display:flex;
     padding-left: 10px;
     justify-content: flex-start;
     align-items: center;

      &__check-field{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-left: 1rem;
      }

      &__field{
          margin-left: 1rem;
          width: 50%;
          height: 100px;
          display: flex;
          justify-content: flex-start;
          align-items: center;

          &__input{
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
      }

      &__phrase{
        margin-left: 1rem;
          p {
          white-space: nowrap;
          width: 32rem;
          overflow: hidden;
          text-overflow: ellipsis;
            @media screen and (max-width: $mobile-width) {
              width: 12rem;
            }
          }
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

<template>
  <div>
    <div class="columns is-variable is-1">
      <div class="column">
        <form @submit.prevent="addExample()">
          <div class="columns is-variable is-2">
            <div class="column is-three-fifths">
              <bh-field label>
                <example-with-highlighted-text-input
                  ref="textInput"
                  v-model="text"
                  size="medium"
                  placeholder="Add a sentence"
                  :entities="preparedEntities"
                  @textSelected="setTextSelected($event)" />
              </bh-field>
            </div>
            <div class="column">
              <bh-field
                label="Intent"
                helpText="When your bot receives a message, your bot can use a
                          recognizer to examine the message and determine intent.">
                <bh-text-input
                  v-model="intent"
                  size="medium"
                  placeholder="Intent" />
              </bh-field>
            </div>
            <div class="column is-narrow">
              <bh-field label>
                <bh-button
                  primary
                  type="submit"
                  :disabled="!isValid"
                  :tooltipHover="!isValid ? validationErrors : null"
                  size="medium">Submit</bh-button>
              </bh-field>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div
      v-if="entities.length > 0"
      class="columns is-variable is-1">
      <div class="column">
        <entities-badges-input
          editEntityEnable
          :entities="preparedEntities" />
      </div>
    </div>
    <div class="columns is-variable is-1">
      <div class="column is-narrow">
        <new-entity-input
          :repository="repository"
          :text="text"
          :textSelected="textSelected"
          :labels="labels"
          @newEntity="addNewEntity($event)" />
      </div>
    </div>
  </div>
</template>

<script>
import ExampleWithHighlightedTextInput from '@/components/inputs/ExampleWithHighlightedTextInput';
import NewEntityInput from '@/components/inputs/NewEntityInput';
import EntitiesBadgesInput from '@/components/inputs/EntitiesBadgesInput';


const components = {
  ExampleWithHighlightedTextInput,
  NewEntityInput,
  EntitiesBadgesInput,
};

export default {
  name: 'NewExampleForm',
  components,
  props: {
    repository: [Object, String],
    required: true,
  },
  watch: {
    text(text, oldText) {
      this.validateEntities(text, oldText);
    },
  },
  data() {
    return {
      textSelected: null,
      text: '',
      intent: '',
      entities: [],
    };
  },
  computed: {
    validationErrors() {
      const errors = [];

      if (!this.text) {
        errors.push('You need type a text to sentence');
      }

      if (!this.intent && this.entities.length === 0) {
        errors.push('Set a intent or one entity');
      }

      return errors;
    },
    isValid() {
      return this.validationErrors.length === 0;
    },
    labels() {
      return this.entities.reduce((current, { entity, label, pristineLabel }) => {
        if (label || pristineLabel) {
          return Object.assign(current, { [entity]: label || pristineLabel });
        }
        return current;
      }, {});
    },
    preparedEntities() {
      return this.entities
        .map(({
          label,
          pristineLabel,
          entity,
          ...others
        }) => ({
          label: this.labels[entity],
          entity,
          ...others,
        }))
        .sort((a, b) => (a.start - b.start));
    },
  },
  methods: {
    setTextSelected(value) {
      this.textSelected = value;
    },
    addNewEntity(entity) {
      this.entities.push(entity);
      this.$refs.textInput.clearSelected();
    },
    validateEntities(text, oldText) {
      /*
        Entity follow text,
        based in https://github.com/RasaHQ/rasa-nlu-trainer/blob/master/src/components/TextEditor.js
      */
      this.entities.forEach((entity, i) => {
        const oldEntityText = oldText.substring(entity.start, entity.end);

        const findClosestStart = (lastMatch) => {
          if (lastMatch === undefined) {
            const index = text.indexOf(oldEntityText);
            return index === -1
              ? index
              : findClosestStart(index);
          }

          const from = lastMatch + oldEntityText.length;
          const index = text.indexOf(oldEntityText, from);

          if (index === -1) {
            return lastMatch;
          }

          const prevDiff = Math.abs(entity.start - lastMatch);
          const nextDiff = Math.abs(entity.start - index);

          return prevDiff < nextDiff
            ? lastMatch
            : findClosestStart(index);
        };

        const start = findClosestStart();
        if (start === -1) {
          this.entities[i] = false;
          return false;
        }

        this.entities[i].start = start;
        this.entities[i].end = start + oldEntityText.length;
        return true;
      });
      this.entities = this.entities.filter(value => !!value);
    },
    addExample() {},
  },
};
</script>

<style lang="scss" scoped>
.inputs {
  display: flex;

  &-item {
    margin-right: 8px;

    &:last-child {
      margin-right: 0;
    }
  }

  .text-input {
    flex-grow: 3;
  }

  .intent-input {
    flex-grow: 1;
  }

  .submit-btn {
    min-height: 10px;
    background-color: green;
  }
}
</style>

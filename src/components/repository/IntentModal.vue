<template>
  <section class="modalStyle">
    <div
      class="modal-card modalStyle__content">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ titleHeader }}</p>
      </header>
      <section class="modal-card-body">
        <b-field>
          <b-select
            v-model="selectedOptions"
            size="is-medium"
            placeholder="Intent"
            expanded>

            <option
              v-for="intent in repository.intents_list"
              v-show="info.intent_ranking.length == 0"
              :key="intent"
              :value="intent"
            >
              {{ intent }}
            </option>

            <option
              v-for="info in info.intent_ranking"
              :key="info.confidence"
              :value="info.name">
              {{ info.name }} {{ info.confidence | percent }}
            </option>

          </b-select>

        </b-field>
      </section>
      <footer class="modal-card-foot modalStyle__content__footer">
        <button
          class="button"
          type="button"
          @click="$parent.close()">Close</button>
        <button
          class="button is-primary"
          @click="addIntent">Add</button>

      </footer>
    </div>
  </section>
</template>

<script>


export default {
  name: 'IntentModal',
  props: {
    repository: {
      type: Object,
      default: null,
    },
    info: {
      type: Object,
      required: true,
    },
    titleHeader: {
      type: String,
      default: '',
    },

  },
  data() {
    return {
      selectedOptions: null,
    };
  },
  methods: {
    addIntent() {
      this.$emit('addedIntent', this.selectedOptions, this.titleHeader);
    },
  },
};
</script>
<style lang="scss" scoped>
 @import '~@/assets/scss/utilities.scss';

.modalStyle{
  display: flex;
  justify-content: center;
  align-items: center;

  &__content{
    width: $size-large + 25rem;

      &__footer{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      }
  }

}
</style>

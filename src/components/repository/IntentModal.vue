<template>
  <section id="modalStyle">
    <div
      class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ TitleHeader }}</p>
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
              {{ info.name }} {{ Math.round(info.confidence * 100) }}%
            </option>

          </b-select>

        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button
          class="button"
          type="button"
          @click="$parent.close()">Close</button>
        <button
          v-if="TitleHeader === 'Training'"
          class="button is-primary"
          @click="addToTraining(selectedOptions)">Add</button>
        <button
          v-else
          class="button is-primary"
          @click="addToSentences(selectedOptions)">Add</button>
      </footer>
    </div>
  </section>
</template>

<script>


export default {
  props: {
    repository: {
      type: Object,
      default: null,
    },
    info: {
      type: Object,
      required: true,
    },
    TitleHeader: {
      type: String,
      default: '',
    },
    addToTraining: {
      type: Function,
      default: null,
    },
    addToSentences: {
      type: Function,
      default: null,
    },


  },
  data() {
    return {
      selectedOptions: null,
    };
  },
  methods: {
    addIntent() {
      this.$emit('addedIntent', this.selectedOptions);
    },
  },
};
</script>
<style>
#modalStyle{
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-card{
  width: 30em;
}
.modal-card-foot{
  display: flex;
  justify-content: flex-end;
  align-items: center;

}
</style>

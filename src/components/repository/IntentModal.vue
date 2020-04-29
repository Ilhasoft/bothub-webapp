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
            :placeholder="$t('webapp.inbox.intent')"
            size="is-medium"
            expanded>

            <option
              v-for="intent in repository.intents_list"
              v-show="info.intent_ranking.length == 0 ||info.intent_ranking.length !== 0 && confidenceVerify"
              :key="intent"
              :value="{name: intent}"
            >
              {{ intent }}
            </option>

            <option
              v-for="info in info.intent_ranking"
              v-show="!confidenceVerify"
              :key="info.confidence"
              :value="{name: info.name, percent: info.confidence }">
              {{ info.name }} {{ info.confidence | percent }}
            </option>

          </b-select>

        </b-field>
      </section>
      <footer class="modal-card-foot modalStyle__content__footer">
        <button
          class="button"
          type="button"
          @click="closeModal">{{ $t('webapp.inbox.add_log.close') }}</button>
        <button
          :disabled="!selectedOptions"
          class="button is-primary"
          @click="addIntent"> {{ $t('webapp.inbox.add_log.add') }}</button>

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
    confidenceVerify: {
      type: Boolean,
      default: false,
    },

  },
  data() {
    return {
      selectedOptions: null,
    };
  },
  methods: {
    addIntent() {
      this.$emit('addedIntent', this.selectedOptions.name, this.titleHeader);
      this.$parent.close();
    },
    closeModal() {
      this.$emit('closeModal');
      this.$parent.close();
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

<template>
  <div>
    <b-icon
      icon="alpha-s-box"
      custom-size="mdi-24px"
      class="suggestion-icon"
      @click.native.stop="openSuggestionModal()"/>
  </div>
</template>

<script>

import WordSuggestionModal from '@/components/repository/WordSuggestionModal';

export default {
  name: 'WordSuggestion',
  components: {
    WordSuggestionModal,
  },
  props: {
    getSentence: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      sentenceData: [],
    };
  },
  methods: {
    openSuggestionModal() {
      this.$buefy.modal.open({
        props: {
          detail: this.getSentence,
        },
        parent: this,
        component: WordSuggestionModal,
        hasModalCard: false,
        trapFocus: true,
        canCancel: false,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';

.suggestion-icon {
  color: $color-grey-dark;
  &:hover {
   color: $color-fake-grey;
   transition: 1s;
  }
}

</style>

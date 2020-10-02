<template>
  <div>
    <b-button
      :disabled="loading"
      :loading="loading"
      label="Auto translate"
      type="is-primary" />
    <progress-bar
      :progress="progress"
      type="is-primary"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AutoTranslate',
  props: {
    translateFrom: {
      type: String,
      default: null,
    },
    translateTo: {
      type: String,
      default: null,
    },
    repositoryUuid: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
      isRunning: false,
      progress: 0,
      repeatingCheck: null,
    };
  },
  computed: {
    ...mapGetters({
      version: 'getSelectedVersion',
    }),
  },
  methods: {
    ...mapActions(['autoTranslate']),
    checkProgress() {

    },
  },
};
</script>

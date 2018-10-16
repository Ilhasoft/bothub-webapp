<template>
  <div>
    <bh-language-flag
      size="normal"
      language="en"/>
    <bh-language-flag
      size="normal"
      language="de"/>
    <bh-language-flag
      size="normal"
      language="es"/>
    <bh-language-flag
      size="normal"
      language="pt"/>
    <bh-language-flag
      size="normal"
      language="fr"/>
    <bh-language-flag
      size="normal"
      language="it"/>
    <bh-language-flag
      size="normal"
      language="nl"/>
    <bh-language-flag
      size="normal"
      language="pt_br"/>
    <bh-language-flag
      size="normal"
      language="id"/>
    <bh-language-flag
      size="normal"
      language="mn"/>
  </div>
</template>

<script>
export default {
  name: 'LanguageFlagExamples',
  data() {
    return {
      modalOpen: false,
    };
  },
  methods: {
    openLogModal() {
      this.modalOpen = true;
    },
  },
};
</script>

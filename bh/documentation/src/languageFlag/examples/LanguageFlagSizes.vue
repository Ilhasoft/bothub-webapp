<template>
  <div>
    <bh-language-flag
      size="small"
      language="en"/>
    <bh-language-flag
      size="normal"
      language="en"/>
    <bh-language-flag
      size="medium"
      language="en"/>
    <bh-language-flag
      size="large"
      language="en"/>
  </div>
</template>

<script>
export default {
  name: 'LanguageFlagSizes',
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

<template>
  <div class="bh-grid--columns">
    <div class="bh-grid__item">
      <bh-text
        v-model="value"
        prepend-text="Type something"/>
    </div>
    <div class="bh-grid__item item">
      <p> {{ value || 'Type Something..' }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleTextExample',
  data() {
    return {
      value: '',
    };
  },
};
</script>

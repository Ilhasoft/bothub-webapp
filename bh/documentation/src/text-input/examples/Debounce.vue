<template>
  <div>
    <div>
      <bh-text
        v-model="value"
        :debounce="750"
        prepend-text="Type something" />
    </div>
    <p>{{ value || 'Type Something..' }}</p>
  </div>
</template>

<script>
export default {
  name: 'DebounceExample',
  data() {
    return {
      value: '',
    };
  },
};
</script>

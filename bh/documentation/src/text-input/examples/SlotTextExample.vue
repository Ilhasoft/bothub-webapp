<template>
  <div class="bh-grid--columns">
    <div class="bh-grid__item item">
      <bh-icon
        size="large"
        value="botinho" />
    </div>
    <div class="bh-grid__item item">
      <h4>Hi, tell me things that make you happy</h4>
    </div>
    <div class="bh-grid__item">
      <form @submit.prevent="onSubmit()">
        <bh-text
          v-model="value"
          prepend-text="Type something">
          <div slot="append">
            <bh-icon-button
              value="chevron-right"
              size="small"
              type="submit" />
          </div>
        </bh-text>
      </form>
    </div>
    <div class="bh-grid__item">
      <ul
        v-for="(item, i) in things"
        :key="i">
        <li>{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlotTextExample',
  data() {
    return {
      value: '',
      things: [],
    };
  },
  methods: {
    onSubmit() {
      this.things.push(this.value);
      this.value = '';
    },
  },
};
</script>

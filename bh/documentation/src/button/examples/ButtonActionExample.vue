<template>
  <div class="">
    <bh-button
      secondary
      @click="buttonClicked()">
      Click here
    </bh-button>
  </div>
</template>

<script>
export default {
  name: 'SimpleButton',
  methods: {
    buttonClicked() {
      alert('Button Clicked');
    },
  },
};
</script>

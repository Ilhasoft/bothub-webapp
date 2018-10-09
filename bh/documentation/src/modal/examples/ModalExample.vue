<template>
  <div class="bh-grid">
    <div class="bh-grid__item item">
      <div class="bh-grid__item">
        <bh-button
          secondary
          @click="openLogModal()">
          Click here to Open Modal
        </bh-button>
      </div>
    </div>
    <bh-modal :open.sync="modalOpen">
      <div class="bh-grid--column">
        <div class="bh-grid__item item">
          <h2>BH Modal</h2>
        </div>
        <div class="bh-grid__item">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
          ullamcorper lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos. Proin sit amet neque metus. Phasellus scelerisque accumsan dolor ac
          pulvinar. Nam iaculis pretium gravida. Nunc et consequat nunc, id cursus neque. Morbi
          auctor dictum lectus. Etiam maximus eget neque eu tincidunt. In a augue vitae nunc laoreet
          aliquet ac et lectus. Mauris sed auctor est, non sagittis orci. Ut id libero vulputate,
          auctor libero id, volutpat nisi.</p>
        </div>
      </div>
    </bh-modal>
  </div>
</template>

<script>
export default {
  name: 'ModalExample',
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

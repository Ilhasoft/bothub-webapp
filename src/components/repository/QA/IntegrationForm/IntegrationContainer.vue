<template>
  <div class="integration-container">
    <div class="integration-container__base">
      <p>Selecione a Base de Conhecimento e o idioma a serem integrados:</p>
    </div>

    <unnnic-tab :tabs="['first', 'second', 'third']" initialTab="first">
      <template slot="tab-head-first">
        Integrar ao Weni Fluxos ou Rapidpro
      </template>
      <template slot="tab-panel-first">
        <integration-weni-flows />
      </template>
      <template slot="tab-head-second">
        Integrar via webhook
      </template>
      <template slot="tab-panel-second">
        <integration-weni-flows />
      </template>
      <template slot="tab-head-third">
        Integrar via script
      </template>
      <template slot="tab-panel-third">
        <integration-by-script />
      </template>
    </unnnic-tab>
  </div>
</template>

<script>
import IntegrationWeniFlows from './IntegrationWeniFlows';
import IntegrationByScript from './IntegrationByScript';

export default {
  name: 'IntegrationContainer',
  components: { IntegrationWeniFlows, IntegrationByScript },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "~@weni/unnnic-system/dist/unnnic.css";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";

.integration-container {
  max-height: 80vh;
  overflow: auto;
  border-top: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;

  &__base {
    p {
      font-size: $unnnic-font-size-body-gt;
      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-regular;
      color: $unnnic-color-neutral-dark;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
      margin: $unnnic-inline-md 0;
    }
  }
}
</style>

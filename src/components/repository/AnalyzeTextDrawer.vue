<template>
  <div class="drawer">
    <b-collapse :open="false">
      <button class="drawer-title" slot="trigger">Analyze Text</button>
      <div class="drawer-content">
        <b-field label="Language">
          <b-select v-model="language">
            <option
              v-for="(verbose, language) in languages"
              :key="language"
              :value="language">{{ verbose }}</option>
          </b-select>
        </b-field>
        <b-field label="Text">
          <b-input
            v-model="msg"
            type="textarea" />
        </b-field>

        <div class="results">

          <div class="result-item">
            <h4 class="result-item__title">
              What are the symptoms of zika virus?
            </h4>

            <div class="result-item__label">
              <span class="label-item">Intent:</span>
              to know_symptoms
            </div>

            <ul class="entity-list">
              <li class="entity-list-item">
                <div class="entity-label">
                  <span>Entity:</span>
                  virus
                </div>
                <div class="entity-value">
                  <span>Value:</span>
                  zika
                </div>
              </li>
            </ul>

          </div>

        </div>

      </div>
    </b-collapse>
  </div>
</template>

<script>
import { LANGUAGES } from '@/utils';

export default {
  name: 'AnalyzeTextDrawer',
  data() {
    return {
      languages: LANGUAGES,
      language: 'en',
      msg: '',
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';

.drawer {
  position: fixed;
  bottom: 0;
  right: 2rem;
  background-color: #F8F8F8;
  border-radius: 10px 10px 0 0;
  width: 300px;
  max-width: calc(100% - 4rem);
  z-index: 10;
  box-shadow: 0 0 10px 0 rgba(0,0,0,.2);

  &-title {
    color: $primary-light-invert;
    border: none;
    text-transform: uppercase;
    width: 100%;
    text-align: center;
    padding: 15px 0;
    font-weight: 600;
    margin: 0;
    display: block;
    font-size: 14px;
    background-color: transparent;
    border-radius: 10px 10px 0 0;
    outline: none;
    font-family: "Encode Sans", sans-serif;
    cursor: pointer;
  }

  &-content {
    padding: 4px 16px 8px;
  }
}
</style>


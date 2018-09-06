<template>
  <div class="drawer">
    <b-collapse :open="false">
      <button
        slot="trigger"
        class="drawer-title">Analyze Text</button>
      <div class="drawer-content">
        <form @submit.prevent="onSubmit()">
          <b-field
            :type="errors && errors.language && 'is-danger'"
            :message="errors && errors.language"
            label="Language">
            <b-select
              v-model="data.language"
              expanded>
              <option
                v-for="(verbose, language) in availableLanguagesList"
                :key="language"
                :value="language">{{ verbose }}</option>
            </b-select>
          </b-field>
          <b-field
            :type="errors && errors.text && 'is-danger'"
            :message="errors && errors.text"
            label="Text">
            <b-input
              v-model="data.text"
              type="textarea" />
          </b-field>
          <div class="field has-text-right">
            <button
              :disabled="submitting"
              type="submit"
              class="button is-primary is-small">Analyze</button>
          </div>
        </form>
      </div>
      <b-tabs
        v-if="result"
        v-model="activeTab">
        <b-tab-item label="To Humans">
          <div class="item">
            <strong>Intent:</strong>
            <div v-if="result.intent">
              <span>{{ result.intent.name }}</span>
              <span>({{ result.intent.confidence | percent }})</span>
            </div>
            <div v-else>No detected</div>
          </div>
          <div
            v-for="(entities, label) in result.entities"
            v-if="entities.length > 0"
            :key="label">
            <p><strong>{{ label }}:</strong></p>
            <table class="table is-fullwidth is-striped is-hoverable is-narrow">
              <tbody>
                <tr
                  v-for="(entity, i) in entities"
                  :key="i">
                  <td>{{ entity.value }}</td>
                  <td>{{ entity.entity }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-tab-item>
        <b-tab-item label="raw">
          <pre class="mh-200">{{ JSON.stringify(result, null, 2) }}</pre>
        </b-tab-item>
      </b-tabs>
    </b-collapse>
  </div>
</template>

<script>
import { languageListToDict } from '@/utils';
import { mapActions } from 'vuex';

export default {
  name: 'AnalyzeTextDrawer',
  props: {
    ownerNickname: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    defaultLanguage: {
      type: String,
      default: null,
    },
    availableLanguages: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      data: {
        language: this.defaultLanguage || this.availableLanguages[0],
        text: '',
      },
      submitting: false,
      result: null,
      activeTab: 0,
      errors: null,
    };
  },
  computed: {
    availableLanguagesList() {
      return languageListToDict(this.availableLanguages);
    },
  },
  methods: {
    ...mapActions([
      'analyzeText',
    ]),
    async onSubmit() {
      this.submitting = true;
      this.result = null;
      this.errors = null;
      try {
        const response = await this.analyzeText({
          ownerNickname: this.ownerNickname,
          slug: this.slug,
          language: this.data.language,
          text: this.data.text,
        });
        this.result = response.data;
        this.submitting = false;
        return true;
      } catch (error) {
        const { response } = error;
        const { status, data } = response;

        if (!response || status === 500) {
          this.$toast.open({
            message:
              (data && data.detail)
              || 'Something unexpected happened! We couldn’t analyze your text.',
            type: 'is-danger',
          });
        } else if (data) {
          this.errors = data;
        }
      }
      this.submitting = false;
      return false;
    },
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
  max-height: 90vh;
  z-index: 9;
  box-shadow: 0 0 10px 0 rgba(0,0,0,.2);
  overflow: auto;

  @media screen and (max-width: $tablet) {
    right: 50%;
    transform: translateX(50%);
  }

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

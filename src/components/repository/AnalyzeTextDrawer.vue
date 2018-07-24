<template>
  <div class="drawer">
    <b-collapse :open="false">
      <button class="drawer-title" slot="trigger">Analyze Text</button>
      <div class="drawer-content">
        <form @submit.prevent="onSubmit()">
          <b-field
            label="Language"
            :type="this.errors && this.errors.language && 'is-danger'"
            :message="this.errors && this.errors.language">
            <b-select
              expanded
              v-model="data.language">
              <option
                v-for="(verbose, language) in languages"
                :key="language"
                :value="language">{{ verbose }}</option>
            </b-select>
          </b-field>
          <b-field
            label="Text"
            :type="this.errors && this.errors.text && 'is-danger'"
            :message="this.errors && this.errors.text">
            <b-input
              v-model="data.text"
              type="textarea" />
          </b-field>
          <div class="field has-text-right">
            <button
              type="submit"
              class="button is-primary is-small"
              :disabled="submitting">Analyze</button>
          </div>
        </form>
      </div>
      <b-tabs
          v-if="result"
          v-model="activeTab">
          <b-tab-item label="To Humans">
            <div class="item">
              <strong>Intent:</strong>
              <div v-if="result.answer.intent">
                <span>{{ result.answer.intent.name }}</span>
                <span>({{ result.answer.intent.confidence | percent }})</span>
              </div>
              <div v-else>No detected</div>
            </div>
            <div v-if="result.answer.entities.length > 0">
              <p><strong>Entities:</strong></p>
              <table class="table is-fullwidth is-striped is-hoverable is-narrow">
                <tbody>
                  <tr
                    v-for="(entity, i) in result.answer.entities"
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
import { LANGUAGES } from '@/utils';
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
  },
  data() {
    return {
      languages: LANGUAGES,
      data: {
        language: 'en',
        text: '',
      },
      submitting: false,
      result: null,
      activeTab: 0,
      errors: null,
    };
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

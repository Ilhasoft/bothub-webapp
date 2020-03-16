<template>
  <div class="drawer">
    <button
      slot="trigger"
      class="drawer-title"
      @click="openCollapse()">{{ $t('webapp.analyze_text.analyze_text') }}</button>
    <transition name="drawer--slide">
      <div v-if="open">
        <div class="drawer-content">
          <form
            @keydown.enter.exact.prevent="onSubmit()"
            @submit.prevent="onSubmit()">
            <bh-field
              :type="errors && errors.language && 'is-danger'"
              :message="errors && errors.language"
              label="Language">
              <bh-select
                v-model="data.language"
                expanded>
                <option
                  v-for="(verbose, language) in availableLanguagesList"
                  :key="language"
                  :value="language">{{ verbose }}</option>
              </bh-select>
            </bh-field>
            <bh-field
              :type="errors && errors.text && 'is-danger'"
              :message="errors && errors.text"
              :errors="errors ? errors.text : []"
              label="Text">
              <bh-textarea
                :rows="8"
                v-model="data.text"
                class="drawer-content__text-area"
                type="textarea" />
            </bh-field>
            <div class="field has-text-right">
              <bh-button
                :disabled="submitting"
                type="submit"
                primary>{{ $t('webapp.analyze_text.analyze') }}</bh-button>
            </div>
          </form>
        </div>
        <bh-tabs
          v-if="result"
          v-model="activeTab">
          <bh-tab-item label="To Humans">
            <div class="item">
              <strong>Intent:</strong>
              <div v-if="result.intent">
                <span>{{ result.intent.name }}</span>
                <span>({{ result.intent.confidence | percent }})</span>
              </div>
              <div v-else>{{ $t('webapp.analyze_text.no_detected') }}</div>
            </div>
            <div
              v-for="(entities, label) in result.entities"
              :key="label">
              <div v-if="entities.length > 0">
                <p><strong>{{ label }}:</strong></p>
                <table>
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
            </div>
          </bh-tab-item>
          <bh-tab-item label="Raw">
            <div class="drawer__analyze-content">
              <div class="drawer__analyze-content__clipboard">
                <bh-icon
                  value="clipboard-text-outline"
                  @click="clipBoardTest()" />
              </div>
              <bh-highlighted-pre
              :code="JSON.stringify(result, null, 2) "
                class="drawer__analyze-json-wrapper"
                code-class="code" />
            </div>
          </bh-tab-item>
        </bh-tabs>
      </div>
    </transition>
  </div>
</template>

<script>
import { languageListToDict } from '@/utils';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'AnalyzeTextDrawer',
  props: {
    repositoryUuid: {
      type: String,
      default: null,
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
        language: this.availableLanguages[0],
        text: '',
      },
      submitting: false,
      result: null,
      activeTab: 0,
      errors: null,
      open: false,
    };
  },
  computed: {
    ...mapState({
      repositoryVersion: state => state.Repository.repositoryVersion,
    }),
    availableLanguagesList() {
      return languageListToDict(this.availableLanguages);
    },
  },
  methods: {
    ...mapActions([
      'analyzeText',
    ]),
    openCollapse() {
      this.open = !this.open;
    },
    async onSubmit() {
      this.submitting = true;
      this.result = null;
      this.errors = null;
      try {
        const response = await this.analyzeText({
          repositoryUUID: this.repositoryUuid,
          repositoryVersion: this.repositoryVersion,
          language: this.data.language || this.availableLanguages[0],
          text: this.data.text,
        });
        this.result = response.data;
        this.submitting = false;
        return true;
      } catch (error) {
        const { response } = error;
        const { status, data } = response;

        if (!response || status === 500) {
          this.$bhToastNotification({
            message:
              (data && data.detail)
              || 'Something unexpected happened! We couldn’t analyze your text.',
            type: 'danger',
            time: 5000,
          });
        } else if (data) {
          this.errors = data;
        }
      }
      this.submitting = false;
      return false;
    },
    clipBoardTest() {
      const text = JSON.stringify(this.result, null, 2);
      navigator.clipboard.writeText(text);
      this.$bhToastNotification({
        message: 'Json copied',
        type: 'success',
      });
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

  &--slide-enter-active, &--slide-leave-active {
    transition: margin-bottom .1s ease-out;
    overflow: hidden;
  }

  &__analyze-content {
    height: 25vh;
    overflow-y: scroll;

    &__clipboard {
      display: flex;
      justify-content: flex-end;
      margin: 0 1rem;
      cursor: pointer;
    }
  }

  &--slide-enter, &--slide-leave-to {
    margin-bottom: -100%;
  }

  &--slide-enter-to, &--slide-leave {
    margin-bottom: 0px;
  }
}
</style>

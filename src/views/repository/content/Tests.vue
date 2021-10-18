<template>
  <repository-view-base :repository="repository" :error-code="errorCode">
    <section>
      <section v-if="repository" class="repository-tests">
          <section class="repository-tests__description">
            <div class="repository-tests__title">
              <unnnic-card
                type="title"
                :title="$t('webapp.home.bases.tests')"
                enabled
                icon="messages-bubble-1"
                infoPosition="right"
                :hasInformationIcon="false"
                scheme="aux-lemon"
              />
              <p class="repository-tests__description__text">
                {{ $t("webapp.home.bases.tests_subtitle") }}
              </p>
            </div>
            <div class="repository-tests__select__inputs">
              <div class="repository-tests__select__input">
                <p class="repository-tests__description__text">
                  {{ $t("webapp.home.bases.tests_select") }}
                </p>
                <unnnicSelect v-if="bases.length" size="md" placeholder="" v-model="selectedBase">
                  <option v-for="base in bases" :value="base.id" :key="base.id" size="sm">
                    {{ base.title }}
                  </option>
                </unnnicSelect>
              </div>
            </div>
          </section>
          <!-- title -->
      </section>
      <hr />
      <section id="webchatBody">
        <div id="webchat" />
      </section>
    </section>
  </repository-view-base>
</template>
<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryBase from '../Base';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'RepositoryContentTests',
  data(){
    return {
      bases: [],
      repositoryUUID: null,
      selectedBase: null,
      textToSend: null,
    }
  },
  components: {
    RepositoryViewBase,
  },
  extends: RepositoryBase,
  computed: {
    ...mapGetters(['myProfile']),
    authorization() {
      return `Bearer ${this.repository?.authorization?.uuid}`;
    },

    initText() {
      const infos = [
        this.myProfile.language,
        this.authorization,
        this.selectedBase,
        this.repository.language
      ];
      return infos.every((info) => info) ? infos.join('⇝') : '';
    },
  },
  methods: {
    ...mapActions([
      'getQAKnowledgeBases'
    ]),
  },
  watch: {
    // eslint-disable-next-line
    'repository.uuid'() {
      if (!this.repository.uuid || this.repository.uuid === 'null') {
        return false;
      }
      this.repositoryUUID = this.repository.uuid;
    },
    // eslint-disable-next-line
    'myProfile'() {
      if (this.myProfile.language === null) {
        this.myProfile.language = 'en-us'
        return true
      }
    },
    async repositoryUUID() {
      const response = await this.getQAKnowledgeBases({
        repositoryUUID: this.repositoryUUID,
        page: 0,
      });

      this.selectedBase = String(response.data.results?.[0]?.id);

      response.data.results.forEach(({ id, title }) => {
        this.bases.push({
          id,
          title
        });
      });
    },
    initText() {
      if (!this.initText) {
        console.log('teste não abriu', this.initText);
        return false;
      }
      console.log('mandou payload', this.initText);
      const message = this.initText;
      if (window.WebChat) {
        window.WebChat.send(message);
        console.log('1', message)
      } else {
        const script = document.createElement('script');
        // const bodyScript = document.getElementById('webchatBody');
        script.setAttribute('src', 'https://storage.googleapis.com/push-webchat/wwc-latest.js');
        script.setAttribute('id', 'removeScript')
        document.body.appendChild(script);
        script.addEventListener('load', () => {
          console.log('abriu o script', window.WebChat)
          window.WebChat.default.init({
            selector: '#webchat',
            initPayload: message,
            channelUuid: '4c46585b-8393-415b-856a-280c7d9ca9af',
            host: 'https://new.push.al',
            socketUrl: 'https://websocket.weni.ai',
            title: 'Title',
            subtitle: 'Subtitle',
            startFullScreen: false,
            inputTextFieldHint: this.$t('webapp.home.bases.tests_placeholder'),
            customizeWidget: {
              userMessageBubbleColor: '#edfffe',
              userMessageTextColor: '#272B33',
              fullScreenBotMessageBubbleColor: '#F9F9F9',
              botMessageBubbleColor: '#272B33',
              inputBackgroundColor: '#FFFFFF',
              inputFontColor: '#4E5666',
              inputPlaceholderColor: '#67738B',
            },
          });
          window.WebChat.open()
        });
      }
      return true;
    },
  },
  beforeMount() {
    window.WebChat = null;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/colors.scss";
@import "~@/assets/scss/variables.scss";
@import "~@weni/unnnic-system/dist/unnnic.css";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";

.repository-tests {
  &__description {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__text {
      margin-top: $unnnic-inset-nano;
      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-body-gt;
      color: $unnnic-color-neutral-dark;
      margin-right: 1rem;
    }
  }
  &__select {
    &__input {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}

#webchat {
  ::v-deep {
    // container principal
    .push-widget-container {
      position: unset;
      width: 100%;
      height: 500px;
      box-shadow: none;

      @media (min-width: 1440px) {
        height: 700px;
      }
    }
    .push-poweredby-container {
      display: none;
    }
    .push-launcher {
      display: none;
    }
    .push-header.push-with-subtitle {
      display: none;
    }
    .push-conversation-container {
      box-shadow: none;
    }
    // area de pergunta
    .push-sender {
      background-color: #f9f9f9 !important;
      padding: 32px 73px;
      height: unset;

      input {
        border: solid #d0d3d9 1px;
        border-radius: $unnnic-border-radius-sm;
        padding: 12px 16px;
        height: 46px;
        margin-right: $unnnic-inset-sm;
      }
      .push-send {
        background-color: transparent !important;
      }
    }
    // caixa de resposta
    .push-response {
      padding: 20px;
      box-shadow: lightgrey 0px 0px 5px 0px;
    }
    // texto da resposta
    .push-markdown {
      h4 {
        strong {
          font-family: $unnnic-font-family-secondary;
          white-space: pre;
          font-weight: $unnnic-font-weight-bold;
          font-size: $unnnic-font-size-body-gt;
          color: #009e96 !important;
          margin-block-start: 0px;
          margin-block-end: 0px;
        }
      }
    }
    // pergunta
    .push-client {
      border: 1px solid #009e963d;
      box-shadow: lightgrey 0px 0px 5px 0px;
    }
    // texto da pergunta
    .push-client:before {
      content: "Sua pergunta\a";
      font-family: $unnnic-font-family-secondary;
      white-space: pre;
      font-weight: $unnnic-font-weight-bold;
      font-size: $unnnic-font-size-body-gt;
      color: #009e96;
      padding-bottom: $unnnic-inset-nano;
    }
    // botao de perguntar
    .push-send {
      border: dashed #d0d3d9 1px;
      padding: $unnnic-squish-xs;
      border-radius: $unnnic-border-radius-sm;
      img {
        display: none;
      }
      &:after {
        background-image: url("~@/assets/imgs/send.svg");
        background-repeat: no-repeat;
        background-position: center;
        background-position-x: left;
        padding: 0.75rem 1rem 0.75rem 1.5rem;
        content: "Perguntar";
        font-family: $unnnic-font-family-secondary;
        font-weight: $unnnic-font-weight-regular;
        font-size: $unnnic-font-size-body-lg;
        color: #4e5666;
      }
      &:hover {
        border: 1px solid #d0d3d9;
      }
    }
    // texto da pergunta
    .push-message-text {
      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-regular;
      font-size: $unnnic-font-size-body-gt;
    }
    .push-message {
      margin-bottom: 1rem;
    }

    .push-full-screen .push-conversation-container .push-new-message {
      height: 48px;
      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-regular;
      font-size: $unnnic-font-size-body-gt;
      text-shadow: none;
      border-radius: $unnnic-border-radius-sm;
      padding: $unnnic-squish-xs;
      border: 1px solid #e2e6ed;
      line-height: 22px;
      color: #4e5666;
      margin-right: $unnnic-inset-sm;
    }

    .push-full-screen .push-conversation-container .push-new-message:focus {
      border: 1px solid #9caccc;
      caret-color: #9caccc;
    }

    .push-full-screen
      .push-conversation-container
      .push-new-message:focus::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      color: #d0d3d9;
    }

    .push-full-screen .push-conversation-container .push-new-message:focus::-moz-placeholder {
      /* Firefox 19+ */
      color: #d0d3d9;
    }

    .push-full-screen .push-conversation-container .push-new-message:focus:-ms-input-placeholder {
      /* IE 10+ */
      color: #d0d3d9;
    }

    .push-full-screen .push-conversation-container .push-new-message:focus:-moz-placeholder {
      /* Firefox 18- */
      color: #d0d3d9;
    }
    .push-full-screen .push-conversation-container .push-sender {
      background-color: #f9f9f9;
      border-top: 1px solid #e2e6ed;
    }

    .push-full-screen .push-messages-container {
      padding: $unnnic-inset-md;
    }

    .push-full-screen .push-messages-container .push-message .push-response {
      border: 1px solid #e2e6ed;
      border-radius: 4px 32px 32px 32px;
      padding: 24px 80px 24px 24px;
      color: #3b414d;
      max-width: 50%;
    }
    .push-response {
      background-color: #f9f9f9;
    }
    .push-full-screen .push-messages-container .push-message .push-response:hover {
      background: #f5f6f6;
    }

    .push-full-screen .push-messages-container .push-message .push-client {
      border: 1px solid #c2e8e6;
      border-radius: 32px 4px 32px 32px;
      padding: 24px 64px 24px 24px;
      max-width: 35%;
    }

    .push-full-screen .push-messages-container .push-message .push-client:hover {
      background: #e1fffd;
    }

    .push-markdown h2 {
      margin-block-start: $unnnic-inset-nano;
      margin-block-end: 4px;
      font-size: 18px;
    }
  }
}
</style>

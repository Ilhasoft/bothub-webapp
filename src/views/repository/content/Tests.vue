<template>
    <repository-view-base :repository="repository" :error-code="errorCode">
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
                    {{$t('webapp.home.bases.tests_subtitle')}}
                    </p>
                </div>
                <div class="repository-api__select__inputs">
                    <div class="repository-api__select__input">
                        <unnnicSelect
                            v-if="bases.length"
                            size="md"
                            placeholder=""
                            v-model="selectedBase"
                            >
                            <option
                            v-for="base in bases"
                            :value="base.id"
                            :key="base.id"
                            size="sm"
                            >
                            {{ base.title }}
                            </option>
                        </unnnicSelect>
                    </div>
                </div>
            </section> <!-- title -->
        </section>
        <hr>
        <section>
          <div id="webchat" />
        </section>
    </repository-view-base>
</template>
<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryBase from '../Base';
import { mapActions, mapGetters } from 'vuex';
import repository from '../../../store/repository';

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
    ...mapGetters(['myProfile', 'authToken']),
    authorization() {
      return this.repository?.authorization?.organizations?.[0]?.uuid;
    },

    initText() {
      const infos = [
        this.myProfile.language,
        this.authToken,
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
        return false;
      }

      const message = this.initText;

      if (window.WebChat) {
        window.WebChat.send(message);
      } else {
        const script = document.createElement('script');
        script.setAttribute('src', 'https://storage.googleapis.com/push-webchat/widget-latest.js');
        document.body.appendChild(script);
        script.addEventListener('load', () => {
          window.WebChat.default.init({
            selector: '#webchat',
            initPayload: message,
            channelUuid: 'a1472c7b-4c87-47b0-abfe-b0e73c780373',
            host: 'https://new.push.al',
            socketUrl: 'https://socket.push.al',
            title: 'Title',
            subtitle: 'Subtitle',
            startFullScreen: false,
            inputTextFieldHint: 'Faça uma pergunta para a base de conhecimento...',
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
        });
      }

      return true;
    },
  }
}
</script>


<style lang="scss" scoped>
@import "~@/assets/scss/colors.scss";
@import "~@/assets/scss/variables.scss";
@import "~@weni/unnnic-system/dist/unnnic.css";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";

.repository-tests{
    &__description{
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__text{
            margin-top: 8px;
            font-family: $unnnic-font-family-secondary;
            font-size: $unnnic-font-size-body-gt;
            color: $unnnic-color-neutral-dark;
        }
    }
}

#webchat {
  ::v-deep {
    .push-widget-container {
        position: unset;
        width: 100%;
        height: 500px;
        box-shadow: none;

        @media (min-width: 1440px) {
           height: 700px;
        }
    }
    .push-launcher{
      display: none;
    }
    .push-header.push-with-subtitle {
      display: none;
    }
    .push-conversation-container{
      box-shadow: none;
    }
    .push-sender{
      background-color: #F9F9F9!important;
      padding: 32px 73px;
      height: unset;

      input{
        border: solid #D0D3D9 1px;
        border-radius: 4px;
        padding: 12px 16px;
        height: 46px;
        margin-right: 16px;
      }
      .push-send{
        background-color: transparent!important;
      }
    }

      .push-full-screen .push-conversation-container .push-send {
         height: 48px;
         border: 1px solid #D0D3D9;
         background: RGBA(226, 230, 237, 0.16);
         border-radius: 4px;
      }

      .push-full-screen .push-conversation-container .push-send:hover {
         border: 1px solid #FFF;
      }

      .push-message-text {
         font-family: Lato;
         font-weight: 400;
         font-size: 14px;
         text-shadow: none;
      }

      .push-sender {
         background-color: rgb(255, 255, 255);
      }

      .push-full-screen .push-conversation-container .push-new-message {
         height: 48px;
         font-family: Lato;
         font-weight: 400;
         font-size: 14px;
         text-shadow: none;
         border-radius: 4px;
         padding: 12px 16px 12px 16px;
         border: 1px solid #e2e6ed;
         line-height: 22px;
         color: #4E5666;
         margin-right: 16px;
      }

      .push-full-screen .push-conversation-container .push-new-message:focus {
         border: 1px solid #9CACCC;
         caret-color: #9CACCC;
      }

      .push-full-screen
      .push-conversation-container
      .push-new-message:focus::-webkit-input-placeholder {
         /* Chrome/Opera/Safari */
         color: #D0D3D9;
      }

      .push-full-screen .push-conversation-container .push-new-message:focus::-moz-placeholder {
         /* Firefox 19+ */
         color: #D0D3D9;
      }

      .push-full-screen .push-conversation-container .push-new-message:focus:-ms-input-placeholder {
         /* IE 10+ */
         color: #D0D3D9;
      }

      .push-full-screen .push-conversation-container .push-new-message:focus:-moz-placeholder {
         /* Firefox 18- */
         color: #D0D3D9;
      }

      .push-client:before {
         content: "Sua pergunta\a";
         font-family: Lato;
         white-space: pre;
         font-weight: 700;
         font-size: 14px;
         color: #009E96;
         padding-bottom: 8px;
      }

      .push-markdown h4 {
         font-family: Lato;
         white-space: pre;
         font-weight: 700;
         font-size: 14px;
         color: #009E96;
         margin-block-start: 0px;
         margin-block-end: 0px;
      }

      .push-full-screen .push-conversation-container .push-sender {
         background-color: #F9F9F9;
         border-top: 1px solid #E2E6ED;
      }

      .push-full-screen .push-messages-container {
         padding: 24px 24px 24px 24px;
      }

      .push-full-screen .push-messages-container .push-message .push-response {
         border: 1px solid #E2E6ED;
         border-radius: 4px 32px 32px 32px;
         padding: 24px 80px 24px 24px;
         color: #3B414D;
         max-width: 50%;

      }
        .push-response{
          background-color: #F9F9F9;
        }
      .push-full-screen .push-messages-container .push-message .push-response:hover {
         background: #F5F6F6;
      }

      .push-full-screen .push-messages-container .push-message .push-client {
         border: 1px solid #C2E8E6;
         border-radius: 32px 4px 32px 32px;
         padding: 24px 64px 24px 24px;
         max-width: 35%;
      }

      .push-full-screen .push-messages-container .push-message .push-client:hover {
         background: #E1FFFD;
      }

      .push-markdown h2 {
         margin-block-start: 8px;
         margin-block-end: 4px;
         font-size: 18px;
      }

      .push-conversation-container .push-poweredby-container {
         display: none;
      }

      .push-full-screen .push-conversation-container .push-send img {
         display: none;
      }

      .push-full-screen .push-conversation-container .push-send button {
         height: 22px;
         padding: 12px;
         border: 1px solid #D0D3D9;
         background: RGBA(226, 230, 237, 0.16);
         border-radius: 4px;
      }

      .push-full-screen .push-conversation-container .push-send button :hover {
         border: none;
      }

      .push-full-screen .push-conversation-container .push-send:after {
         content: "\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0\00a0Perguntar";
         padding: 12px 16px 12px 16px;
         height: 22px;
         font-family: Lato;
         white-space: pre;
         font-weight: 400;
         font-size: 16px;
         color: #4E5666;
         text-indent: 28px;
        //  background-image: url('send.svg');
         background-repeat: no-repeat;
         background-attachment: unset;
         background-position: left;
         background-origin: content-box;
      }

      button {
         padding: 0px;
      }

      *::-webkit-scrollbar {
         width: 4px;
      }

      *::-webkit-scrollbar-track {
         background: #d0d3d9;
         border-radius: 37.5rem;
      }

      *::-webkit-scrollbar-thumb {
         background: #e2e6ed;
      }

  }
}
</style>

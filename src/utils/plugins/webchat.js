export default {
  addWebchat: ({ title, typeMessage }) => {
    const script = document.createElement('script');
    script.src = 'https://storage.googleapis.com/push-webchat/widget-latest.js';
    script.async = true;
    script.onload = () => {
      // eslint-disable-next-line no-undef
      WebChat.default.init({
        selector: '#webchat',
        initPayload: 'bothub',
        channelUuid: '951c09db-0545-474b-a181-3a16c9e8d6ed',
        host: 'https://new.push.al',
        socketUrl: 'https://socket.push.al',
        title: title || 'Bothub Support',
        showFullScreenButton: true,
        inputTextFieldHint: typeMessage || 'Type here...',
        openLauncherImage: 'https://ilhasoft.com.br/newcodes/bothub/avatar-bothub.png',
        profileAvatar: 'https://ilhasoft.com.br/newcodes/bothub/avatar-bothub.png',
        tooltipPayload: 'bothub',
        tooltipDelay: 200,
        customizeWidget: {
          headerBackgroundColor: '#2BBFAC',
          launcherColor: '#12A391',
          userMessageBubbleColor: '#12A391',
        },
        params: {
          images: {
            dims: {
              width: 300,
              height: 200,
            },
          },
          storage: 'local',
        },
      });
    };
    document.body.appendChild(script);
  },
};

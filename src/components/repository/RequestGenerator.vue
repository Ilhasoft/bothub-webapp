<template>
  <div>
    <b-field label="Language">
      <language-select v-model="language" />
    </b-field>
    <b-field label="Message">
      <b-input v-model="msg" type="textarea" />
    </b-field>
    <b-tabs v-model="activeTab">
      <b-tab-item label="cURL">
        <div class="pre">curl -X POST \
-H 'Authorization: Bearer {{ authorizationUuid }}' \
-F 'language={{ language }}' \
-F "msg={{ msg_escaped.curl }}" \
https://nlp.bothub.it/v1/message</div>
      </b-tab-item>
      <b-tab-item label="Python">
        <div class="pre">import requests

data = {
  'language': '{{ language }}',
  'msg': '{{ msg_escaped.python }}',
}
headers = { 'Authorization': 'Bearer {{ authorizationUuid }}' }
r = requests.post('https://nlp.bothub.it/v1/message', headers=headers, data=data)
print(r.json())</div>
      </b-tab-item>
      <b-tab-item label="Javascript">
        <div class="pre">var data = new FormData();
data.append('language', '{{ language }}');
data.append('msg', '{{ msg_escaped.javascript }}');
var request = new XMLHttpRequest();
request.onload = function () {
  console.log(JSON.parse(request.response));
};
request.open('POST', 'https://nlp.bothub.it/v1/message');
request.setRequestHeader('Authorization', 'Bearer {{ authorizationUuid }}');
request.send(data);</div>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import LanguageSelect from '@/components/shared/LanguageSelect';


const components = {
  LanguageSelect,
};

export default {
  name: 'RequestGenerator',
  components,
  props: {
    authorizationUuid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      activeTab: 0,
      language: 'en',
      msg: '',
    };
  },
  computed: {
    msg_escaped() {
      return {
        curl: this.msg.replace(/"/g, '\\"'),
        python: this.msg.replace(/'/g, '\\\''),
        javascript: this.msg.replace(/'/g, '\\\''),
      };
    },
  },
};
</script>

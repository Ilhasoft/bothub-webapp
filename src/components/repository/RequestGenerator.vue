<template>
  <div>
    <b-field label="Language">
      <language-select v-model="language" />
    </b-field>
    <b-field label="Message">
      <b-input v-model="text" type="textarea" />
    </b-field>
    <b-tabs v-model="activeTab">
      <b-tab-item label="cURL">
        <div class="pre">curl -X POST \
-H 'Authorization: Bearer {{ authorizationUuid }}' \
-F 'language={{ language }}' \
-F "text={{ text_escaped.curl }}" \
https://nlp.bothub.it/parse/</div>
      </b-tab-item>
      <b-tab-item label="Python">
        <div class="pre">import requests

data = {
  'language': '{{ language }}',
  'text': '{{ text_escaped.python }}',
}
headers = { 'Authorization': 'Bearer {{ authorizationUuid }}' }
r = requests.post('https://nlp.bothub.it/parse/', headers=headers, data=data)
print(r.json())</div>
      </b-tab-item>
      <b-tab-item label="Javascript">
        <div class="pre">var data = new FormData();
data.append('language', '{{ language }}');
data.append('text', '{{ text_escaped.javascript }}');
var request = new XMLHttpRequest();
request.onload = function () {
  console.log(JSON.parse(request.response));
};
request.open('POST', 'https://nlp.bothub.it/parse/');
request.setRequestHeader('Authorization', 'Bearer {{ authorizationUuid }}');
request.send(data);</div>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import LanguageSelect from '@/components/inputs/LanguageSelect';
import { LANGUAGES } from '@/utils';


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
    defaultLanguageField: {
      type: String,
      default: LANGUAGES[Object.keys(LANGUAGES)[0]],
    },
  },
  data() {
    return {
      activeTab: 0,
      language: this.defaultLanguageField,
      text: '',
    };
  },
  computed: {
    text_escaped() {
      return {
        curl: this.text.replace(/"/g, '\\"'),
        python: this.text.replace(/'/g, '\\\''),
        javascript: this.text.replace(/'/g, '\\\''),
      };
    },
  },
};
</script>

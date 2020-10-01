<template>
  <div>
    <b-field :label="$t('webapp.analyze_text.language')">
      <language-select v-model="language" />
    </b-field>
    <b-field :label="$t('webapp.analyze_text.message')">
      <b-input
        v-model="text"
        type="textarea" />
    </b-field>
    <b-tabs
      id="tour-integrate-step-1"
      :is-previous-disabled="true"
      v-model="activeTab">
      <b-tab-item label="cURL">
        <highlighted-code
          :code="codes.curl"
          code-class="bash" />
      </b-tab-item>
      <b-tab-item label="Python">
        <highlighted-code
          :code="codes.python"
          code-class="python" />
      </b-tab-item>
      <b-tab-item label="Javascript">
        <highlighted-code
          :code="codes.javascript"
          code-class="javascript" />
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import LanguageSelect from '@/components/inputs/LanguageSelect';
import HighlightedCode from '@/components/shared/HighlightedCode';
import { LANGUAGES } from '@/utils';


const components = {
  LanguageSelect,
  HighlightedCode,
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
        curl: this.text
          .replace(/\\/g, '\\\\')
          .replace(/"/g, '\\"'),
        python: this.text
          .replace(/\\/g, '\\\\')
          .replace(/'/g, '\\\''),
        javascript: this.text
          .replace(/\\/g, '\\\\')
          .replace(/'/g, '\\\''),
      };
    },
    codes() {
      return {
        curl: [
          'curl -X POST \\',
          `  -H 'Authorization: Bearer ${this.authorizationUuid}' \\`,
          `  -F 'language=${this.language}' \\`,
          `  -F "text=${this.text_escaped.curl}" \\`,
          `  ${process.env.BOTHUB_NLP_BASE_URL}parse/`,
        ].join('\n'),
        python: [
          'import requests',
          '',
          'data = {',
          `  'language': '${this.language}',`,
          `  'text': '${this.text_escaped.python}',`,
          '}',
          '',
          `headers = { 'Authorization': 'Bearer ${this.authorizationUuid}' }`,
          `r = requests.post('${process.env.BOTHUB_NLP_BASE_URL}parse/', headers=headers, data=data)`,
          'print(r.json())',
        ].join('\n'),
        javascript: [
          'var data = new FormData();',
          `data.append('language', '${this.language}');`,
          `data.append('text', '${this.text_escaped.javascript}');`,
          '',
          'var request = new XMLHttpRequest();',
          'request.onload = function () {',
          '  console.log(JSON.parse(request.response));',
          '};',
          '',
          `request.open('POST', '${process.env.BOTHUB_NLP_BASE_URL}parse/');`,
          `request.setRequestHeader('Authorization', 'Bearer ${this.authorizationUuid}');`,
          'request.send(data);',
        ].join('\n'),
      };
    },
  },
};
</script>

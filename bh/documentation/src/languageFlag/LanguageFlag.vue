<template>
  <div class="bh-grid bh-grid--column">
    <div class="bh-grid__item">
      <h2>Language Flag</h2>
      <h3>Flags Example</h3>
      <example
        :component="LanguageFlagExample"
        :code="languageFlagExampleCode" />
    </div>
    <div class="bh-grid__item">
      <h2>Flag Sizes</h2>
      <example
        :component="LanguageFlagSizes"
        :code="languageFlagSizesCode" />
    </div>
    <div class="bh-grid__item">
      <api :data="api" />
    </div>
  </div>
</template>

<script>
import Example from '@/Example';
import Api from '@/Api';
import LanguageFlagExample from './examples/LanguageFlagExamples';
import languageFlagExampleCode from '!!raw-loader!./examples/LanguageFlagExamples';
import LanguageFlagSizes from './examples/LanguageFlagSizes';
import languageFlagSizesCode from '!!raw-loader!./examples/LanguageFlagSizes';
import api from './api';


export default {
  name: 'Autocomplete',
  components: {
    Example,
    Api,
  },
  data() {
    return {
      LanguageFlagExample,
      languageFlagExampleCode,
      LanguageFlagSizes,
      languageFlagSizesCode,
      api,
    };
  },
};
</script>

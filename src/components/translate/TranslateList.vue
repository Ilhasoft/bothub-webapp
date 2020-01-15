<template>
  <div>
    <pagination
      v-if="translateList"
      :list="translateList"
      :item-component="translateExampleItem"
      :repository="repository"
      :translate-to="to"
      @translated="onTranslated()" />
    <p v-if="translateList && translateList.empty">
      {{ this.$i18n.t('webapp.translate.no_examples') }}
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Pagination from '@/components/shared/Pagination';
import TranslateExampleItem from './TranslateExampleItem';


const components = {
  Pagination,
};

export default {
  name: 'TranslateList',
  components,
  props: {
    repository: {
      type: Object,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      translateList: null,
      translateExampleItem: TranslateExampleItem,
    };
  },
  watch: {
    async from() { await this.updateList(); },
    async to() { await this.updateList(); },
  },
  async mounted() {
    await this.updateList();
  },
  methods: {
    ...mapActions([
      'getExamplesToTranslate',
    ]),
    async updateList() {
      this.translateList = null;
      if (!!this.from && !!this.to) {
        await this.$nextTick();
        this.translateList = await this.getExamplesToTranslate({
          repositoryUuid: this.repository.uuid,
          from: this.from,
          to: this.to,
        });
      }
    },
    async onTranslated() {
      /* istanbul ignore next */
      this.$emit('translated');
      /* istanbul ignore next */
      await this.updateList();
    },
  },
};
</script>

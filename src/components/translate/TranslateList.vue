<template>
  <div>
    <div class="repository-translate__list__options">
      <div class="repository-translate__list__options__check">
        <b-checkbox v-model="selectAll"/> Select All
      </div>
      <div class="repository-translate__list__options__buttons">
        <b-button
          v-show="!editing"
          type="is-primary"
          icon-right="pencil"
          @click="editing = true"/>
        <b-button
          v-show="!editing"
          type="is-primary"
          icon-right="delete"
          @click="deleteAll" />
        <b-button
          v-show="editing"
          type="is-primary"
          icon-right="check-bold"
          @click="saveAll" />
        <b-button
          v-show="editing"
          type="is-primary"
          icon-right="close-thick"
          @click="editing = false" />
      </div>
    </div>
    <paginatedList
      v-if="translateList"
      :list="translateList"
      :item-component="translateExampleItem"
      :repository="repository"
      :translate-to="to"
      :empty-message="$t('webapp.translate.no_examples')"
      :add-attributes="{editing, initialData: editCache}"
      item-key="id"
      load-all
      @onChange="updateCache($event)"
      @translated="onTranslated()"
      @eventStep="dispatchStep()"
      @dispatchStep="dispatchStep()"
      @update:loading="onLoading($event)"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PaginatedList from '@/components/shared/PaginatedList';
import TranslateExampleItem from './NewTranslateExampleItem';

export default {
  name: 'TranslateList',
  components: {
    PaginatedList,
  },
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
    query: {
      type: Object,
      default: null,
    },
    update: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      translateList: null,
      translateExampleItem: TranslateExampleItem,
      selectAll: false,
      editing: false,
      editCache: {},
    };
  },
  computed: {
    ...mapGetters({
      repositoryVersion: 'getSelectedVersion',
    }),
  },
  watch: {
    async from() { await this.updateList(); },
    async to() { await this.updateList(); },
    query() { this.updateList(); },
    update() { this.updateList(); },
    selectAll() { this.$root.$emit('selectAll', this.selectAll); },
  },
  async mounted() {
    await this.updateList();
  },
  methods: {
    ...mapActions([
      'getExamplesToTranslate',
      'searchExamples',
    ]),
    updateCache({ id, data }) {
      if (!data) delete this.editCache[id];
      else this.editCache[id] = data;
    },
    saveAll() {
      this.$root.$emit('saveAll');
      this.editing = false;
      this.selectAll = false;
    },
    deleteAll() {
      this.$root.$emit('deleteAll');
    },
    async updateList() {
      if (!!this.from && !!this.to) {
        await this.$nextTick();
        const list = await this.searchExamples({
          query: this.query,
          repositoryUuid: this.repository.uuid,
          version: this.repositoryVersion,
          language: this.from,
        });
        if (this.translateList) this.translateList.updateList(list);
        else this.translateList = list;
      }
      this.$emit('listPhrase', this.translateList);
    },
    onLoading(value) {
      this.$emit('isLoadingContent', value);
    },
    async onTranslated() {
      /* istanbul ignore next */
      this.$emit('translated');
      /* istanbul ignore next */
      await this.updateList();
    },
    dispatchStep() {
      this.$emit('eventStep');
    },
  },
};
</script>
<style lang="scss" scoped>

.repository-translate{
  &__list{
    margin-left: 0.5rem;

      &__options {
        padding: 0 1rem 0 0.5rem;
        margin-bottom: 2.1rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
      &__check {
        display: flex;
        align-items: center;
      }
    }
  }
}


</style>

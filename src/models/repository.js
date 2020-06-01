/* eslint-disable class-methods-use-this */
import store from '@/store';
import ModelBase from './base';

class Repository extends ModelBase {
  constructor(attributes, ...args) {
    super(attributes, ...args);
    const { uuid, owner__nickname: ownerNickname, slug } = attributes;

    if (!uuid && ownerNickname && slug) {
      const related = store.getters.relatedUuid[`${ownerNickname}/${slug}/`];
      if (related) {
        this.set('uuid', related);
      }
      const versionNumber = store.getters.getSelectedVersion;
      const versionName = store.getters.getNameVersion;
      if (store.getters.getSelectedVersionRepository === related && versionName !== null) {
        this.set('repository_version', `${versionNumber}`);
      }
    }
  }

  options() {
    return {
      identifier: 'uuid',
    };
  }

  defaults() {
    return {
      uuid: null,
      owner: {},
      slug: '',
      name: '',
      description: '',
      language: '',
      is_private: false,
      categories: [],
      categories_list: [],
      algorithm: 'statistical_model',
      use_competing_intents: false,
      created_at: null,
      available_languages: [],
      examples__count: 0,
      intents: [],
      intents_list: [],
      entities_list: [],
      groups: [],
      groups_list: [],
      other_group: {},
      authorization: null,
      available_request_authorization: null,
      request_authorization: null,
      languages_warnings: null,
      requirements_to_train: {},
      ready_for_train: false,
      repository_version: '',
    };
  }

  mutations() {
    return {
      uuid: String,
      owner: Object,
      slug: String,
      name: String,
      description: String,
      language: String,
      is_private: Boolean,
      categories: Object,
      categories_list: Object,
      algorithm: String,
      use_competing_intents: Boolean,
      created_at: String,
      available_languages: Object,
      examples__count: Number,
      intents: Object,
      intents_list: Object,
      entities_list: Object,
      groups: Object,
      groups_list: Object,
      other_group: Object,
      authorization: Object,
      available_request_authorization: Boolean,
      request_authorization: Object,
      languages_warnings: Object,
      requirements_to_train: Object,
      ready_for_train: Boolean,
      repository_version: String,
    };
  }

  routes() {
    const uuid = this.get('uuid');
    const version = this.get('repository_version');

    const route = uuid
    && uuid !== 'null'
    && uuid.length > 0
    && version
    && version !== 'null'
    && version.length > 0
      ? '/v2/repository/info/{uuid}/{repository_version}/'
      : '/v2/repository-shortcut/{owner__nickname}/{slug}/';

    return {
      fetch: route,
    };
  }

  onFetch() {
    return super.onFetchNoCache();
  }

  onFetchSuccess(response) {
    super.onFetchSuccessNoCache(response);

    store.dispatch('setRepositoryRelatedUuid', {
      ownerNickname: this.owner__nickname,
      slug: this.slug,
      uuid: this.uuid,
    });
    store.dispatch('setRepository', this.attributes);
  }
}

export default Repository;

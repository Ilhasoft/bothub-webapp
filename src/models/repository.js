/* eslint-disable class-methods-use-this */
import store from '@/store';
import ModelBase from './base';


class Repository extends ModelBase {
  constructor(attributes, ...args) {
    super(attributes, ...args);
    const { uuid, owner__nickname: ownerNickname, slug } = attributes;

    if (!uuid && ownerNickname && slug) {
      const related = store.getters.relatedUuid[`${ownerNickname}/${slug}`];
      if (related) {
        this.set('uuid', related);
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
      owner: null,
      owner__nickname: null,
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
      labels: [],
      labels_list: [],
      other_label: {},
      authorization: null,
      available_request_authorization: null,
      request_authorization: null,
      languages_warnings: null,
      requirements_to_train: {},
      languages_ready_for_train: null,
      ready_for_train: false,
    };
  }

  mutations() {
    return {
      uuid: String,
      owner: Number,
      owner__nickname: String,
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
      labels: Object,
      labels_list: Object,
      other_label: Object,
      authorization: Object,
      available_request_authorization: Boolean,
      request_authorization: Object,
      languages_warnings: Object,
      requirements_to_train: Object,
      languages_ready_for_train: Object,
      ready_for_train: Boolean,
    };
  }

  routes() {
    return {
      fetch: '/v2/repository-shortcut/{owner__nickname}/{slug}/',
    };
  }

  onFetchSuccess(response) {
    super.onFetchSuccess(response);
    store.dispatch(
      'setRepositoryRelatedUuid',
      {
        ownerNickname: this.owner__nickname,
        slug: this.slug,
        uuid: this.uuid,
      },
    );
    store.dispatch('setRepository', this.attributes);
  }
}

export default Repository;

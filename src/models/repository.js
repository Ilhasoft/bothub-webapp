/* eslint-disable class-methods-use-this */
import { Model } from 'vue-mc';
import store from '@/store';

class Repository extends Model {
  defaults() {
    return {
      uuid: null,
      owner: null,
      ownerNickname: null,
      slug: '',
      name: '',
      description: '',
      language: '',
      is_private: false,
      categories: [],
      categories_list: [],
      use_language_model_featurizer: true,
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
      ownerNickname: String,
      slug: String,
      name: String,
      description: String,
      language: String,
      is_private: Boolean,
      categories: Object,
      categories_list: Object,
      use_language_model_featurizer: Boolean,
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
      fetch: '/v2/repository-shortcut/{ownerNickname}/{slug}/',
    };
  }

  getRequest(config) {
    return super.getRequest(
      Object.assign(
        {},
        config,
        {
          baseURL: process.env.API_BASE_URL,
          headers: store.getters.authenticated
            ? { Authorization: `Token ${store.getters.authToken}` }
            : {},
        },
      ),
    );
  }
}

export default Repository;

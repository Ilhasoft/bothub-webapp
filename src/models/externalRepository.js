/* eslint-disable class-methods-use-this */
import store from '@/store';
import ModelBase from './base';

class ExternalRepository extends ModelBase {
  getRequest(config) {
    const token = this.get('uuid');
    return super.getRequestExternal(
      Object.assign(
        {},
        config,
      ), token,
    );
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
      categories: [],
      categories_list: [],
      intents: [],
      intents_list: [],
      entities_list: [],
      groups: [],
      target_language: null,
      repository_version_id: null,
    };
  }

  mutations() {
    return {
      uuid: String,
      owner: Object,
      slug: String,
      name: String,
      categories: Array,
      categories_list: Array,
      intents: Array,
      intents_list: Object,
      entities_list: Array,
      groups: Array,
      target_language: String,
      repository_version_id: Number,
    };
  }

  routes() {
    const route = '/v2/repository/translator/info/{uuid}/';

    return {
      fetch: route,
    };
  }

  onFetch() {
    return super.onFetchNoCache();
  }

  onFetchSuccess(response) {
    super.onFetchSuccessNoCache(response);
    store.dispatch('setExternalRepository', this.attributes);
  }
}

export default ExternalRepository;

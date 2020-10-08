import { Model } from 'vue-mc';
import store from '@/store';


class ModelBase extends Model {
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

  getRequestExternal(config, token) {
    return super.getRequest(
      Object.assign(
        {},
        config,
        {
          baseURL: process.env.API_BASE_URL,
          headers: store.getters.authenticated
            ? { Authorization: `Translator ${token}` }
            : {},
        },
      ),
    );
  }

  onFetchNoCache() {
    return super.onFetch();
  }

  onFetchSuccessNoCache(response) {
    return super.onFetchSuccess(response);
  }

  onFetch() {
    const cache = store.getters.cachedFetch[`${this.$class}/${this.identifier()}`];

    if (cache) {
      this.assign(cache);
      this.emit('cache', { cache });
    }

    return super.onFetch();
  }

  onFetchSuccess(response) {
    super.onFetchSuccess(response);
    store.dispatch(
      'cacheFetch',
      {
        className: this.$class,
        identifier: this.identifier(),
        attributes: this.attributes,
      },
    );
  }
}

export default ModelBase;

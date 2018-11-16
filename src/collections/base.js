/* eslint-disable class-methods-use-this */
import { Collection } from 'vue-mc';
import { isNil, get, assign } from 'lodash';
import store from '@/store';


class BaseCollection extends Collection {
  constructor(...args) {
    super(...args);
    this.lastData = null;
    this.filter = {};
  }

  getRequest(config) {
    return super.getRequest(
      assign(
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

  getFetchURL() {
    if (this.lastData && typeof this.lastData.next !== 'undefined') {
      return this.lastData.next;
    }
    return super.getFetchURL();
  }

  getFetchQuery() {
    return assign(
      this.filter,
      this.lastData && typeof this.lastData.next !== 'undefined'
        ? {}
        : super.getFetchQuery(),
    );
  }

  onFetchSuccess(response) {
    this.lastData = response.response.data;
    return super.onFetchSuccess(response);
  }

  isPaginated() {
    if (this.lastData && typeof this.lastData.results === 'object') {
      return true;
    }
    return super.isPaginated();
  }

  getModelsFromResponse(response) {
    const models = response.getData();
    if (isNil(models) || models === '') {
      return null;
    }
    if (this.isPaginated()) {
      return get(models, 'results', models);
    }
    return models;
  }

  isLastPage() {
    if (this.lastData && typeof this.lastData.next !== 'undefined') {
      return !this.lastData.next;
    }
    return super.isLastPage();
  }
}

export default BaseCollection;

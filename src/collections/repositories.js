/* eslint-disable class-methods-use-this */
import ShortRepository from '@/models/short-repository';
import BaseCollection from './base';
import { isNil, get } from 'lodash';


class RepositoriesList extends BaseCollection {
  options() {
    return {
      model: ShortRepository,
    };
  }

  routes() {
    return {
      fetch: 'v2/repositories/',
    };
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
}

export default RepositoriesList;

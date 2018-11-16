/* eslint-disable class-methods-use-this */
import ShortRepository from '@/models/short-repository';
import BaseCollection from './base';


class MyRepositoriesList extends BaseCollection {
  options() {
    return {
      model: ShortRepository,
    };
  }

  routes() {
    return {
      fetch: 'my-repositories/',
    };
  }
}

export default MyRepositoriesList;

/* eslint-disable class-methods-use-this */
import ModelBase from './base';

class NewRepositoryModel extends ModelBase {
  defaults() {
    return {
      name: '',
      slug: '',
      language: '',
      categories: [],
      description: '',
      is_private: false,
      algorithm: '',
      use_competing_intents: false,
      use_language_model_featurizer: false,
    };
  }

  mutations() {
    return {
      uuid: String,
      slug: String,
      language: String,
      categories: Object,
      description: String,
      is_private: Boolean,
      algorithm: String,
      use_competing_intents: Boolean,
      use_language_model_featurizer: Boolean,
    };
  }

  routes() {
    return {
      save: '/repository/new/',
    };
  }

  getSaveData() {
    const attrsValues = super.getSaveData();
    attrsValues.categories = attrsValues.categories.split(',');
    return attrsValues;
  }
}

export default NewRepositoryModel;

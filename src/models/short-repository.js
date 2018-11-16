/* eslint-disable class-methods-use-this */
import { Model } from 'vue-mc';


class ShortRepository extends Model {
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
      created_at: String,
      available_languages: Object,
    };
  }
}

export default ShortRepository;

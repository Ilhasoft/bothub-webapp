import repository from '@/api/repository';

export default {
  async getNewRepositorySchema() {
    const response = await repository.getNewSchema();
    return response;
  },
  async newRepository(store, {
    name,
    slug,
    language,
    categories,
    description,
    is_private: isPrivate,
  }) {
    const response = await repository.new(name, slug, language, categories, description, isPrivate);
    return response;
  },
  getAllRepositories() {
    /* istanbul ignore next */
    return repository.getAll();
  },
  searchRepositories(store, querys) {
    return repository.search(querys);
  },
};

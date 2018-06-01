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
    /* istanbul ignore next */
    return repository.search(querys);
  },
  getRepository(store, { ownerNickname, slug }) {
    /* istanbul ignore next */
    return repository.get(ownerNickname, slug);
  },
  trainRepository(store, { ownerNickname, slug }) {
    /* istanbul ignore next */
    return repository.train(ownerNickname, slug);
  },
  analyzeText(store, { ownerNickname, slug, language, text }) {
    /* istanbul ignore next */
    return repository.analyze(ownerNickname, slug, language, text);
  },
  async getEditRepositorySchema(store, { ownerNickname, slug }) {
    /* istanbul ignore next */
    const response = await repository.getEditSchema(ownerNickname, slug);
    return response;
  },
  editRepository(store, {
    ownerNickname,
    repositorySlug,
    name,
    slug,
    language,
    categories,
    description,
    is_private: isPrivate,
  }) {
    return repository.edit(
      ownerNickname,
      repositorySlug,
      name,
      slug,
      language,
      categories,
      description,
      isPrivate,
    );
  },
  getRepositoryLanguagesStatus(store, { ownerNickname, slug }) {
    return repository.getLanguagesStatus(ownerNickname, slug);
  },
  repositoryVoteUp(store, { ownerNickname, slug }) {
    return repository.voteUp(ownerNickname, slug);
  },
  repositoryVoteDown(store, { ownerNickname, slug }) {
    return repository.voteDown(ownerNickname, slug);
  },
};

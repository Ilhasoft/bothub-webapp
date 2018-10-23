import request from '@/api/request';

export default {
  get(repositoryUuid) {
    return request.$http.get(`/v2/repository/${repositoryUuid}/`);
  },
  shortcut(ownerNickname, slug) {
    return request.$http.get(`/v2/repository-shortcut/${ownerNickname}/${slug}/`);
  },
};

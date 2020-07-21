import org from '@/api/org';
import repository from '@/api/repository';

export default {
  async getAllOrgs() {
    const response = await org.getAll();
    return response;
  },

  async getOrg(store, { nickname }) {
    const response = await org.getOrg(nickname);
    return response;
  },

  editOrg(store, { data, nickname }) {
    return org.editOrg(data, nickname);
  },

  getNewOrgSchema() {
    return org.getNewOrgSchema();
  },

  getOrgContributingRepositories(store, { nickname, limit = 20 }) {
    return repository.searchByOrg(nickname, limit);
  },

  orgAuthorizationList(store, { orgNickname, limit = 20 }) {
    return org.getAuthorizationList(orgNickname, limit);
  },

  getOrgRepositories(store, { nickname, limit = 20 }) {
    return repository.searchByOrg(nickname, limit);
  },

  getEditOrgSchema(store, { nickname }) {
    return org.getEditOrgSchema(nickname);
  },

  createOrg(store, data) {
    return org.createOrg(data);
  },

  updateAuthorizationRole(store, { orgNickname, userNickname, newRole }) {
    return org.updateAuthorizationRole(
      orgNickname,
      userNickname,
      newRole,
    );
  },

  approveOrgRequestAuthorization(store, { userNickname, orgNickname }) {

  },

  removeOrgAuthorization(store, { userNickname, orgNickname }) {
    return org.removeAuthorization(userNickname, orgNickname);
  },
};

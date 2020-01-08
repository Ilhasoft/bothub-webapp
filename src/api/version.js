import request from './request';

export default {
	getVersions() {
		return request.$http.get('/v2/repository/version/');
	}
}
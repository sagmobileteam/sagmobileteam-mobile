function RestPromiseProvider() {
	this.$get = ["$http", function RestPromise($http) {
		this.instance = new RestPromiseProvider();
		this.instance.$http = $http;
		return this.instance;
	}];

	var httpURL = {};
	this.invoke = function(URLobj,data) {
		var urlString = URLobj.url;
		httpURL = {
			method : URLobj.method,
			url : urlString,
			data : data,
			withCredentials : true,
			headers : URLobj.headers,
		};
	}
	return this.$http(httpURL);
};
angular.module('RDLink.RestPromiseProvider', ['ngResource']).provider('RestPromiseProvider', RestPromiseProvider);
var IS_HEADERS = {
	'Content-Type': 'application/json',
	'Accept' : 'application/json',
	'SAG-Authentication-Not-Required' : 'SAG-Authentication-Not-Required'
};

var COMMON_HEADERS = {
	'Content-Type': 'application/json',
	'Accept' : 'application/json',
};
var endpointAddress = "http://115.112.63.20:9281";
//var endpointAddress = "http://193.26.196.167:9556";
//var endpointAddress = "http://193.26.196.149:5555";
//var endpointAddress = "http://redconsdev01.eur.ad.sag:5555";
var REST_URLS = {
	SEARCH_PROJECTS:{
		//url: endpointAddress+'/rest/CG510_RnDLink_UIGateway_v1/restServices/searchProjects',
		url: endpointAddress+'/rest/CG510_RndLink_MobileGateway_v1/restServices/searchProjects',
		method: 'POST'
	},
	SEARCH_TASKS : {
		url: endpointAddress + '/rest/CG510_RndLink_MobileGateway_v1/restServices/searchTasks',
		method: 'POST'
	},
	ADD_FAV_PROJECT : {
		url: endpointAddress + '/rest/CG510_RndLink_MobileGateway_v1/restServices/markFavoriteProject',
		method: 'POST'
	},
	REMOVE_FAV_PROJECT : {
		url: endpointAddress + '/rest/CG510_RndLink_MobileGateway_v1/restServices/clearFavoriteProject',
		method: 'POST'
	},
	COMPLETE_TASK : {
		url: endpointAddress + '/rest/CG510_RndLink_MobileGateway_v1/restServices/completeTask',
		method: 'POST'
	},
	RNDLINK_SUMMARY :{
		url : endpointAddress + '/rest/CG510_RndLink_MobileGateway_v1/restServices/getAllCounts',
		method : 'POST'
	}
};
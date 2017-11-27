angular.module('RDLink.services',[])
	.service('projectService', [ function(){
		this.getProjectsByUserResponse = [];
		this.getLazyloadedData = {};
		this.projectDataContent = {};
		this.activeTab = 1;

		this.navFromAll = false;
		// This function is calling ESB service to get the project details based on passed input
		this.getProjectsByUserRestCall = function(projectType, viewObj, filterObj, text, headerInfo, startIndex, NoOfRecords){
			var getProjectsByUserJSON = {
				"UIRequest" : {
					"headerInfo" :headerInfo,
					"searchText" : text,
					"userSelectedGlobalFilter" : filterObj,	
					"pagination" : {
						"paginationEntityType" : "",
						"pagination" : "true",
						"startIndex" : startIndex.toString(),
						"endIndex" : NoOfRecords.toString()
					},		
					"view" : viewObj,
					"projectType": projectType,
					"sortBy" : {
						"region" : "",
						"projectNumber" : "",
						"formulaNumber" : "",
						"APRNumber" : "",
						"creationDate" : ""
					}
				}
			};
			return getProjectsByUserJSON;
		}
		
		this.markFavouriteRestCall = function(projectNumber, headerInfo, e2eTraceabilityInfo){
			var selectFavouriteJSON = {
				"UIRequest" : {
					"headerInfo" : headerInfo,
					"projectNumber" : projectNumber,
					"E2ETraceabilityInfo" : e2eTraceabilityInfo
				}
			};
			return selectFavouriteJSON;
		}
		
		this.clearFavouriteRestCall = function(projectNumber,headerInfo,successClearFavourite,errorCallback,e2eTraceabilityInfo){
			clearFavouriteJSON = {
				"UIRequest" : {
					"headerInfo" : headerInfo,
					"projectNumber" : projectNumber,
					"E2ETraceabilityInfo" : e2eTraceabilityInfo
				}
			};
			return clearFavouriteJSON;
		}
	}
])
.service('taskService', [ function(){
	this.taskInput = {};
	this.taskOutput = {};

	this.openTaskList = '';

	this.createTaskInput = function(){
		var UIRequest = {
			"headerInfo": {
				"userID": "ldapCoordinator1",
				"UISessionID": "",
				"source": "",
				"destination": ""
			},
			"taskFilter": {
				"status": ["Active"],
				"dueDateRange": null,
				"applicationName": null,
				"region": null,
				"requestedDateRange": null,
				"projectType": []
			},
			"pagination": {
				"paginationEntityType": null,
				"pagination": "false",
				"startIndex": "0",
				"endIndex": "20"
			},
			"view": {
				"myTasks": "true",
				"allTasks": null
			},
			"sortBy": {
				"region": null,
				"projectNumber": null,
				"formulaNumber": null,
				"APRNumber": null,
				"creationDate": null
			},
			"projectNumber": null,
			"section": {
				"today": "true",
				"thisWeek": "true",
				"nextWeek": "true",
				"nextTwoWeeks": "true",
				"later": "true",
				"all": "false"
			},
			"isPartner": "false"
		}
		return this.taskInput;
	};
}])
.service('checkpointService', [ function(){

}])
.service('allPageService', [ function(){
	this.allSystemSearchText = '';
}]);
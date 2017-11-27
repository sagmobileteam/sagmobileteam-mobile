angular.module('RDLink.controllers', [])
  .controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', '$ionicLoading','$state', function ($scope, $ionicModal, $timeout, $ionicLoading, $state) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:

    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    $scope.showLoading = function () {
      $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner>'
      });
    }
    $scope.hideLoading = function () {
      $ionicLoading.hide();
    }
    $scope.goToHome = function(){
      $state.go('app.home');
    }
  }
  ])
  .controller('splashController', ['$scope', '$timeout', '$state', 
    function($scope, $timeout, $state){
      $scope.showLoading();
      $timeout(function(){
          $scope.hideLoading();
          $state.go('app.landing');
      }, 2000);
  }])
  .controller('landingController', ['$scope', '$http', '$state',
    function ($scope, $http, $state) {
      console.log("Loading rdop landing controller....");

      var input = {
        "UIRequest": {
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
            "thisWeek": "false",
            "nextWeek": "false",
            "nextTwoWeeks": "false",
            "later": "false",
            "all": "false"
          },
          "isPartner": "false"
        }
      };

      $scope.loadAppImageClass = function(appName){
        if(appName === "Capri") 
         return "apr-task";
      else if(appName === "RnDLink")
         return "rnd-task";
      else if(appName === "Concerto")
         return "fml-task";
      else if(appName === "RM")
         return "rm-task";      
      }

      $scope.GotoPage = function(name){
        if(name === 'rndlink'){
          $state.go('app.rndLanding');
        } else if(name === 'productdev'){
          $state.go('app.notImplemented');
        } else if(name === 'rm'){
          $state.go('app.notImplemented');
        } else if(name === 'capri'){
          $state.go('app.notImplemented');
        } else if(name === 'element'){
          $state.go('app.notImplemented');
        } else if(name === 'registrations'){
          $state.go('app.notImplemented');
        }
      }
    }
  ])
  .controller('projectController', ['$scope', 'projectService', '$http', 'allPageService',
    function ($scope, projectService, $http, allService) {
      console.log("Loading project controller");

      $scope.tab = 1;
      $scope.filtText = '';
      $scope.showDetails = false;
      $scope.showMenu = false;
      $scope.message = "Loading ...";

      $scope.selectedProjectType = 'allTypes';

      $scope.viewObj = {};
      $scope.viewObj.myProjects = "true";
      $scope.viewObj.myFavorites = "false";
      $scope.viewObj.recentProjects = "false";
      $scope.viewObj.allProjects = "false";

      $scope.filterObj = {};

      var headerInfo = {
        "userID": 'ldapCoordinator1',
        "UISessionID": "",
        "source": "",
        "destination": ""
      };

      $scope.updateViewObj = function (myProject, myFav, recentProj, allProj) {
        $scope.viewObj.myProjects = myProject;
        $scope.viewObj.myFavorites = myFav;
        $scope.viewObj.recentProjects = recentProj;
        $scope.viewObj.allProjects = allProj;
      }

      $scope.select = function (setTab) {
        projectService.activeTab = setTab;
        $scope.tab = setTab;
        if (setTab === 2) {
          $scope.searchText.data = '';
          $scope.updateViewObj('false', 'true', 'false', 'false');
          $scope.getProjectDetails('', $scope.viewObj);
        } else if (setTab === 3) {
          $scope.searchText.data = '';
          $scope.updateViewObj('false', 'false', 'true', 'false');
          $scope.getProjectDetails('', $scope.viewObj);
        } else if (setTab === 4) {
          $scope.searchText.data = '';
          $scope.updateViewObj('false', 'false', 'false', 'true');
          $scope.getProjectDetails('', $scope.viewObj);
        } else {
          $scope.searchText.data = '';
          $scope.updateViewObj('true', 'false', 'false', 'false');
          $scope.getProjectDetails('', $scope.viewObj);
        }
      };

      $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
      };

      $scope.searchText = {};
      $scope.searchText.data = '';
      $scope.clearSearchText = function () {
        $scope.searchText.data = '';
      }

      $scope.getProjectDataDetails = function () {
        $scope.getProjectDetails($scope.searchText.data, $scope.viewObj);
      };

      $scope.setProjectDetails = function (project) {
        projectService.projectDataContent = project;
      }

      $scope.checkIfEnterKeyWasPressed = function ($event) {
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
           $scope.tab = 4;
           $scope.getProjectDataDetails();
        }
      };

      $scope.projectDetailsObj = []; // Output object received from ESB layer

      $scope.getProjectDetails = function (inputData, viewObj) {
        console.log("Calling get project details");
        $scope.showLoading();
        $http({
          method: REST_URLS.SEARCH_PROJECTS.method,
          url: REST_URLS.SEARCH_PROJECTS.url,
          data: projectService.getProjectsByUserRestCall($scope.selectedProjectType, viewObj, $scope.filterObj, inputData, headerInfo, 0,  20),
          withCredentials: true
        }).then(function (response) {
          var UIResponse = response.data.UIResponse;
          if (UIResponse.status.statusCode == 0) {
            projectService.getProjectsByUserResponse = UIResponse.projectDetails;
            $scope.projectDetailsObj = UIResponse.projectDetails;
          } else if (UIResponse.status.statusCode == -1) {
            $scope.setSuccessErrorMessage(UIResponse.status.message, false);
          }
          document.activeElement.blur();
          $scope.hideLoading();
        }, function () {
        });
      }
      
      // Entry point to get Project List details
      if(projectService.navFromAll){
        console.log("Call From all page");
        $scope.tab = 4;
        $scope.searchText.data = allService.allSystemSearchText;
        $scope.updateViewObj('false', 'false', 'false', 'true');
        $scope.getProjectDetails($scope.searchText.data, $scope.viewObj);
      } else{
        $scope.select(projectService.activeTab);
      }

      $scope.addFavorite = function (projectName) {
        $scope.showLoading();
        $http({
          method: REST_URLS.ADD_FAV_PROJECT.method,
          url: REST_URLS.ADD_FAV_PROJECT.url,
          data: projectService.markFavouriteRestCall(projectName, headerInfo, {}),
          withCredentials: true
        }).then(function (response) {
          var UIResponse = response.data.UIResponse;
          if (UIResponse.status.statusCode == 0) {
            for (var i = 0; i < $scope.projectDetailsObj.length; i++) {
              if ($scope.projectDetailsObj[i].projectData['projectNumber'] === projectName) {
                $scope.projectDetailsObj[i].projectData.isFavorite = 'true';
                break;
              }
            }
          }
          $scope.hideLoading();
        }, function () {
        });
      }

      $scope.removeFavorite = function (projectName) {
        $scope.showLoading();
        $http({
          method: REST_URLS.REMOVE_FAV_PROJECT.method,
          url: REST_URLS.REMOVE_FAV_PROJECT.url,
          data: projectService.markFavouriteRestCall(projectName, headerInfo, {}),
          withCredentials: true
        }).then(function (response) {
          var UIResponse = response.data.UIResponse;
          if (UIResponse.status.statusCode == 0) {
            for (var i = 0; i < $scope.projectDetailsObj.length; i++) {
              if ($scope.projectDetailsObj[i].projectData['projectNumber'] === projectName) {
                $scope.projectDetailsObj[i].projectData.isFavorite = 'false';
                break;
              }
            }
          }
          $scope.hideLoading();
        }, function () {
        });
      }
    }
  ])

  .controller('projectDetailsController', ['$scope', 'projectService', '$http',
    function ($scope, projectService, $http) {

      console.log("Loading project details controller.");
      $scope.currentProjectData = projectService.projectDataContent;
    }
  ])

  .controller('taskController', ['$scope', 'taskService', '$http', '$ionicPopup', '$timeout',
    function ($scope, taskService, $http, $ionicPopup, $timeout) {
      console.log("Loading task controller....");

      var input = {
        "UIRequest": {
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
      };
      
      $scope.tab = 1;
      $scope.select = function (setTab) {
        $scope.tab = setTab;
        if (setTab === 2) {
          input.UIRequest.taskFilter.applicationName = ["RM"];
          $scope.getTasksList();
        } else if (setTab === 3) {
          input.UIRequest.taskFilter.applicationName = ["Concerto"];
          $scope.getTasksList();
        } else if (setTab === 4) {
          input.UIRequest.taskFilter.applicationName = ["RnDLink"];
          $scope.getTasksList();
         } else if (setTab === 5) {
          input.UIRequest.taskFilter.applicationName = null;
          $scope.getTasksList();
         } else {
          input.UIRequest.taskFilter.applicationName = ["Capri"];
          $scope.getTasksList();
        }
      };

      $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
      };

      $scope.getTasksList = function () {
        $scope.showLoading();
        $scope.taskDataList = [];
        $http({
          method: REST_URLS.SEARCH_TASKS.method,
          url: REST_URLS.SEARCH_TASKS.url,
          data: input,
          withCredentials: true
        }).then(function (response) {
          if (response.data.UIResponse.status.statusCode == 0) {
            $scope.taskDataList = response.data.UIResponse;
            if(taskService.openTaskList !== ''){
              if(taskService.openTaskList === 1 && $scope.taskDataList['todayTasks']){
                $scope.taskDataList['todayTasks']['show'] = true;
              } else if(taskService.openTaskList === 2 && $scope.taskDataList['thisWeekTasks']){
                $scope.taskDataList['thisWeekTasks']['show'] = true;
              } else if(taskService.openTaskList === 3 && $scope.taskDataList['nextWeekTasks']){
                $scope.taskDataList['nextWeekTasks']['show'] = true;
              } else if(taskService.openTaskList === 4 && $scope.taskDataList['nextTwoWeeksTasks']){
                $scope.taskDataList['nextTwoWeeksTasks']['show'] = true;
              } else if(taskService.openTaskList === 5 && $scope.taskDataList['laterTasks']){
                $scope.taskDataList['laterTasks']['show'] = true;
              } 
            }
          }
          $scope.hideLoading();
        }, function () {
        });
      }

      $scope.getCount = function (obj) {
        return obj === undefined ? 0 : obj.length;
      }
      
      //Entry Point for Task List details
      $scope.getTasksList();

      $scope.isDataShown = function (value) {
        if(value !== undefined)
          return value.show;
        return false;  
      }
      $scope.toggleData = function (value) {
        value.show = !value.show;
      }

      $scope.loadAppImageClass = function(appName){
        if(appName === "Capri") 
         return "apr-task";
        else if(appName === "RnDLink")
          return "rnd-task";
        else if(appName === "Concerto")
          return "fml-task";
        else if(appName === "RM")
          return "rm-task";      
        else 
          return 'img-size';
      }

      // Perform the login action when the user submits the login form
      $scope.completeTask = function () {
        var inputData = {
          "UIRequest": {
            "headerInfo": {
              "userID": "ldapCoordinator1",
              "UISessionID": "",
              "source": "",
              "destination": ""
            },
            "taskData": [$scope.taskData],
            "E2ETraceabilityInfo": null
          }
        };

        $scope.showLoading();
        
        $http({
          method: REST_URLS.COMPLETE_TASK.method,
          url: REST_URLS.COMPLETE_TASK.url,
          data: inputData,
          withCredentials: true
        }).then(function (response) {
          if (response.data.UIResponse.status.statusCode == 0) {
            $timeout(function(){
              $scope.getTasksList();
            }, 1000);
          }
        }, function () {
        });
      };
      
      $scope.openTaskPopUp= function(data) {
        $scope.taskData = data;
        var confirmPopup = $ionicPopup.confirm({
          title: 'Complete Task',
          template: 'Are you want to Complete the Task?'
        });
        confirmPopup.then(function(res) {
          if(res) {
            $scope.completeTask();
          } else {
            console.log('Cacelling Task PopUp Box!!');
          }
        });
      };
    }
  ])
  .controller('checkpointController', ['$scope', '$http',
    function ($scope, $http) {
      console.log("Loading checkpoint controller....");
    }
  ])
  .controller('rndLandingController', ['$scope', '$http', '$state', 'projectService', 'taskService', 'allPageService',
    function($scope, $http, $state, projectService, taskService, allService){

      $scope.allSearchText = {};
      $scope.allSearchText.data = '';

      allService.allSystemSearchText = '';

      $scope.allClearSearchText = function () {
        $scope.allSearchText.data = '';
      }

      $scope.setServiceValue = function(value){
        allService.allSystemSearchText = value;
      };

      $scope.goToProject = function(index){
        if(index === 0){
          projectService.activeTab = 1;
        } else if(index === 1){
          projectService.activeTab = 1;
        } else if(index === 2){
          projectService.activeTab = 2;
        } else if(index === 3){
          projectService.activeTab = 3;
        } else if(index === 4){
          projectService.activeTab = 4;
        }
        projectService.navFromAll = false;
        $state.go('app.project');
      }
      
      $scope.gotoTask = function(index){
        console.log("Routing to Task Controller Page : " + index);
        taskService.openTaskList = index;
        $state.go('app.task')
      }

      $scope.gotoCheckpoint = function(index){
        console.log("Checkpoint : " + index);
        if(index === 0){

        } else if(index === 1){

        } else if(index === 2){

        } else if(index === 3){

        } else if(index === 4){

        }
        $state.go('app.checkpoint')
      }

      $scope.checkIfEnterKeyWasPressed = function ($event) {
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
           $state.go('app.allPage');
        }
      };

      $scope.getSummaryCount = function(){
        $scope.showLoading();
        $http({
          method: REST_URLS.RNDLINK_SUMMARY.method,
          url: REST_URLS.RNDLINK_SUMMARY.url,
          data: {
            "UIRequest" : {
              "isPartner" : 'false',
              "userID" : 'ldapCoordinator1'
            }
          },
          withCredentials: true
        }).then(function (response) {
          $scope.summaryCount = response.data.UIResponse;
          $scope.hideLoading();
        }, function () {
        });
      }

      $scope.convertBlackToZero = function(input){
        if(input === '' || input === undefined){
          return 0;
        }
        return input;
      };

      //Entry point for R&D link landing page summary count values
       $scope.getSummaryCount();
    }
  ])
  .controller('allPageController', ['$scope', '$http', '$state', 'allPageService', 'projectService',
    function($scope, $http, $state, allService, projectService){
      console.log("All Page controller loading....");

      $scope.allSearchText = {};
      $scope.allSearchText.data = allService.allSystemSearchText;

      //$scope.selectedProjectType = ["product", "nonProductLaunch", "program"];
      $scope.selectedProjectType = 'allTypes';

      $scope.viewObj = {};
      $scope.viewObj.myProjects = "false";
      $scope.viewObj.myFavorites = "false";
      $scope.viewObj.recentProjects = "false";
      $scope.viewObj.allProjects = "true";

      $scope.filterObj = {};

      var headerInfo = {
        "userID": 'ldapCoordinator1',
        "UISessionID": "",
        "source": "",
        "destination": ""
      };

      $scope.allData = {};
      $scope.getAllProjectDetails = function(){
        $scope.showLoading();
        $http({
            method: REST_URLS.SEARCH_PROJECTS.method,
            url: REST_URLS.SEARCH_PROJECTS.url,
            data: projectService.getProjectsByUserRestCall($scope.selectedProjectType, $scope.viewObj, $scope.filterObj, $scope.allSearchText.data, headerInfo, 0,  3),
            withCredentials: true
          }).then(function (response) {
            if (response.data.UIResponse.status.statusCode == 0) {
              $scope.allData = response.data.UIResponse;
            }
          $scope.hideLoading();
        });
      }

      //Entry Point for getting all project data
      $scope.getAllProjectDetails();

      $scope.setProjectDetails = function (project) {
        projectService.projectDataContent = project;
      }

      $scope.openProjectAll = function(){
        console.log("Opening project details page in All tab");
        projectService.navFromAll = true;
        $state.go("app.project");
      }

      $scope.setServiceValue = function(value){
        allService.allSystemSearchText = value;
      };

      $scope.checkIfEnterKeyWasPressed = function ($event) {
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
           $scope.getAllProjectDetails();
        }
      };
    }
  ])
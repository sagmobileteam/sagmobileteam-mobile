// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('RDLink', ['ionic', 'RDLink.controllers','RDLink.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        /*templateUrl: 'templates/splash.html',
        controller:'splashController'*/
        templateUrl: 'templates/RDOPHome.html',
        controller:'landingController'
      }
    }
  })
  .state('app.landing', {
    url: '/landing',
    views: {
      'menuContent': {
        templateUrl: 'templates/RDOPHome.html',
        controller:'landingController'
      }
    }
  })
  .state('app.project', {
    url: '/project',
    views: {
      'menuContent': {
        templateUrl: 'templates/projects.html',
        controller:'projectController'
      }
    }
  })
  .state('app.projectDetails', {
    url: '/projectDetails',
    views: {
      'menuContent': {
        templateUrl: 'templates/projectDetails.html',
        controller:'projectDetailsController'
      }
    }
  })
  .state('app.task', {
    url: '/task',
    views: {
      'menuContent': {
        templateUrl: 'templates/tasks.html',
        controller:'taskController'
      }
    }
  })
  .state('app.checkpoint', {
    url: '/checkpoint',
    views: {
      'menuContent': {
        templateUrl: 'templates/checkpoint.html',
        controller:'checkpointController'
      }
    }
  })
  .state('app.notImplemented', {
    url: '/notImplemented',
    views: {
      'menuContent': {
        templateUrl: 'templates/notImplemented.html'
      }
    }
  })
  .state('app.rndLanding', {
    url: '/rndLanding',
    views: {
      'menuContent': {
        templateUrl: 'templates/rndLanding.html',
        controller: 'rndLandingController'
      }
    }
  })
   .state('app.allPage', {
    url: '/allPage',
    views: {
      'menuContent': {
        templateUrl: 'templates/allSystemPage.html',
        controller: 'allPageController'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})
.directive("imageSource", function (){
  return { 
    link: function (scope, element, attrs){
    if( attrs.imageSource !== "")
      element.attr("src", "data:image/png;base64," + attrs.imageSource);
    else
      element.attr("src", "img/default-logo.png");
    }
  };
})
.directive("taskImageSource", function (){
  return { 
    link: function (scope, element, attrs){
    if( attrs.taskImageSource !== ""){
      if(attrs.taskImageSource === "Capri") 
         element.attr("src", "img/Capri_icon.png"); 
      else if(attrs.taskImageSource === "RnDLink")
         element.attr("src", "img/Link_Logo.PNG"); 
      else if(attrs.taskImageSource === "Concerto")
         element.attr("src", "img/Concerto_icon.png"); 
      else if(attrs.taskImageSource === "RM")
         element.attr("src", "img/RM_Module_icon.png");
      else
        element.attr("src", "img/default-logo.png");    
    }
    else
      element.attr("src", "img/default-logo.png");
    }
  };
});
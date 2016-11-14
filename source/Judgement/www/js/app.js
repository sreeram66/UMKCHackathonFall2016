
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ngResource','ngCordova','ngCordovaOauth'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider


   .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })
    .state('judgedetails', {
      url: '/judgedetails',
      templateUrl: 'templates/judgedetails.html',
      controller: 'judgedetails'
    })


  .state('adminlogin', {
      url: '/adminlogin',
      templateUrl: 'templates/adminlogin.html',
      controller: 'adminloginCtrl'
  })


    .state('adminhome', {
      url: '/adminhome',
      templateUrl: 'templates/adminhome.html',
      controller:'adminhomeCtrl'
    })

    .state('judgeHome', {
      url: '/judgeHome',
      templateUrl: 'templates/judgeHome.html',
      controller:'judgeHomeCtrl'
    })

    .state('results', {
      url: '/results',
      templateUrl: 'templates/results.html',
      controller:'resultsCtrl'
    })




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});

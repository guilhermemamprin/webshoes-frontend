/// <reference path="../../.tmp/typings/tsd.d.ts" />

/// <reference path="controllers/main.controller.ts" />
/// <reference path="about/about.controller.ts" />
/// <reference path="repositoryProfile/repositoryProfile.controller.ts" />
/// <reference path="userProfile/userProfile.controller.ts" />
/// <reference path="auth/auth.controller.ts" />
/// <reference path="../app/components/navbar/navbar.controller.ts" />

module testApp {
  'use strict';

  angular.module('testApp', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router'])
    .controller('MainController', MainController)
    .controller('NavbarController', NavbarController)
    .controller('AboutController', AboutController)
    .controller('AuthController', AuthController)
    .controller('RepositoryProfileController', RepositoryProfileController)
    .controller('UserProfileController', UserProfileController)

  .config(function ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/views/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })

      .state('about', {
        url: '/about',
        templateUrl: 'app/about/about.html',
        controller: 'AboutController',
        controllerAs: 'about',
      })

      .state('repositories', {
        url: '/repositories?code',
        templateUrl: 'app/repositories/repositories.html',
        controller: 'RepositoriesController',
        controllerAs: 'repositories',
      })

       .state('repositoryProfile', {
        url: '/repositoryProfile?full_name',
        templateUrl: 'app/repositoryProfile/repositoryProfile.html',
        controller: 'RepositoryProfileController',
        controllerAs: 'profile',
      })

       .state('userProfile', {
        url: '/userProfile?login',
        templateUrl: 'app/userProfile/userProfile.html',
        controller: 'UserProfileController',
        controllerAs: 'userProfile',
      })


      .state('issues', {
        url: '/issues',
        templateUrl: 'app/issues/issues.html',
        controller: 'IssuesController',
        controllerAs: 'issues',
      })

      .state('issueForm', {
        url: '/issueForm/{owner}/{repo}',
        templateUrl: 'app/issueForm/issueForm.html',
        controller: 'IssueFormController',
        controllerAs: 'issueForm',
      })


      .state('/auth', {
        url: '/auth?code',
        controller: 'AuthController',
        controllerAs: 'auth',
      });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);


  })
;
}

module testApp {
  'use strict';

  class Thing {
    public rank: number;
    public login: string;
    public avatar_url: string;
    public html_url: string;

    constructor(login: string, avatar_url: string, rank: number, html_url: string) {
      this.login = login;
      this.avatar_url = avatar_url;
      this.html_url = html_url;

    }
  }

  export class UserProfileController {
    public awesomeThings: Thing[];
    public search: string;
    private pendingTask: any;
    private $http: any;
    public repository;
    public test;

    /* @ngInject */
    constructor ($stateParams, $http, $scope, $window) {
      var login = decodeURIComponent($stateParams.login);
      var _this = this;
      var test=1;

      if ( login === $window.localStorage.getItem('username')) {
        $http.get("https://api.github.com/user" + "?" + $window.localStorage.getItem("authToken"))
          .then(function(response) {
            $scope.user = response.data;
        });

      $http.get("https://api.github.com/user/orgs" + "?"  + $window.localStorage.getItem("authToken"))
        .then(function(response) {
          $scope.orgs = response.data;
      });

      $http.get("https://api.github.com/user/repos" + "?" + "sort=updated&per_page=6&"  + $window.localStorage.getItem("authToken"))
        .then(function(response) {
          $scope.repos = response.data;
      });

      } else {
        $http.get("https://api.github.com/users/" + login + "?" + $window.localStorage.getItem("authToken"))
          .then(function(response) {
            $scope.user = response.data;
        });

        $http.get("https://api.github.com/users/" + login + "/orgs" + "?"  + $window.localStorage.getItem("authToken"))
          .then(function(response) {
            $scope.orgs = response.data;
          });

        $http.get("https://api.github.com/users/" + login + "/repos" + "?" + "sort=updated&per_page=6&"  + $window.localStorage.getItem("authToken"))
          .then(function(response) {
            $scope.repos = response.data;
          });
      }
    }
  }
}

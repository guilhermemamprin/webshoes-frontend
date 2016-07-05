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

  export class RepositoryProfileController {
    public awesomeThings: Thing[];
    public search: string;
    private pendingTask: any;
    private $http: any;
    public repository;
    public test;

    /* @ngInject */
    constructor ($stateParams, $http, $scope, $window) {
      var full_name = decodeURIComponent($stateParams.full_name);
      var awesomeThings = [];
      var _this = this;
      var test=1;

      $http.get("https://api.github.com/repos/" + full_name + "?" + $window.localStorage.getItem("authToken"))
        .then(function(response) {
          $scope.repository = response.data;
      });

     $http.get("https://api.github.com/repos/" + full_name + "/issues?per_page=6&" + $window.localStorage.getItem("authToken"))
      .then(function(response) {
        $scope.issues = response.data;
      });



    }
  }
}

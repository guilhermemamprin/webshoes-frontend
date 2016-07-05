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

  export class IssueFormController {
    public awesomeThings: Thing[];
    public search: string;
    private pendingTask: any;
    private $http: any;
    private $window: any;
    private $stateParams: any;
    public repository;
    public owner;
    public repo;

    submitForm(isValid, issue) {
      if(!isValid) {
        alert("Not valid");
      } else {
        var authToken;
        var _this = this;
        var params = {};
        params['title'] = issue.title;
        params['body'] = issue.body;
        this.$http.post(
            "https://api.github.com/repos/" + this.owner + "/" + this.repo +  "/issues?" + this.$window.localStorage.getItem('authToken'),
            JSON.stringify(params)
          ).then(function(response) {
            if(response.status === 201) {
              _this.$window.location.href = '/';
              alert('Issue created!');
            }
        })
      }
    }

    /* @ngInject */
    constructor ($stateParams, $http, $scope, $window) {
      var owner = decodeURIComponent($stateParams.owner);
      var repo = decodeURIComponent($stateParams.repo);
      var _this = this;
      this.$window = $window;
      this.$http = $http;


      if(owner != undefined && repo != undefined) {
        $http.get("https://api.github.com/repos/" + owner + "/" + repo + "?" + $window.localStorage.getItem("authToken"))
          .then(function(response) {
            $scope.repo = response.data;
        });
        this.owner = owner;
        this.repo = repo;
      }

      $http.get("https://api.github.com/user" + "?" + $window.localStorage.getItem("authToken"))
          .then(function(response) {
            $scope.user = response.data;
        });




     }
  }
}

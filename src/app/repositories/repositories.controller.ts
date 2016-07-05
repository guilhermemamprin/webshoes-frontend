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

  export class RepositoriesController {
    public awesomeThings: Thing[];
    public search: string;
    public filter: string;
    private pendingTask: any;
    private $http: any;
    private $window: any;

    updateGrid(response) {
      var _this = this;
        this.awesomeThings = new Array<Thing>();
        _.forEach(response.data, function(awesomeThing: Thing) {
            _this.awesomeThings.push(awesomeThing);
        });
    }

    updateGridItems(response) {
      var awesomeThings;
      var _this = this;
      awesomeThings = response.data.items;
      this.awesomeThings = new Array<Thing>();

      awesomeThings.forEach(function(profile: Thing) {
        _this.awesomeThings.push(profile);
      });
    }

    getAllRepos() {
        var _this = this;
        var data;
        if (angular.element("#filter").val() === "all") {
          this.$http.get("https://api.github.com/repositories" + "?" + window.localStorage.getItem("authToken"))
            .then(function(response){_this.updateGrid(response)});
        } else {
          var username = this.$window.localStorage.getItem("username");
          this.$http.get("https://api.github.com/search/repositories?q=user:" + username + "&" + window.localStorage.getItem("authToken"))
            .then(function(response){_this.updateGridItems(response)});

        }
    }

    fetchRepositories() {
        var awesomeThings;
        var _this = this;
        if (this.search.length <= 0) {
            this.getAllRepos();
            return;
        }
        if (angular.element("#filter").val() === "all") {
          this.$http.get("https://api.github.com/search/repositories?q=" + this.search + "&" + window.localStorage.getItem("authToken"))
            .then(function(response) {
                _this.updateGridItems(response);
            });
        } else {
          var username = this.$window.localStorage.getItem("username");
          this.$http.get("https://api.github.com/search/repositories?q=user:" + username + "+"  + this.search + "&" + window.localStorage.getItem("authToken"))
            .then(function(response) {
                _this.updateGridItems(response);
            });
        }

    }

    inputChange(){
      if (this.pendingTask) {
        clearTimeout(this.pendingTask);
      }
      this.pendingTask = setTimeout(this.fetchRepositories(), 1000);
    }


    /* @ngInject */
    constructor ($scope, $http, $window) {
      var vm = this;
      var awesomeThings = [];
      var pendingTask;
      this.$window = window;

      this.$http = $http;
      this.filter = "all"
      if(this.search === undefined){
        this.search = ""
        this.getAllRepos();
      }

    }
  }

}

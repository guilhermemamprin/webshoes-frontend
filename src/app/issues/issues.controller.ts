module testApp {
  'use strict';

  class Issue {
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

  export class IssuesController {
    public issues: Issue[];
    public search: string;
    private pendingTask: any;
    private $http: any;

    updateGrid(response) {
      var _this = this;
        this.issues = new Array<Issue>();
        _.forEach(response.data, function(issue: Issue) {
            _this.issues.push(issue);
        });
    }

    getAllIssues() {
        var _this = this;
        var data;
        this.$http.get("https://api.github.com/user/repos" )
            .then(function(response){
              _this.updateGrid(response);
            });
    }

    fetchUser() {
        var issues;
        var _this = this;
        if (this.search.length <= 0) {
            this.getAllIssues();
            return;
        }
        this.$http.get("https://api.github.com/search/users?q=" + this.search)
            .then(function(response) {
                issues = response.data.items;
                _this.issues = new Array<Issue>();

                issues.forEach(function(profile: Issue) {
                  _this.issues.push(profile);

                });
        });
    }

    change(){
      if (this.pendingTask) {
        clearTimeout(this.pendingTask);
      }
      this.pendingTask = setTimeout(this.fetchUser(), 1000);
    }


    /* @ngInject */
    constructor ($scope, $http) {
      var vm = this;
      var issues = [];
      var pendingTask;

      this.$http = $http;

      if(this.search === undefined){
        this.getAllIssues();
      }
    }
  }

}

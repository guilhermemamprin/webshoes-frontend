module webShoes {
  'use strict';

  class User {
    name     : string;
    password : string;
    phone    : string;
    cpf      : string;
    rg       : string;

  }

  export class UserController {
    public $http: any;
    public $window: any;
    public rootUrl: string = 'http://webshoes-backend.herokuapp.com';
    public user: User;



      constructor ($scope: any, $http: any, $window: any) {
        this.$http = $http;
        this.$window = $window;
      }

      onSignUp() {

        this.$http({
            method  : 'POST',
            url     :  this.rootUrl + '/signup',
            data    :  this.user
          }).then(function(response) {
            this.$window.localStorage.setItem('username', response.data.login);
            this.$window.location.href = '/';
        });
    }
  }
}

module webShoes {
  'use strict';

  class User {
    name     : string;
    password : string;
    phone    : string;
    cpf      : string;
    rg       : string;
    email    : string;

  }

  export class UserController {
    public $http: any;
    public $window: any;
    private $state: any;
    public rootUrl: string = 'http://webshoes-backend.herokuapp.com';
    public user: User;
    public userLogin: User;

      constructor ($scope: any, $http: any, $window: any, $state:any) {
        this.$http = $http;
        this.$window = $window;
        this.$state = $state;
      }

      onSignUp(): void {

        this.$http({
            method  : 'POST',
            url     :  this.rootUrl + '/signup',
            data    :  this.user
          }).then((response) => {
            this.$window.localStorage.setItem('username', response.data.login);
            alert('Usuário cadastrado!');
            this.userLogin = this.user;
            this.onSignIn();

          }, (errorResponse) => {
            alert('Erro: ' + errorResponse.message);
        });
    }

    onSignIn(): void {
      this.$http({
            method  : 'POST',
            url     :  this.rootUrl + '/signin',
            data    :  {email: this.userLogin.email,  password: this.userLogin.password}
          }).then((response) => {

            this.$window.localStorage.setItem('name', response.data.name);
            this.$window.localStorage.setItem('token', response.data.token);
            this.$state.go('home');
        }, (errorResponse) => {
            alert('Erro: ' + errorResponse.message);
        });
    }
  }
}



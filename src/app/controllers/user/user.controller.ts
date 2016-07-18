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
    public $window: ng.IWindowService;
    private $state: any;
    public rootUrl: string = 'http://webshoes-backend.herokuapp.com';
    public user: User;
    public userLogin: User;

      constructor ($scope: any, $http: any, $window: ng.IWindowService, $state: any) {
        this.$http = $http;
        this.$window = $window;
        this.$state = $state;
      }

      onSignUp(): void {

        this.$http({
            method  : 'POST',
            url     :  this.rootUrl + '/signup',
            data    :  this.user
          }).then((response: any) => {

            alert('Usuário cadastrado!');
            this.userLogin = this.user;
            this.onSignIn();

          }, (errorResponse: any) => {
            alert('Erro: ' + _.get(errorResponse, 'data.message'));
        });
    }

    onSignIn(): void {
      this.$http({
            method  : 'POST',
            url     :  this.rootUrl + '/signin',
            data    :  {email: this.userLogin.email,  password: this.userLogin.password}
          }).then((response: any) => {

            let username : string = _.get(response, 'data.name', '');
            let token : string = _.get(response, 'data.token', '');

            if (username.length > 0 && token.length > 0) {
              this.$window.localStorage.setItem('username' , username);
              this.$window.localStorage.setItem('token', token);
              this.$state.go('home');
            } else {
              // alert: Debugging only
              alert('Erro no serviço!');
            }

        }, (errorResponse: any) => {
            alert('Erro: ' + _.get(errorResponse, 'data.message'));
        });
    }
  }
}


